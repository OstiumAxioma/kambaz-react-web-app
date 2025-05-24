import { FaSearch, FaPlus, FaCheckCircle } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";

interface Assignment {
  _id: string;
  title: string;
  course: string;
}

export default function Assignments() {
  const { cid } = useParams();
  const courseAssignments = assignments.filter((assignment: Assignment) => assignment.course === cid);

  return (
    <div className="container-fluid">
      <div className="row align-items-center mb-3">
        <div className="col-6">
          <div className="input-group w-100">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch />
            </span>
            <input
              className="form-control border-start-0"
              placeholder="Search for Assignments"
              id="wd-search-assignment"
            />
          </div>
        </div>
        <div className="col d-flex justify-content-end">
          <button className="btn btn-secondary me-2" id="wd-add-assignment-group">
            <FaPlus className="me-1" /> Group
          </button>
          <button className="btn btn-danger" id="wd-add-assignment">
            <FaPlus className="me-1" /> Assignment
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="d-flex align-items-center mb-3">
            <h3 className="mb-0 me-3" id="wd-assignments-title">
              ASSIGNMENTS <span className="fw-normal ms-2">40% of Total</span>
            </h3>
            <button className="btn btn-light ms-auto p-2"><FaPlus /></button>
          </div>
          <ListGroup id="wd-assignment-list">
            {courseAssignments.map((assignment: Assignment) => (
              <ListGroup.Item key={assignment._id} className="d-flex align-items-start border-start border-4 border-success mb-3 p-3 wd-assignment-list-item">
                <MdMenuBook className="text-success fs-4 me-3 mt-1" />
                <div className="flex-grow-1">
                  <div className="fw-bold fs-5">
                    <Link to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}/edit`} className="text-decoration-none text-dark">
                      {assignment.title}
                    </Link>
                  </div>
                  <div className="small">
                    <span className="text-danger">Multiple Modules</span>
                    <span className="text-muted"> | Not available until May 6 at 12:00am</span>
                  </div>
                  <div className="text-muted small">
                    Due May 13 at 11:59pm | 100 pts
                  </div>
                </div>
                <FaCheckCircle className="text-success fs-4 ms-3 mt-1" />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  );
}
  