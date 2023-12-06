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
      <div>
        {/* //{" "} */}
        {/* <div className="bg-[#F3E3E2] h-[100px] rounded-lg w-[300px] p-4 flex items-center justify-center flex-col"> */}
          {/* // <h2>Cart is empty</h2> */}
          {/* <Link href="/cart" className="text-xl border-2 border-[#1B2E3C] m-4 flex items-center justify-center py-4 px-8 h-12 rounded-lg bg-[#1B2E3C] text-white transition-all ">Go to Cart</Link> */}
          {/* //{" "} */}
        {/* </div> */}
      </div>
    );
  }

  const uniqueSelectedProducts = Array.from(new Set(selectedProducts)); // Remove duplicates

  if (uniqueSelectedProducts.length > 3) {
    // Display only the first 3 selected products
    return (
      <div className="bg-[#F3E3E2] rounded-lg w-[500px] p-4">
        <h2 className="uppercase text-sm font-bold px-4">cart</h2>
        <div className="w-full h-[1px] bg-[#1B2E3C0D] my-[10px]"></div>
        <div className="grid grid-cols-3 p-4">
          <h2 className="uppercase font-bold text-xs">Items</h2>
          <h2 className="uppercase font-bold text-xs ml-8">qty</h2>
          <h2 className="uppercase font-bold text-xs ml-8">price</h2>
          {/* <h2 className="uppercase font-bold text-xs"></h2> */}
        </div>

        {uniqueSelectedProducts.slice(0, 3).map((product) => (
          <MiniProduct
            key={product.id}
            product={product}
            cartItems={cartItems}
          />
        ))}
        <Link
          href="/cart"
          className="text-xl border-2 border-[#1B2E3C] m-4 flex items-center justify-center py-4 px-8 h-12 rounded-lg bg-[#1B2E3C] text-white transition-all uppercase"
        >
          checkout
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F3E3E2] rounded-lg w-[500px] p-4">
      <h2 className="uppercase text-sm font-bold px-4">cart</h2>
        <div className="w-full h-[1px] bg-[#1B2E3C0D] my-[10px]"></div>
        <div className="grid grid-cols-3 p-4">
          <h2 className="uppercase font-bold text-xs">Items</h2>
          <h2 className="uppercase font-bold text-xs ml-8">qty</h2>
          <h2 className="uppercase font-bold text-xs ml-8">price</h2>
          {/* <h2 className="uppercase font-bold text-xs"></h2> */}
        </div>
      {uniqueSelectedProducts.map((product) => (
        <MiniProduct key={product.id} product={product} cartItems={cartItems} />
      ))}

      <Link
        href="/cart"
        className="text-xl border-2 border-[#1B2E3C] m-4 flex items-center justify-center py-4 px-8 h-12 rounded-lg bg-[#1B2E3C] text-white transition-all uppercase"
      >
        checkout
      </Link>
    </div>
  );
};

export default CartItems;
