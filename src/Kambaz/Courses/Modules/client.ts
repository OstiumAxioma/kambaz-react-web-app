import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
// Remove trailing slash to prevent double slashes in URLs
const REMOTE_SERVER = (import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000").replace(/\/$/, '');
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const updateModule = async (module: any) => {
  const { data } = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
  return data;
};

export const deleteModule = async (moduleId: string) => {
  const response = await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
}; 