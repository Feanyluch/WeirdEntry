import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import Link from "next/link";
import Image from "next/image";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import cart from "../../../public/Images/cart1.png";
// import Cart from "../../public/Images/Cart.svg";
import Heart from "../../../public/Images/Heart.svg";
import Search from "../../../public/Images/Search.svg";
import User from "../../../public/Images/User.svg";
import Close from "../../../public/Images/Close.svg";

import weirdlogo from "../../../public/Images/weirdlogo.png";

import CartItems from "@/components/CartItems";
import { ProductData } from "@/components/product";
import { GetServerSideProps, GetStaticProps } from "next";
import axios from "axios";



const Navbar: React.FC = () => {
  const cartCount = useSelector((state: RootState) => state.cart.cartCount);
  const user = useSelector((state: RootState) => state.auth.user);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartContainerRef = useRef<HTMLDivElement | null>(null);
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (cartContainerRef.current && !cartContainerRef.current.contains(e.target as Node)) {
        setIsCartOpen(false);
      }
    };
  
    if (isCartOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isCartOpen]);
  

  return (
    <nav className="bg-[#FFFFFF] text-[#1B2E3C] sticky top-0 bg-opacity-70 backdrop-blur-xl z-[999]">
      <div className="w-[1200px] mx-auto py-4">
        <div className="relative flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-[200px]">
              <Link href="/">
                <Image src={weirdlogo} alt="logo" />
              </Link>
            </div>
          </div>
          <div className={`${isSearchOpen ? "hidden" : "block"} uppercase`}>
            <ul className="flex space-x-4 text-xl ml-8">
              <Link href="/" className={"px-2 nav-link mx-2 text-[14px]"}>
                Home
              </Link>
              <Link href="/shop" className={"px-2 nav-link mx-2 text-[14px]"}>
                Shop
              </Link>
              <Link
                href="/about-us"
                className={"px-2 nav-link mx-2 text-[14px]"}
              >
                About US
              </Link>
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <div
              className={`relative ${
                isSearchOpen ? "w-[33rem]" : "w-10"
              } transition-all duration-500`}
            >
              {isSearchOpen ? (
                <div className="relative">
                  <input
                    type="search"
                    className="bg-[#fff] text-sm py-2 px-4 rounded-lg border-2 border-[#1B2E3C] focus:outline-none w-full h-[70%]"
                    placeholder="Search"
                  />
                  <div
                    onClick={toggleSearch}
                    className="absolute top-3 right-3 cursor-pointer"
                  >
                    <Image src={Close} alt="close" className="h-[15px] w-[15px]" />
                  </div>
                </div>
              ) : (
                <div
                  className=" p-2 cursor-pointer flex justify-center items-center rounded-full border-transparent focus:outline-none focus:border-white"
                  onClick={toggleSearch}
                >
                  <Image src={Search} alt="search" height={17} width={17} className="h-[18px] w-[22px]" />
                </div>
              )}
            </div>
            <div className="relative">
              
              <div className="p-2 relative cursor-pointer" onClick={toggleCart}>
                <Image src={cart} alt="Logo" height={22} width={22} className="h-[25px] w-[22px]" />
                <h2 className="absolute top-0 right-0 bg-[#1B2E3C] text-white rounded-[50%] p-1 flex items-center justify-center h-5 w-5 text-sm">
                  {cartCount}
                </h2>
              </div>
              
              
            </div>
            {isCartOpen && (
                <div className="absolute top-[50px] right-0" ref={cartContainerRef}>
                  <CartItems />
                </div>
              )}

            <div className="p-2 relative cursor-pointer">
              <Image src={Heart} alt="Heart" height={22} width={22} className="h-[25px] w-[22px]" />
              <h2 className="absolute top-0 right-0 bg-[#1B2E3C] text-white rounded-[50%] p-1 flex items-center justify-center h-5 w-5 text-sm">
                0
              </h2>
            </div>
            {user ? (
              // If user is logged in, display image with user's first name
              <div className="p-2 cursor-pointer">
                {/* <Image src={user} alt={user.firstName} height={22} width={22} /> */}
                <span className="bg-[#1B2E3C] text-white p-1 text-sm">
                  User - {user.user.first_name}
                </span>
              </div>
            ) : (
              // If user is not logged in, display default user icon
              <div className="p-2">
                <Image src={User} alt="User" height={22} width={22} />
              </div>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from the API using Axios
  const apiUrl = "https://weird-entry-lara-production.up.railway.app/api/product";

  try {
    const response = await axios.get(apiUrl);
    const productData = response.data;

    // Retrieve the cart count from the localStorage
    const storedState = localStorage.getItem('cartState');
    const parsedState = storedState ? JSON.parse(storedState) : { cart: {} };
    console.log({parsedState})
    const initialCartCount = parsedState.cart.cartCount || 0;

    console.log('Initial Cart Count:', initialCartCount);

    return {
      props: {
        products: productData as ProductData[],
        initialCartCount,
      },
    };
  } catch (error: any) {
    console.error("Error fetching data from API:", error.message);
    throw new Error(`Failed to fetch data from API: ${error.message}`);
  }
};

export default Navbar;
