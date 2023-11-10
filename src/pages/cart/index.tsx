import Breadcrumb from "@/components/BreadCrumb";
import CartProducts from "@/components/CartProducts";
import Image from "next/image";
import React from "react";

import { ProductData } from "@/components/product";

import cartempty from "../../../public/Images/cartempty.png";
import Link from "next/link";
import { GetStaticProps } from "next";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface HomeProps {
  products: ProductData[]; // Make sure the interface matches the expected prop
}

const Cart: React.FC<HomeProps> = ({ products }) => {
  const selectedProducts = useSelector(
    (state: RootState) => state.cart.selectedProduct
  );

  const cartItems = useSelector((state: RootState) => state.cart.items);

  if (selectedProducts.length === 0) {
    return (
      <div>
        <Breadcrumb products={products} />
        <div className="flex items-center justify-center flex-col">
          <Image src={cartempty} alt="emptycart" />
          <h2 className="uppercase text-3xl my-4">
            YOUR CART IS CURRENTLY EMPTY
          </h2>
          <Link
            href="/shop"
            className="w-[300px] border border-[#0C0C1E] text-center rounded-lg my-8 py-4 text-lg"
          >
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  const uniqueSelectedProducts = Array.from(new Set(selectedProducts));

  return (
    <div className="">
      <Breadcrumb products={products} />

      <div className=" bg-[#fdf9f9] p-8 w-[1200px] mx-auto my-[3rem]">
        <div className="flex">
          <div className="bg-[#F3E3E2] rounded-lg w-[50%]">
            {uniqueSelectedProducts.map((product) => (
              <CartProducts
                key={product.id}
                product={product}
                cartItems={cartItems}
              />
            ))}
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Fetch your JSON data here, for example, using `import`
  const productData = await import("../../../assets/productData.json");

  return {
    props: {
      products: productData.products as ProductData[], // Cast the products data to ProductData[]
    },
  };
};

export default Cart;
