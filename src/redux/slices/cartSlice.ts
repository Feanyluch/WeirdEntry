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

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const productEndpoint = "cart";

    const apiUrl = `${apiBaseUrl}${productEndpoint}`;
    const response = await fetch(
      apiUrl,
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
    removeFromCart: (state, action: PayloadAction<{ productKey: string }>) => {
      const { productKey } = action.payload;
      const updatedItems = { ...state.items };

      // Remove the item with the specified productKey
      if (updatedItems[productKey as keyof typeof updatedItems]) {
        delete updatedItems[productKey as keyof typeof updatedItems];
      }

      // Update local storage
      saveCartToLocalStorage({
        ...state,
        items: updatedItems,
      });

      return {
        ...state,
        items: updatedItems,
      };
    },

    incrementItem: (state, action: PayloadAction<any>) => {
      // Ensure that state.items is an object
      if (typeof state.items !== "object") {
        console.error("state.items is not an object:", state.items);
        return state;
      }

      console.log(action.payload);
      const existingProductKey = action.payload;
      const updatedItems = { ...state.items };
      // console.log(updatedItems[existingProductKey].quantity)

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

    decrementItem: (state, action: PayloadAction<any>) => {
      // Ensure that state.items is an object
      if (typeof state.items !== "object") {
        console.error("state.items is not an object:", state.items);
        return state;
      }

      const existingProductKey = action.payload;
      const updatedItems = { ...state.items };

      if (updatedItems[existingProductKey]) {
        const updatedQuantity = updatedItems[existingProductKey].quantity - 1;

        // Ensure the quantity doesn't go below 0
        updatedItems[existingProductKey] = {
          ...updatedItems[existingProductKey],
          quantity: Math.max(updatedQuantity, 0),
        };
      }

      return {
        ...state,
        items: updatedItems,
      };
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
      action: PayloadAction<{ productKey: any; quantity: number }>
    ) => {
      const { productKey, quantity } = action.payload;
      const updatedItems = { ...state.items };

      if (updatedItems[productKey]) {
        // Ensure the quantity doesn't go below 0
        updatedItems[productKey] = {
          ...updatedItems[productKey],
          quantity: Math.max(quantity, 0),
        };

        // Update local storage
        saveCartToLocalStorage({
          ...state,
          items: updatedItems,
        });
      }

      return {
        ...state,
        items: updatedItems,
      };
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
