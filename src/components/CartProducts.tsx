import React, { useState, useEffect } from "react";
import Image from "next/image";
import shirt2 from "../../public/Images/shirt2.png";
import { ProductData } from "@/components/product";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import {
  addToCart,
  incrementCartCount,
  decrementCartCount,
  removeFromCart,
  incrementItem,
  decrementItem,
  addSelectedProduct,
  updateItemQuantity
} from "@/redux/slices/cartSlice";

interface MiniProductProps {
  product: ProductData;
  cartItems: { id: number; quantity: number }[];
}

const MiniProducts: React.FC<MiniProductProps> = ({ product }) => {  
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const initialQuantity = cartItem ? cartItem.quantity : 0;

  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    // Update the Redux store when the local state changes
    dispatch(updateItemQuantity({ productId: product.id, quantity }));
  }, [quantity, dispatch, product.id]);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
    dispatch(incrementCartCount())
    
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      dispatch(decrementCartCount())
    }
  };

  return (
    <div className="p-4 flex items-center justify-start h-[200px] my-4">
      <div className=" rounded-lg">
        <Image src={shirt2} alt="item1" width={200} height={200} className="rounded-lg" />
      </div>
      <div className="mx-8">
        <h2 className="text-xl">{product.productName}</h2>
        <h1 className="font-bold py-2">{product.price}</h1>
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
