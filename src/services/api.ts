import axios from 'axios';

const API_URL = 'http://your-api'

export const api = {
  async login(username: string, password: string) {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async register(username: string, password: string) {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password
    });
    return response.data;
  },

  async getUserInfo() {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }
} 