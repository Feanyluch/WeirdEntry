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
import { useRouter } from "next/router";
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
  // console.log({cartItems})

  const [cartData, setCartData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/checkout");
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        if (user?.token) {
          // Fetch cart data from the database endpoint
          const response = await axios.get(
            "https://weird-entry-lara-production.up.railway.app/api/cart",
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
                Accept: "application/json",
              },
            }
          );

          if (response.status === 400) {
            // If response status is 400, show the empty cart content
            setCartData([]);
            setLoading(false);
            return; // Exit the function early to prevent further execution
          }

          const itemsArray = response.data.items;
          console.log({ itemsArray });
          setCartData(itemsArray);
        } else {
          // Use cart data from the Redux store for non-logged-in users
          setCartData(cartItems as ProductData[]);
        }

        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching cart data:", error);
        setError(`Error fetching cart data: ${error.message}`);
        setLoading(false);
      }
    };

    fetchCartData();
    console.log("Raw cartData:", cartData);
  }, [user?.token, cartItems]);

  if (loading) {
    return (
      <div className="bg-[#F3E3E2] rounded-lg w-full p-4 text-center">
        Loading...
      </div>
    );
  }

  if (error && error.includes("Request failed with status code 400")) {
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
            className="w-[300px] border border-[#0C0C1E] text-center rounded-lg my-8 py-4 text-sm"
          >
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  if (Object.keys(cartData).length === 0) {
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
            className="w-[300px] border border-[#0C0C1E] text-center rounded-lg my-8 py-4 text-sm"
          >
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  const uniqueSelectedProducts = Object.values(cartData).map((item) => item);
  console.log({ uniqueSelectedProducts });

  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const item of uniqueSelectedProducts) {
      if (products && Array.isArray(products.data)) {
        const product = products.data.find((p) => p.id === item.id);

        if (product) {
          const priceAsNumber = product.price;
          // console.log("Product Price:", product.price);
          // console.log("Price as Number:", priceAsNumber);
          // console.log("Item Quantity:", item.quantity);

          if (!isNaN(priceAsNumber)) {
            subtotal += priceAsNumber * item.quantity;
            // console.log("Subtotal after this iteration:", subtotal);
          }
        }
      }
    }
    return subtotal;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shippingCharge = 4000;
    return subtotal + shippingCharge;
  };

  const subtotal = calculateSubtotal();
  // console.log({ subtotal });
  const total = calculateTotal();

  return (
    <div className="">
      <Breadcrumb products={products} />
      <div className="sm:bg-[#fdf9f9] max-w-[1200px] sm:px-[70px] sm:pt-[60px] sm:pb-[30px] mx-auto my-[20px] sm:my-[60px]">
        <div className="flex flex-col sm:flex-row w-full gap-[30px] h-full sm:h-[480px]">
          <div className="sm:w-[60%] overflow-auto max-h-[400px] my-2">
            <CartProducts cartData={cartData} />
          </div>
          <div className="sm:w-[40%] pt-[10px] px-[20px]">
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
                Weird Entry
              </h2>{" "}
              <span className="text-sm font-bold ">
                ₦4, 000
              </span>
            </div>
            <p className="font-light text-xs w-[90%]">
              Shipping options and details will be updated during the checkout,
              click on the checkout button below to proceed.
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
              <button
                onClick={handleButtonClick}
                className="bg-[#1B2E3C] text-[#F3E3E2] py-[17px] px-[40px] sm:px-[80px] text-sm uppercase rounded-lg"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Cart.title = "Cart - Weird Entry";

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
