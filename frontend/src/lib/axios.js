import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL|| 'https://capstoneproject-b0mm.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log("Using endpoint =>",import.meta.env.VITE_API_URL|| 'https://capstoneproject-b0mm.onrender.com/api'+"||NoENV")
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});