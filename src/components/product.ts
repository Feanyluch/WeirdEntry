export interface ProductData {
  page: number;
  id: number;
  title: string;
  description: string;
  price: number;
  product_image: string;
  sizes: { id: number; title: string; description: string }[]; // Update this line
  colors: { id: number; title: string; description: string }[]; // Update this line
}