import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MiniProduct from "@/components/MiniProduct";
import { RootState } from "@/redux/store";
import Link from "next/link";
import axios from "axios";

interface CartItem {
  quantity: number;
  // Add other properties as needed
  page: number;
  id: number;
  title: string;
  description: string;
  price: number;
  product_image: string;
  sizes: { id: number; title: string; description: string }[]; // Update this line
  colors: { id: number; title: string; description: string }[]; // Update this line
}

const CartItems: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const selectedProducts = useSelector(
    (state: RootState) => state.cart.selectedProduct
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        if (user?.token) {
          // Fetch cart data from the database endpoint
          const response = await axios.get("https://weird-entry-lara-production.up.railway.app/api/cart", {
            headers: {
              Authorization: `Bearer ${user.token}`,
              Accept: "application/json",
            },
          });

          const itemsArray: CartItem[] = Object.values(response.data.items);
          console.log({itemsArray})
          setCartData(itemsArray);
        } else {
          // Use cart data from the Redux store for non-logged-in users
          setCartData(cartItems as CartItem[]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setError("Error fetching cart data");
        setLoading(false);
      }
    };

    fetchCartData();
  }, [user?.token, cartItems]); // Dependencies on user?.token and cartItems

  if (loading) {
    return <div className="bg-[#F3E3E2] rounded-lg w-[500px] p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (cartData.length === 0) {
    return (
      <div>
        {/* Your empty cart message for non-logged-in users */}
      </div>
    );
  }

  const uniqueSelectedProducts = Array.from(new Set(cartData)); // Remove duplicates

  return (
    <div className="bg-[#F3E3E2] rounded-lg w-[500px] p-4">
      <h2 className="uppercase text-sm font-bold px-4">cart</h2>
      <div className="w-full h-[1px] bg-[#1B2E3C0D] my-[10px]"></div>
      <div className="grid grid-cols-3 p-4">
        <h2 className="uppercase font-bold text-xs">Items</h2>
        <h2 className="uppercase font-bold text-xs ml-8">qty</h2>
        <h2 className="uppercase font-bold text-xs ml-8">price</h2>
      </div>

      {uniqueSelectedProducts.slice(0, 3).map((product) => (
        <MiniProduct key={product.id} product={product} cartItems={[]} />
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
