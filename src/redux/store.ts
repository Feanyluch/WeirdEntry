// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartState, initialState } from './slices/cartSlice';
import authReducer from './slices/authSlice';
import { saveCartToLocalStorage } from '@/utils/localStorageHelper';;

const loadInitialState = () => {
  // console.log('Loading Initial State...');
  if (typeof window !== 'undefined') {
    const storedState = localStorage.getItem('cartState');
    const storedUser = localStorage.getItem('user');
    // console.log('Stored State:', storedState);
    // console.log('Stored User:', storedUser);
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      return { cart: { ...initialState, ...parsedState } };
    }
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      return { auth: { user: parsedUser } };
    }
  }
  // console.log('Default State:', initialState);
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

// Dispatch the fetchCurrentUserCart thunk after the store is created
// store.dispatch(fetchCurrentUserCart());


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
