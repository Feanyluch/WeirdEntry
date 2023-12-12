// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartState } from './slices/cartSlice';
import authReducer from './slices/authSlice';
import { saveCartToLocalStorage } from '@/utils/localStorageHelper';

// Load the initial state from localStorage
const loadInitialState = () => {
  if (typeof window !== 'undefined') {
    // Check if window is defined (client-side)
    const storedState = localStorage.getItem('cartState');
    console.log({storedState})
    if (storedState) {
      return JSON.parse(storedState);
    }
  }

  // Return default state if localStorage is not available
  return {
    cart: {
      items: [],
      cartCount: 0,
      itemQuantity: 0,
      selectedProduct: [],
    },
    auth: {
      user: null,
    },
  };
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    // Add more reducers as needed
  },
  preloadedState: loadInitialState(),
});

// Save the state to localStorage whenever the state changes
store.subscribe(() => {
  const state = store.getState().cart;
  saveCartToLocalStorage(state);
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
