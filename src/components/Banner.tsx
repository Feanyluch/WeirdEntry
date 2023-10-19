import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const bannerData = [
  {
    backgroundImage: 'https://res.cloudinary.com/duxy2eomx/image/upload/v1697750405/banner1_x6zzg5.png',
    text: 'Welcome to Image 1',
    buttonLabel: 'Learn More',
  },
  {
    backgroundImage: 'https://res.cloudinary.com/duxy2eomx/image/upload/v1697750929/MacBook_Pro_16__-_2_v3xojo.png',
    text: 'Explore Image 2',
    buttonLabel: 'Discover More',
  },
  {
    backgroundImage: 'https://res.cloudinary.com/duxy2eomx/image/upload/v1697750405/banner1_x6zzg5.png',
    text: 'Experience Image 3',
    buttonLabel: 'Get Started',
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
    <div className="relative h-[70vh]">
      {bannerData.map((data, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 right-0 bottom-0 transition-opacity duration-500 ${
            index === currentBanner ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={data.backgroundImage}
            alt={`Image ${index + 1}`}
            layout="fill"
            objectFit="cover"
          />
          <div
            className={`absolute inset-0 flex flex-col justify-center  text-white transform ${
              index === currentBanner ? 'translate-y-0' : 'translate-y-[260px]'
            } transition-transform duration-500`}
          >
            <h1 className="text-4xl font-bold mb-4 text-black">{data.text}</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
              {data.buttonLabel}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
