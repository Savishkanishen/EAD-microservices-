import axios from 'axios';

// Base URL of your Spring Boot Fee Service
const BASE_URL = 'http://localhost:8081/school-system';

// Get all fees
export const getAllFees = () => axios.get(`${BASE_URL}/fees`);

// Add a new fee
export const addFee = (fee) => axios.post(`${BASE_URL}/fees`, fee);

// Update an existing fee
export const updateFee = (fee) => axios.put(`${BASE_URL}/fees`, fee);

// Delete a fee by ID
export const deleteFee = (id) => axios.delete(`${BASE_URL}/fees/${id}`);

export const getFeeByName = (name) => axios.get(`${BASE_URL}/fees/names`, { params: { name } });

export const getFeeByGrade = (grade) => axios.get(`${BASE_URL}/fees/grades`, { params: { grade } });

export const getFeeById = (id) => axios.get(`${BASE_URL}/fees/${id}`);
