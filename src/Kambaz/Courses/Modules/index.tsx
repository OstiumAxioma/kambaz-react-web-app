import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";

export default function Modules() {
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
              <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" /> 
                  <span>Week 1</span>
                </div>
                <ListGroup className="wd-lessons rounded-0">
                  <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" /> 
                    <span>LEARNING OBJECTIVES</span>
                    <LessonControlButtons />
                  </ListGroup.Item>
                  <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" /> 
                    <span>Introduction to the course</span>
                    <LessonControlButtons />
                  </ListGroup.Item>
                </ListGroup>
              </ListGroup.Item>
              <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" /> 
                  <span>Week 2</span>
                </div>
                <ListGroup className="wd-lessons rounded-0">
                  <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" /> 
                    <span>LESSON 1</span>
                    <LessonControlButtons />
                  </ListGroup.Item>
                  <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" /> 
                    <span>LESSON 2</span>
                    <LessonControlButtons />
                  </ListGroup.Item>
                </ListGroup>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </div>
    );
}
  