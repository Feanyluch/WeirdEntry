import { CartItem, CartState } from '../redux/slices/cartSlice';

// localStorageHelper.ts
export const saveCartToLocalStorage = (state: CartState) => {
  const { items, selectedProduct, cartCount, itemQuantity } = state;
  const newState = { items, selectedProduct, cartCount, itemQuantity };
  localStorage.setItem('cartState', JSON.stringify(newState));
};

export const clearCartLocalStorage = () => {
  localStorage.removeItem('cartState');
};

// localStorageHelper.ts

export const sendItemsToEndpoint = async (items: CartItem[]) => {
  // Check if there are items to send
  if (!Array.isArray(items) || items.length === 0) {
    console.log('No valid items to send to the endpoint.');
    return;
  }

  const userString = localStorage.getItem('user');

  if (!userString) {
    console.error('User data not found in localStorage.');
    return;
  }

  try {
    const user = JSON.parse(userString);

    if (!user || !user.token) {
      console.error('Token not found in user data.');
      return;
    }

    const { token } = user;

    const apiUrl = 'https://weird-entry-lara-production.up.railway.app/api/cart/create';

    const requestData = {
      user_email: `${user.user.email}`,
      items: items.reduce((acc: Record<number, { title: string; price: number; quantity: number }>, item) => {
        acc[item.id] = {
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        };
        return acc;
      }, {})
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(requestData),
    });

    // console.log({ response });

    if (!response.ok) {
      console.error('Error:', response.statusText);
    } else {
      // console.log('Items successfully sent to the endpoint.');
    }
  } catch (error) {
    console.error('Error parsing user data or sending items to the endpoint:', error);
  }
};
