import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";

export interface Assignment {
  _id: string;
  title: string;
  course: string;
  description: string;
  points: number;
  dueDate: Date;
  availableFrom: Date;
  availableUntil: Date;
  submissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const findAssignmentsForCourse = async (courseId: string): Promise<Assignment[]> => {
  const response = await axios.get(`${API_BASE}/courses/${courseId}/assignments`);
  return response.data;
};

export const findAssignmentById = async (assignmentId: string): Promise<Assignment> => {
  const response = await axios.get(`${API_BASE}/assignments/${assignmentId}`);
  return response.data;
};

export const createAssignment = async (courseId: string, assignment: Omit<Assignment, "_id" | "createdAt" | "updatedAt">): Promise<Assignment> => {
  const response = await axios.post(`${API_BASE}/courses/${courseId}/assignments`, assignment);
  return response.data;
};

export const updateAssignment = async (assignmentId: string, assignment: Partial<Assignment>): Promise<Assignment> => {
  const response = await axios.put(`${API_BASE}/assignments/${assignmentId}`, assignment);
  return response.data;
};

export const deleteAssignment = async (assignmentId: string): Promise<void> => {
  await axios.delete(`${API_BASE}/assignments/${assignmentId}`);
}; 