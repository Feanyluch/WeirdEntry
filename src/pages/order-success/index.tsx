import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import cartImage from "../../../public/Images/cartanime.svg";
import success from "../../../public/Images/success.svg";

import styles from "@/styles/animate.module.css";

import { ProductData } from "@/components/product";

interface HomeProps {
  products: ProductData[];
}

const Index: React.FC<HomeProps> & { title: string } = () => {
    useEffect(() => {
        // Trigger the animation on component mount
        const animatedImage = document.getElementById("animatedImage");
        const successImage = document.getElementById("successImage");
    
        if (animatedImage) {
          animatedImage.classList.add(styles.animateImage);
    
          animatedImage.addEventListener("animationend", () => {
            // Animation has ended, display the success image
            if (successImage) {
              successImage.style.display = "block";
            }
          });
        }
    
        return () => {
          // Remove the event listener to avoid memory leaks
          if (animatedImage) {
            animatedImage.removeEventListener("animationend", () => {});
          }
        };
      }, []);

  return (
    <div>
      <div className="flex items-center justify-center flex-col my-12">
        <div className="relative">
        <Image
          id="animatedImage"
          src={cartImage}
          alt=""
          className={styles.image}
        />
        <Image
            id="successImage"
            src={success}
            alt=""
            className="absolute top-[10px] left-[45%] bg-white"
            style={{ display: "none" }}
          />
        </div>
        <h2 className="uppercase tracking-[3px] text-xl sm:text-3xl text-center my-4">
          order confirmed
        </h2>
        <h2 className="text-sm sm:text-lg text-center">
          Your order has been placed successfully
        </h2>
        <Link
          href="/shop"
          className="w-[250px] tracking-[3px] uppercase sm:w-[250px] hover:bg-[#1B2E3C] hover:text-[#F3E3E2] border border-[#0C0C1E] text-center rounded-lg my-8 py-4 px-4 text-xs sm:text-sm"
        >
          continue shopping
        </Link>
      </div>
    </div>
  );
};

Index.title = "Order successful - Weird Entry";

export default Index;
