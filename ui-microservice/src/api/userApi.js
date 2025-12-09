// src/api/userApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/school-system/users'; // Adjust port/path if needed

export const getAllUsers = () => axios.get(BASE_URL);

export const getUserByName = (name) => axios.get(`${BASE_URL}/names`, { params: { name } });

export const addUser = (user) => axios.post(BASE_URL, user);

export const updateUser = (user) => axios.post(BASE_URL, user);

export const deleteUser = (id) => axios.delete(`${BASE_URL}/delete/${id}`);

export const getStudentsByGrade = (grade) =>
  axios.get(`${BASE_URL}/students/grades`, { params: { grade } });

export const validateLogin = (name, password) =>
  axios.post(`${BASE_URL}/login`, { name, password });

export const getAllGrades = () => axios.get(`${BASE_URL}/grades`); // or /users/grades/all

