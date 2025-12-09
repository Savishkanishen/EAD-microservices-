import axios from 'axios';

const BASE_URL = 'http://localhost:8081/school-system';

export const getAllPayments = () =>
  axios.get(`${BASE_URL}/payments`);

export const getPaymentById = (id) =>
  axios.get(`${BASE_URL}/payments/${id}`);

export const getPaymentByStudentId = (studentId) =>
  axios.get(`${BASE_URL}/payments/students/${studentId}`);

export const getPaymentByDate = (date) =>
  axios.get(`${BASE_URL}/payments/dates/${date}`);

export const addPayment = (paymentData) =>
  axios.post(`${BASE_URL}/payments`, paymentData);

export const updatePayment = (paymentData) =>
  axios.put(`${BASE_URL}/payments`, paymentData);

export const deletePayment = (id) =>
  axios.delete(`${BASE_URL}/payments/${id}`);
