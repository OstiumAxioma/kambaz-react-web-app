import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
// Remove trailing slash to prevent double slashes in URLs
const REMOTE_SERVER = (import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000").replace(/\/$/, '');
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

export const fetchAllCourses = async () => {
    const { data } = await axiosWithCredentials.get(COURSES_API);
    return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(COURSES_API, course);
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${MODULES_API}/${courseId}/modules`);
  return response.data;
}; 

export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axiosWithCredentials.post(
    `${MODULES_API}/${courseId}/modules`,
    module
  );
  return response.data;
}; 

export const findUsersForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/users`);
  return data;
}; 
 