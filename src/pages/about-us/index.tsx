import React from "react";
import Image from "next/image";
import Link from "next/link";

import toright from "../../../public/Images/toright.svg";
import Breadcrumb from "@/components/BreadCrumb";

import { ProductData } from "@/components/product";
import { GetStaticProps } from "next";
import axios from "axios";

interface HomeProps {
  products?: { data: ProductData[] } | undefined; // Make the prop optional
}

const Index: React.FC<HomeProps> & { title: string}= ({ products }) => {
  return (
    <div>
      <Breadcrumb products={products} />
      <div className="grid grid-cols-2 h-[700px] my-14 mx-auto max-w-[1200px] ">
        <div className="bg-[#F3E3E2]">
          <h2 className="uppercase my-4 text-center text-5xl text-[#0C0C1E]">Our story</h2>
        </div>
        <div className="bg-[#1B2E3C]"></div>
      </div>
    </div>
  );
};

Index.title = 'About Page - Weird Entry';


export const getStaticProps: GetStaticProps = async () => {
  // Fetch data from the API using Axios
  const apiUrl = "https://weird-entry-lara-production.up.railway.app/api/product"; // Replace with your actual API endpoint

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

export default Index;
