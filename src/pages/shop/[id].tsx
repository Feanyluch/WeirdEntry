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
import { GetStaticPaths, GetStaticProps } from "next";
import { ProductData } from "@/components/product";
import Breadcrumb from "@/components/BreadCrumb";
import { useRouter } from "next/router";
import StarRating from "@/components/StarRating";

interface HomeProps {
  products: ProductData[]; // Make sure the interface matches the expected prop
}

const ProductDescription: React.FC<HomeProps> = ({ products }) => {
  const router = useRouter();
  const { id } = router.query; // Get the product ID from the router

  // Find the selected product based on the ID
  const selectedProduct = products.find((product) => product.id === parseInt(id as string, 10));

  if (!selectedProduct) {
    // Handle the case where the product is not found
    return <div>Product not found</div>;
  }
  return (
    <div>
      <Breadcrumb products={products} />
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
              <h2 className="uppercase py-2 text-3xl">{selectedProduct.productName}</h2>
              <div className="flex my-2">
                <StarRating rating={selectedProduct.rating} />
              </div>
              <h2 className="text-xl font-bold">{selectedProduct.price}</h2>
              <p className="py-6 break-words w-[80%] text-sm">
                Lorem ipsum dolor sit amet consectetur. Neque interdum ante
                pretium suscipit nec vitae. Ultrices libero fames morbi risus
                consequat. Lacinia tortor facilisis pellentesque mattis. Eu
                pharetra a neque sed condimentum arcu neque.
              </p>
              <div className="">
                <h4>Polo Sizes</h4>
                <div className="flex my-2">
                  <button className=" text-sm mr-4 border border-[#0C0C1E80] px-2 hover:bg-[#1B2E3C] hover:text-white transition ease-in-out duration-300">
                    Medium
                  </button>
                  <button className=" text-sm mr-4 border border-[#0C0C1E80] px-2 hover:bg-[#1B2E3C] hover:text-white transition ease-in-out duration-300">
                    Large
                  </button>
                  <button className=" text-sm mr-4 border border-[#0C0C1E80] px-2 hover:bg-[#1B2E3C] hover:text-white transition ease-in-out duration-300">
                    Extra Large
                  </button>
                  <button className=" text-sm mr-4 border border-[#0C0C1E80] px-2 hover:bg-[#1B2E3C] hover:text-white transition ease-in-out duration-300">
                    XXL
                  </button>
                </div>
              </div>
              <div className="my-8">
                <h4>Colors</h4>
                <div className="flex my-2">
                  <button className=" text-sm mr-4 border border-[#0C0C1E80] px-2 hover:bg-[#1B2E3C] hover:text-white transition ease-in-out duration-300">
                    Medium
                  </button>
                  <button className=" text-sm mr-4 border border-[#0C0C1E80] px-2 hover:bg-[#1B2E3C] hover:text-white transition ease-in-out duration-300">
                    Large
                  </button>
                  <button className=" text-sm mr-4 border border-[#0C0C1E80] px-2 hover:bg-[#1B2E3C] hover:text-white transition ease-in-out duration-300">
                    Extra Large
                  </button>
                  <button className=" text-sm mr-4 border border-[#0C0C1E80] px-2 hover:bg-[#1B2E3C] hover:text-white transition ease-in-out duration-300">
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

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch your JSON data or use another data source to get the list of product IDs
  const productData = await import('../../../assets/productData.json');
  const products = productData.products as ProductData[];

  // Create an array of product IDs for the dynamic paths
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: false, // Set to 'true' or 'blocking' if you want to enable fallback behavior
  };
};

export default ProductDescription;
