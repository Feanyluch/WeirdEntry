import React, { useState, useEffect } from "react";
import { ProductData } from "@/components/product";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { CartItem } from "@/redux/types";

interface CheckoutProductProps {
  cartData: ProductData[];
}

const CheckoutProducts: React.FC<CheckoutProductProps> = ({ cartData }) => {
  // Find the corresponding item in cartItems based on the product id
  // const cartItem = cartItems.find((item) => item.id === product.id);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="">
      {Object.entries(cartData).map(([productKey, product]) => (
        <div className="h-[210px] flex items-start justify-start gap-4 sm:gap-8 px-2 py-[10px]" key={productKey}>
          <Image
            src={product.product_image}
            width={200}
            height={20}
            alt="shirt"
            className="w-[120px] h-full"
          />
          <div className="flex items-start justify-center flex-col gap-[10px] h-full">
            <h2 className="text-xs sm:text-sm uppercase">{product.title}</h2>
            <p className="text-xs sm:text-sm font-light">Size: {product.size}</p>
            <p className="text-xs sm:text-sm font-light">Color: {product.color}</p>
            <p className="text-xs sm:text-sm font-light">
              QTY: {product.quantity}
            </p>
            <h2 className="font-bold text-xs sm:text-sm">
              ₦{" "}
              {(
                product.price *
                (product.quantity)
              ).toLocaleString()}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckoutProducts;
