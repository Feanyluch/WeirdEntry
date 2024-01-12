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
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-normal tracking-[2px]">
            Open Orders (3)
          </h2>
          <h2 className="text-sm font-normal tracking-[2px]">Closed Orders</h2>
        </div>
        <div className="w-full h-[1px] bg-[#0C0C1E80] my-[20px]"></div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-4">
              <Image src={Shirt} width={100} height={50} alt="shirt" />
              <div>
                <h2 className="text-sm font-normal">Product XYZ</h2>
                <p className="text-xs font-light my-1">Order 44</p>
                <span className="text-xs font-light">
                  {" "}
                  02:23PM, 12 OCT 2023
                </span>
              </div>
            </div>
            <span className="bg-[#1B2E3C] text-[#F3E3E2] py-2 px-4 rounded-lg text-xs">
              Deliver
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-4">
              <Image src={Shirt} width={100} height={50} alt="shirt" />
              <div>
                <h2 className="text-sm font-normal">Product XYZ</h2>
                <p className="text-xs font-light my-1">Order 44</p>
                <span className="text-xs font-light">
                  {" "}
                  02:23PM, 12 OCT 2023
                </span>
              </div>
            </div>
            <span className="bg-[#1B2E3C] text-[#F3E3E2] py-2 px-4 rounded-lg text-xs">
              Deliver
            </span>
          </div>
        </div>
      </AccountLayout>
    </div>
  );
};

MyAccount.title = "Orders - Weird Entry";

export const getStaticProps: GetStaticProps = async () => {
  // Fetch data from the API using Axios
  const apiUrl =
    "https://weird-entry-lara-production.up.railway.app/api/product"; // Replace with your actual API endpoint

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
