import { useLocation, useParams } from "react-router-dom";
import { courses } from "../Database";

export default function Breadcrumb() {
  const { cid } = useParams();
  const location = useLocation();
  const course = courses.find((c) => c._id === cid);
  
  // Get the current section from the pathname
  const pathParts = location.pathname.split("/");
  const currentSection = pathParts[pathParts.length - 1];

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <span className="text-danger">{course?.name || "Course Not Found"}</span>
        </li>
        {currentSection !== "Home" && (
          <li className="breadcrumb-item active" aria-current="page">
            {currentSection}
          </li>
        )}
      </ol>
    </nav>
  );
} 