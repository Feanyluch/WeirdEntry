// authService.ts
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export const signup = async (userData: {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  password: string;
  password_confirmation: string;
}) => {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const productEndpoint = "register";

    const apiUrl = `${apiBaseUrl}${productEndpoint}`;
    const response = await axios.post(apiUrl, userData);
    // Check if the message is present in the response
    if (response.data.message) {
      // Use react-toastify to show a notification
      toast.info(response.data.info, { autoClose: 3000 }); // Auto-close after 5 seconds
    }
    return response.data;
  } catch (error: any) {
    // Check if the error messages are present in the response
    if (error.response && error.response.data && error.response.data.errors) {
      // Iterate through all error messages and display them
      const errorMessages = Object.values(error.response.data.errors)
        .flat()
        .join("\n");

      toast.error(errorMessages, { autoClose: 3000 }); // Auto-close after 5 seconds
    } else {
      // If there is no specific error message, show a generic one
      toast.error("An error occurred", { autoClose: 3000 }); // Auto-close after 5 seconds
    }
    throw error;
  }
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const productEndpoint = "login";

    const apiUrl = `${apiBaseUrl}${productEndpoint}`;
    const response = await axios.post(apiUrl, credentials);
    // Check if the message is present in the response
    if (response.data.message) {
      // Use react-toastify to show a notification
      toast.info(response.data.message, { autoClose: 3000 }); // Auto-close after 5 seconds
    }

    return response.data;
  } catch (error: any) {
    // Check if the error messages are present in the response
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message, { autoClose: 3000 }); // Auto-close after 5 seconds
    } else {
      // If there is no specific error message, show a generic one
      toast.error("An error occurred", { autoClose: 3000 }); // Auto-close after 5 seconds
    }
    throw error;
  }
};
