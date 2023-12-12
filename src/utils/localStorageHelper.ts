import { CartState } from '../redux/slices/cartSlice';

export const saveCartToLocalStorage = (state: CartState) => {
  localStorage.setItem('cartState', JSON.stringify(state));
};
