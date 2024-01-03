import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { ProductData } from "./product";
import SizeSelectionModal from "./SelectionModal";

interface ProductsProps {
  products?: { data: ProductData[] } | ProductData[] | undefined; // Adjusted prop type
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  console.log({ products });

  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [selectedProductForSize, setSelectedProductForSize] =
    useState<ProductData | null>(null);

  if (!products || (!Array.isArray(products) && !products.data)) {
    return <p>No products available.</p>;
  }

  const productsArray = Array.isArray(products)
    ? (products as ProductData[])
    : products.data || [];

  if (productsArray.length === 0) {
    return <p>No products available.</p>;
  }

  const handleAddToCart = async (product: ProductData) => {
    // Open the size selection modal
    setSelectedProductForSize(product);
    setIsSizeModalOpen(true);
  };

  return (
    <div className="grid grid-cols-3 gap-8">
      {productsArray.map((product, index) => (
        <ProductCard
          key={index}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
      {isSizeModalOpen && selectedProductForSize && (
        <SizeSelectionModal
          product={selectedProductForSize}
          sizes={selectedProductForSize.sizes.map((size) => size.title) || []}
          colors={
            selectedProductForSize.colors.map((color) => color.title) || []
          }
          title={selectedProductForSize.title}
          product_image={selectedProductForSize.product_image}
          onClose={() => setIsSizeModalOpen(false)}
          onSizeSelect={(selectedSize) => {
            // Handle the selected size and product
            console.log("Selected Size:", selectedSize);
            console.log("Selected Product:", selectedProductForSize);
            // Close the modal
            setIsSizeModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Products;
