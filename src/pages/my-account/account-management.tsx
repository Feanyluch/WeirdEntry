import React from "react";
import Image from "next/image";
import { ProductData } from "@/components/product";
import Breadcrumb from "@/components/BreadCrumb";

import useraccount from "../../../public/Images/Useraccount.svg";

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
        <h2 className="text-sm font-normal uppercase tracking-[2px] flex items-center justify-center">
          Hello Customer XYZ
        </h2>
        <div className="flex items-start justify-center gap-12 mt-4 p-6">
          <div className="flex flex-col gap-6 border w-[250px]">
            <div className="border flex items-center justify-start gap-2 p-2">
              <Image src={useraccount} width={20} height={20} alt="" />
              <h2 className="text-sm font-light">Account Details</h2>
            </div>
            <h2 className="font-light text-sm px-3 py-2">Edit Basic Details</h2>
            <h2 className="font-light text-sm px-3 py-2">Edit Phone Number</h2>
          </div>
          <div className="flex flex-col gap-6 border w-[250px]">
            <div className="border flex items-center justify-start gap-2 p-2">
              <Image src={useraccount} width={20} height={20} alt="" />
              <h2 className="text-sm font-light">Account Details</h2>
            </div>
            <h2 className="font-light text-sm px-3 py-2">Edit Basic Details</h2>
            <h2 className="font-light text-sm px-3 py-2">Edit Phone Number</h2>
            <h2 className="font-light text-sm px-3 py-2 text-[#FF3737]">
              Delete Account
            </h2>
          </div>
        </div>
      </AccountLayout>
    </div>
  );
};

MyAccount.title = "Account Management - Weird Entry";

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
