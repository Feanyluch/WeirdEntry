import React, { useState } from "react";
import Slider from "react-slider";

const ProductCategory: React.FC = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const handlePriceRangeChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
  };

  return (
    <div className="border border-[#1B2E3C] p-4 w-[345px] text-[#1B2E3C]">
      <div className="border-[#1B2E3C80] border-b pb-8">
        <div className="">
          <h2 className="uppercase text-xl font-normal">
            Product
            <br />
            Categories
          </h2>
        </div>
        <div className="list-none text-lg font-light">
          <li className="py-2">Shirts</li>
          <li className="py-2">Cargo pants</li>
          <li className="py-2">Category 3</li>
          <li className="py-2">Category 4</li>
        </div>
      </div>
      <div>
        <h2 className="uppercase text-xl font-normal my-2">Price Range</h2>
        <Slider
          min={0}
          max={5000}
          step={10}
          value={priceRange}
          onChange={handlePriceRangeChange}
          className="bg-[#1B2E3C] h-[1px] my-4 w-full flex items-center justify-center"
          thumbClassName="slider-thumb" // Custom class for the slider handles
        />
        <div className="flex">
          <p className="mr-2">Price: N{priceRange[0]}</p> - 
          <p className="mx-2">N{priceRange[1]}</p>
        </div>
        <div className="flex items-center justify-center my-4">
          <button className="uppercase py-4 px-8 w-[220px] border border-[#1B2E3C]">
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;