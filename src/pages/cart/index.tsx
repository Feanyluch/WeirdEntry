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
            className="w-[300px] border border-[#0C0C1E] text-center rounded-lg my-8 py-4 text-base"
          >
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  const uniqueSelectedProducts = Array.from(new Set(selectedProducts));

  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const item of cartItems) {
      const product = products.find((p) => p.id === item.id);

      if (product) {
        const priceAsNumber = parseFloat(
          product.price.replace(/[^0-9.-]+/g, "")
        );
        console.log("Product Price:", product.price);
        console.log("Price as Number:", priceAsNumber);
        console.log("Item Quantity:", item.quantity);

        if (!isNaN(priceAsNumber)) {
          subtotal += priceAsNumber * item.quantity;
        }
      }
    }
    return subtotal;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shippingChargePercentage = 10; // Adjust based on your requirement
    const shippingCharge = (subtotal * shippingChargePercentage) / 100;
    return subtotal + shippingCharge;
  };

  const subtotal = calculateSubtotal();
  const total = calculateTotal();

  return (
    <div className="">
      <Breadcrumb products={products} />
      <div className="bg-[#fdf9f9] max-w-[1200px] px-[70px] pt-[60px] pb-[30px] mx-auto my-[60px]">
        <div className="flex w-full gap-[30px]">
          <div className="w-[60%] bg-[#F3E3E2] rounded-lg px-[40px] h-[550px] overflow-auto">
            {uniqueSelectedProducts.map((product) => (
              <CartProducts
                key={product.id}
                product={product}
                cartItems={cartItems}
              />
            ))}
          </div>
          <div className="w-[40%] pt-[10px] px-[20px]">
            <p className="text-base font-light tracking-[2px]">Coupon Code</p>
            <div className="w-full h-[1px] bg-[#0C0C1E80] my-[30px]"></div>
            <div className="flex justify-between items-center">
              <h2 className="text-base font-light tracking-[2px] uppercase">
                SubTotal
              </h2>{" "}
              <span className="text-lg font-bold ">
                N{subtotal.toLocaleString()}
              </span>
            </div>
            <div className="w-full h-[1px] bg-[#0C0C1E80] my-[30px]"></div>
            <p className="text-lg font-normal tracking-[3px] uppercase">
              Shipping
            </p>
            <div className="flex justify-between items-center my-[30px]">
              <h2 className="text-base font-light tracking-[2px] uppercase">
                Weird Entry (10%)
              </h2>{" "}
              <span className="text-lg font-bold ">
                N{(subtotal * 0.1).toLocaleString()}
              </span>
            </div>
            <p className="font-light text-sm w-[90%]">
              Shipping options and details will be updated during the checkout,
              click on the checkout button below to proceed.
            </p>
            <div className="w-full h-[1px] bg-[#0C0C1E80] my-[30px]"></div>
            <div className="flex justify-between items-center">
              <h2 className="text-base font-light tracking-[2px] uppercase">
                Total
              </h2>{" "}
              <span className="text-lg font-bold ">
                N{total.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-center my-8"><button className="bg-[#1B2E3C] text-[#F3E3E2] py-[17px] px-[80px] text-sm uppercase rounded-lg">Check out</button></div>
          </div>
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
