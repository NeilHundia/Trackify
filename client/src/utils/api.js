import axios from 'axios';

// Determine the base URL based on environment
const API_URL = import.meta.env.DEV 
  ? 'http://localhost:5001' 
  : '';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false // Important for CORS requests
});

// Add request interceptor to attach authentication token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response || error);
    
    // Handle 401 Unauthorized errors by redirecting to login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication endpoints
export const authAPI = {
  register: (userData) => api.post('/api/register', userData),
  login: (credentials) => api.post('/api/login', credentials)
};

// Expense endpoints
export const expenseAPI = {
  getAllExpenses: (userId) => api.get(`/api/expenses/${userId}`),
  getExpenseById: (userId, expenseId) => api.get(`/api/expenses/${userId}/${expenseId}`),
  createExpense: (userId, expenseData) => api.post(`/api/expense/${userId}`, expenseData),
  updateExpense: (userId, expenseId, expenseData) => api.put(`/api/expenses/${userId}/${expenseId}`, expenseData),
  deleteExpense: (userId, expenseId) => api.delete(`/api/expenses/${userId}/${expenseId}`)
};

export default api; 