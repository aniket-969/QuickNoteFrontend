import axios from 'axios';
import { toast } from 'react-toastify';

// Basic API client
export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL || "http://localhost:3000/api/v1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// api.interceptors.request.use(
//   (config) => {
    
//     const token = localStorage.getItem('eduToken');
    
//     if (token) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    
    const message = error.response?.data?.message || error.message;
    console.log(message)
    return Promise.reject(error);
  }
);

export default api;
