import React, { useState, useEffect } from "react";
import Image from 'next/image'
import Slider from "react-slider";
import axios from "axios";

import Navclose from "../../public/Images/Iclose.svg";

interface Category {
  id: number;
  title: string;
}

interface ProductCategoryProps {
  onSelectCategory: (category: Category) => void;
  onFilterClick: () => void;
  onClose: () => void;
}

const ProductCategory: React.FC<ProductCategoryProps> = ({
  onSelectCategory,
  onFilterClick,
  onClose,
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([10000, 70000]);
  const [categories, setCategories] = useState<(string | Category)[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    string | Category | null
  >(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
        const productEndpoint = "category";

        const apiUrl = `${apiBaseUrl}${productEndpoint}`;
        console.log({apiUrl})
        const response = await axios.get<(string | Category)[]>(
          apiUrl,
          {
            headers: {
              Authorization: "Bearer Token",
              Accept: "application/json",
            },
          }
        );

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handlePriceRangeChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
  };

  const handleCategoryClick = (category: Category) => {
    onSelectCategory(category);
    setSelectedCategory(category);
  };

  // const handleCancelCategory = () => {
  //   const emptyCategory: Category = { id: 0, title: "" };
  //   onSelectCategory(emptyCategory);
  //   setSelectedCategory(null);
  // };

  const displayedCategories = categories.slice(0, 6);

  return (
    <div className="fixed top-0 left-0 h-screen overflow-auto w-4/5 bg-[#1B2E3C] z-[99999] transition-all transform duration-1000 ease-in-out py-6 text-[#F3E3E2] ">
        
      <div className="border-[#1B2E3C80] border-b pb-8">
        <div className="flex justify-between items-center border-b border-gray-200 px-4">
          <h2 className="uppercase sm:text-lg font-normal pl-2 pb-2">
            Product
            <br />
            Categories
          </h2>
          <div className="cursor-pointer">
                    <Image src={Navclose} alt="" onClick={onClose} />
                  </div>
        </div>
        <div className="list-none text-sm font-light ml-4 sm:ml-0 mt-8 sm:mt-4">
          {displayedCategories.map((category) => (
            <li
              key={typeof category === "string" ? category : category.id}
              onClick={() => {
                if (typeof category !== "string") {
                  handleCategoryClick(category);
                }
              }}
              className={`py-2 pl-2 cursor-pointer capitalize rounded-lg text-lg hover:font-bold transition-all ${
                selectedCategory &&
                typeof selectedCategory !== "string" &&
                selectedCategory.id ===
                  (typeof category === "string" ? category : category.id)
                  ? "sm:bg-[#f1f1f2] font-bold"
                  : ""
              }`}
            >
              {typeof category === "string" ? category : category.title}
            </li>
          ))}
        </div>
      </div>
      <div className="my-4 mx-6">
        <h2 className="uppercase text-lg font-normal my-2">Price Range</h2>
        <Slider
          min={10000}
          max={70000}
          step={1000}
          value={priceRange}
          onChange={handlePriceRangeChange}
          className="bg-[#F3E3E2] sm:bg-[#1B2E3C] h-[1px] my-4 w-full flex items-center justify-center"
          thumbClassName="slider-thumb" // Custom class for the slider handles
        />
        <div className="flex text-sm mt-4">
          <p className="mr-2 ">Price: N{priceRange[0]}</p> -
          <p className="mx-2">N{priceRange[1]}</p>
        </div>

        <div className="flex sm:items-center sm:justify-center my-4">
          <button className="uppercase py-2 text-sm px-8 w-full sm:w-[220px] border border-[#F3E3E2] sm:border-[#1B2E3C] rounded-lg hover:bg-[#1B2E3C] hover:text-white" onClick={onFilterClick}>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
