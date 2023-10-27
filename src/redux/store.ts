// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import { ProductData } from '@/components/product';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    // Add more reducers as needed
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;