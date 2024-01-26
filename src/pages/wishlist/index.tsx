import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/BreadCrumb";
import axios from "axios";
import { GetStaticProps } from "next";
import { ProductData } from "@/components/product";
import EmailVerification from "@/components/EmailVerification";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";

import wishlist from "../../../public/Images/wishlist.png";



interface HomeProps {
  products: ProductData[];
}

const Index: React.FC<HomeProps> & { title: string } = ({ products }) => {
//   const user = useSelector((state: RootState) => state.auth.user);
//   const router = useRouter();

  return (
    <div>
      <Breadcrumb products={products} />
      <div className="flex items-center justify-center flex-col">
        <Image src={wishlist} alt="emptycart" className="my-8" />
        <h2 className="uppercase text-lg sm:text-3xl text-center my-4">
          YOUR wishlist IS CURRENTLY EMPTY
        </h2>
        <Link
          href="/shop"
          className="w-[200px] sm:w-[300px] hover:bg-[#1B2E3C] hover:text-[#F3E3E2] border border-[#0C0C1E] text-center rounded-lg my-8 py-4 text-sm"
        >
          Return to shop
        </Link>
      </div>
    </div>
  );
};

Index.title = "Wishlist - Weird Entry";

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

export default Index;