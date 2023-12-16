import { CartState } from '../redux/slices/cartSlice';

// localStorageHelper.ts
export const saveCartToLocalStorage = (state: CartState) => {
  const { items, selectedProduct, cartCount, itemQuantity } = state;
  const newState = { items, selectedProduct, cartCount, itemQuantity };
  localStorage.setItem('cartState', JSON.stringify(newState));
};