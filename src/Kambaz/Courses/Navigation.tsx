import { Link, useLocation } from "react-router-dom";

export default function CourseNavigation() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  const navItems = [
    { path: "Home", label: "Home" },
    { path: "Modules", label: "Modules" },
    { path: "Piazza", label: "Piazza" },
    { path: "Zoom", label: "Zoom" },
    { path: "Assignments", label: "Assignments" },
    { path: "Quizzes", label: "Quizzes" },
    { path: "People", label: "People" }
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={`/Kambaz/Courses/1234/${item.path}`}
          id={`wd-course-${item.path.toLowerCase()}-link`}
          className={`list-group-item border border-0 d-flex align-items-center ${
            isActive(item.path) ? "active" : "text-danger"
          }`}
        >
          <span className="flex-grow-1">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
