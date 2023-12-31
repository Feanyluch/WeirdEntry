import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import cart from "../../../public/Images/cart1.png";
// import Cart from "../../public/Images/Cart.svg";
import Heart from "../../../public/Images/Heart.svg";
import User from "../../../public/Images/User.svg";
import hamburger from "../../../public/Images/hamburger.svg";

import weirdlogo from "../../../public/Images/weirdlogo.png";

import CartItems from "@/components/CartItems";
import { ProductData } from "@/components/product";
import { GetServerSideProps, GetStaticProps } from "next";
import axios from "axios";
import SignedinItem from "../SignedinItem";
import SearchComponent from "../SearchComponent";

import { ToastContainer, toast } from "react-toastify";

const Navbar: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);
  const user = useSelector((state: RootState) => state.auth.user);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const cartCountFromRedux = useSelector(
    (state: RootState) => state.cart.cartCount
  );

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        let cartCountFromAPI = 0;

        if (user) {
          const response = await axios.get(
            "https://weird-entry-lara-production.up.railway.app/api/cart",
            {
              headers: {
                Authorization: `Bearer ${user.token}`, // Replace with your actual access token
                Accept: "application/json",
              },
            }
          );
          const itemsObject = response.data.items || {};
          cartCountFromAPI = Object.keys(itemsObject).length;
        } else {
          // If user is not logged in, use the cart count from the Redux store
          cartCountFromAPI = cartCountFromRedux;
        }

        setCartCount(cartCountFromAPI);
      } catch (error: any) {
        console.error("Error fetching cart count from API:", error.message);
      }
    };

    fetchCartCount();
  }, [user, cartCountFromRedux]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        cartContainerRef.current &&
        !cartContainerRef.current.contains(e.target as Node)
      ) {
        setIsCartOpen(false);
      }

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }

      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    if (isCartOpen || isDropdownOpen || isSearchOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isCartOpen, isDropdownOpen, isSearchOpen]);

  return (
    <nav className="bg-[#FFFFFF] text-[#1B2E3C] sticky top-0 bg-opacity-70 backdrop-blur-xl z-[999]">
      <div className="max-w-[1200px] mx-auto py-4 px-4">
        <div className="relative flex justify-between items-center">
          <div className="">
            <div className="w-[200px] hidden sm:block">
              <Link href="/">
                <Image src={weirdlogo} alt="logo" />
              </Link>
            </div>
            <div className="block sm:hidden">
              <Image src={hamburger} alt="" />
            </div>
          </div>
          <div className={`${isSearchOpen ? "hidden" : "block"} uppercase`}>
            <ul className="hidden space-x-4 text-xl ml-8 sm:flex">
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
          <div className="w-[200px] block sm:hidden">
            <Link href="/">
              <Image src={weirdlogo} alt="logo" />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <SearchComponent onSearchToggle={toggleSearch} ref={searchRef} />
            </div>
            <div className="relative">
              <div className="p-2 relative cursor-pointer" onClick={toggleCart}>
                <Image
                  src={cart}
                  alt="Logo"
                  height={22}
                  width={22}
                  className="h-[25px] w-[22px]"
                />
                <h2 className="absolute top-0 right-0 bg-[#1B2E3C] text-white rounded-[50%] p-1 flex items-center justify-center h-5 w-5 text-sm">
                  {cartCount}
                </h2>
              </div>
            </div>
            <div className="absolute top-[100px] right-0">
              <ToastContainer />
            </div>
            {isCartOpen && (
              <div
                className="absolute top-[50px] right-0"
                ref={cartContainerRef}
              >
                <CartItems />
              </div>
            )}

            <div className="p-2 relative cursor-pointer hidden sm:block">
              <Image
                src={Heart}
                alt="Heart"
                height={22}
                width={22}
                className="h-[25px] w-[22px]"
              />
              <h2 className="absolute top-0 right-0 bg-[#1B2E3C] text-white rounded-[50%] p-1 flex items-center justify-center h-5 w-5 text-sm">
                0
              </h2>
            </div>
            <div className="hidden sm:block">
              {user ? (
                // If user is logged in, display image with user's first name
                <div className="p-2 cursor-pointer">
                  {/* <Image src={user} alt={user.firstName} height={22} width={22} /> */}
                  <div className="bg-[#1B2E3C] text-white p-1 text-sm relative rounded-lg">
                    <h2 className="text-sm px-2" onClick={toggleDropdown}>
                      {user.user.first_name}
                    </h2>
                  </div>
                </div>
              ) : (
                // If user is not logged in, display default user icon
                <div className="p-2 flex items-center justify-start gap-2 bg-[#f1f1f2] rounded-lg">
                  <Image src={User} alt="User" height={22} width={22} />
                  <Link href="/login">Sign in</Link>
                </div>
              )}
              {isDropdownOpen && (
                <div className="absolute top-[50px] right-0" ref={dropdownRef}>
                  <SignedinItem />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from the API using Axios
  const apiUrl =
    "https://weird-entry-lara-production.up.railway.app/api/product";

  try {
    const response = await axios.get(apiUrl);
    const productData = response.data;

    // Retrieve the cart count from the localStorage
    const storedState = localStorage.getItem("cartState");
    const parsedState = storedState ? JSON.parse(storedState) : { cart: {} };
    console.log({ parsedState });
    const initialCartCount = parsedState.cart.cartCount || 0;

    console.log("Initial Cart Count:", initialCartCount);

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
