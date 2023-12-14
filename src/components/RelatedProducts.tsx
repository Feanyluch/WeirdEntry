// pages/index.tsx
import { GetStaticProps } from 'next';
import ProductCard from './ProductCard';
import { ProductData } from './product';

// Update RelatedProductsProps in RelatedProducts.tsx
// Update RelatedProductsProps in RelatedProducts.tsx
interface RelatedProductsProps {
  products?: ProductData[] | { data: ProductData[] } | undefined;
}


const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  // console.log("Received Products", products);

  // If products is an object with a data property, use products.data
  const productArray = Array.isArray(products) ? products : products?.data || [];

  const relatedProducts = productArray.slice(0, 4);

  // console.log({ relatedProducts });

  return (
    <div className="max-w-[1100px] mx-auto grid grid-cols-4 gap-4">
      {relatedProducts.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default RelatedProducts;
