import Breadcrumb from "@/components/BreadCrumb";
import CartProducts from "@/components/CartProducts";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import cartempty from "../../../public/Images/cartempty.png";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { ProductData } from "@/components/product";
import axios from "axios";
import { GetStaticProps } from "next";
interface HomeProps {
  products?: { data: ProductData[] } | undefined; // Make the prop optional
}

interface CartItem {
  quantity: number;
  // Add other properties as needed
  page: number;
  id: number;
  title: string;
  description: string;
  price: number;
  product_image: string;
  size: string;
  color: string;
  sizes: { id: number; title: string; description: string }[]; // Update this line
  colors: { id: number; title: string; description: string }[]; // Update this line
}

const Cart: React.FC<HomeProps> & { title: string } = ({ products }) => {
  const selectedProducts = useSelector(
    (state: RootState) => state.cart.selectedProduct
  );
  
  const user = useSelector((state: RootState) => state.auth.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  console.log({cartItems})

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
      <ProtectedRoute>
        <div>
          <Breadcrumb products={products} />
          <div className="flex items-center justify-center flex-col">
            <Image src={cartempty} alt="emptycart" />
            <h2 className="uppercase text-3xl my-4">
              YOUR CART IS CURRENTLY EMPTY
            </h2>
            <Link
              href="/shop"
              className="w-[300px] border border-[#0C0C1E] text-center rounded-lg my-8 py-4 text-sm"
            >
              Return to shop
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const uniqueSelectedProducts = Array.from(new Set(cartData));

  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const item of cartData) {
      if (products && Array.isArray(products.data)) {
        const product = products.data.find((p) => p.id === item.id);

        if (product) {
          const priceAsNumber = product.price;
          console.log("Product Price:", product.price);
          console.log("Price as Number:", priceAsNumber);
          console.log("Item Quantity:", item.quantity);

          if (!isNaN(priceAsNumber)) {
            subtotal += priceAsNumber * item.quantity;
            console.log("Subtotal after this iteration:", subtotal);
          }
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
  console.log({ subtotal });
  const total = calculateTotal();

  return (
      <div className="">
        <Breadcrumb products={products} />
        <div className="bg-[#fdf9f9] max-w-[1200px] px-[70px] pt-[60px] pb-[30px] mx-auto my-[60px]">
          <div className="flex w-full gap-[30px] h-[480px]">
            <div className="w-[50%] bg-[#F3E3E2] rounded-lg px-[40px] overflow-auto py-6 flex flex-col gap-6">
              {uniqueSelectedProducts.map((product) => (
                <CartProducts
                  key={product.id}
                  product={product}
                  cartItems={cartItems}
                />
              ))}
            </div>
            <div className="w-[40%] pt-[10px] px-[20px]">
              <p className="text-sm font-light tracking-[2px]">Coupon Code</p>
              <div className="w-full h-[1px] bg-[#0C0C1E80] my-[30px]"></div>
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-light tracking-[1px] uppercase">
                  SubTotal
                </h2>{" "}
                <span className="text-sm font-bold ">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="w-full h-[1px] bg-[#0C0C1E80] my-[30px]"></div>
              <p className="text-sm font-normal tracking-[1px] uppercase">
                Shipping
              </p>
              <div className="flex justify-between items-center my-[30px]">
                <h2 className="text-sm font-light tracking-[1px] uppercase">
                  Weird Entry (10%)
                </h2>{" "}
                <span className="text-sm font-bold ">
                  ₦{(subtotal * 0.1).toLocaleString()}
                </span>
              </div>
              <p className="font-light text-xs w-[90%]">
                Shipping options and details will be updated during the
                checkout, click on the checkout button below to proceed.
              </p>
              <div className="w-full h-[1px] bg-[#0C0C1E80] my-[30px]"></div>
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-light tracking-[2px] uppercase">
                  Total
                </h2>{" "}
                <span className="text-sm font-bold ">
                  ₦{total.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-center my-8">
                <Link
                  href="cart/checkout"
                  className="bg-[#1B2E3C] text-[#F3E3E2] py-[17px] px-[80px] text-sm uppercase rounded-lg"
                >
                  Check out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

Cart.title = 'Cart - Weird Entry';

export const getStaticProps: GetStaticProps = async () => {
  // Fetch data from the API using Axios
  const apiUrl =
    "https://weird-entry-lara-production.up.railway.app/api/product"; // Replace with your actual API endpoint

  try {
    const response = await axios.get(apiUrl);
    const productData = response.data;
    console.log("Product Data", productData);

    return {
      props: {
        products: productData as ProductData[],
      },
    };
  } catch (error: any) {
    console.error("Error fetching data from API:", error.message);
    throw new Error(`Failed to fetch data from API: ${error.message}`);
  }
};

export default Cart;
