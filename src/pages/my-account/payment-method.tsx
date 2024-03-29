import React from "react";
import Image from "next/image";
import { ProductData } from "@/components/product";
import Breadcrumb from "@/components/BreadCrumb";

import Shirt from "../../../public/Images/newshirt.png";

import AccountLayout from "@/components/Layout/AccountLayout";

import { GetStaticProps } from "next";
import axios from "axios";

interface HomeProps {
  products: ProductData[]; // Make sure the interface matches the expected prop
}

const MyAccount: React.FC<HomeProps> & { title: string } = ({ products }) => {
  return (
    <div className="" style={{ fontFamily: "'Nokora', sans-serif" }}>
      <Breadcrumb products={products} />
      <AccountLayout>
        <h2 className="text-sm font-normal uppercase tracking-[2px]">
          Payment Methods
        </h2>
        <div className="w-full h-[1px] bg-[#0C0C1E80] my-[20px]"></div>
        <h2 className="text-xs text-[#1B2E3C80] font-light">
          You currently do not have any payment method
        </h2>
        <div className="flex items-center justify-center my-[50px]">
          <button className="border-[#0C0C1E] border px-8 sm:px-[80px] py-[17px] text-xs hover:bg-[#1B2E3C] hover:text-[#F3E3E2] transition-all rounded-lg">
            Add Payment Method
          </button>
        </div>
      </AccountLayout>
    </div>
  );
};

MyAccount.title = "Payment Method - Weird Entry";
export const getStaticProps: GetStaticProps = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const productEndpoint = "product";

  const apiUrl = `${apiBaseUrl}${productEndpoint}`;

  try {
    const response = await axios.get(apiUrl);
    const productData = response.data;
    console.log("Product Data", productData);

    return {
      props: {
        products: productData as ProductData[],
      },
    };
  } catch (error: any) {
    console.error("Error fetching data from API:", error.message);
    throw new Error(`Failed to fetch data from API: ${error.message}`);
  }
};

export default MyAccount;
