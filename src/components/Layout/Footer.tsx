import Link from "next/link";
import Image from "next/image";
import React from "react";

import mstar from "../../../public/Images/mstart.svg";

import call from "../../../public/Images/Call.svg";
import locationw from "../../../public/Images/locationw.svg";
import Email from "../../../public/Images/Email.svg";
import Logo from "../../../public/Images/weirdlogo.png";

const Footer = () => {
  return (
    <div className="bg-[#F3E3E2]">
      <div className="w-[1100px] mx-auto py-16 px-8">
        <div className="grid grid-cols-4 gap-20">
          <div className="">
            <Image src={Logo} alt="logo" />
            <h2 className="text-lg my-2">
              Elevate Your Style, Illuminate Your Presence.
            </h2>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-2">Quick Links</h2>
            <Link href="/" className="text-lg my-2">
              Home
            </Link>
            <Link href="/" className="text-lg my-2">
              Shop
            </Link>
            <Link href="/" className="text-lg my-2">
              My Account
            </Link>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-2">More Info</h2>
            <Link href="/" className="text-lg my-2">
              About Us
            </Link>
            <Link href="/" className="text-lg my-2">
              Shipping and Delivery
            </Link>
            <Link href="/" className="text-lg my-2">
              Terms of Service
            </Link>
            <Link href="/" className="text-lg my-2">
              Privacy Policy
            </Link>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-2">Quick Links</h2>
            <Link href="/" className="text-lg my-2">
              email: weirdentry@gmail.com
            </Link>
            <p className="text-lg my-2">
              Address: 44 Way, Weird Entry Street,<br /> Lagos, Nigeria.
            </p>
          </div>
        </div>
        <div className="mt-24 flex items-center justify-between">
          <h2 className="text-bold">&copy 2021 WEIRD ENTRY. | All rights reserved. | Designed and Developed by 44’’ Squad.</h2>
          <div className="flex items-center justify-center">
            <Link href="twitter.com">T</Link>
            <Link href="twitter.com">T</Link>
            <Link href="twitter.com">T</Link>
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
