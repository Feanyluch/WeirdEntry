import Image from "next/image";
import Link from "next/link";
import { ProductData } from "./product";
import { useState } from "react";

import { useDispatch } from "react-redux";
import {
  addToCart,
  incrementCartCount,
  removeFromCart,
  incrementItem,
  decrementItem,
} from "@/redux/slices/cartSlice";
interface ProductCardProps {
  product: ProductData;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showAllStars, setShowAllStars] = useState(false);

  const totalStars = 5;
  const grayStars = totalStars - product.rating;
  const displayStars = showAllStars ? totalStars : product.rating;

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const cartItem = { id: product.id, quantity: 1 }; // Create a CartItem with a quantity of 1
    console.log("produtcts added", cartItem);
    dispatch(addToCart(cartItem)); // Dispatch the addToCart action with the CartItem
    dispatch(incrementCartCount());
  };

  return (
    <div>
      <Link href={`/shop/${product.id}`} passHref>
        <div className="rounded-lg h-[250px] w-[250px] relative overflow-hidden">
          <Image
            src={product.imageSrc}
            width={250}
            height={250}
            alt={product.altText}
            className=" object-cover transform hover:scale-110 transition-transform duration-300"
          />
        </div>

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
          <h2 className="text-sm my-4">{product.price}</h2>
        </div>
      </Link>
      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          className="text-sm py-3 w-3/4 uppercase border border-[#0C0C1E] rounded-lg hover:bg-[#1B2E3C] hover:text-white transition ease-in-out duration-300"
        >
          Add to cart
        </button>
        <button className="w-1/4 border border-[#0C0C1E] flex items-center justify-center rounded-lg transition ease-in-out duration-300">
          <Image
            src="https://res.cloudinary.com/duxy2eomx/image/upload/v1697712759/Heart_kvhvmp.svg"
            height={25}
            width={25}
            alt="heart"
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
