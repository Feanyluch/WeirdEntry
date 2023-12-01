// cartSlice.ts
import { ProductData } from "@/components/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for a product in the cart
interface CartItem {
  id: number; // Adjust the type according to your product ID type
  quantity: number;
  // Other properties of the product
}

interface CartState {
  items: CartItem[];
  cartCount: number;
  itemQuantity: number;
  selectedProduct: ProductData[]; // Add the selectedProduct property
}

const initialState: CartState = {
  items: [],
  cartCount: 0,
  itemQuantity: 0,
  selectedProduct: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    
    incrementCartCount: (state) => {
      state.cartCount += 1;
    },
    decrementCartCount: (state) => {
      state.cartCount -= 1;
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
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

    addSelectedProduct: (state, action: PayloadAction<ProductData>) => {
      state.selectedProduct.push(action.payload);
    },
    deleteSelectedProduct: (state, action: PayloadAction<{ id: number }>) => {
      state.selectedProduct = state.selectedProduct.filter(
        (product) => product.id !== action.payload.id
      );
    },    
    updateItemQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const product = state.items.find((item) => item.id === productId);
      if (product) {
        product.quantity = quantity;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementItem,
  decrementItem,
  incrementCartCount,
  decrementCartCount,
  addSelectedProduct,
  updateItemQuantity,
  deleteSelectedProduct
} = cartSlice.actions;
export default cartSlice.reducer;
