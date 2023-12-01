import React, { useState, useEffect } from "react";
import { ProductData } from "@/components/product";
import Image from "next/image";

import Shirt from "../../../public/Images/newshirt.png";


interface MiniProductProps {
  product: ProductData;
  cartItems: { id: number; quantity: number }[];
}

const CheckoutProducts: React.FC<MiniProductProps> = ({ product }) => {
  return (
    <div className="flex items-start justify-start gap-8 px-2 py-[10px]">
      <div className="w-[150px]">
        <Image src={product.imageSrc} width={200} height={20} alt="shirt" />
      </div>
      <div className="flex flex-col gap-[10px]">
        <h2 className="text-sm uppercase">{product.productName}</h2>
        <p className="text-sm font-light">Size: Medium</p>
        <p className="text-sm font-light">Color: Black</p>
        <p className="text-sm font-light">QTY: 24</p>
        <h2 className="font-bold text-sm">{product.price}</h2>
      </div>
    </div>
  );
};

export default CheckoutProducts;
