import React from "react";
import ProductCard from "../components/ProductCard";
import { ProductData } from "./product";

interface ProductsProps {
  products?: { data: ProductData[] } | undefined; // Make the prop optional
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  console.log({products})
  if (!products) {
    // Handle the case where products is undefined, you can show a loading state or return null
    return null; 
  }

  return (
    <div className="grid grid-cols-3 gap-8">
      {Array.isArray(products?.data) &&
        products.data.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
    </div>
  );
};

export default Products;
