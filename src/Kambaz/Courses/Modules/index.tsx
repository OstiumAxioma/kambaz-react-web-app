import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "react-router-dom";
import { modules } from "../../Database";

export default function Modules() {
  const { cid } = useParams();
  const courseModules = modules.filter((module) => module.course === cid);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <ModulesControls />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <ListGroup className="rounded-0" id="wd-modules">
            {courseModules.map((module) => (
              <ListGroup.Item key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" /> 
                  <span>{module.name}</span>
                </div>
                {module.lessons && (
                  <ListGroup className="wd-lessons rounded-0">
                    {module.lessons.map((lesson) => (
                      <ListGroup.Item key={lesson._id} className="wd-lesson p-3 ps-1 d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3" /> 
                        <span>{lesson.name}</span>
                        <LessonControlButtons />
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  );
}
  