import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import Skeleton from "react-loading-skeleton";
import { RingLoader } from "react-spinners";


import shirt1 from "../../../public/Images/shirt1.png";
import shirt2 from "../../../public/Images/shirt2.png";
import shirt3 from "../../../public/Images/shirt3.png";
import shirt4 from "../../../public/Images/shirt4.png";

import bag from "../../../public/Images/bag.svg";
import todown from "../../../public/Images/To-Down.svg";

import star from "../../../public/Images/staricon.svg";
import nostar from "../../../public/Images/nostarticon.svg";

import toright from "../../../public/Images/toRight.svg";
import RelatedProducts from "@/components/RelatedProducts";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { ProductData } from "@/components/product";
import Breadcrumb from "@/components/BreadCrumb";
import { useRouter } from "next/router";
import StarRating from "@/components/StarRating";
import axios from "axios";
import SizeButtons from "@/components/SizeButtons";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  incrementCartCount,
  removeFromCart,
  incrementItem,
  decrementItem,
  addSelectedProduct,
} from "@/redux/slices/cartSlice";
import { RootState } from "@/redux/store";

interface Size {
  id: number;
  title: string;
  description: string;
  // Add other properties if necessary
}

interface Color {
  id: number;
  title: string;
  description: string;
  // Add other properties if necessary
}

interface HomeProps {
  products?: { data: ProductData[] } | undefined; // Make the prop optional
  sizes: Size[];
  colors: Color[];
}

const ProductDescription: React.FC<HomeProps> & {title: string} = ({ products }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = () => {
    // Check if selectedProduct is defined
    if (selectedProduct) {
      const existingProduct = cartItems.find(
        (item) => item.id === selectedProduct.id
      );

      if (existingProduct) {
        dispatch(incrementItem(existingProduct.id));
        console.log("Increment Items", incrementItem(existingProduct.id));
      } else {
        const cartItem = { id: selectedProduct.id, quantity: 1 };
        dispatch(addToCart(cartItem));
        dispatch(incrementCartCount());
        console.log("Item added", cartItem);
      }

      dispatch(addSelectedProduct(selectedProduct));
    }
  };

  const router = useRouter();
  const { id } = router.query; // Get the product ID from the router

  // Use state to store the selected product
  const [selectedProduct, setSelectedProduct] = useState<
    ProductData | undefined
  >(undefined);

  useEffect(() => {
    const fetchProductData = async () => {
      const apiUrl = `https://weird-entry-lara-production.up.railway.app/api/product/${id}`;

      try {
        const response = await axios.get(apiUrl);
        const productData = response.data;
        setSelectedProduct(productData);
      } catch (error: any) {
        console.error("Error fetching product data from API:", error.message);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RingLoader color="#1B2E3C" loading={loading} size={150} />
      </div>
    );
  }

  if (!selectedProduct) {
    // Handle the case where the product is not found
    return <div>Product not found</div>;
  }
  return (
    <div>
      <Breadcrumb products={products} />
      <div className="w-[1100px] mx-auto text-[#1B2E3C] py-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <Image
                  src={selectedProduct.product_image}
                  width={200}
                  height={100}
                  className="w-full h-[400px]"
                  alt="shirt"
                />
              </div>
              <div className="col-span-1">
                <Image src={shirt2} alt="shirt2" />
              </div>
              <div className="col-span-1">
                <Image src={shirt3} alt="shirt2" />
              </div>
              <div className="col-span-1">
                <Image src={shirt4} alt="shirt2" />
              </div>
            </div>
          </div>
          <div className="">
            <div className="">
              <h2 className="uppercase py-2 text-3xl">
                {selectedProduct.title}
              </h2>
              {/* <div className="flex my-2">
                <StarRating rating={selectedProduct.rating} />
              </div> */}
              <h2 className="text-xl py-2 font-bold">
                ₦ {selectedProduct.price.toLocaleString()}
              </h2>
              <p className="py-4 break-words w-[80%] text-sm">
                <span className="font-bold">Description:</span>{" "}
                {selectedProduct.description}
              </p>
              <div className="">
                <h4>Polo Sizes</h4>
                <div className="flex gap-4 my-2">
                  {selectedProduct.sizes.map((size, index) => (
                    <button
                      key={index}
                      className="text-sm border border-[#0C0C1E80] px-2 h-[25px] hover:bg-[#1B2E3C] hover:text-[#F3E3E2] transition ease-in-out duration-300 rounded-md"
                    >
                      {size.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="my-8">
                <h4>Colors</h4>
                <div className="flex gap-4 my-2">
                  {selectedProduct.sizes.map((color, index) => (
                    <button
                      key={index}
                      className="text-sm border border-[#0C0C1E80] px-2 h-[25px] hover:bg-[#1B2E3C] hover:text-[#F3E3E2] transition ease-in-out duration-300 rounded-md"
                    >
                      {color.title}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-start items-center gap-4">
                <button className="h-[50px] w-[40px] border border-[#0C0C1E] rounded-lg ">
                  {cartItems.find((item) => item.id === selectedProduct?.id)
                    ?.quantity || 0}
                </button>

                <button
                  onClick={handleAddToCart}
                  className="px-[80px] h-[50px] uppercase border border-[#0C0C1E] rounded-lg hover:bg-[#1B2E3C] hover:text-[#F3E3E2] transition ease-in-out duration-300"
                >
                  Add to cart
                </button>
                <button className="w-[40px] h-[50px] border border-[#0C0C1E] flex items-center justify-center rounded-lg hover:bg-[#1B2E3C] hover:text-[#F3E3E2] transition ease-in-out duration-300">
                  <Image
                    src="https://res.cloudinary.com/duxy2eomx/image/upload/v1697712759/Heart_kvhvmp.svg"
                    height={20}
                    width={20}
                    alt="heart"
                  />
                </button>
              </div>
              <p className="text-sm mt-8">
                Estimated delivery time:{" "}
                <span className="font-bold">xyz minutes or date</span>
              </p>
              <button className="flex items-center justify-center gap-4 my-6 rounded-lg bg-[#1B2E3C] h-[50px] w-[400px] text-[#F3E3E2]">
                <Image src={bag} alt="" />
                Buy Now
              </button>
              <h2>Share: </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1300px] mx-auto my-10">
        <h2 className="py-4 text-center uppercase text-xl my-4">
          Related Products
        </h2>
        <RelatedProducts products={products} />
      </div>
    </div>
  );
};

ProductDescription.title = 'Product Description';

// export const getStaticProps: GetStaticProps = async () => {
//   // Fetch data from the API using Axios
//   const apiUrl = `https://weird-entry-lara-production.up.railway.app/api/product`;

//   try {
//     const response = await axios.get(apiUrl);
//     const productData = response.data;

//     // console.log("Product Data Page 2:", productData);

//     return {
//       props: {
//         products: productData as ProductData[],
//       },
//     };
//   } catch (error: any) {
//     console.error("Error fetching data from API:", error.message);
//     throw new Error(`Failed to fetch data from API: ${error.message}`);
//   }
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const apiUrl =
//     "https://weird-entry-lara-production.up.railway.app/api/product";

//   try {
//     const response = await axios.get(apiUrl);
//     const productData = response.data;


//     console.log("API Response:", productData);

//     if (!Array.isArray(productData.data)) {
//       console.error("Error: Product data is not an array.");
//       return {
//         paths: [],
//         fallback: false,
//       };
//     }

//     const { total, per_page } = productData;
//     const totalPages = Math.ceil(total / per_page);

//     const paths = [];
//     for (let page = 1; page <= totalPages; page++) {
//       const pageResponse = await axios.get(`${apiUrl}?page=${page}`);
//       const pageData = pageResponse.data;

//       const pagePaths = pageData.data.map((product: { id: number }) => {
//         const path = {
//           params: { page: page.toString(), id: product.id.toString() },
//         };
//         // console.log("Generated Path:", path);
//         return path;
//       });

//       paths.push(...pagePaths);
//     }

//     // console.log("All Paths:", paths);

//     return {
//       paths,
//       fallback: false,
//     };
//   } catch (error: any) {
//     console.error("Error fetching data from API:", error.message);
//     throw new Error(`Failed to fetch data from API: ${error.message}`);
//   }
// };


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const id = params?.id;

  try {
    // Fetch data for the specific product using the id
    const apiUrl = `https://weird-entry-lara-production.up.railway.app/api/product/${id}`;
    const response = await axios.get(apiUrl);
    const productData = response.data;

    return {
      props: {
        selectedProduct: productData as ProductData,
      },
    };
  } catch (error: any) {
    console.error("Error fetching data from API:", error.message);
    return {
      notFound: true,
    };
  }
};


export default ProductDescription;
