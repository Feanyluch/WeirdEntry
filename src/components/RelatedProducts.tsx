// pages/index.tsx
import { GetStaticProps } from 'next';
import ProductCard from './ProductCard';
import { ProductData } from './product';

interface RelatedProductsProps {
  products?: { data: ProductData[] } | undefined; // Make the prop optional
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  const relatedProducts = products?.data?.slice(0, 4);

  return (
    <div className="max-w-[1100px] mx-auto grid grid-cols-4 gap-4">
      {Array.isArray(relatedProducts) && relatedProducts.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};


export default RelatedProducts;
