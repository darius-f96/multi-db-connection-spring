import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/tpjad2-0.0.1-SNAPSHOT";

export const getOrders = () => axios.get(`${API_BASE_URL}/orders`);
export const createOrder = (data) => axios.post(`${API_BASE_URL}/orders`, data);
export const deleteOrder = (id) => axios.delete(`${API_BASE_URL}/orders/${id}`);

export const getUsers = () => axios.get(`${API_BASE_URL}/users`);
export const createUser = (data) => axios.post(`${API_BASE_URL}/users`, data);
export const deleteUser = (id) => axios.delete(`${API_BASE_URL}/users/${id}`);

export const getProducts = () => axios.get(`${API_BASE_URL}/products`);
export const createProduct = (data) => axios.post(`${API_BASE_URL}/products`, data);
export const deleteProduct = (id) => axios.delete(`${API_BASE_URL}/products/${id}`);

export const updateOrderQuantity = (id, quantity) =>
    axios.put(`${API_BASE_URL}/orders/${id}`, { quantity });
export const updateProduct = (id, data) =>
    axios.put(`${API_BASE_URL}/products/${id}`, data);
export const updateUser = (id, data) =>
    axios.put(`${API_BASE_URL}/users/${id}`, data);
  
