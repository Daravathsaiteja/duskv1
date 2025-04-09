import axios from 'axios';
import { ApiResponse } from '@/types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const get = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await api.get<T>(url);
    return {
      data: response.data as T,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null as T,
      error: error?.response?.data?.message || 'An error occurred',
    };
  }
};

export const post = async <T>(
  url: string,
  data: unknown
): Promise<ApiResponse<T>> => {
  try {
    const response = await api.post<T>(url, data);
    return {
      data: response.data as T,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null as T,
      error: error?.response?.data?.message || 'An error occurred',
    };
  }
};

export default api;