import Link from "next/link";
import Image from "next/image";
import React from "react";

import mstar from "../../../public/Images/mstart.svg";

import instagram from "../../../public/Images/Instagram.png";
import facebook from "../../../public/Images/Facebook.png";
import twitter from "../../../public/Images/TwitterX.png";
import Logo from "../../../public/Images/weirdlogo.png";

const Footer = () => {
  return (
    <div
      className="bg-[#F3E3E2] text-[#1B2E3C]"
      style={{ fontFamily: "'Nokora', sans-serif" }}
    >
      <div className="max-w-[1000px] mx-auto pb-24 pt-8">
        <div className="flex items-center justify-start flex-col sm:grid sm:grid-cols-4 gap-20 px-4">
          <div className="">
            <Image src={Logo} alt="logo" className="w-[120px] sm:w-full" />
            <h2 className="hidden sm:block text-xs sm:text-[14px] my-2">
              Elevate Your Style, Illuminate Your Presence.
            </h2>
          </div>
          <div className="hidden sm:flex flex-col">
            <h2 className="text-sm font-bold mb-2">Quick Links</h2>
            <Link
              href="/"
              className="text-xs sm:text-[14px] my-2 hover:underline"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-xs sm:text-[14px] my-2 hover:underline"
            >
              Shop
            </Link>
            <Link
              href="/my-account"
              className="text-xs sm:text-[14px] my-2 hover:underline"
            >
              My Account
            </Link>
          </div>
          <div className="hidden sm:flex flex-col">
            <h2 className="text-sm font-bold mb-2">Quick Links</h2>
            <Link
              href="/about-us"
              className="text-xs sm:text-[14px] my-2 hover:underline"
            >
              About Us
            </Link>
            <Link
              href="/"
              className="text-xs sm:text-[14px] my-2 hover:underline"
            >
              Shipping and Delivery
            </Link>
            <Link
              href="/"
              className="text-xs sm:text-[14px] my-2 hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              href="/"
              className="text-xs sm:text-[14px] my-2 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
          <div className="hidden sm:flex flex-col">
            <h2 className="text-sm font-bold mb-2">More Info</h2>
            <Link href="/" className="text-xs sm:text-[14px] my-2">
              {/* email: weirdentry@gmail.com */}
            </Link>
            <p className="text-xs sm:text-[14px] my-2">
              Address: 44 Way, Weird Entry Street,
              <br /> Lagos, Nigeria.
            </p>
          </div>
        </div>
        <div className="sm:hidden flex items-center justify-center flex-col my-8 gap-3 text-center max-w-[240px] mx-auto">
          <h2 className="font-bold captilize">Contact us</h2>
          <h2 className="text-sm">Email: Weirdentry@gmail.com</h2>
          <h2 className="text-sm">Phone: +234 999 999 9994</h2>
          <h2 className="text-sm">
            Address: 44 Way, Weird Entry Street, Lagos, Nigeria.
          </h2>
        </div>
        <div className="sm:hidden flex items-center justify-center flex-col my-8 gap-2">
          <h2>Follow us</h2>
          <div className="sm:hidden flex items-center justify-center gap-4 sm:my-0">
            <Link href="instagram.com">
              <Image src={instagram} alt="" height={20} width={20} />
            </Link>
            <Link href="facebook.com">
              <Image src={facebook} alt="" height={20} width={20} />
            </Link>
            <Link href="twitter.com">
              <Image src={twitter} alt="" height={20} width={20} />
            </Link>
          </div>
        </div>

        <div className="mt-4 sm:mt-24 flex items-center justify-between flex-col sm:flex-row px-4 text-center">
          <h2 className="text-bold text-[12px]">
            &#169; 2021 WEIRD ENTRY. | All rights reserved. | Designed and
            Developed by 44’’ Squad.
          </h2>
          <div className="hidden sm:flex items-center justify-center my-4 gap-3 sm:my-0">
            <Link href="instagram.com">
              <Image src={instagram} alt="" height={20} width={20} />
            </Link>
            <Link href="facebook.com">
              <Image src={facebook} alt="" height={20} width={20} />
            </Link>
            <Link href="twitter.com">
              <Image src={twitter} alt="" height={20} width={20} />
            </Link>
          </div>
        </div>
        {/* <div className="flex items-center justify-center">
          <Link href="/shop" className="px-4">
            Shop
          </Link>
          <Image src={mstar} alt="star" className="mx-4" />
          <Link href="/shop" className="px-4">
            Contact us
          </Link>
          <Image src={mstar} alt="star" className="mx-4" />
          <Link href="/" className="px-4">
            About
          </Link>
        </div>
        <div className="flex flex-col my-8">
          <div className="flex items-center justify-start">
            <Image src={call} alt="call" />
            <Link href="/shop" className="py-4 mx-4">
              Contact
            </Link>
          </div>
          <div className="flex items-center justify-start">
            <Image src={locationw} alt="call" />
            <Link href="/shop" className="py-4 mx-4">
              Office Address
            </Link>
          </div>
          <div className="flex items-center justify-start">
            <Image src={Email} alt="call" />
            <Link href="/" className="py-4 mx-4">
              Mail us
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
