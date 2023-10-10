import React from "react";
import Image from "next/image";
import Link from "next/link";
import toright from "../../../public/Images/toright.svg";
import ProductCategory from "@/components/ProductCategory";
import Products from "@/components/Products";

const Index = () => {
  return (
    <div>
      <div className="bg-[#1B2E3C] h-[299px] flex items-center justify-center text-white">
        <div className="">
          <h2 className="uppercase text-5xl">Shop</h2>
          <div className="flex mt-20 text-lg uppercase">
            <Link href="/">Home</Link>
            <Image src={toright} alt="toright" /> Shop
          </div>
        </div>
      </div>
      <div className="w-[1300px] mx-auto flex gap-8 my-12">
        <div className="w-1/4 flex-shrink-0">
          <div className="sticky top-40">
            <ProductCategory />
          </div>
        </div>
        <div className="flex-grow overflow-y-auto px-4 product-container">
          <Products />
        </div>
      </div>
    </div>
  );
};

export default Index;