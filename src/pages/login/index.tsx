import Breadcrumb from "@/components/BreadCrumb";
import React, { useState } from "react";

import { ProductData } from "@/components/product";
import { GetStaticProps } from "next";
import RoundCheckbox from "@/components/Checkbox";
import Link from "next/link";
import Image from "next/image";

import toright from "../../../public/Images/To-Right.svg";

interface HomeProps {
  products: ProductData[];
}

const Index: React.FC<HomeProps> = ({ products }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (newCheckedState: boolean) => {
    console.log(newCheckedState);
    setIsChecked(newCheckedState);
  };

  return (
    <div className="">
      <Breadcrumb products={products} />
      <div className="flex items-center justify-center bg-[#fdf9f9] py-8 w-[1200px] mx-auto my-[3rem]">
        <div className="bg-white w-[500px] h-[580px] py-2 px-8">
          <h2 className="text-5xl text-center py-12 uppercase">Login</h2>
          <div className="my-2">
            <div className="my-6">
              <input
                type="email"
                placeholder="Email address"
                className="px-6 py-4 bg-[#f3f4f5] w-full outline-none"
              />
            </div>
            <div className="my-6">
              <input
                type="password"
                placeholder="Password"
                className="px-6 py-4 bg-[#f3f4f5] w-full outline-none"
              />
            </div>
          </div>
          <RoundCheckbox
            label="Remember me"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <div className="my-2">
            <button className="py-3 px-8 my-4 w-full border-2 transition-all border-[#1B2E3C] hover:bg-[#1B2E3C] hover:text-white rounded-lg uppercase text-xl">
              Login
            </button>
          </div>
          <div className="flex items-center justify-between text-gray-400 py-8">
            <Link href="/">Forgot password ?</Link>
            <div className="flex">
              <Link href="/">Register</Link>
              <Image src={toright} width={20} height={20} alt="to right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const productData = await import("../../../assets/productData.json");

  return {
    props: {
      products: productData.products as ProductData[],
    },
  };
};

export default Index;
