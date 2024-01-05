// cartSlice.ts
import { ProductData } from "@/components/product";
import { saveCartToLocalStorage } from "@/utils/localStorageHelper";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define the type for a product in the cart
export interface CartItem {
  color: string | null;
  size: string | null;
  price: number;
  title: string;
  id: any;
  quantity: number;
  product_image: any;
}

export interface CartState {
  items: CartItem[];
  cartCount: number;
  itemQuantity: number;
  selectedProduct: ProductData[];
}

export const initialState: CartState = {
  items: [],
  cartCount: 0,
  itemQuantity: 0,
  selectedProduct: [],
};

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (_, { getState }) => {
    const token = (getState() as RootState).auth.user.token;

    const response = await fetch(
      "https://weird-entry-lara-production.up.railway.app/api/cart",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user's cart");
    }

    return response.json();
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      // const newItem = action.payload;
      // const updatedState = {
      //   ...state,
      //   items: Array.isArray(state.items) ? [...state.items, newItem] : [newItem],
      // };
      // saveCartToLocalStorage(updatedState);
      // return updatedState;

      const newItem = action.payload;
      const existingProductKey = `${newItem.id}_${newItem.size}_${newItem.color}`;

      // Assuming newItem has a unique identifier like "id"
      const updatedItems = {
        ...state.items,
        [existingProductKey]: newItem,
      };

      const updatedState = {
        ...state,
        items: updatedItems,
      };

      saveCartToLocalStorage(updatedState);
      return updatedState;
    },

    // addToCart: (state, action: PayloadAction<CartItem>) => {
    //   const newItem = action.payload;
    //   const existingProductKey = `${newItem.id}_${newItem.size}_${newItem.color}`;

    //   const existingProduct = state.items[existingProductKey];

    //   if (existingProduct) {
    //     // If the product already exists in the cart, update its quantity
    //     state.items = {
    //       ...state.items,
    //       [existingProductKey]: {
    //         ...existingProduct,
    //         quantity: existingProduct.quantity + 1,
    //       },
    //     };
    //   } else {
    //     // If the product is not in the cart, add it with a quantity of 1
    //     state.items = {
    //       ...state.items,
    //       [existingProductKey]: newItem,
    //     };
    //   }

    //   saveCartToLocalStorage(state);
    // },

    incrementCartCount: (state) => {
      state.cartCount += 1;
    },
    decrementCartCount: (state) => {
      state.cartCount -= 1;
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    incrementItem: (state, action: PayloadAction<string>) => {
      // Ensure that state.items is an object
      if (typeof state.items !== "object") {
        console.error("state.items is not an object:", state.items);
        return state;
      }

      const existingProductKey = action.payload;
      const updatedItems = { ...state.items };

      if (updatedItems[existingProductKey]) {
        updatedItems[existingProductKey] = {
          ...updatedItems[existingProductKey],
          quantity: updatedItems[existingProductKey].quantity + 1,
        };
      }

      return {
        ...state,
        items: updatedItems,
      };
    },

    decrementItem: (state, action: PayloadAction<number>) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },

    addSelectedProduct: (state, action: PayloadAction<ProductData>) => {
      state.selectedProduct.push(action.payload);
      // console.log("Updated selectedProduct:", state.selectedProduct);
      saveCartToLocalStorage(state);
    },

    deleteSelectedProduct: (state, action: PayloadAction<{ id: number }>) => {
      state.selectedProduct = state.selectedProduct.filter(
        (product) => product.id !== action.payload.id
      );
      saveCartToLocalStorage(state);
    },

    updateSelectedProducts: (state, action: PayloadAction<ProductData[]>) => {
      state.selectedProduct = action.payload;
      saveCartToLocalStorage(state);
    },

    updateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },

    updateItemQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const product = state.items.find((item) => item.id === productId);
      if (product) {
        product.quantity = quantity;
        saveCartToLocalStorage(state);
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
  deleteSelectedProduct,
  updateCart,
} = cartSlice.actions;
export default cartSlice.reducer;
