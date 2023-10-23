import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import Link from "next/link";
import Image from "next/image";

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import cart from "../../../public/Images/cart1.png";
// import Cart from "../../public/Images/Cart.svg";
import Heart from "../../../public/Images/Heart.svg";
import Search from "../../../public/Images/Search.svg";
import User from "../../../public/Images/User.svg";
import Close from "../../../public/Images/Close.svg";

import weirdlogo from "../../../public/Images/weirdlogo.png";

const Navbar: React.FC = () => {
  const cartCount = useSelector((state: RootState) => state.cart.cartCount);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className="bg-[#FFFFFF] text-[#1B2E3C] sticky top-0 bg-opacity-70 backdrop-blur-xl z-[999]">
      <div className="w-[1300px] mx-auto py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="height-[30px] w-[226px]">
              <Image src={weirdlogo} alt="logo" />
            </div>
          </div>
          <div className={`${isSearchOpen ? "hidden" : "block"} uppercase`}>
            <ul className="flex space-x-4 text-xl ml-8">
              <Link href="/" className={"px-2 nav-link mx-2"}>
                Home
              </Link>
              <Link href="/shop" className={"px-2 nav-link mx-2"}>
                Shop
              </Link>
              <Link href="/about-us" className={"px-2 nav-link mx-2"}>
                About US
              </Link>
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <div
              className={`relative ${
                isSearchOpen ? "w-[45rem]" : "w-10"
              } transition-all duration-500`}
            >
              {isSearchOpen ? (
                <div className="relative">
                  <input
                    type="search"
                    className="bg-[#fff] py-2 px-4 rounded-lg border-2 border-[#1B2E3C] focus:outline-none w-full"
                    placeholder="Search"
                  />
                  <div
                    onClick={toggleSearch}
                    className="absolute top-3 right-3 cursor-pointer"
                  >
                    <Image src={Close} alt="close" />
                  </div>
                </div>
              ) : (
                <div
                  className=" p-2 cursor-pointer flex justify-center items-center rounded-full border-transparent focus:outline-none focus:border-white"
                  onClick={toggleSearch}
                >
                  <Image src={Search} alt="search" />
                </div>
              )}
            </div>
            <div className="p-2 relative">
              <Image src={cart} alt="Logo" />
              <h2 className='absolute top-0 right-0 bg-[#1B2E3C] text-white rounded-[50%] p-1 flex items-center justify-center h-4 text-sm'>{cartCount}</h2>
            </div>
            <div className="p-2 relative">
              <Image src={Heart} alt="Heart" />
              <h2 className='absolute top-0 right-0 bg-[#1B2E3C] text-white rounded-[50%] p-1 flex items-center justify-center h-4 text-sm'>0</h2>
            </div>
            <div className="p-2">
              <Image src={User} alt="User" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
