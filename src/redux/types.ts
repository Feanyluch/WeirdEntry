// userTypes.ts
export interface User {
  id: number;
  username: string;
  email: string;
  // Add more user-related fields here
}

// cartTypes.ts
export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  // Add more cart item-related fields here
}

// productTypes.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  // Add more product-related fields here
}

// favoriteTypes.ts
export interface FavoriteItem {
  id: number;
  productId: number;
  // Add more favorite item-related fields here
}

// orderTypes.ts
export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  // Add more order-related fields here
}

// export type { User, CartItem, Product, FavoriteItem, Order };