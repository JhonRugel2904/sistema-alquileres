// En tu archivo api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Ajusta a tu puerto
});

// Este interceptor añade el token automáticamente a cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;