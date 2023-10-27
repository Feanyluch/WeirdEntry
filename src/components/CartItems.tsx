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
      <div className="bg-[#F3E3E2] w-[300px] flex items-center justify-center flex-col">
        <h2>Cart is empty</h2>

        <Link href="/cart">Go to Cart</Link>
      </div>
    );
  }

  const uniqueSelectedProducts = Array.from(new Set(selectedProducts)); // Remove duplicates

  if (uniqueSelectedProducts.length > 3) {
    // Display only the first 3 selected products
    return (
      <div className="bg-[#F3E3E2] w-[300px]">
        {uniqueSelectedProducts.slice(0, 3).map((product) => (
          <MiniProduct
          key={product.id}
          product={product}
          cartItems={cartItems}
        />
        ))}
        <Link href="/cart">Go to Cart</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F3E3E2] w-[300px]">
      {uniqueSelectedProducts.map((product) => (
        <MiniProduct
        key={product.id}
        product={product}
        cartItems={cartItems}
      />
      ))}

      <Link href="/cart">Go to Cart</Link>
    </div>
  );
};

export default CartItems;
