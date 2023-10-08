import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import Link from "next/link";
import Image from "next/image";

import Cart from "../../public/Images/Cart.svg";
import Heart from "../../public/Images/Heart.svg";
import Search from "../../public/Images/Search.svg";
import User from "../../public/Images/User.svg";
import Close from "../../public/Images/Close.svg";

const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className="bg-[#FFFFFF] text-[#1B2E3C]">
      <div className="w-[1300px] mx-auto py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-2xl font-bold italic">
            Weird<span className="text-orange-500">E</span>ntry
          </div>
        </div>
        <div className={`${isSearchOpen ? "hidden" : "block"}`}>
          <ul className="flex space-x-4 ml-8">
            <Link href="/" className={"px-2"}>
              Home
            </Link>
            <Link href="/" className={"px-2"}>
              Shop
            </Link>
            <Link href="/" className={"px-2"}>
              ContactUs
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
                  className="bg-[#F3E3E2] py-2 px-4 rounded-lg border-2 border-transparent focus:outline-none focus:border-white w-full"
                  placeholder="Search"
                />
                <div onClick={toggleSearch} className="absolute top-3 right-3 cursor-pointer">
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
          <div className="p-2">
            <Image src={Cart} alt="Logo" />
          </div>
          <div className="p-2">
            <Image src={Heart} alt="Heart" />
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
