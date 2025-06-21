import CourseNavigation from "./Navigation";
import { Navigate, Route, Routes, useParams } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/editor";
import EditAssignment from "./Assignments/EditAssignment";
import { FaAlignJustify } from "react-icons/fa";
import People from "./People";
import Breadcrumb from "./Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { unenrollUserFromCourse, enrollUserInCourse } from "../Account/enrollmentsReducer";
import * as enrollmentsClient from "../Enrollments/client";
import * as userClient from "../Account/client";
import { useState, useEffect } from "react";

// import { courses } from "../Database";
export default function Courses() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const course = courses.find((course: any) => course._id === cid);
  
  // State for enrollment status from server
  const [serverEnrolled, setServerEnrolled] = useState<boolean>(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState<boolean>(true);

  // Check enrollment status from server (authoritative)
  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      if (currentUser && cid) {
        try {
          setCheckingEnrollment(true);
          const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);
          const enrolled = enrolledCourses.some((course: any) => course._id === cid);
          setServerEnrolled(enrolled);
          
          // Sync with Redux store if different
          const localEnrolled = enrollments.some(
            (enrollment: any) =>
              enrollment.user === currentUser._id &&
              enrollment.course === cid
          );
          
          if (enrolled && !localEnrolled) {
            // User is enrolled on server but not in local store
            dispatch(enrollUserInCourse({ userId: currentUser._id, courseId: cid }));
          } else if (!enrolled && localEnrolled) {
            // User is not enrolled on server but exists in local store
            dispatch(unenrollUserFromCourse({ userId: currentUser._id, courseId: cid }));
          }
        } catch (error) {
          console.error("Error checking enrollment status:", error);
          setServerEnrolled(false);
        } finally {
          setCheckingEnrollment(false);
        }
      }
    };

    checkEnrollmentStatus();
  }, [currentUser, cid, dispatch, enrollments]);

  // Check if current user is enrolled in this course (use server data as authority)
  const isEnrolled = serverEnrolled;

  // Check if current user has edit permissions (FACULTY or ADMIN)
  const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const handleUnenroll = async () => {
    if (cid) {
      try {
        // Call server API to unenroll
        await enrollmentsClient.unenrollFromCourse(currentUser._id, cid);
        
        // Update Redux state
        dispatch(unenrollUserFromCourse({ userId: currentUser._id, courseId: cid }));
        
        // Update local state
        setServerEnrolled(false);
        
        // Navigate back to dashboard
        navigate("/Kambaz/Dashboard");
      } catch (error) {
        console.error("Failed to unenroll from course:", error);
        alert("Failed to unenroll from course. Please try again.");
      }
    }
  };

  // Show loading state while checking enrollment
  if (checkingEnrollment) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Checking enrollment status...</p>
      </div>
    );
  }

  // If user is not enrolled and not faculty/admin, redirect to dashboard
  if (!isEnrolled && !canEdit) {
    return (
      <div className="container mt-5">
        <Alert variant="warning" className="text-center">
          <Alert.Heading>Access Denied</Alert.Heading>
          <p>
            You are not enrolled in this course. Please enroll in the course from the Dashboard to access the content.
          </p>
          <hr />
          <div className="d-flex justify-content-center">
            <Link to="/Kambaz/Dashboard">
              <Button variant="primary">Return to Dashboard</Button>
            </Link>
          </div>
        </Alert>
      </div>
    );
  }

  // If course doesn't exist
  if (!course) {
    return (
      <div className="container mt-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Course Not Found</Alert.Heading>
          <p>
            The course you're looking for doesn't exist or has been removed.
          </p>
          <hr />
          <div className="d-flex justify-content-center">
            <Link to="/Kambaz/Dashboard">
              <Button variant="primary">Return to Dashboard</Button>
            </Link>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div id="wd-courses">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <FaAlignJustify className="me-4 fs-4 mb-1" />
          <Breadcrumb course={course} />
        </div>
        {isEnrolled && !canEdit && (
          <Button 
            variant="outline-danger" 
            size="sm"
            onClick={handleUnenroll}
            className="me-3"
          >
            Unenroll
          </Button>
        )}
      </div>
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Assignments/:aid/edit" element={<EditAssignment />} />
            <Route path="Assignments/new/edit" element={<EditAssignment />} />
            <Route path="People" element={<People />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
//Test git change
