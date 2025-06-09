import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
// Set up axios defaults to include credentials
axios.defaults.withCredentials = true;

// Remove trailing slash to prevent double slashes in URLs
export const REMOTE_SERVER = (import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000").replace(/\/$/, '');
export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// Debug logging
console.log('Environment VITE_REMOTE_SERVER:', import.meta.env.VITE_REMOTE_SERVER);
console.log('Resolved REMOTE_SERVER:', REMOTE_SERVER);
console.log('USERS_API:', USERS_API);

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(COURSES_API, course);
  return data;
};

export const findAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
    return data;
};  

export const enrollInCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/${userId}/enrollments/${courseId}`);
  return data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.delete(`${USERS_API}/${userId}/enrollments/${courseId}`);
  return data;
};

export const signin = async (credentials: any) => {
  console.log('Attempting signin to:', `${USERS_API}/signin`);
  const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};
  