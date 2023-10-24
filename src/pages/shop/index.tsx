import React from "react";
import Image from "next/image";
import Link from "next/link";
import toright from "../../../public/Images/toright.svg";
import ProductCategory from "@/components/ProductCategory";
import Products from "@/components/Products";
import { GetStaticProps } from "next";
import { ProductData } from "@/components/product";
import Breadcrumb from "@/components/BreadCrumb";

interface HomeProps {
  products: ProductData[]; // Make sure the interface matches the expected prop
}

const Index: React.FC<HomeProps> = ({ products }) => {
  return (
    <div>
      <Breadcrumb />
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
  // Fetch your JSON data here, for example, using `import`
  const productData = await import('../../../assets/productData.json');

  return {
    props: {
      products: productData.products as ProductData[], // Cast the products data to ProductData[]
    },
  };
};

export default Index;