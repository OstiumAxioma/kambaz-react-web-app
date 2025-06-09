import { useState, useEffect } from "react";
import { Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./Account/reducer";
import { addCourse, deleteCourse, updateCourse, setCourses } from "./Courses/reducer";
import { addEnrollment, enrollUserInCourse, unenrollUserFromCourse } from "./Account/enrollmentsReducer";
import { fetchAllCourses } from "./Courses/client";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import * as enrollmentsClient from "./Enrollments/client";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  
  // Local state for the course form
  const [course, setCourse] = useState({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
    department: "",
    credits: 3,
    image: ""
  });

  // Fetch all available courses on component mount
  useEffect(() => {
    const loadAllCourses = async () => {
      try {
        const allCourses = await fetchAllCourses();
        dispatch(setCourses(allCourses));
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    
    if (currentUser) {
      loadAllCourses();
    }
  }, [currentUser, dispatch]);

  // Check if current user has edit permissions (FACULTY or ADMIN)
  const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const signout = () => {
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };

  // Enhanced add new course function that posts to server
  const handleAddNewCourse = async () => {
    // Validate required fields
    if (!course.name || !course.number) {
      alert("Please fill in at least Course Name and Course Number");
      return;
    }
    
    try {
      console.log("Adding course:", course);
      
      // Post to server and get the new course with server-generated ID
      const newCourse = await userClient.createCourse(course);
      console.log("Course created on server:", newCourse);
      
      // Update Redux store with the new course
      dispatch(addCourse(newCourse));
      
      // Create enrollment record for current user
      const newEnrollment = {
        _id: `enrollment_${Date.now()}`,
        user: currentUser._id,
        course: newCourse._id
      };
      
      dispatch(addEnrollment(newEnrollment));
      console.log("Created enrollment:", newEnrollment);
      
      alert("Course added and enrolled successfully!");
      
      // Reset the course form
      setCourse({
        _id: "1234",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        description: "New Description",
        department: "",
        credits: 3,
        image: ""
      });
      
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course. Please try again.");
    }
  };

  const handleUpdateCourse = async () => {
    // Validate required fields
    if (!course.name || !course.number) {
      alert("Please fill in at least Course Name and Course Number");
      return;
    }

    try {
      console.log("Updating course:", course);
      
      // Update on server and get the updated course back
      const updatedCourse = await courseClient.updateCourse(course);
      console.log("Course updated on server:", updatedCourse);
      
      // Update Redux store with the updated course
      dispatch(updateCourse(updatedCourse));
      
      alert("Course updated successfully!");
      
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course. Please try again.");
    }
  };

  const handleDeleteCourse = (courseId: any) => {
    dispatch(deleteCourse(courseId));
  };

  const handleEnroll = async (courseId: string) => {
    try {
      // Call server API to enroll
      await enrollmentsClient.enrollInCourse(currentUser._id, courseId);
      
      // Update Redux state
      dispatch(enrollUserInCourse({ userId: currentUser._id, courseId }));
    } catch (error) {
      console.error("Failed to enroll in course:", error);
      alert("Failed to enroll in course. Please try again.");
    }
  };

  const handleUnenroll = async (courseId: string) => {
    try {
      // Call server API to unenroll
      await userClient.unenrollFromCourse(currentUser._id, courseId);
      
      // Update Redux state
      dispatch(unenrollUserFromCourse({ userId: currentUser._id, courseId }));
    } catch (error) {
      console.error("Failed to unenroll from course:", error);
      alert("Failed to unenroll from course. Please try again.");
    }
  };

  const isUserEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id &&
        enrollment.course === courseId
    );
  };

  return (
    <div id="wd-dashboard" className="p-4">
      {/* User info bar */}
      <div className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded">
        <div>
          <h5 className="mb-1">Welcome, {currentUser.firstName} {currentUser.lastName}!</h5>
          <small className="text-muted">
            Role: {currentUser.role} | Username: {currentUser.username}
          </small>
        </div>
        <div className="d-flex gap-2">
          <Link to="/Kambaz/MyCourses">
            <Button variant="outline-primary">My Courses</Button>
          </Link>
          <Button variant="outline-danger" onClick={signout}>
            Sign out
          </Button>
        </div>
      </div>

      <h1 id="wd-dashboard-title">Course Catalog</h1>
      <hr />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 id="wd-dashboard-published">
          Available Courses ({courses.length})
        </h2>
        {canEdit && (
          <div>
            <Button
              variant="warning"
              className="me-2"
              id="wd-update-course-click"
              onClick={handleUpdateCourse}
            >
              Update
            </Button>
            <Button
              variant="primary"
              id="wd-add-new-course-click"
              onClick={handleAddNewCourse}
            >
              Add New Course
            </Button>
          </div>
        )}
      </div>

      {canEdit && (
        <div className="mb-4">
          <h5>New Course</h5>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                value={course.name}
                onChange={(e) => setCourse({ ...course, name: e.target.value })}
                placeholder="Enter course name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Course Number</Form.Label>
              <Form.Control
                type="text"
                value={course.number}
                onChange={(e) => setCourse({ ...course, number: e.target.value })}
                placeholder="Enter course number"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                value={course.department}
                onChange={(e) => setCourse({ ...course, department: e.target.value })}
                placeholder="Enter department"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Credits</Form.Label>
              <Form.Control
                type="number"
                value={course.credits}
                onChange={(e) => setCourse({ ...course, credits: parseInt(e.target.value) || 0 })}
                placeholder="Enter credits"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={course.startDate}
                onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={course.endDate}
                onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={course.image}
                onChange={(e) => setCourse({ ...course, image: e.target.value })}
                placeholder="Enter image URL"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Course Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={course.description}
                onChange={(e) => setCourse({ ...course, description: e.target.value })}
                placeholder="Enter course description"
              />
            </Form.Group>
          </Form>
        </div>
      )}
      <hr />

      <div id="wd-dashboard-courses">
        {courses.length === 0 ? (
          <Alert variant="info">
            No courses are currently available for enrollment.
          </Alert>
        ) : (
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {courses.map((course: any) => {
              const isEnrolled = isUserEnrolled(course._id);
              return (
                <Col key={course._id} className="wd-dashboard-course">
                  <Card style={{ width: "300px" }}>
                    {/* Only allow image click if enrolled */}
                    {isEnrolled ? (
                      <Link
                        to={`/Kambaz/Courses/${course._id}/Home`}
                        className="wd-dashboard-course-link text-decoration-none text-dark"
                      >
                        <Card.Img
                          variant="top"
                          src={course.image || "/images/reactjs.jpg"}
                          width="100%"
                          height={160}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/images/reactjs.jpg";
                          }}
                        />
                      </Link>
                    ) : (
                      <Card.Img
                        variant="top"
                        src={course.image || "/images/reactjs.jpg"}
                        width="100%"
                        height={160}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/images/reactjs.jpg";
                        }}
                      />
                    )}
                    <Card.Body>
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </Card.Title>
                      <Card.Text className="text-muted small">
                        {course.number} • {course.department}
                      </Card.Text>
                      <Card.Text
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "80px" }}
                      >
                        {course.description}
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          {isEnrolled ? (
                            <>
                              <Link
                                to={`/Kambaz/Courses/${course._id}/Home`}
                                className="text-decoration-none"
                              >
                                <Button variant="primary" className="me-2">Enter Course</Button>
                              </Link>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => handleUnenroll(course._id)}
                              >
                                Unenroll
                              </Button>
                            </>
                          ) : (
                            <Button 
                              variant="success" 
                              onClick={() => handleEnroll(course._id)}
                            >
                              Enroll
                            </Button>
                          )}
                        </div>
                        {canEdit && (
                          <div>
                            <Button
                              variant="warning"
                              className="me-2"
                              size="sm"
                              id="wd-edit-course-click"
                              onClick={(e) => {
                                e.preventDefault();
                                setCourse(course);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              id="wd-delete-course-click"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDeleteCourse(course._id);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </div>
  );
}
