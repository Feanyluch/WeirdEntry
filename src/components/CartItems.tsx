import React from "react";
import { useSelector } from "react-redux";
import MiniProduct from "@/components/MiniProduct";
import { RootState } from "@/redux/store";
import { ProductData } from "@/components/product";
import Link from "next/link";

const CartItems: React.FC = () => {
  const selectedProducts = useSelector(
    (state: RootState) => state.cart.selectedProduct
  );

  const cartItems = useSelector((state: RootState) => state.cart.items);

  if (selectedProducts.length === 0) {
    return (
      <div className="bg-[#F3E3E2] rounded-lg w-[300px] p-4 flex items-center justify-center flex-col">
        <h2>Cart is empty</h2>

        <Link href="/cart/checkout" className="text-xl border-2 border-[#1B2E3C] bg-white m-4 flex items-center justify-center py-4 px-8 h-12 rounded-lg hover:bg-[#1B2E3C] hover:text-white transition-all ">Go to Cart</Link>
      </div>
    );
  }

  const uniqueSelectedProducts = Array.from(new Set(selectedProducts)); // Remove duplicates

  if (uniqueSelectedProducts.length > 3) {
    // Display only the first 3 selected products
    return (
      <div className="bg-[#F3E3E2] rounded-lg w-[300px] p-4">
        {uniqueSelectedProducts.slice(0, 3).map((product) => (
          <MiniProduct
          key={product.id}
          product={product}
          cartItems={cartItems}
        />
        ))}
        <Link href="/cart/checkout" className="text-xl border-2 border-[#1B2E3C] bg-white m-4 flex items-center justify-center py-4 px-8 h-12 rounded-lg hover:bg-[#1B2E3C] hover:text-white transition-all ">Go to Cart</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F3E3E2] rounded-lg w-[300px] p-4">
      {uniqueSelectedProducts.map((product) => (
        <MiniProduct
        key={product.id}
        product={product}
        cartItems={cartItems}
      />
      ))}

      <Link href="/cart/checkout" className="text-xl border-2 border-[#1B2E3C] bg-white m-4 flex items-center justify-center py-4 px-8 h-12 rounded-lg hover:bg-[#1B2E3C] hover:text-white transition-all ">Go to Cart</Link>
    </div>
  );
};

export default CartItems;
