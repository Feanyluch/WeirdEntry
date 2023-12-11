import React, { useState, useEffect } from "react";
import ProductCategory from "@/components/ProductCategory";
import Products from "@/components/Products";
import { GetStaticProps } from "next";
import { ProductData } from "@/components/product";
import Breadcrumb from "@/components/BreadCrumb";
import axios from "axios";

interface HomeProps {
  initialProducts?: { data: ProductData[] } | undefined;
  nextPageUrl?: string | null;
  prevPageUrl?: string | null;
}

const Index: React.FC<HomeProps> = ({
  initialProducts,
  nextPageUrl,
  prevPageUrl,
}) => {
  const [products, setProducts] = useState(initialProducts?.data || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentNextPageUrl, setCurrentNextPageUrl] = useState(nextPageUrl);
  const [currentPrevPageUrl, setCurrentPrevPageUrl] = useState(prevPageUrl);

  useEffect(() => {
    setProducts(initialProducts?.data || []);
    setCurrentPrevPageUrl(prevPageUrl);
    setCurrentNextPageUrl(nextPageUrl);
    console.log("Initial Prev Page URL:", prevPageUrl);
    console.log("Initial Next Page URL:", nextPageUrl);
  }, [initialProducts, prevPageUrl, nextPageUrl]);

  const handlePrevPage = async () => {
    if (currentPrevPageUrl) {
      try {
        const response = await axios.get(currentPrevPageUrl);
        const productData = response.data;

        const reversedProductIds = productData.data
          .map((product: { id: any; }) => product.id)
          .reverse();

          console.log({ reversedProductIds })

        // Update the component state with the new data and URLs
        setProducts(productData.data);
        setCurrentPrevPageUrl(productData.prev_page_url);
        setCurrentNextPageUrl(productData.next_page_url);

        // Use the callback form of setCurrentPage to ensure the correct current page value
        setCurrentPage((prevPage) => prevPage - 1);

        // Log the values for debugging
        console.log("Next Page URL:", productData.next_page_url);
        console.log("Previous Page URL:", productData.prev_page_url);
        console.log("Product Data:", productData);
      } catch (error: any) {
        console.error(
          "Error fetching previous page data from API:",
          error.message
        );
      }
    }
  };

  const handleNextPage = async () => {
    if (currentNextPageUrl) {
      try {
        const response = await axios.get(currentNextPageUrl);
        const productData = response.data;

        const reversedProductIds = productData.data
          .map((product: { id: any; }) => product.id)
          .reverse();

          console.log({ reversedProductIds })

        // Update the component state with the new data and URLs
        setProducts(productData.data);
        setCurrentPrevPageUrl(productData.prev_page_url);
        setCurrentNextPageUrl(productData.next_page_url);

        // Use the callback form of setCurrentPage to ensure the correct current page value
        setCurrentPage((prevPage) => prevPage + 1);

        // Log the values for debugging
        console.log("Next Page URL:", productData.next_page_url);
        console.log("Previous Page URL:", productData.prev_page_url);
        console.log("Product Data:", productData);


      } catch (error: any) {
        console.error("Error fetching next page data from API:", error.message);
      }
    }
  };

  return (
    <div>
      <Breadcrumb products={products} />
      <div className="w-[1200px] mx-auto flex gap-8 my-12">
        <div className="w-1/4 flex-shrink-0">
          <div className="sticky top-40">
            <ProductCategory />
          </div>
        </div>
        <div className="overflow-y-auto px-4 product-container">
          <Products products={{ data: products }} />
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevPage}
              disabled={!currentPrevPageUrl}
              className={`border rounded-lg h-[40px] px-6 ${
                currentPrevPageUrl
                  ? "hover:bg-[#1B2E3C] hover:text-[#F3E3E2]"
                  : "text-[#F3E3E2]"
              } ${currentPage === 1 ? "active" : ""}`}
            >
              Previous
            </button>
            <h2>Page: {currentPage}</h2>
            <button
              onClick={handleNextPage}
              disabled={!currentNextPageUrl}
              className={`border rounded-lg h-[40px] px-6 ${
                currentNextPageUrl
                  ? "hover:bg-[#1B2E3C] hover:text-[#F3E3E2]"
                  : "text-[#F3E3E2]"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apiUrl =
    "https://weird-entry-lara-production.up.railway.app/api/product";

  try {
    const response = await axios.get(apiUrl);
    const productData = response.data;

    return {
      props: {
        initialProducts: productData,
        nextPageUrl: productData.next_page_url,
        prevPageUrl: productData.prev_page_url,
      },
    };
  } catch (error: any) {
    console.error("Error fetching data from API:", error.message);
    throw new Error(`Failed to fetch data from API: ${error.message}`);
  }
};

export default Index;
