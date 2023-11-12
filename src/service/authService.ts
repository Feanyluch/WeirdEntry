// authService.ts
import axios from "axios";

export const signup = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  try {
    const response = await axios.post(
      "https://d8e8-154-118-74-220.ngrok-free.app/api/register",
      userData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      "https://d8e8-154-118-74-220.ngrok-free.app/api/login",
      credentials
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
