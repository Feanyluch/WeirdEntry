export interface ProductData {
  page: number;
  id: number;
  title: string;
  description: string;
  quantity: number;
  price: number;
  product_image: string;
  size: string;
  color: string;
  sizes: { id: number; title: string; description: string }[]; // Update this line
  colors: { id: number; title: string; description: string }[]; // Update this line
}