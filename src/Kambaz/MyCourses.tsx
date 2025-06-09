import { useState, useEffect } from "react";
import { Row, Col, Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./Account/reducer";
import { unenrollUserFromCourse } from "./Account/enrollmentsReducer";
import { setCourses } from "./Courses/reducer";
import { findMyCourses } from "./Account/client";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MyCourses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's enrolled courses from server
  useEffect(() => {
    const loadMyCourses = async () => {
      try {
        setLoading(true);
        const enrolledCourses = await findMyCourses();
        setMyCourses(enrolledCourses);
      } catch (error) {
        console.error("Failed to fetch my courses:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      loadMyCourses();
    }
  }, [currentUser, enrollments]); // Re-fetch when enrollments change

  const signout = () => {
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };

  const handleUnenroll = (courseId: string) => {
    dispatch(unenrollUserFromCourse({ userId: currentUser._id, courseId }));
  };

  const isUserEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id &&
        enrollment.course === courseId
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div id="wd-my-courses" className="p-4">
      {/* User info bar */}
      <div className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded">
        <div>
          <h5 className="mb-1">Welcome, {currentUser.firstName} {currentUser.lastName}!</h5>
          <small className="text-muted">
            Role: {currentUser.role} | Username: {currentUser.username}
          </small>
        </div>
        <div className="d-flex gap-2">
          <Link to="/Kambaz/Dashboard">
            <Button variant="outline-primary">Browse Courses</Button>
          </Link>
          <Button variant="outline-danger" onClick={signout}>
            Sign out
          </Button>
        </div>
      </div>

      <h1 id="wd-my-courses-title">My Courses</h1>
      <hr />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 id="wd-enrolled-courses">
          Enrolled Courses ({myCourses.length})
        </h2>
      </div>

      <div id="wd-enrolled-courses-list">
        {myCourses.length === 0 ? (
          <Alert variant="info">
            <Alert.Heading>No Courses Enrolled</Alert.Heading>
            <p>You are not currently enrolled in any courses.</p>
            <Link to="/Kambaz/Dashboard">
              <Button variant="primary">Browse Available Courses</Button>
            </Link>
          </Alert>
        ) : (
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {myCourses.map((course: any) => {
              const isEnrolled = isUserEnrolled(course._id);
              return (
                <Col key={course._id} className="wd-enrolled-course">
                  <Card style={{ width: "300px" }}>
                    <Link
                      to={`/Kambaz/Courses/${course._id}/Home`}
                      className="wd-course-link text-decoration-none text-dark"
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
                    <Card.Body>
                      <Card.Title className="wd-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </Card.Title>
                      <Card.Text className="text-muted small">
                        {course.number} • {course.department}
                      </Card.Text>
                      <Card.Text
                        className="wd-course-description overflow-hidden"
                        style={{ height: "60px" }}
                      >
                        {course.description}
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <Link
                          to={`/Kambaz/Courses/${course._id}/Home`}
                          className="text-decoration-none"
                        >
                          <Button variant="primary">Enter Course</Button>
                        </Link>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleUnenroll(course._id)}
                        >
                          Unenroll
                        </Button>
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