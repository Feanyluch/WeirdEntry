import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const bannerData = [
  {
    backgroundImage:
      "https://res.cloudinary.com/duxy2eomx/image/upload/v1697750405/banner1_x6zzg5.png",
    text: "Introducing The Weird\nEntry Collection",
    paragraph: "Shirts, Trousers, Jackets & more collection",
    link: "www.anywhere.com",
    buttonLabel: "Learn More",
  },
  {
    backgroundImage:
      "https://res.cloudinary.com/duxy2eomx/image/upload/v1697809464/unsplash_oM4XnSUcpz4_qw1pdz.png",
    text: "Introducing The Weird\nEntry Collection",
    paragraph: "Shirts, Trousers, Jackets & more collection",
    link: "www.anywhere.com",
    buttonLabel: "Get Started",
  },
  {
    backgroundImage:
      "https://res.cloudinary.com/duxy2eomx/image/upload/v1697809364/unsplash_6uW0PTXaOd8_dvpaqn.png",
    text: "Introducing The Weird\nEntry Collection",
    paragraph: "Shirts, Trousers, Jackets & more collection",
    link: "www.anywhere.com",
    buttonLabel: "Get Started",
  },
];

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % bannerData.length);
    }, 5000); // Change the background every 5 seconds (5000ms).

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[90vh]">
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
          <div className="absolute inset-0 flex flex-col justify-center items-start max-w-[1100px] mx-auto h-[300px] overflow-hidden my-auto z-[9]">
            <div
              className={` flex flex-col justify-center  text-white transform ${
                index === currentBanner
                  ? "translate-y-0"
                  : "translate-y-[190px]"
              } transition-transform duration-1000`}
              style={{ whiteSpace: "pre-line" }}
            >
              <h1 className="text-5xl leading-[67px] mb-4">{data.text}</h1>
              <p className="my-4 text-2xl">{data.paragraph}</p>
              <Link
                href={data.link}
                className="bg-[#1B2E3C] text-lg text-white text-center my-4 py-[17px] rounded-lg w-[300px] z-[-9999]"
              >
                {data.buttonLabel}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
