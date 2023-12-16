// authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface User {
  email: string;
  password: string;
}

// Declare functions at the top
const loadUserFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

const saveUserToLocalStorage = (user: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

const clearUserFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: loadUserFromLocalStorage(), // Load user from local storage on app startup
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      saveUserToLocalStorage(action.payload); // Save user to local storage
    },
    clearUser: (state) => {
      state.user = null;
      clearUserFromLocalStorage(); // Clear user from local storage
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
