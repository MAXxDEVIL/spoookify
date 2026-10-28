import axios from 'axios';
import { API_URL } from './config';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 10000,
});

export const authAPI = {
  signup: (email: string, password: string) => api.post('/auth/signup', { email, password }),
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
};

export const homeAPI = {
  getHome: () => api.get('/home'),
};

export const searchAPI = {
  search: (q: string) => api.get(`/search?q=${encodeURIComponent(q)}`),
};

export const libraryAPI = {
  getLiked: () => api.get('/library/liked'),
};

export const playlistsAPI = {
  getAll: () => api.get('/playlists'),
  create: (name: string) => api.post('/playlists', { name }),
};

export default api;
