import axios from "axios";

const axiosWithCredentials = axios.create({ 
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

// Remove trailing slash to prevent double slashes in URLs
const REMOTE_SERVER = (import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000").replace(/\/$/, '');
console.log("Using remote server:", REMOTE_SERVER);

const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

// Add response interceptor for better error handling
axiosWithCredentials.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

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
  try {
    console.log("Fetching modules for course:", courseId);
    console.log("API URL:", `${MODULES_API}/courses/${courseId}/modules`);
    const response = await axiosWithCredentials.get(`${MODULES_API}/courses/${courseId}/modules`);
    console.log("Modules response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error in findModulesForCourse:", {
      courseId,
      error: error.response?.data || error.message
    });
    throw error;
  }
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axiosWithCredentials.post(
    `${MODULES_API}/courses/${courseId}/modules`,
    module
  );
  return response.data;
}; 

export const findUsersForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/users`);
  return data;
}; 
 