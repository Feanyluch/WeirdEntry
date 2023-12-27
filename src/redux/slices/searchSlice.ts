// src/redux/slices/searchSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ProductData } from '@/components/product';

interface SearchState {
  searchResults: ProductData[];
}

const initialState: SearchState = {
  searchResults: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<ProductData[]>) => {
      state.searchResults = action.payload;
    },
  },
});

export const { setSearchResults } = searchSlice.actions;
export const selectSearchResults = (state: RootState) => state.search.searchResults;
export default searchSlice.reducer;
