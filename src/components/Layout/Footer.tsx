import Link from "next/link";
import Image from "next/image";
import React from "react";

import mstar from "../../../public/Images/mstart.svg";

import call from "../../../public/Images/Call.svg"
import locationw from "../../../public/Images/locationw.svg"
import Email from "../../../public/Images/Email.svg"

const Footer = () => {
  return (
    <div className="bg-[#F3E3E2]">
      <div className="w-[1300px] mx-auto py-16 px-8">
        <div className="flex items-center justify-center">
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
        </div>
      </div>
    </div>
  );
};

export default Footer;
