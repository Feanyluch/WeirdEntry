// pages/index.tsx
import { GetStaticProps } from 'next';
import ProductCard from './ProductCard';
import { ProductData } from './product';

interface RelatedProductsProps {
  products: ProductData[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  const relatedProducts = products.slice(0, 4);

  return (
    <div className="max-w-[1300px] mx-auto grid grid-cols-4 gap-4">
      {relatedProducts.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};


export default RelatedProducts;
