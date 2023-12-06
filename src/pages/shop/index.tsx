import React from "react";
import Image from "next/image";
import Link from "next/link";
import toright from "../../../public/Images/toright.svg";
import ProductCategory from "@/components/ProductCategory";
import Products from "@/components/Products";
import { GetStaticProps } from "next";
import { ProductData } from "@/components/product";
import Breadcrumb from "@/components/BreadCrumb";
import axios from "axios";

interface HomeProps {
  products?: { data: ProductData[] } | undefined; // Make the prop optional
}

const Index: React.FC<HomeProps> = ({ products }) => {
  return (
    <div>
      <Breadcrumb products={products} />
      <div className="w-[1200px] mx-auto flex gap-8 my-12">
        <div className="w-1/4 flex-shrink-0">
          <div className="sticky top-40">
            <ProductCategory />
          </div>
        </div>
        <div className="overflow-y-auto px-4 product-container">
          <Products products={products} />
        </div>
      </div>
    </div>
  );
};

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









// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vd2VpcmQtZW50cnktbGFyYS1wcm9kdWN0aW9uLnVwLnJhaWx3YXkuYXBwL2FwaS9yZWdpc3RlciIsImlhdCI6MTcwMTgwNjU0MSwiZXhwIjoxNzAxODEwMTQxLCJuYmYiOjE3MDE4MDY1NDEsImp0aSI6IkhJOFpHV053eDU2OEdObGQiLCJzdWIiOiIyIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.w7MMZJq5yKWqYnOF2xKqkpsI8Dh0dD2RwIZUuRSA4kg';