import React, { useState } from "react";
import Image from "next/image";
import shirt2 from "../../public/Images/shirt2.png";
import { ProductData } from "@/components/product";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface MiniProductProps {
  product: ProductData;
  cartItems: { id: number; quantity: number }[];
}

const MiniProducts: React.FC<MiniProductProps> = ({ product, cartItems }) => {
  const cartItem = cartItems.find((item) => item.id === product.id);
  const initialQuantity = cartItem ? cartItem.quantity : 0;

  const [quantity, setQuantity] = useState(initialQuantity);
  console.log(quantity)

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="p-4 flex items-center justify-start">
      <div className="">
        <Image src={shirt2} alt="item1" width={100} height={100} />
      </div>
      <div className="mx-4">
        <h2 className="text-xl">{product.productName}</h2>
        <h1 className="font-bold my-1">{product.price}</h1>
        <div className="flex items-center justify-between text-xl">
          <button
            className="text-xl bg-gray-100 px-2 rounded-lg"
            onClick={decrementQuantity}
          >
            -
          </button>
          <h2>{quantity}</h2>
          <button
            className="text-xl bg-gray-100 px-2 rounded-lg"
            onClick={incrementQuantity}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniProducts;
