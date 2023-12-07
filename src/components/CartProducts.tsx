import React, { useState, useEffect } from "react";
import Image from "next/image";
import DeleteSvg from "../../public/Images/delete.svg";
import Favorite from "../../public/Images/Heart.svg";
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

const CartProducts: React.FC<MiniProductProps> = ({ product }) => {  
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const initialQuantity = cartItem ? cartItem.quantity : 0;

  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    // Set the local state to the updated quantity when it changes in the Redux store
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const incrementQuantity = () => {
    dispatch(incrementItem( product.id));
    dispatch(updateItemQuantity({ productId: product.id, quantity: quantity + 1 }));
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
    dispatch(incrementItem( product.id));
      dispatch(updateItemQuantity({ productId: product.id, quantity: quantity - 1 }));
    }
  };

  return (
    <div className="grid grid-cols-2 py-4 gap-8">
      <div className="rounded-lg">
        <Image src={product.product_image} alt="item1" width={200} height={50} className="rounded-lg" />
      </div>
      <div className="flex flex-col py-4 gap-[5px]">
        <h2 className="text-sm font-normal uppercase">{product.title}</h2>
        <h1 className="font-bold text-sm my-1">₦ {(product.price).toLocaleString()}</h1>
        
        <div className="flex items-center justify-between gap-6">
          <div className="flex gap-1">
            <h2 className="text-sm">Size: </h2>
            <p className="text-sm"> M</p>
          </div>
        <div className="flex items-center justify-start gap-[12px] text-sm my-1">
          <h2 className="text-sm">Qty:</h2>
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

export default CartProducts;