// pages/index.tsx
import { GetStaticProps } from "next";
import ProductCard from "./ProductCard";
import { ProductData } from "./product";
import { useState } from "react";
import SizeSelectionModal from "./SelectionModal";

// Update RelatedProductsProps in RelatedProducts.tsx
// Update RelatedProductsProps in RelatedProducts.tsx
interface RelatedProductsProps {
  products?: ProductData[] | { data: ProductData[] } | undefined;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  console.log("Received Products", products);

  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [selectedProductForSize, setSelectedProductForSize] =
    useState<ProductData | null>(null);

  // If products is an object with a data property, use products.data
  const productArray = Array.isArray(products)
    ? products
    : products?.data || [];

  const relatedProducts = productArray.slice(0, 4);

  console.log({ relatedProducts });

  const handleAddToCart = async (product: ProductData) => {
    // Open the size selection modal
    setSelectedProductForSize(product);
    setIsSizeModalOpen(true);
  };

  return (
    <div className="w-full overflow-auto sm:overflow-hidden">
      <div className="w-[1100px] sm:mx-auto grid grid-cols-4 gap-4 p-4">
        {relatedProducts.map((product, index) => (
          <ProductCard key={index} product={product} 
          onAddToCart={handleAddToCart} />
        ))}
      </div>
      {isSizeModalOpen && selectedProductForSize && (
        <SizeSelectionModal
          product={selectedProductForSize}
          sizes={selectedProductForSize?.sizes?.map((size) => size.title) || []}
          colors={
            selectedProductForSize?.colors?.map((color) => color.title) || []
          }
          product_image={selectedProductForSize.product_image}
          title={selectedProductForSize.title}
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

export default RelatedProducts;
