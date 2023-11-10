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

  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const item of cartItems) {
      const product = products.find((p) => p.id === item.id);
  
      if (product) {
        const priceAsNumber = parseFloat(product.price.replace(/[^0-9.-]+/g, ''));
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
      <div className="bg-[#fdf9f9] p-8 w-[1200px] mx-auto my-[3rem]">
        <div className="grid grid-cols-2 gap-12">
          <div className="bg-[#F3E3E2] rounded-lg">
            {uniqueSelectedProducts.map((product) => (
              <CartProducts
                key={product.id}
                product={product}
                cartItems={cartItems}
              />
            ))}
          </div>
          <div className="">
          <h2>SubTotal: {subtotal.toLocaleString()}</h2>
          <p>Shipping charges (10%): {(subtotal * 0.1).toLocaleString()}</p>
          <h2>Total: {total.toLocaleString()}</h2>
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
