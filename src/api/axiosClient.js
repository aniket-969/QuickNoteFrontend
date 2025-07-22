import axios from 'axios';
import { toast } from 'react-toastify';

// Basic API client
console.log(import.meta.env.VITE_API_BASE_URL)
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    
    const message = error.response?.data?.message || error.message;
    console.log(message)
    return Promise.reject(error);
  }
);

export default api;
