import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const bannerData = [
  {
    backgroundImage:
      "https://res.cloudinary.com/duxy2eomx/image/upload/v1697750405/banner1_x6zzg5.png",
    text: "Introducing The Weird\nEntry Collection",
    paragraph: "Shirts, Trousers, Jackets & more collection",
    link: "/shop",
    buttonLabel: "Learn More",
  },
  {
    backgroundImage:
      "https://res.cloudinary.com/duxy2eomx/image/upload/v1697809464/unsplash_oM4XnSUcpz4_qw1pdz.png",
    text: "Introducing The Weird\nEntry Collection",
    paragraph: "Shirts, Trousers, Jackets & more collection",
    link: "/shop",
    buttonLabel: "Get Started",
  },
  {
    backgroundImage:
      "https://res.cloudinary.com/duxy2eomx/image/upload/v1697809364/unsplash_6uW0PTXaOd8_dvpaqn.png",
    text: "Introducing The Weird\nEntry Collection",
    paragraph: "Shirts, Trousers, Jackets & more collection",
    link: "/shop",
    buttonLabel: "Get Started",
  },
];

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % bannerData.length);
    }, 10000); // Change the background every 5 seconds (5000ms).

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[90vh]" style={{ fontFamily: "'Nokora', sans-serif" }}>
      {bannerData.map((data, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 right-0 bottom-0 transition-opacity duration-50 ${
            index === currentBanner ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={data.backgroundImage}
            alt={`Image ${index + 1}`}
            layout="fill"
            objectFit="cover"
          />
          <div className="bg-black opacity-40 absolute h-full w-full"></div>
          <div className="absolute inset-0 flex flex-col justify-center sm:justify-end items-center sm:items-start max-w-[1200px] px-4 mx-auto sm:h-[300px] overflow-hidden sm:mt-auto sm:mb-20 z-[9]">
            <div
              className={`flex flex-col justify-center text-[#F3E3E2] transform ${
                index === currentBanner
                  ? "translate-y-0"
                  : "translate-y-[350px]"
              } transition-transform duration-1000`}
              style={{ whiteSpace: "pre-line" }}
            >
              <h1 className="text-2xl sm:text-4xl leading-[50px] sm:leading-[67px] mb-4">{data.text}</h1>
              <p className="my-1 sm:my-4 text-sm">{data.paragraph}</p>
              <div className="flex items-center justify-center sm:items-start sm:justify-start mt-4 sm:mt-0">
                <Link
                  href={data.link}
                  className="bg-[#1B2E3C] text-sm text-white text-center my-4 py-[17px] transition-all rounded-lg w-[200px] sm:w-[300px] z-[9] hover:bg-[#F3E3E2] hover:text-[#1B2E3C] ease-in-out duration-300 delay-100 hover:-translate-y-1 uppercase"
                >
                  {data.buttonLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
