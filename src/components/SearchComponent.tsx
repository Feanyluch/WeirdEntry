// SearchComponent.tsx
import React, { useState, ChangeEvent, KeyboardEvent, useRef, useEffect } from "react";
import Image from "next/image";
import Close from "../../public/Images/cancel.svg";
import Search from "../../public/Images/Search.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setSearchResults } from "@/redux/slices/searchSlice";
import { useRouter } from "next/router";

interface SearchProps {
  onSearchToggle: () => void;
  isSearchOpen: boolean; 
}

const SearchComponent = React.forwardRef<HTMLDivElement | null, SearchProps>(
  ({ onSearchToggle, isSearchOpen }, ref) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [localIsSearchOpen, setLocalIsSearchOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setLocalIsSearchOpen(isSearchOpen); // Set the initial state based on the prop
      if (isSearchOpen && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isSearchOpen]);

    const toggleSearch = () => {
      console.log("Toggling search");
      setLocalIsSearchOpen(!localIsSearchOpen);
      onSearchToggle();
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    };

    const handleSearch = async () => {
      if (searchValue.trim() !== "") {
        try {
          const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
          const productEndpoint = "product?s=";

          const apiUrl = `${apiBaseUrl}${productEndpoint}${searchValue}`;
          // const apiUrl = `https://weird-entry-lara-production.up.railway.app/api/product?s=${searchValue}`;

          const response = await fetch(apiUrl, {
            method: "GET",
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Search results:", data);

            // Check if the message is present in the response
            if (data.message) {
              // Use react-toastify to show a notification
              toast.error(data.message, { autoClose: 3000 }); // Auto-close after 5 seconds
            } else {
              // Dispatch the action to update Redux state with search results
              dispatch(setSearchResults(data));

              // Use the router to navigate to the shop page with the search query
              router.push(`/shop?s=${searchValue}`);
            }
          } else {
            console.error("Failed to fetch search results");
          }

          // Clear the input field after the search
          setSearchValue("");
        } catch (error) {
          console.error("Error while fetching search results:", error);
        }
      }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    return (
      <div
        className={`relative ${
          isSearchOpen ? "w-[90vw] sm:w-[33rem]" : "w-10"
        } transition-all duration-500`}
        style={{ fontFamily: "'Nokora', sans-serif" }}
      >
        {isSearchOpen ? (
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              className="bg-[#fff] text-sm py-2 px-4 rounded-lg border-2 border-[#1B2E3C] focus:outline-none w-full h-[70%]"
              placeholder="Search"
              value={searchValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            <div
              onClick={toggleSearch}
              className="absolute top-3 right-3 cursor-pointer"
            >
              <Image src={Close} alt="close" className="h-[15px] w-[15px]" />
            </div>
          </div>
        ) : (
          <div
            className=" hidden p-2 cursor-pointer sm:flex justify-center items-center rounded-full border-transparent focus:outline-none focus:border-white"
            onClick={toggleSearch}
          >
            <Image
              src={Search}
              alt="search"
              height={17}
              width={17}
              className="h-[18px] w-[22px]"
            />
          </div>
        )}
      </div>
    );
  }
);

// Add a displayName property to the functional component
SearchComponent.displayName = "SearchComponent";

export default SearchComponent;
