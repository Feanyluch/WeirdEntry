// pages/index.tsx
import ProductCard from "../components/ProductCard";
import { ProductData } from "./product";

interface ProductsProps {
  products: ProductData[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default Products;
