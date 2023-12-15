// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartState, initialState } from './slices/cartSlice';
import authReducer from './slices/authSlice';
import { saveCartToLocalStorage } from '@/utils/localStorageHelper';

const loadInitialState = () => {
  console.log('Loading Initial State...');
  if (typeof window !== 'undefined') {
    const storedState = localStorage.getItem('cartState');
    console.log('Stored State:', storedState);
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      console.log('Parsed State:', parsedState);
      return { cart: { ...initialState, ...parsedState } };
    }
  }
  console.log('Default State:', initialState);
  return { cart: initialState }; // Make sure it follows the same structure as the reducer
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
