// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for a product in the cart
interface CartItem {
  id: number; // Adjust the type according to your product ID type
  quantity: number;
  // Other properties of the product
}

interface CartState {
  items: CartItem[];
  cartCount: number;
}

const initialState: CartState = {
  items: [],  
  cartCount: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },

    incrementCartCount: (state) => {
        state.cartCount += 1;
      },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    incrementItem: (state, action: PayloadAction<number>) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    decrementItem: (state, action: PayloadAction<number>) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementItem, decrementItem, incrementCartCount } = cartSlice.actions;
export default cartSlice.reducer;
