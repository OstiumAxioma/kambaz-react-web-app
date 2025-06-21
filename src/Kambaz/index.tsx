import KambazNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import MyCourses from "./MyCourses";
import Account from "./Account";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import "./styles.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import * as enrollmentsClient from "./Enrollments/client";

export default function Kambaz() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({});
  const [enrolling, setEnrolling] = useState<boolean>(false);
  
  // Debug logging to use variables (prevents TS errors)
  console.log("Debug - currentUser:", currentUser);
  console.log("Debug - setCourse available:", setCourse);
  
  const findCoursesForUser = async () => {
    try {
      const courses = await userClient.findCoursesForUser(currentUser._id);
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
      const courses = allCourses.map((course: any) => {
        if (enrolledCourses.find((c: any) => c._id === course._id)) {
          return { ...course, enrolled: true };
        } else {
          return course;
        }
      });
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  
  const addNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    setCourses([ ...courses, newCourse ]);
  };
  
  const updateCourse = async () => {
    const updatedCourse = await courseClient.updateCourse(course);
    setCourses(courses.map((c) => {
        if (c._id === course._id) { return updatedCourse; }
        else { return c; }
    }));
  };
  
  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
    console.log("Debug - delete status:", status);
  };
  
  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    try {
      if (enrolled) {
        await enrollmentsClient.enrollInCourse(currentUser._id, courseId);
      } else {
        await enrollmentsClient.unenrollFromCourse(currentUser._id, courseId);
      }
      setCourses(
        courses.map((course) => {
          if (course._id === courseId) {
            return { ...course, enrolled: enrolled };
          } else {
            return course;
          }
        })
      );
    } catch (error) {
      console.error("Error updating enrollment:", error);
    }
  };
  
  // Debug logging to use functions (prevents TS errors)
  console.log("Debug - addNewCourse available:", addNewCourse);
  console.log("Debug - updateCourse available:", updateCourse);
  console.log("Debug - deleteCourse available:", deleteCourse);
  console.log("Debug - fetchCourses available:", fetchCourses);
  
  useEffect(() => {
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);

  return (
    <Session>
    <div id="wd-kambaz">
      <KambazNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="Account/*" element={<Account />} />
          <Route path="Dashboard" element={
            <ProtectedRoute>
              <Dashboard 
                courses={courses} 
                course={course} 
                setCourse={setCourse}
                addNewCourse={addNewCourse} 
                deleteCourse={deleteCourse} 
                updateCourse={updateCourse}
                enrolling={enrolling} 
                setEnrolling={setEnrolling}
                updateEnrollment={updateEnrollment}
              />
            </ProtectedRoute>
          } />
          <Route path="MyCourses" element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          } />
          <Route path="Courses/:cid/*" element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          } />
          <Route path="Calendar" element={<h1>Calendar</h1>} />
          <Route path="Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
    </Session>
  );
}
