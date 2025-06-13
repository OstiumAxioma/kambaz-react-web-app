import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
// Remove trailing slash to prevent double slashes in URLs
const REMOTE_SERVER = (import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000").replace(/\/$/, '');
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

export const findModulesForCourse = async (courseId: string) => {
  console.log("Fetching modules for course:", courseId);
  const response = await axiosWithCredentials.get(`${MODULES_API}/courses/${courseId}/modules`);
  console.log("Modules response:", response.data);
  return response.data;
};

export const updateModule = async (module: any) => {
  const { data } = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
  return data;
};

export const deleteModule = async (moduleId: string) => {
  console.log("Deleting module:", moduleId);
  try {
    const response = await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
    console.log("Delete response:", response);
    return response.data;
  } catch (error) {
    console.error("Error deleting module:", error);
    throw error;
  }
};

export const createModule = async (courseId: string, module: any) => {
  console.log("Creating module for course:", courseId, "with data:", module);
  try {
    const response = await axiosWithCredentials.post(`${MODULES_API}/courses/${courseId}/modules`, module);
    console.log("Create module response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating module:", error);
    throw error;
  }
}; 