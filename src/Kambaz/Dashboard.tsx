import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  const courses = [
    {
      id: "1234",
      title: "CS1234 React JS",
      description: "Full Stack software developer",
      image: "/images/reactjs.jpg"
    },
    {
      id: "1235",
      title: "CS1235 Node.js",
      description: "Backend Development",
      image: "/images/nodejs.png"
    },
    {
      id: "1236",
      title: "CS1236 MongoDB",
      description: "Database Management",
      image: "/images/mongodb.jpg"
    },
    {
      id: "1237",
      title: "CS1237 Express.js",
      description: "Web Application Framework",
      image: "/images/express.png"
    },
    {
      id: "1238",
      title: "CS1238 TypeScript",
      description: "Type-safe JavaScript",
      image: "/images/typescript.jpg"
    },
    {
      id: "1239",
      title: "CS1239 AWS",
      description: "Cloud Computing",
      image: "/images/aws.jpg"
    },
    {
      id: "1240",
      title: "CS1240 Docker",
      description: "Containerization and DevOps",
      image: "/images/docker.jpg"
    }
  ];

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {courses.map((course) => (
            <Col key={course.id} className="wd-dashboard-course">
              <Card style={{ width: "300px" }}>
                <Link
                  to={`/Kambaz/Courses/${course.id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    variant="top"
                    src={course.image}
                    width="100%"
                    height={160}
                  />
                  <Card.Body>
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.title}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
