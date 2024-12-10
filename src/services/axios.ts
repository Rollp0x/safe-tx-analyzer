import axios from 'axios';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  response => response.data,
  error => {
    throw new Error(error.response?.data?.message || error.message || 'Request failed');
  }
);

export default instance; 