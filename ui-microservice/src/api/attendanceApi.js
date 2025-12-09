import axios from 'axios';

const BASE_URL = 'http://localhost:8082/school-system/attendance';

export const getAllAttendance = () =>
  axios.get(BASE_URL);

export const getAttendanceById = (id) =>
  axios.get(`${BASE_URL}/${id}`);

export const addAttendance = (attendance) =>
  axios.post(BASE_URL, attendance);

export const updateAttendance = (id, attendance) =>
  axios.put(`${BASE_URL}/${id}`, attendance);

export const deleteAttendance = (id) =>
  axios.delete(`${BASE_URL}/${id}`);

export const getAttendanceByDate = (date) =>
  axios.get(`${BASE_URL}/date/${date}`);

export const getAttendanceByGrade = (grade) =>
  axios.get(`${BASE_URL}/grade/${grade}`);

export const getAttendanceByGradeAndDate = (grade, date) =>
  axios.get(`${BASE_URL}/grade/${grade}/date/${date}`);

export const checkAttendanceExists = (grade, date) =>
  axios.get(`${BASE_URL}/check`, {
    params: { grade, date }
  });

