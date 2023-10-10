import React from "react";

import Image from "next/image";
import Link from "next/link";

import shirt1 from "../../../public/Images/shirt1.png";
import shirt2 from "../../../public/Images/shirt2.png";
import shirt3 from "../../../public/Images/shirt3.png";
import shirt4 from "../../../public/Images/shirt4.png";

import star from "../../../public/Images/staricon.svg";
import nostar from "../../../public/Images/nostarticon.svg";

import toright from "../../../public/Images/toRight.svg";

const ProductDescription = () => {
  return (
    <div>
      <div className="bg-[#1B2E3C] h-[299px] flex items-center justify-center text-white">
        <div className="flex justify-between items-center flex-col">
          <h2 className="uppercase text-5xl">Shop</h2>
          <div className="flex mt-20 text-lg uppercase">
            <Link href="/">Home</Link>
            <Image src={toright} alt="toright" /> Shop
            <Image src={toright} alt="toright" /> Product XYZ
          </div>
        </div>
      </div>
      <div className="w-[1100px] mx-auto text-[#1B2E3C] py-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3">
              <Image src={shirt1} alt="shirt" />
            </div>
            <div className="col-span-1">
              <Image src={shirt2} alt="shirt2" />
            </div>
            <div className="col-span-1">
              <Image src={shirt3} alt="shirt2" />
            </div>
            <div className="col-span-1">
              <Image src={shirt4} alt="shirt2" />
            </div>
          </div>
          <div className="">
            <div className="">
              <h2 className="uppercase py-4 text-5xl">Product Xyz</h2>
              <div className="flex my-4">
                <Image src={star} alt="star" />
                <Image src={star} alt="star" />
                <Image src={star} alt="star" />
                <Image src={star} alt="star" />
                <Image src={nostar} alt="star" />
              </div>
              <h2 className="text-3xl font-bold">N4,000</h2>
              <p className="py-10 break-words w-[70%]">
                Lorem ipsum dolor sit amet consectetur. Neque interdum ante
                pretium suscipit nec vitae. Ultrices libero fames morbi risus
                consequat. Lacinia tortor facilisis pellentesque mattis. Eu
                pharetra a neque sed condimentum arcu neque.
              </p>
              <div className="">
                <h4>Polo Sizes</h4>
                <div className="flex">
                  <button className="mr-4 border border-[#0C0C1E80] px-2">
                    Medium
                  </button>
                  <button className="mr-4 border border-[#0C0C1E80] px-2">
                    Large
                  </button>
                  <button className="mr-4 border border-[#0C0C1E80] px-2">
                    Extra Large
                  </button>
                  <button className="mr-4 border border-[#0C0C1E80] px-2">
                    XXL
                  </button>
                </div>
              </div>
              <div className="my-8">
                <h4>Colors</h4>
                <div className="flex">
                  <button className="mr-4 border border-[#0C0C1E80] px-2">
                    Medium
                  </button>
                  <button className="mr-4 border border-[#0C0C1E80] px-2">
                    Large
                  </button>
                  <button className="mr-4 border border-[#0C0C1E80] px-2">
                    Extra Large
                  </button>
                  <button className="mr-4 border border-[#0C0C1E80] px-2">
                    XXL
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button className="p-4">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <h2 className="py-4 text-center uppercase text-lg my-4">Related Products</h2>
      </div>
    </div>
  );
};

export default ProductDescription;
