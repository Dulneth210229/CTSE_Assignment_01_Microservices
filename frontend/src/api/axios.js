import axios from 'axios';

// Get base URLs from Vite ENVs or fallback to localhost
const USER_API = import.meta.env.VITE_USER_SERVICE_URL || 'http://localhost:5001/api/users';
const CATALOG_API = import.meta.env.VITE_CATALOG_SERVICE_URL || 'http://localhost:5002/api/catalog';
const WATCHLIST_API = import.meta.env.VITE_WATCHLIST_SERVICE_URL || 'http://localhost:5003/api/watchlist';
const PLAYBACK_API = import.meta.env.VITE_PLAYBACK_SERVICE_URL || 'http://localhost:5004/api/playback';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const api = {
  // User endpoints
  login: (data) => axios.post(`${USER_API}/login`, data),
  register: (data) => axios.post(`${USER_API}/register`, data),
  getProfile: () => axios.get(`${USER_API}/profile`, getAuthHeaders()),

  // Catalog endpoints
  getMovies: () => axios.get(`${CATALOG_API}`),
  searchMovies: (query) => axios.get(`${CATALOG_API}/search?q=${query}`),
  getMovieById: (id) => axios.get(`${CATALOG_API}/${id}`),

  // Watchlist endpoints
  getWatchlist: (userId) => axios.get(`${WATCHLIST_API}/${userId}`, getAuthHeaders()),
  addToWatchlist: (data) => axios.post(`${WATCHLIST_API}`, data, getAuthHeaders()),
  removeFromWatchlist: (userId, movieId) => axios.delete(`${WATCHLIST_API}/${userId}/${movieId}`, getAuthHeaders()),
  checkWatchlist: (userId, movieId) => axios.get(`${WATCHLIST_API}/${userId}/check/${movieId}`, getAuthHeaders()),

  // Playback endpoints
  startPlayback: (data) => axios.post(`${PLAYBACK_API}/start`, data, getAuthHeaders()),
  saveHistory: (data) => axios.post(`${PLAYBACK_API}/history`, data, getAuthHeaders()),
  getHistory: (userId) => axios.get(`${PLAYBACK_API}/history/${userId}`, getAuthHeaders()),
  getContinueWatching: (userId) => axios.get(`${PLAYBACK_API}/continue/${userId}`, getAuthHeaders()),
  completeMovie: (data) => axios.post(`${PLAYBACK_API}/complete`, data, getAuthHeaders()),
};
