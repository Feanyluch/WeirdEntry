import Image from "next/image";
import { Inter } from "next/font/google";
import { Nokora } from "next/font/google";
import Navbar from "@/components/Layout/Navbar";
import Banner from "@/components/Banner";

import banner1 from "../../public/Images/banner1.png";
import Energy from "../../public/Images/Energy.svg";
import Dollar from "../../public/Images/Dollar.svg";
import Star from "../../public/Images/Star.svg";
import staricon from "../../public/Images/staricon.svg";
import Heart from "../../public/Images/Heart.svg";

import shirt from "../../public/Images/shirt.png";
import short1 from "../../public/Images/short1.png";
import short2 from "../../public/Images/short2.png";
import cargo from "../../public/Images/cargo.png";
import tshirt from "../../public/Images/tshirt.png";
import girl from "../../public/Images/girl.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      style={{ fontFamily: "'Nokora', sans-serif" }}
      className={`${inter.className} text-[#1B2E3C] bg-white`}
    >
      <Banner />
      {/* <Image src={banner1} alt="banner" /> */}
      
      <div className="py-16">
        <h2 className="text-center text-2xl tracking-[3.6px]">
          What makes us different
        </h2>
        <div className="w-[1300px] mx-auto">
          <div className="grid grid-cols-4 gap-[40px] mt-[50px]">
            <div className="">
              <Image src={Energy} alt="energy" className="mb-[16px]" />
              <div>
                <h2 className="text-xl mb-[8px]">Super Fast Delivery</h2>
                <p>
                  Order before 3pm and get your order the next hour as standard
                </p>
              </div>
            </div>
            <div className="">
              <Image src={Dollar} alt="dollar" className="mb-[16px]" />
              <div>
                <h2 className="text-xl mb-[8px]">Affordable Prices</h2>
                <p>
                  For our material and quality you won’t find better prices
                  anywhere else
                </p>
              </div>
            </div>
            <div className="">
              <Image src={Star} alt="Star" className="mb-[16px]" />
              <div>
                <h2 className="text-xl mb-[8px]">Trend Masters</h2>
                <p>
                  Trend is not an issue, we set standards that can’t be met by
                  others
                </p>
              </div>
            </div>
            <div className="">
              <Image src={Star} alt="Star" className="mb-[16px]" />
              <div>
                <h2 className="text-xl mb-[8px]">Trend Masters</h2>
                <p>
                  Trend is not an issue, we set standards that can’t be met by
                  others
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 py-[60px] bg-[#1B2E3C]">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <Image src={shirt} alt="shirt" />
          </div>
          <div className="grid grid-row-2 gap-8">
            <Image src={short1} alt="short1" />
            <Image src={short2} alt="short2" />
          </div>
          <div>
            <Image src={cargo} alt="cargo" />
          </div>
        </div>
      </div>
      <div className="text-center py-[60px]">
        <h2 className="text-2xl tracking-[3.6px] font-light">Latest Release</h2>
        <h2 className="my-2">+</h2>
        <h2 className="text-5xl font-normal">TRENDING</h2>
      </div>
      <div className="w-[1300px] mx-auto my-[70px]">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <Image src={tshirt} alt="tshirt" />
            <div className="my-5">
              <h2 className="">Product XYZ</h2>
              <div className="flex my-2">
                <Image src={staricon} alt="starticon" />
                <Image src={staricon} alt="starticon" />
                <Image src={staricon} alt="starticon" />
                <Image src={staricon} alt="starticon" />
              </div>
              <h2>N4,000.00</h2>
            </div>
            <div className="flex gap-6">
              <button className="py-4 w-[220px] uppercase border border-[#0C0C1E]">
                Add to cart
              </button>
              <button className="w-[56px] border border-[#0C0C1E] flex items-center justify-center">
                <Image src={Heart} alt="heart" />
              </button>
            </div>
          </div>
          <div>
            <Image src={tshirt} alt="tshirt" />
            <div className="my-5">
              <h2 className="">Product XYZ</h2>
              <div className="flex my-2">
                <Image src={staricon} alt="starticon" />
                <Image src={staricon} alt="starticon" />
                <Image src={staricon} alt="starticon" />
                <Image src={staricon} alt="starticon" />
              </div>
              <h2>N4,000.00</h2>
            </div>
            <div className="flex gap-6">
              <button className="py-4 w-[220px] uppercase border border-[#0C0C1E]">
                Add to cart
              </button>
              <button className="w-[56px] border border-[#0C0C1E] flex items-center justify-center">
                <Image src={Heart} alt="heart" />
              </button>
            </div>
          </div>
          <div>
            <Image src={tshirt} alt="tshirt" />
            <div className="my-5">
              <h2 className="">Product XYZ</h2>
              <div className="flex my-2">
                <Image src={staricon} alt="starticon" />
                <Image src={staricon} alt="starticon" />
                <Image src={staricon} alt="starticon" />
                <Image src={staricon} alt="starticon" />
              </div>
              <h2>N4,000.00</h2>
            </div>
            <div className="flex gap-6">
              <button className="py-4 w-[220px] uppercase border border-[#0C0C1E]">
                Add to cart
              </button>
              <button className="w-[56px] border border-[#0C0C1E] flex items-center justify-center">
                <Image src={Heart} alt="heart" />
              </button>
            </div>
          </div>
          <div>
            <Image src={tshirt} alt="tshirt" />
            <div className="my-5">
              <h2 className="">Product XYZ</h2>
              <div className="flex my-2">
                <Image src={staricon} alt="starticon" />
                <Image src={staricon} alt="starticon" />
                <Image src={staricon} alt="starticon" />
                <Image src={staricon} alt="starticon" />
              </div>
              <h2>N4,000.00</h2>
            </div>
            <div className="flex gap-6">
              <button className="py-4 w-[220px] uppercase border border-[#0C0C1E]">
                Add to cart
              </button>
              <button className="w-[56px] border border-[#0C0C1E] flex items-center justify-center">
                <Image src={Heart} alt="heart" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1200px] mx-auto my-10">
        <div className="grid grid-cols-2">
          <div className="flex items-center justify-center bg-[#1B2E3C] text-[#F3E3E2] p-12">
            <div className="">
              <h2 className="text-center text-5xl">ABOUT</h2>
              <p className="my-8 text-lg">
                Lorem ipsum dolor sit amet consectetur. Neque interdum ante
                pretium suscipit nec vitae. Ultrices libero fames morbi risus
                consequat. Lacinia tortor facilisis pellentesque mattis. Eu
                pharetra a neque sed condimentum arcu neque. <br /> <br />
                Lorem ipsum dolor sit amet consectetur. Neque interdum ante
                pretium suscipit nec vitae. Ultrices libero fames morbi risus
                consequat. Lacinia tortor facilisis pellentesque mattis. Eu
                pharetra a neque sed condimentum arcu neque.
              </p>
            </div>
          </div>
          <div>
            <Image src={girl} alt="girl" />
          </div>
        </div>
      </div>
    </div>
  );
}
