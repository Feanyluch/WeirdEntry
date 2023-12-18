// Products.tsx
import React from "react";
import ProductCard from "@/components/ProductCard";
import { ProductData } from "./product";

interface ProductsProps {
  products?: ProductData[] | undefined; // Adjusted prop type
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  // Check if there are products, either from selected categories or initial products
  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default Products;
