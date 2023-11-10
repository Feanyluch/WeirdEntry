// authService.ts
import axios from 'axios';

export const signup = async (userData: any) => {
  try {
    const response = await axios.post('/api/signup', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const login = async (credentials: any) => {
  try {
    const response = await axios.post('/api/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
}
