import React from "react";
import Link from "next/link";
import Image from "next/image";
import Heart from "../../../public/Images/Heart.svg";
import User from "../../../public/Images/User.svg";
import home from "../../../public/Images/home.svg";
import Search from "../../../public/Images/Search.svg";

const MobileNav = () => {
  return (
    <div className="fixed bottom-0 right-0 w-full bg-white py-2 px-6 sm:hidden">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center flex-col">
          <Image src={home} alt="" />
          <h2 className="uppercase text-xs">Home</h2>
        </Link>
        <Link href="/" className="flex items-center justify-center flex-col">
          <Image src={Search} alt="" />
          <h2 className="uppercase text-xs">Search</h2>
        </Link>
        <Link href="/wishlist" className="flex items-center justify-center flex-col">
          <Image src={Heart} alt="" />
          <h2 className="uppercase text-xs">wishlist</h2>
        </Link>
        <Link href="/my-account" className="flex items-center justify-center flex-col">
          <Image src={User} alt="" />
          <h2 className="uppercase text-xs">profile</h2>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
