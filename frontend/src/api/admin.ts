// src/api/admin.ts
import axios from 'axios';

const adminApi = axios.create({
  baseURL: 'http://localhost:8000/',
});

// Add JWT token to requests
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminService = {
  getDashboardStats: () => adminApi.get('users/admin-stats/'),
  getUsers: () => adminApi.get('users/members/'),
  // Add more admin endpoints as needed
};