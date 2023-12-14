// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartState, initialState } from './slices/cartSlice';
import authReducer from './slices/authSlice';
import { saveCartToLocalStorage } from '@/utils/localStorageHelper';

// src/redux/store.ts

const loadInitialState = () => {
  if (typeof window !== 'undefined') {
    // Check if window is defined (client-side)
    const storedState = localStorage.getItem('cartState');
    console.log({ storedState });

    if (storedState) {
      try {
        // Parse the stored state
        const parsedState = JSON.parse(storedState);

        // Ensure that the selectedProduct array is loaded correctly
        return {
          ...parsedState,
          cart: {
            ...parsedState.cart,
            selectedProduct: parsedState.cart?.selectedProduct || [], // Use optional chaining to avoid errors if cart is undefined
          },
        };
      } catch (error) {
        console.error('Error parsing stored state:', error);
      }
    }
  }

  // Return default state if localStorage is not available or parsing fails
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
