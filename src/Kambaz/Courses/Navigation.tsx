import { Link, useLocation, useParams } from "react-router-dom";

export default function CourseNavigation() {
  const location = useLocation();
  const { cid } = useParams();
  
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link}
          to={`/Kambaz/Courses/${cid}/${link}`}
          id={`wd-course-${link.toLowerCase()}-link`}
          className={`list-group-item border border-0 d-flex align-items-center ${
            isActive(link) ? "active" : "text-danger"
          }`}
        >
          <span className="flex-grow-1">{link}</span>
        </Link>
      ))}
    </div>
  );
}
