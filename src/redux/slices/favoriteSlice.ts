import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FavoriteItem {
  id: number;
  product_id?: any;
  title: string;
  price: number;
  product_image?: any;
  sales_price: number;
  // Add any other properties specific to favorite items
}

export interface FavoriteState {
  items: FavoriteItem[];
  favoriteCount: number;
}

// Ensure this code runs only in the client-side environment
const getInitialFavorites = () => {
  if (typeof window !== 'undefined') {
    const localStorageFavorites = localStorage.getItem('favorites');
    return localStorageFavorites ? JSON.parse(localStorageFavorites) : [];
  }
  return [];
};

export const initialState: FavoriteState = {
  items: getInitialFavorites(),
  favoriteCount: getInitialFavorites().length,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      state.items.push(action.payload);
      state.favoriteCount++;

      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state.items));
      }
    },
    removeFromFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.favoriteCount--;

      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state.items));
      }
    },
    // You can add more actions like updating favorite items, etc. if needed
  },
});

export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;