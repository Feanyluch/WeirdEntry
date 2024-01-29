export interface ProductData {
  category?: any;
  sales_price?: number;
  page?: number;
  id: number;
  title: string;
  description?: string;
  quantity: number;
  price: number;
  product_image: string;
  size: string;
  color: string;
  sizes?: { id: number; title: string; description: string }[];
  colors?: { id: number; title: string; description: string }[];
}