import axios from 'axios';

const API_URL = 'http://localhost:8081/school-system/student-fees';

export const getAllStudentFees = () => axios.get(API_URL);

export const getStudentFeeById = (id) => axios.get(`${API_URL}/${id}`);

export const getStudentFeesByStudentId = (studentId) => axios.get(`${API_URL}/students/${studentId}/fees`);

export const getPaidStudentFeesByStudentId = (studentId) => axios.get(`${API_URL}/students/${studentId}/fees/paid`);

export const getDueStudentFeesByStudentId = (studentId) => axios.get(`${API_URL}/students/${studentId}/fees/due`);

export const getStudentFeesByStatus = (status) => axios.get(`${API_URL}/status/${status}`);

export const getStudentFeesByGradeAndStatus = (grade, status) =>
  axios.get(`${API_URL}/${grade}/status/${status}`);

export const getStudentFeesByAssignedDate = (date) =>
  axios.get(`${API_URL}/assigned-dates/${date}`);

export const markStudentFeeAsPaid = (id) =>
  axios.put(`${API_URL}/${id}/status/paid`);

export const deleteStudentFee = (id) => axios.delete(`${API_URL}/${id}`);

