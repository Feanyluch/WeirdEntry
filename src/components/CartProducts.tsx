import React, { useState, useEffect } from "react";
import Image from "next/image";
import shirt2 from "../../public/Images/shirt2.png";
import DeleteSvg from "../../public/Images/delete.svg"
import Favorite from "../../public/Images/Heart.svg"
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
    <div className="grid grid-cols-2 my-8 gap-8">
      <div className=" rounded-lg bg-black">
        <Image src={product.imageSrc} alt="item1" width={300} height={100} className="rounded-lg" />
      </div>
      <div className="flex flex-col py-4 gap-[5px]">
        <h2 className="text-base font-normal uppercase">{product.productName}</h2>
        <h1 className="font-bold text-base my-1">{product.price}</h1>
        
        <div className="flex items-center justify-between gap-6">
          <div className="flex gap-1">
            <h2>Size: </h2>
            <p> M</p>
          </div>
        <div className="flex items-center justify-start gap-[12px] text-base my-1">
          <h2>Qty:</h2>
          <button
            className="text-lg px-2 rounded-lg"
            onClick={decrementQuantity}
          >
            -
          </button>
          <h2>{quantity}</h2>
          <button
            className="text-lg px-2 rounded-lg"
            onClick={incrementQuantity}
          >
            +
          </button>
        </div>
        </div>
        <div className="py-2 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer">
          <Image src={Favorite} width={20} height={20} alt="delete icon" />
            <h2 className="text-xs uppercase">Add to wishlist</h2>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src={DeleteSvg} width={20} height={20} alt="delete icon" />
            <h2 className="text-xs uppercase">Delete</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniProducts;
