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

const Index: React.FC<HomeProps> = ({ initialProducts, nextPageUrl, prevPageUrl }) => {
  const [products, setProducts] = useState(initialProducts?.data || []);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setProducts(initialProducts?.data || []);
  }, [initialProducts]);

  const handleNextPage = async () => {
    if (nextPageUrl) {
      try {
        const response = await axios.get(nextPageUrl);
        const productData = response.data;
  
        setCurrentPage(currentPage + 1);
  
        // Log the values for debugging
        console.log("Next Page URL:", nextPageUrl);
        console.log("Previous Page URL:", prevPageUrl);
        console.log("Product Data:", productData);
  
        // Update the component state with the new data
        // Here, I'm assuming the new products replace the old ones
        setProducts(productData.data);
      } catch (error: any) {
        console.error("Error fetching next page data from API:", error.message);
      }
    } else {
      // Handle the case when nextPageUrl is null or undefined
      console.log("Next page URL is null or undefined");
    }
  };
  
  const handlePrevPage = async () => {
    if (prevPageUrl) {
      try {
        const response = await axios.get(prevPageUrl);
        const productData = response.data;
  
        setCurrentPage(currentPage - 1);
  
        // Log the values for debugging
        console.log("Next Page URL:", nextPageUrl);
        console.log("Previous Page URL:", prevPageUrl);
        console.log("Product Data:", productData);
  
        // Update the component state with the new data
        // Here, I'm assuming the new products replace the old ones
        setProducts(productData.data);
      } catch (error: any) {
        console.error("Error fetching previous page data from API:", error.message);
      }
    } else {
      // Handle the case when prevPageUrl is null or undefined
      console.log("Previous page URL is null or undefined");
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
          <div className="flex justify-between mt-4">
            <button onClick={handlePrevPage} disabled={!prevPageUrl}>
              Previous
            </button>
            <button onClick={handleNextPage} disabled={!nextPageUrl}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apiUrl = "https://weird-entry-lara-production.up.railway.app/api/product";

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