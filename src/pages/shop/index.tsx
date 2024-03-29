import React, { useState, useEffect } from "react";
import ProductCategory from "@/components/ProductCategory";
import Products from "@/components/Products";
import { GetStaticProps } from "next";
import { ProductData } from "@/components/product";
import Breadcrumb from "@/components/BreadCrumb";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchResults,
  setSearchResults,
} from "@/redux/slices/searchSlice";
import { useRouter } from "next/router";
import ProductFilterSidebar from "@/components/ProductFilterSidebar";

interface HomeProps {
  initialProducts?: ProductData[] | undefined; // Adjusted prop type
  nextPageUrl?: string | null;
  prevPageUrl?: string | null;
}

interface Category {
  id: number;
  title: string;
}

const Index: React.FC<HomeProps> & { title: string } = ({
  initialProducts,
  nextPageUrl,
  prevPageUrl,
}) => {
  const searchResults = useSelector(selectSearchResults);
  const [products, setProducts] = useState(initialProducts || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentNextPageUrl, setCurrentNextPageUrl] = useState(nextPageUrl);
  const [currentPrevPageUrl, setCurrentPrevPageUrl] = useState(prevPageUrl);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    10000, 70000,
  ]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch products if it's not a search query
    if (router.query.s) {
      0;
      dispatch(setSearchResults(searchResults));
      setSearchQuery(router.query.s as string);
    } else {
      setSearchQuery(null);
    }
  }, [dispatch, router.query.s, searchResults]);

  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts);
      console.log({ initialProducts });
    }
    setCurrentPrevPageUrl(prevPageUrl);
    setCurrentNextPageUrl(nextPageUrl);
    console.log("Initial Prev Page URL:", prevPageUrl);
    console.log("Initial Next Page URL:", nextPageUrl);
  }, [initialProducts, prevPageUrl, nextPageUrl]);

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, priceRange: [number, number]) => {
    // Assuming you want to filter based on selected categories and price range
    // You can customize this logic based on your specific requirements
    // Here, I'm assuming you have an API endpoint that supports both category and price range filters
  
    const selectedCategoryIds = selectedCategories
      .filter((category) => typeof category !== "string")
      .map((category) => category.id);
  
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const productEndpoint = "product";
  
    const apiUrl = `${apiBaseUrl}${productEndpoint}`;
    let params: Record<string, any> = {};
  
    // Include selected category IDs in the query parameters if they exist
    if (selectedCategoryIds.length > 0) {
      params.category = selectedCategoryIds.join("+");
    }
  
    // Include price range in the query parameters if it's set
    if (priceRange[0] && priceRange[1]) {
      params = {
        ...params,
        price: `${priceRange[0]}-${priceRange[1]}`,
      };
    }
  
    axios
      .get(apiUrl, {
        headers: {
          Authorization: "Bearer Token",
          Accept: "application/json",
        },
        params: params,
      })
      .then((response) => {
        const productData = response.data;
  
        // Update the component state with the new data
        // (Assuming your API response structure is similar to previous examples)
        setProducts(productData);
        setCurrentPrevPageUrl(productData.prev_page_url);
        setCurrentNextPageUrl(productData.next_page_url);
  
        // Reset the current page to 1
        setCurrentPage(1);
  
        // Log the values for debugging
        console.log("Next Page URL:", productData.next_page_url);
        console.log("Previous Page URL:", productData.prev_page_url);
        console.log("Product Data:", productData.products);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error.message);
      });
  };
  

  const handleSelectCategory = async (category: Category) => {

      try {
        // Check if the category is not already in the list
    if (
      !selectedCategories.some(
        (selectedCategory) => selectedCategory.id === category.id
      )
    ) {
      // Extract all selected category IDs
      const selectedCategoryIds = [...selectedCategories, category].map(
        (selectedCategory) => selectedCategory.id
      );
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
        const productEndpoint = "product?category=";

        const apiUrl = `${apiBaseUrl}${productEndpoint}${selectedCategoryIds.join(
          "+"
        )}`;

        console.log(apiUrl)
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: "Bearer Token",
            Accept: "application/json",
          },
        });

        const productData = response.data;
        console.log("Selected Product Data", productData)

        // Update the component state with the new data
        setProducts(productData);

        // Update the component state with the new data
        // setProducts(productData.products);
        setCurrentPrevPageUrl(productData.prev_page_url);
        setCurrentNextPageUrl(productData.next_page_url);

        setLoading(false);
        // Update the selected categories
        setSelectedCategories((prevSelectedCategories) => [
          ...prevSelectedCategories,
          category,
        ]);
        // Reset the current page to 1 when a new category is selected
        setCurrentPage(1);

        // Log the values for debugging
        console.log("Next Page URL:", productData.next_page_url);
        console.log("Previous Page URL:", productData.prev_page_url);
        console.log("Product Data:", productData.products);
      }} catch (error: any) {
        console.error("Error fetching data from API:", error.message);
      }
  };

  const handleCancelCategory = async (category: Category) => {
    try {
      setLoading(true);
  
      // Remove the canceled category from the selected categories
      const updatedSelectedCategories = selectedCategories.filter(
        (selectedCategory) => selectedCategory.id !== category.id
      );
  
      setSelectedCategories(updatedSelectedCategories);
  
      if (updatedSelectedCategories.length > 0) {
        // There are other selected categories, update products based on the remaining selected categories
        const remainingCategoryIds = updatedSelectedCategories.map(
          (selectedCategory) => selectedCategory.id
        );
  
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
        const productEndpoint = "product?category=";
  
        const apiUrl = `${apiBaseUrl}${productEndpoint}`;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: "Bearer Token",
            Accept: "application/json",
          },
          params: {
            category: remainingCategoryIds.join("+"),
            // Include the price range in the query parameters if needed
            // min_price: priceRange[0],
            // max_price: priceRange[1],
          },
        });
  
        const productData = response.data;
  
        // Update the component state with the products for the remaining selected categories
        setProducts(productData);
        setCurrentPrevPageUrl(productData.prev_page_url || null);
        setCurrentNextPageUrl(productData.next_page_url || null);
        setLoading(false);
  
        // Reset the current page to 1
        setCurrentPage(1);
  
        // Log the values for debugging
        console.log("Next Page URL:", productData.next_page_url);
        console.log("Previous Page URL:", productData.prev_page_url);
        console.log("Product Data:", productData.data);
      } else {
        // No other selected categories, fetch and set the initial list of products
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
        const productEndpoint = "product";
  
        const apiUrl = `${apiBaseUrl}${productEndpoint}`;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: "Bearer Token",
            Accept: "application/json",
          },
          // params: {
          //   // Include the price range in the query parameters if needed
          //   min_price: priceRange[0],
          //   max_price: priceRange[1],
          // },
        });
  
        const productData = response.data;
  
        // Update the component state with the initial list of products
        setProducts(productData.data);
        setCurrentPrevPageUrl(productData.prev_page_url || null);
        setCurrentNextPageUrl(productData.next_page_url || null);
        setLoading(false);
  
        // Reset the current page to 1
        setCurrentPage(1);
  
        // Log the values for debugging
        console.log("Next Page URL:", productData.next_page_url);
        console.log("Previous Page URL:", productData.prev_page_url);
        console.log("Product Data:", productData.data);
      }
    } catch (error: any) {
      console.error("Error handling canceled category:", error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handlePrevPage = async () => {
    if (currentPrevPageUrl) {
      try {
        setLoading(true);
        const response = await axios.get(currentPrevPageUrl);
        const productData = response.data;

        const reversedProductIds = productData.data
          .map((product: { id: any }) => product.id)
          .reverse();

        console.log({ reversedProductIds });

        // Update the component state with the new data and URLs
        setProducts(productData.data);
        setCurrentPrevPageUrl(productData.prev_page_url);
        setCurrentNextPageUrl(productData.next_page_url);
        setLoading(false);

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
        setLoading(true);
        const response = await axios.get(currentNextPageUrl);
        const productData = response.data;

        const reversedProductIds = productData.data
          .map((product: { id: any }) => product.id)
          .reverse();

        console.log({ reversedProductIds });

        // Update the component state with the new data and URLs
        setProducts(productData.data);
        setCurrentPrevPageUrl(productData.prev_page_url);
        setCurrentNextPageUrl(productData.next_page_url);

        // Use the callback form of setCurrentPage to ensure the correct current page value
        setCurrentPage((prevPage) => prevPage + 1);
        setLoading(false);

        // Log the values for debugging
        console.log("Next Page URL:", productData.next_page_url);
        console.log("Previous Page URL:", productData.prev_page_url);
        console.log("Product Data:", productData);
      } catch (error: any) {
        console.error("Error fetching next page data from API:", error.message);
      }
    }
  };

  const handleCancelSearch = async () => {
    try {
      setLoading(true);

      // Fetch and set the initial list of products
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
      const productEndpoint = "product";

      const apiUrl = `${apiBaseUrl}${productEndpoint}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: "Bearer Token",
          Accept: "application/json",
        },
      });

      const productData = response.data;
      console.log("Search ProductData", productData.data);
      router.push("/shop");

      // Update the component state with the initial list of products
      setProducts(productData.data);
      dispatch(setSearchResults(productData.data));
      setCurrentPrevPageUrl(productData.prev_page_url || null);
      setCurrentNextPageUrl(productData.next_page_url || null);

      // Reset the current page to 1
      setCurrentPage(1);
      setSearchQuery(null); // Reset the search query state

      setLoading(false);

      // Log the values for debugging
      // console.log("Next Page URL:", productData.next_page_url);
      // console.log("Previous Page URL:", productData.prev_page_url);
      // console.log("Product Data:", productData.products);
    } catch (error: any) {
      console.error("Error canceling search:", error.message);
    }
  };

  return (
    <div>
      <Breadcrumb products={products} />
      <div className="max-w-[1200px] mx-auto flex gap-8 mb-12 mt-4 px-4">
        <div className="w-1/4 flex-shrink-0 hidden sm:block">
          <div className="sticky top-28 ">
            <ProductCategory
              onSelectCategory={handleSelectCategory}
              onFilterClick={handleFilterClick}
            />
          </div>
        </div>

        <div className="w-full sm:w-3/4 overflow-y-auto px-4 product-container">
          <button
            className="sm:hidden flex gap-2 my-6 border border-[#1B2E3C] px-4 rounded-lg hover:bg-[#1B2E3C] hover:text-[#F3E3E2]"
            onClick={() => setIsSidebarOpen(true)}
          >
            Filter :-{" "}
          </button>
          <div className=" my-2">
            {searchQuery && (
              <div className="flex items-center justify-start gap-2">
                <h2>Showing results for: </h2>
                <div className="p-1 rounded-lg text-sm flex items-center justify-start bg-[#f1f1f2]">
                  <h2>{searchQuery}</h2>
                  <button
                    onClick={handleCancelSearch}
                    className="bg-white px-2 rounded-lg"
                  >
                    x
                  </button>
                </div>
              </div>
            )}
            {selectedCategories.length > 0 && (
              <div className="flex items-center justify-start gap-2">
                <h2>Selected Categories:</h2>
                <ul className="flex items-center justify-start gap-2">
                  {selectedCategories.map((selectedCategory, index) => (
                    <li
                      key={index}
                      className="bg-[#f1f1f2] p-1 rounded-lg text-sm"
                    >
                      {selectedCategory.title}{" "}
                      <button
                        onClick={() => handleCancelCategory(selectedCategory)}
                        className="bg-white px-2 rounded-lg"
                      >
                        x
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {isSidebarOpen && (
            <ProductFilterSidebar
              onSelectCategory={handleSelectCategory}
              onClose={() => setIsSidebarOpen(false)}
              onFilterClick={handleFilterClick}
            />
          )}

          {loading ? (
            <div className="loading-container">
              <div className="loading-content">
                <h2 className="text-lg text-white">Weird Entry</h2>
              </div>
            </div>
          ) : (
            <Products
              products={searchResults.length > 0 ? searchResults : products}
            />
          )}

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

Index.title = "Shop Products- WeirdEntry";

export const getStaticProps: GetStaticProps = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const productEndpoint = "product";

  const apiUrl = `${apiBaseUrl}${productEndpoint}`;
  console.log({ apiUrl });

  try {
    const response = await axios.get(apiUrl);
    const productData = response.data;

    // Log the entire productData object to inspect its structure
    console.log("Product Data:", productData);

    return {
      props: {
        initialProducts: productData,
        nextPageUrl: productData.next_page_url || null,
        prevPageUrl: productData.prev_page_url || null,
      },
    };
  } catch (error: any) {
    console.error("Error fetching data from API:", error.message);
    throw new Error(`Failed to fetch data from API: ${error.message}`);
  }
};

export default Index;
