import Image from 'next/image';
import { ProductData } from './product';
import { useState } from 'react';

interface ProductCardProps {
  product: ProductData;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showAllStars, setShowAllStars] = useState(false);

  const totalStars = 5;
  const grayStars = totalStars - product.rating;
  const displayStars = showAllStars ? totalStars : product.rating;

  return (
    <div>
      <Image src={product.imageSrc} width={300} height={300} alt={product.altText} className="rounded-lg" />
      <div className="my-5">
        <h2 className="">{product.productName}</h2>
        <div className="flex my-2">
          {[...Array(displayStars)].map((_, index) => (
            <Image
              key={index}
              width={16}
              height={16}
              src="https://res.cloudinary.com/duxy2eomx/image/upload/v1697712759/staricon_pz1faa.svg"
              alt="staricon"
            />
          ))}
          {[...Array(grayStars)].map((_, index) => (
            <Image
              key={index}
              width={16}
              height={16}
              src="https://res.cloudinary.com/duxy2eomx/image/upload/v1697713781/nostarticon_zdqlph.svg"
              alt="gray-staricon"
            />
          ))}
        </div>
        <h2>{product.price}</h2>
      </div>
      <div className="flex gap-6">
        <button className="py-4 w-[220px] uppercase border border-[#0C0C1E] rounded-lg">
          Add to cart
        </button>
        <button className="w-[56px] border border-[#0C0C1E] flex items-center justify-center rounded-lg">
          <Image
            src="https://res.cloudinary.com/duxy2eomx/image/upload/v1697712759/Heart_kvhvmp.svg"
            height={26}
            width={26}
            alt="heart"
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;