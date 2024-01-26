// authService.ts
import { setUser } from "@/redux/slices/authSlice";
import store, { RootState } from "@/redux/store";
import { clearCartLocalStorage, sendItemsToEndpoint } from "@/utils/localStorageHelper";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export const signup = async (router: any, userData: {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  city: string;
  state: string;
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
      router.push("/email-verification")
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

import { Dispatch } from "redux";

export const login = async (
  cartItems: any,
  router: any,
  dispatch: Dispatch,
  credentials: {
    email: string;
    password: string;
  }
) => {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const productEndpoint = "login";

    const apiUrl = `${apiBaseUrl}${productEndpoint}`;
    const response = await axios.post(apiUrl, credentials);

    console.log({ response });

    // Check if the user and token are present in the response data
    if (response.data && response.data.user && response.data.token) {
      // Check if the email is verified
      if (response.data.user.email_verified_at) {
        // Handle other successful login cases
        // Set the user in the Redux store for other successful login scenarios
        dispatch(setUser(response.data));
        toast.info("Login successful", { autoClose: 3000 }); // Auto-close after 3 seconds
        if (store.getState().auth.user) {
          sendItemsToEndpoint(cartItems);

          // // Clear local storage after sending items
          clearCartLocalStorage();
        }
        router.back();
      } else {
        // Handle email verification case
        // You might want to navigate the user to a different page or show a specific message
        toast.info(
          "Please verify your email, a new one has been sent to your email",
          { autoClose: 5000 }
        ); // Auto-close after 5 seconds
      }
    } else if (
      response.data.original &&
      response.data.original.message.includes("Please verify your email")
    ) {
      // Check if the message indicates email verification is required
      // Handle email verification case
      toast.info(response.data.original.message, { autoClose: 5000 }); // Auto-close after 5 seconds
    } else {
      // Handle other login errors
      toast.error("An error occurred", { autoClose: 3000 }); // Auto-close after 3 seconds
    }

    return response.data;
  } catch (error: any) {
    console.log({ error });

    // Check if the error messages are present in the response
    if (error.response && error.response.data && error.response.data.message) {
      // Handle other login errors
      toast.error(error.response.data.message, { autoClose: 3000 }); // Auto-close after 3 seconds
    } else {
      // If there is no specific error message, show a generic one only for error responses
      if (error.response && error.response.status !== 200) {
        toast.error("An error occurred", { autoClose: 3000 }); // Auto-close after 3 seconds
      }
    }

    throw error;
  }
};
