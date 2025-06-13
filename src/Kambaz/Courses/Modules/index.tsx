import { useState, useEffect } from "react";
import { ListGroup, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonEditor from "./LessonEditor";
import { useParams } from "react-router-dom";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as modulesClient from "./client";
import * as courseClient from "../client";

interface Module {
  _id: string;
  name: string;
  course: string;
  description?: string;
  lessons?: Array<{
    _id: string;
    name: string;
    description?: string;
    module: string;
  }>;
  editing?: boolean;
}

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [showLessonEditor, setShowLessonEditor] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  // Check if current user has edit permissions (FACULTY or ADMIN)
  const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const addModuleHandler = async () => {
    if (!canEdit) {
      alert("You don't have permission to create modules");
      return;
    }
    if (!currentUser) {
      alert("Please log in to create modules");
      return;
    }
    try {
      console.log("Creating module with data:", {
        name: moduleName,
        course: cid,
        description: "",
        lessons: []
      });
      const newModule = await courseClient.createModuleForCourse(cid!, {
        name: moduleName,
        course: cid,
        description: "",
        lessons: []
      });
      console.log("Module created successfully:", newModule);
      dispatch(addModule(newModule));
      setModuleName("");
    } catch (error: any) {
      console.error("Error creating module:", error);
      console.error("Error details:", error.response?.data || error.message);
      if (error.response?.status === 403) {
        alert("You don't have permission to create modules");
      } else {
        alert(`Failed to create module: ${error.response?.data?.message || error.message}`);
      }
    }
  }; 

  const deleteModuleHandler = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  }; 

  const fetchModulesForCourse = async () => {
    try {
      console.log("Fetching modules for course:", cid);
      const modules = await courseClient.findModulesForCourse(cid!);
      console.log("Fetched modules:", modules);
      dispatch(setModules(modules));
      setError(null);
    } catch (error: any) {
      console.error("Error fetching modules:", error);
      setError(error.response?.data?.message || "Failed to fetch modules");
      // 如果是认证错误，可能需要重定向到登录页面
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    if (cid) {
      fetchModulesForCourse();
    }
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

  const addLessonHandler = async (moduleId: string) => {
    if (!canEdit) {
      alert("You don't have permission to add lessons");
      return;
    }
    setSelectedModuleId(moduleId);
    setShowLessonEditor(true);
  };

  const handleAddLesson = async () => {
    if (!lessonName.trim()) {
      alert("Lesson name cannot be empty");
      return;
    }

    try {
      const module = modules.find((m: Module) => m._id === selectedModuleId);
      if (!module) {
        throw new Error("Module not found");
      }

      const newLesson = {
        _id: `L${Date.now()}`,
        name: lessonName,
        description: "",
        module: selectedModuleId
      };

      const updatedModule = {
        ...module,
        lessons: [...(module.lessons || []), newLesson]
      };

      // Only send the lessons array for update
      await modulesClient.updateModule({
        _id: selectedModuleId,
        lessons: updatedModule.lessons
      });

      // Update the local state with the full module data
      dispatch(updateModule(updatedModule));
      setLessonName("");
      setShowLessonEditor(false);
    } catch (error: any) {
      console.error("Error adding lesson:", error);
      if (error.response?.data?.message) {
        alert(`Failed to add lesson: ${error.response.data.message}`);
      } else {
        alert(`Failed to add lesson: ${error.message}`);
      }
    }
  };

  return (
    <div className="container-fluid">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
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
            {modules.map((module: any, index: number) => (
              <ListGroup.Item 
                key={`${module._id}-${index}`} 
                className="wd-module p-0 mb-5 fs-5 border-gray"
              >
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
                      addLesson={addLessonHandler}
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

      <LessonEditor
        show={showLessonEditor}
        handleClose={() => setShowLessonEditor(false)}
        dialogTitle="Add Lesson"
        lessonName={lessonName}
        setLessonName={setLessonName}
        addLesson={handleAddLesson}
      />
    </div>
  );
}
  