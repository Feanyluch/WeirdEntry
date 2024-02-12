
export interface User {
  id: number;
  username: string;
  email: string;
  // Add more user-related fields here
}

// cartTypes.ts
export interface CartItem {
  productId: number;
  page: number;
  id: number;
  title: string;
  quantity: number;
  price: number;
  product_image: string;
  sizes: { id: number; title: string; description: string }[]; // Update this line
  colors: { id: number; title: string; description: string }[]; // Update this line
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
  id: any;
  sales_price: number;
  product_image?: any;
  product_id?: any;
  // image?: any;
  title: string;
  price: number;
  // productId: number;
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