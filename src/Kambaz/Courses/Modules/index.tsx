import { useState, useEffect } from "react";
import { ListGroup, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "react-router-dom";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as modulesClient from "./client";
import * as courseClient from "../client";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const addModuleHandler = async () => {
    const newModule = await courseClient.createModuleForCourse(cid!, {
      name: moduleName,
      course: cid,
    });
    dispatch(addModule(newModule));
    setModuleName("");
  }; 

  const deleteModuleHandler = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  }; 

  // Check if current user has edit permissions (FACULTY or ADMIN)
  const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const fetchModulesForCourse = async () => {
    const modules = await courseClient.findModulesForCourse(cid!);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModulesForCourse();
  }, [cid]);

  const fetchModules = async () => {
    const modules = await modulesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };

  const updateModuleHandler = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
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
              addModule={addModuleHandler}
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
                          updateModuleHandler({ ...module, name: e.target.value })
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            updateModuleHandler({ ...module, editing: false });
                          }
                        }}
                      />
                    )}
                  </div>
                  {canEdit && (
                    <ModuleControlButtons 
                      moduleId={module._id} 
                      deleteModule={deleteModuleHandler}
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
  