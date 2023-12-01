import React, { useState, useEffect } from "react";
import Image from "next/image";
import deletesvg from "../../public/Images/delete.svg";
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
  updateItemQuantity,
  deleteSelectedProduct
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
    // dispatch(incrementCartCount());
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      dispatch(decrementCartCount());
    }
  };

  const handleDeleteFromCart = () => {
    const cartItem = { id: product.id, quantity: 1 };
    dispatch(removeFromCart({ id: cartItem.id }));
    dispatch(deleteSelectedProduct({ id: cartItem.id }));
    dispatch(decrementCartCount())
    console.log("Item removed", cartItem);
  };

  const priceAsNumber = parseFloat(
    product.price.replace(/[^0-9.-]+/g, "")
  );

  console.log("produuuuuuuuuuu price", priceAsNumber)
  

  return (
    <div className="p-4 flex justify-between gap-4">
      <div className="flex items-center justify-start gap-4">
        <div className="w-[50px]">
          <Image src={product.imageSrc} alt="item1" width={100} height={100} />
        </div>
        <h2 className="text-sm">{product.productName}</h2>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-between text-xl gap-2 border border-[#1B2E3C80]">
          <button
            className="text-xl px-2 rounded-lg"
            onClick={decrementQuantity}
          >
            -
          </button>
          <h2 className="text-sm">{quantity}</h2>
          <button
            className="text-xl px-2 rounded-lg"
            onClick={incrementQuantity}
          >
            +
          </button>
        </div>
      </div>

      <h1 className="font-bold text-xs flex items-center justify-center">
        N{(priceAsNumber * quantity).toLocaleString()}
      </h1>
      <div
        className="flex items-center justify-center"
        onClick={handleDeleteFromCart}
      >
        <Image
          src={deletesvg}
          width={20}
          height={20}
          alt="delete"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default MiniProducts;
