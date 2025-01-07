import axios from 'axios';

const API_BASE_URL = "http://localhost:8080"; // Update with your backend URL

export const getOrders = () => axios.get(`${API_BASE_URL}/orders`);
export const createOrder = (data) => axios.post(`${API_BASE_URL}/orders`, data);

export const getUsers = () => axios.get(`${API_BASE_URL}/users`);
export const createUser = (data) => axios.post(`${API_BASE_URL}/users`, data);

export const getProducts = () => axios.get(`${API_BASE_URL}/products`);
export const createProduct = (data) => axios.post(`${API_BASE_URL}/products`, data);
