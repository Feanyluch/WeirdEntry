import React from "react";
import Image from "next/image";
import { ProductData } from "@/components/product";
import Breadcrumb from "@/components/BreadCrumb";

import Shirt from "../../../public/Images/newshirt.png";

import AccountLayout from "@/components/Layout/AccountLayout";

import { GetStaticProps } from "next";

interface HomeProps {
  products: ProductData[]; // Make sure the interface matches the expected prop
}

const MyAccount: React.FC<HomeProps> = ({ products }) => {
  return (
    <div className="" style={{ fontFamily: "'Nokora', sans-serif" }}>
      <Breadcrumb products={products} />
      <AccountLayout>
        <h2 className="text-sm font-normal uppercase tracking-[2px]">Payment Methods</h2>
        <div className="w-full h-[1px] bg-[#0C0C1E80] my-[20px]"></div>
        <h2 className="text-xs text-[#1B2E3C80] font-light">
          You currently do not have any payment method
        </h2>
        <div className="flex items-center justify-center my-[50px]">
          <button className="border-[#0C0C1E] border px-[80px] py-[17px] text-xs hover:bg-[#1B2E3C] hover:text-[#F3E3E2] transition-all rounded-lg">
            Add Payment Method
          </button>
        </div>
      </AccountLayout>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Fetch your JSON data here, for example, using `import`
  const productData = await import("../../../assets/productData.json");

  return {
    props: {
      products: productData.products as ProductData[], // Cast the products data to ProductData[]
    },
  };
};

export default MyAccount;
