import CourseNavigation from "./Navigation";
import { Navigate, Route, Routes, useParams } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/editor";
import EditAssignment from "./Assignments/EditAssignment";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { courses } from "../Database";
import Breadcrumb from "./Breadcrumb";

export default function Courses() {
  const { cid } = useParams();
  const course = courses.find((c) => c._id === cid);

  return (
    <div id="wd-courses">
      <div className="d-flex align-items-center mb-3">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        <Breadcrumb />
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
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
//Test git change
