import { useState, useEffect } from "react";
import { ListGroup, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "react-router-dom";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  // Check if current user has edit permissions (FACULTY or ADMIN)
  const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };

  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };

  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          {canEdit && (
            <ModulesControls
              moduleName={moduleName}
              setModuleName={setModuleName}
              addModule={() => {
                dispatch(addModule({ name: moduleName, course: cid }));
                setModuleName("");
              }}
            />
          )}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <ListGroup className="rounded-0" id="wd-modules">
            {modules.map((module: any) => (
              <ListGroup.Item key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    {!module.editing && <span>{module.name}</span>}
                    {module.editing && canEdit && (
                      <FormControl
                        className="w-50 d-inline-block"
                        value={module.name}
                        onChange={(e) =>
                          dispatch(
                            updateModule({ ...module, name: e.target.value })
                          )
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            saveModule({ ...module, editing: false });
                          }
                        }}
                      />
                    )}
                  </div>
                  {canEdit && (
                    <ModuleControlButtons 
                      moduleId={module._id} 
                      deleteModule={(moduleId) => removeModule(moduleId)}
                      editModule={(moduleId) => dispatch(editModule(moduleId))}
                    />
                  )}
                </div>
                {module.lessons && (
                  <ListGroup className="wd-lessons rounded-0">
                    {module.lessons.map((lesson: any) => (
                      <ListGroup.Item key={lesson._id} className="wd-lesson p-3 ps-1 d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3" /> 
                        <span>{lesson.name}</span>
                        {canEdit && <LessonControlButtons />}
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
  