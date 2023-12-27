import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import ShopPage from "@/pages/shop";
import { ProductData } from "./product";

const CommonParentComponent: React.FC = () => {
  const [searchResults, setSearchResults] = useState<ProductData[]>([]);
  
  const handleSearch = async (searchValue: string) => {
    if (searchValue.trim() !== "") {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}product?s=${searchValue}`;
        
        const response = await fetch(apiUrl, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Search results:", data);

          // Check if the message is present in the response
          if (data.message) {
            // Handle error, if needed
          } else {
            // Update search results in the parent component state
            setSearchResults(data.products);
          }
        } else {
          console.error("Failed to fetch search results");
        }
      } catch (error) {
        console.error("Error while fetching search results:", error);
      }
    }
  };

  return (
    <div>
      <SearchComponent onSearch={handleSearch} />
      <ShopPage searchResults={searchResults} />
    </div>
  );
};

export default CommonParentComponent;