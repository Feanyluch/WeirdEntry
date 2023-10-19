// pages/index.tsx
import { GetStaticProps } from 'next';
import ProductCard from '../components/ProductCard';
import { ProductData } from './product';
import { useState } from 'react';

interface ProductsProps {
  products: ProductData[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {

  const [cartCount, setCartCount] = useState(0);
  const [heartCount, setHeartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  console.log("CarCount", cartCount)

  const handleAddToFavorite = () => {
    setHeartCount(heartCount + 1);
  };
  return (
    <div className="grid grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} onAddToCart={handleAddToCart} onAddToFavorite={handleAddToFavorite} />
      ))}
    </div>
  );
};

export default Products;