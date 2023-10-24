import React from "react";

import Image from "next/image";
import Link from "next/link";

import shirt1 from "../../../public/Images/shirt1.png";
import shirt2 from "../../../public/Images/shirt2.png";
import shirt3 from "../../../public/Images/shirt3.png";
import shirt4 from "../../../public/Images/shirt4.png";

import star from "../../../public/Images/staricon.svg";
import nostar from "../../../public/Images/nostarticon.svg";

import toright from "../../../public/Images/toRight.svg";
import RelatedProducts from "@/components/RelatedProducts";
import { GetStaticProps } from "next";
import { ProductData } from "@/components/product";
import Breadcrumb from "@/components/BreadCrumb";

interface HomeProps {
  products: ProductData[]; // Make sure the interface matches the expected prop
}

const ProductDescription: React.FC<HomeProps> = ({ products }) => {
  return (
    <div>
      <Breadcrumb />
      <div className="w-[1100px] mx-auto text-[#1B2E3C] py-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3">
              <Image src={shirt1} alt="shirt" />
            </div>
            <div className="col-span-1">
              <Image src={shirt2} alt="shirt2" />
            </div>
            <div className="col-span-1">
              <Image src={shirt3} alt="shirt2" />
            </div>
            <div className="col-span-1">
              <Image src={shirt4} alt="shirt2" />
            </div>
          </div>
          <div className="">
            <div className="">
              <h2 className="uppercase py-4 text-5xl">Product Xyz</h2>
              <div className="flex my-4">
                <Image src={star} alt="star" />
                <Image src={star} alt="star" />
                <Image src={star} alt="star" />
                <Image src={star} alt="star" />
                <Image src={nostar} alt="star" />
              </div>
              <h2 className="text-3xl font-bold">N4,000</h2>
              <p className="py-6 break-words w-[80%] text-sm">
                Lorem ipsum dolor sit amet consectetur. Neque interdum ante
                pretium suscipit nec vitae. Ultrices libero fames morbi risus
                consequat. Lacinia tortor facilisis pellentesque mattis. Eu
                pharetra a neque sed condimentum arcu neque.
              </p>
              <div className="">
                <h4>Polo Sizes</h4>
                <div className="flex my-2">
                  <button className=" text-sm mr-4 border border-[#0C0C1E80] px-2">
                    Medium
                  </button>
                  <button className=" text-sm mr-4 border border-[#0C0C1E80] px-2">
                    Large
                  </button>
                  <button className=" text-sm mr-4 border border-[#0C0C1E80] px-2">
                    Extra Large
                  </button>
                  <button className=" text-sm mr-4 border border-[#0C0C1E80] px-2">
                    XXL
                  </button>
                </div>
              </div>
              <div className="my-8">
                <h4>Colors</h4>
                <div className="flex my-2">
                  <button className=" text-sm mr-4 border border-[#0C0C1E80] px-2">
                    Medium
                  </button>
                  <button className=" text-sm mr-4 border border-[#0C0C1E80] px-2">
                    Large
                  </button>
                  <button className=" text-sm mr-4 border border-[#0C0C1E80] px-2">
                    Extra Large
                  </button>
                  <button className=" text-sm mr-4 border border-[#0C0C1E80] px-2">
                    XXL
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button className="p-4">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1300px] mx-auto my-10">
        <h2 className="py-4 text-center uppercase text-xl my-4">Related Products</h2>
        <RelatedProducts products={products} />
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

export default ProductDescription;
