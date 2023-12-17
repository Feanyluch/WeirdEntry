import React from "react";
import ProductCard from "@/components/ProductCard";
import { ProductData } from "./product";

interface ProductsProps {
  products?: { data: ProductData[] } | ProductData[] | undefined; // Adjusted prop type
}

const Products: React.FC<ProductsProps> = ({ products }) => {

  if (!products || (!Array.isArray(products) && !products.data)) {
    return <p>No products available.</p>;
  }

  const productsArray = Array.isArray(products)
    ? (products as ProductData[])
    : products.data || [];

  if (productsArray.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-8">
      {productsArray.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};


export default Products;
