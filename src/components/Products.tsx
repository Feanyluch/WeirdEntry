import React from "react";
import ProductCard from "../components/ProductCard";
import { ProductData } from "./product";

interface ProductsProps {
  products?: { data: ProductData[] } | ProductData[] | undefined; // Adjusted prop type
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  console.log({ products });

  if (!products) {
    // Handle the case where products is undefined, you can show a loading state or return null
    return null;
  }

  const productsArray = Array.isArray(products) ? products : products.data;

  return (
    <div className="grid grid-cols-3 gap-8">
      {productsArray.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default Products;
