import React, { useState, useEffect } from "react";
import { ProductData } from "@/components/product";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface MiniProductProps {
  product: ProductData;
  cartItems: { id: number; quantity: number }[];
}

const CheckoutProducts: React.FC<MiniProductProps> = ({
  product,
  cartItems,
}) => {
  // Find the corresponding item in cartItems based on the product id
  const cartItem = cartItems.find((item) => item.id === product.id);
  const user = useSelector((state: RootState) => state.auth.user)

  return (
    <div className="flex items-start justify-start gap-8 px-2 py-[10px]">
      <Image
        src={product.product_image}
        width={200}
        height={20}
        alt="shirt"
        className="w-[120px]"
      />
      <div className="flex flex-col gap-[10px]">
        <h2 className="text-sm uppercase">{product.title}</h2>
        <p className="text-sm font-light">Size: Medium</p>
        <p className="text-sm font-light">Color: Black</p>
        <p className="text-sm font-light">QTY: {user ? product.quantity : cartItem?.quantity || 0}</p>
        <h2 className="font-bold text-sm">
          ₦{" "}
          {(
            product.price * (user ? product.quantity : cartItem?.quantity || 0)
          ).toLocaleString()}
        </h2>
      </div>
    </div>
  );
};

export default CheckoutProducts;
