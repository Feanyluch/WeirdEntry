import React from "react";
import Image from "next/image";
import { ProductData } from "@/components/product";
import Breadcrumb from "@/components/BreadCrumb";

import AccountLayout from "@/components/Layout/AccountLayout";

import Useraccount from "../../../public/Images/Useraccount.svg";
import box from "../../../public/Images/box.svg";
import card from "../../../public/Images/card.svg";
import Address from "../../../public/Images/Address.svg";

import { GetStaticProps } from "next";
import axios from "axios";

interface HomeProps {
  products: ProductData[]; // Make sure the interface matches the expected prop
}

const MyAccount: React.FC<HomeProps> & { title: string } = ({ products }) => {
  return (
    <div className="" style={{ fontFamily: "'Nokora', sans-serif" }}>
      <Breadcrumb products={products} />
      {/* <div className="w-[25%] h-fit bg-white flex flex-col">
            <div className="flex items-center justify-start gap-4 py-4 px-6 cursor-pointer hover:bg-[#F4F5F5] transition-all">
              <Image src={Useraccount} width={20} height={10} alt="" />
              <h2 className="text-sm font-normal">Account Details</h2>
            </div>
            <div className="flex items-center justify-start gap-4 py-4 px-6 cursor-pointer hover:bg-[#F4F5F5] transition-all">
              <Image src={box} width={20} height={10} alt="" />
              <h2 className="text-sm font-light">Orders</h2>
            </div>
            <div className="flex items-center justify-start gap-4 py-4 px-6 cursor-pointer hover:bg-[#F4F5F5] transition-all">
              <Image src={card} width={20} height={10} alt="" />
              <h2 className="text-sm font-light">Payment Methods</h2>
            </div>
            <div className="flex items-center justify-start gap-4 py-4 px-6 cursor-pointer hover:bg-[#F4F5F5] transition-all">
              <Image src={Address} width={20} height={10} alt="" />
              <h2 className="text-sm font-light">Address Book</h2>
            </div>
            <h2 className="text-sm font-light py-4 px-6 flex items-center justify-center cursor-pointer hover:bg-[#F4F5F5] transition-all">
              Account Management
            </h2>
            <h2 className="text-sm font-normal py-4 px-6 flex items-center justify-center cursor-pointer hover:bg-[#F4F5F5] transition-all">
              Logout
            </h2>
          </div> */}
      <AccountLayout>
        <div className="">
          <h2 className="uppercase text-sm font-normal tracking-[2px]">
            Address Book
          </h2>
          <div className="w-full h-[1px] bg-[#0C0C1E80] my-[20px]"></div>
          <div className="flex flex-col">
            <label className="text-[#1B2E3C80] text-xs">Email Address</label>
            <input
              type="text"
              className="rounded px-2 bg-[#1B2E3C0D] h-[40px] outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 my-[20px]">
            <div className="flex flex-col">
              <label className="text-[#1B2E3C80] text-xs">Town/State</label>
              <input
                type="text"
                className="rounded px-2 bg-[#1B2E3C0D] h-[40px] outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[#1B2E3C80] text-xs">Country</label>
              <input
                type="text"
                className="rounded px-2 bg-[#1B2E3C0D] h-[40px] outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-[40px]">
            <button className="px-[80px] py-[17px] text-sm border border-[#0C0C1E] hover:bg-[#0C0C1E] hover:text-[#F3E3E2] transition-all rounded-lg">
              Add Address
            </button>
          </div>
        </div>
      </AccountLayout>
    </div>
  );
};

MyAccount.title = "Address Book - Weird Entry";

export const getStaticProps: GetStaticProps = async () => {
  // Fetch data from the API using Axios
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
