import { CartState } from '../redux/slices/cartSlice';

// localStorageHelper.ts
export const saveCartToLocalStorage = (state: CartState) => {
  const { items, selectedProduct, cartCount } = state;
  const newState = { items, selectedProduct, cartCount };
  localStorage.setItem('cartState', JSON.stringify(newState));
};