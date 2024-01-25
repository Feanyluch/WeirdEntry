import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Heart from "../../../public/Images/Heart.svg";
import User from "../../../public/Images/User.svg";
import home from "../../../public/Images/home.svg";
import Search from "../../../public/Images/Search.svg";
import shop from "../../../public/Images/shop.svg";
import SearchComponent from "../SearchComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface MobileNavProps {
  onSearchClick: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ onSearchClick }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="z-[99] fixed bottom-0 right-0 w-full bg-white py-2 px-6 sm:hidden">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center flex-col">
          <Image src={home} alt="" />
          <h2 className="uppercase text-xs">Home</h2>
        </Link>
        <div
          className="flex items-center justify-center flex-col gap-[6px] cursor-pointer"
          onClick={onSearchClick}
        >
          <Image src={Search} alt="" />
          <h2 className="uppercase text-xs">Search</h2>
        </div>
        <Link
          href="/shop"
          className="flex items-center justify-center flex-col gap-1"
        >
          <Image src={shop} alt="" />
          <h2 className="uppercase text-xs">shop</h2>
        </Link>
        {user ? (
          <Link
            href="/my-account"
            className="flex items-center justify-center flex-col"
          >
            <Image src={User} alt="" />
            <h2 className="uppercase text-xs">profile</h2>
          </Link>
        ) : (
          <Link
            href="/login"
            className="flex items-center justify-center flex-col"
          >
            <Image src={User} alt="" />
            <h2 className="uppercase text-xs">login</h2>
          </Link>
        )}
      </div>
      {/* <SearchComponent isSearchOpen={isSearchOpen} onSearchToggle={closeSearch} /> */}
    </div>
  );
};

export default MobileNav;