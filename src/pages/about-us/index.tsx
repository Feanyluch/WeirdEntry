import React from "react";
import Image from "next/image";
import Link from "next/link";

import toright from "../../../public/Images/toright.svg";
import Breadcrumb from "@/components/BreadCrumb";

import { ProductData } from "@/components/product";

interface HomeProps {
  products: ProductData[]; // Make sure the interface matches the expected prop
}

const index: React.FC<HomeProps> = ({ products }) => {
  return (
    <div>
      <Breadcrumb products={products} />
      <div className="grid grid-cols-2 h-[700px] my-14 mx-auto max-w-[1300px] ">
        <div className="bg-[#F3E3E2]">
          <h2 className="uppercase my-4 text-center text-5xl text-[#0C0C1E]">Our story</h2>
        </div>
        <div className="bg-[#1B2E3C]"></div>
      </div>
    </div>
  );
};

export default index;
