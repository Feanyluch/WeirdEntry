// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
// import favoriteReducer from './slices/favoriteSlice';


const store = configureStore({
  reducer: {
    // user: userReducer,
    cart: cartReducer,
    // favorite: favoriteReducer,
    // Add more reducers as needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
