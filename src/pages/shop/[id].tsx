import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import Skeleton from "react-loading-skeleton";
import { RingLoader } from "react-spinners";

import store, { RootState } from "@/redux/store";

import shirt1 from "../../../public/Images/shirt1.png";
import shirt2 from "../../../public/Images/shirt2.png";
import shirt3 from "../../../public/Images/shirt3.png";
import shirt4 from "../../../public/Images/shirt4.png";

import instagram from "../../../public/Images/Instagram.png";
import facebook from "../../../public/Images/Facebook.png";
import twitter from "../../../public/Images/TwitterX.png";

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
import { sendItemsToEndpoint } from "@/utils/localStorageHelper";

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
  sizes: string[];
  colors: Color[];
}

const ProductDescription: React.FC<HomeProps> & { title: string } = ({
  products,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  // Use state to store the selected product
  const [selectedProduct, setSelectedProduct] = useState<
    ProductData | undefined
  >(undefined);

  let productUrl = "";
  let productTitle = "";
  let productDescription = "";

  if (selectedProduct) {
    productUrl = `https://weird-entry.vercel.app/shop/${selectedProduct.id}`;
    productTitle = selectedProduct.title;
    productDescription = selectedProduct.description || " ";
  }

  const handleShareInstagram = () => {
    const instagramUrl = `https://www.instagram.com/?url=${encodeURIComponent(
      productUrl
    )}&title=${encodeURIComponent(productTitle)}`;
    window.open(instagramUrl, "_blank");
  };

  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      productUrl
    )}&title=${encodeURIComponent(
      productTitle
    )}&description=${encodeURIComponent(productDescription)}`;
    window.open(facebookUrl, "_blank");
  };

  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      productUrl
    )}&text=${encodeURIComponent(productTitle)}`;
    window.open(twitterUrl, "_blank");
  };

  const handleSizeSelect = (size: string) => {
    // Toggle the selection of size
    setSelectedSize((prevSize) => (prevSize === size ? null : size));
  };

  const handleColorSelect = (color: string) => {
    // Toggle the selection of color
    setSelectedColor((prevColor) => (prevColor === color ? null : color));
  };

  const isAddToCartDisabled = !selectedSize || !selectedColor;

  const handleAddToCart = async () => {
    // Check if selectedProduct is defined
    try {
      if (selectedProduct) {
        // Check if the selected color and size combination already exists in the cart
        const existingProductIndex = cartItems.findIndex(
          (item) => item.size === selectedSize && item.color === selectedColor
        );

        // If the product is already in the cart, increment its quantity
        if (existingProductIndex !== -1) {
          dispatch(incrementItem(cartItems[existingProductIndex].id));
        } else {
          const cartItem = {
            id: `${selectedProduct.id}_${selectedSize}_${selectedColor}`,
            quantity: 1,
            product_image: selectedProduct.product_image,
            price: selectedProduct.price,
            title: selectedProduct.title,
            size: selectedSize,
            color: selectedColor,
          };
          dispatch(addToCart(cartItem));
          dispatch(incrementCartCount());
          console.log("Item added", cartItem);
        }

        dispatch(addSelectedProduct(selectedProduct));

        // Extract the quantity directly from the addToCart action payload
        const newlyAddedItemQuantity =
          store
            .getState()
            .cart.items.find(
              (item) =>
                item.id === selectedProduct.id &&
                item.size === selectedSize &&
                item.color === selectedColor
            )?.quantity || 0;

        // Check if the user is logged in before fetching the user's cart
        if (user && user.token) {
          // Fetch the user's cart after updating the local cart
          try {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
            const productEndpoint = "cart";

            const apiUrl = `${apiBaseUrl}${productEndpoint}`;
            const response = await axios.get(apiUrl, {
              headers: {
                Authorization: `Bearer ${user.token}`,
                Accept: "application/json",
              },
            });

            if (response.status === 200) {
              const userCart = response.data.items;

              // Use the extracted quantity for the newly added item
              if (newlyAddedItemQuantity > 0) {
                const existingCartItemKey = `${selectedProduct.id}_${selectedSize}_${selectedColor}`;
                const existingCartItem = userCart[existingCartItemKey];

                if (existingCartItem) {
                  // Check if the existing item has the same size and color
                  if (
                    existingCartItem.size === selectedSize &&
                    existingCartItem.color === selectedColor
                  ) {
                    console.log("This line is triggered");
                    existingCartItem.quantity += newlyAddedItemQuantity;
                  } else {
                    console.log("newly added", selectedSize);
                    // Create a new item with the same ID but different size and color
                    const newCartItem = {
                      id: selectedProduct.id,
                      title: selectedProduct.title,
                      price: selectedProduct.price,
                      product_image: selectedProduct.product_image,
                      quantity: newlyAddedItemQuantity,
                      size: selectedSize,
                      color: selectedColor,
                    };
                    userCart[existingCartItemKey] = newCartItem;
                  }
                } else {
                  // If there's no existing item, create a new one
                  console.log("newly added", selectedSize);
                  const newCartItem = {
                    id: selectedProduct.id,
                    title: selectedProduct.title,
                    price: selectedProduct.price,
                    product_image: selectedProduct.product_image,
                    quantity: newlyAddedItemQuantity,
                    size: selectedSize,
                    color: selectedColor,
                  };
                  userCart[existingCartItemKey] = newCartItem;
                }

                // Combine the fetched cart with the items already in the Redux store
                const updatedCart = { ...userCart };

                // If the user is logged in, send the updated cart to the endpoint
                if (user && user.token) {
                  sendItemsToEndpoint(updatedCart);
                }
              }
            } else if (response.status === 400) {
              // If the user has no cart, send only the newly added item to create the cart
              const newCartItemKey = `${selectedProduct.id}_${selectedSize}_${selectedColor}`;
              sendItemsToEndpoint({
                [newCartItemKey]: {
                  id: selectedProduct.id,
                  title: selectedProduct.title,
                  price: selectedProduct.price,
                  product_image: selectedProduct.product_image,
                  quantity: newlyAddedItemQuantity,
                  size: selectedSize,
                  color: selectedColor,
                },
              });
            } else {
              console.error("Failed to fetch user cart:", response.statusText);
            }
          } catch (error) {
            console.error("Error fetching user cart:", error);

            // If there's an error fetching the user's cart, assume the user has no cart and send only the newly added item
            const newCartItemKey = `${selectedProduct.id}_${selectedSize}_${selectedColor}`;
            sendItemsToEndpoint({
              [newCartItemKey]: {
                id: selectedProduct.id,
                title: selectedProduct.title,
                price: selectedProduct.price,
                product_image: selectedProduct.product_image,
                quantity: newlyAddedItemQuantity,
                size: selectedSize,
                color: selectedColor,
              },
            });
          }
        }
      }
    } catch (error) {
      console.error("Error handling add to cart:", error);
    }
  };

  const router = useRouter();
  const { id } = router.query; // Get the product ID from the router

  useEffect(() => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const productEndpoint = "product";

    const apiUrl = `${apiBaseUrl}${productEndpoint}/${id}`;
    const fetchProductData = async () => {
      apiUrl;

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
      <div
        className="max-w-[1100px] mx-auto text-[#1B2E3C] py-8"
        style={{ fontFamily: "'Nokora', sans-serif" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="">
            <div className="grid grid-cols-3 gap-4 mx-4 sm:mx-0">
              <div className="col-span-3 flex items-center justify-center">
                <div
                  style={{
                    backgroundImage: `url('${selectedProduct.product_image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "400px",
                  }}
                ></div>
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
          <div className="px-4">
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
              <p className="py-4 break-words sm:w-[80%] text-sm">
                <span className="font-bold">Description:</span>{" "}
                {selectedProduct.description}
              </p>
              <div className="">
                <h4>Available Sizes</h4>
                <div className="flex gap-4 my-2">
                  {selectedProduct.sizes && selectedProduct.sizes.length > 0 ? (
                    selectedProduct.sizes.map((size, index) => (
                      <button
                        key={index}
                        className={`text-sm border border-[#0C0C1E80] px-2 h-[25px] ${
                          selectedSize === size.title
                            ? "bg-[#1B2E3C] text-white"
                            : ""
                        } transition ease-in-out duration-300 rounded-md`}
                        onClick={() => handleSizeSelect(size.title)}
                      >
                        {size.title}
                      </button>
                    ))
                  ) : (
                    <span className="text-red-500">No available size</span>
                  )}
                </div>
              </div>

              <div className="my-8">
                <h4>Available Colors</h4>
                <div className="flex gap-4 my-2">
                  {selectedProduct.colors &&
                  selectedProduct.colors.length > 0 ? (
                    selectedProduct.colors.map((color, index) => (
                      <button
                        key={index}
                        className={`text-sm border border-[#0C0C1E80] px-2 h-[25px] ${
                          selectedColor === color.title
                            ? "bg-[#1B2E3C] text-white"
                            : ""
                        } transition ease-in-out duration-300 rounded-md`}
                        onClick={() => handleColorSelect(color.title)}
                      >
                        {color.title}
                      </button>
                    ))
                  ) : (
                    <span className="text-red-500">No available color</span>
                  )}
                </div>
              </div>
              <div className="flex justify-start items-center gap-4 sm:w-[70%]">
                {/* <button className="h-[50px] w-[40px] border border-[#0C0C1E] rounded-lg ">
                  {cartItems.find((item) => item.id === selectedProduct?.id)
                    ?.quantity || 0}
                </button> */}

                <button
                  onClick={handleAddToCart}
                  disabled={isAddToCartDisabled}
                  className="px-8 sm:px-[80px] w-[80%] h-[50px] uppercase border border-[#0C0C1E] rounded-lg hover:bg-[#1B2E3C] hover:text-[#F3E3E2] transition ease-in-out duration-300"
                >
                  Add to cart
                </button>
                <button className="w-[20%] h-[50px] border border-[#0C0C1E] flex items-center justify-center rounded-lg hover:bg-[#1B2E3C] hover:text-[#F3E3E2] transition ease-in-out duration-300">
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
              <button className="flex items-center justify-center gap-4 my-6 rounded-lg bg-[#1B2E3C] h-[50px] w-full sm:w-[400px] text-[#F3E3E2]">
                <Image src={bag} alt="" />
                Buy Now
              </button>
              <div className="flex items-center justify-start gap-2">
                <h2>Share: </h2>
                <div className="flex gap-2">
                  <button onClick={handleShareInstagram}>
                    <Image src={instagram} alt="" height={20} width={20} />
                  </button>
                  <button onClick={handleShareFacebook}>
                    <Image src={facebook} alt="" height={20} width={20} />
                  </button>
                  <button onClick={handleShareTwitter}>
                    <Image src={twitter} alt="" height={20} width={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-4 sm:mx-auto my-10">
        <h2 className="py-4 text-center uppercase text-xl my-4">
          Related Products
        </h2>
        <RelatedProducts products={products} />
      </div>
    </div>
  );
};

ProductDescription.title = "Product Description";

export const getStaticProps: GetStaticProps = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const productEndpoint = "product";

  const apiUrl = `${apiBaseUrl}${productEndpoint}`;

  try {
    const response = await axios.get(apiUrl);
    const productData = response.data;

    // console.log("Product Data Page 2:", productData);

    return {
      props: {
        products: productData as ProductData[],
      },
    };
  } catch (error: any) {
    console.error("Error fetching data from API:", error.message);
    throw new Error(`Failed to fetch data from API: ${error.message}`);
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apiUrl =
    "https://weird-entry-lara-production.up.railway.app/api/product";

  try {
    const response = await axios.get(apiUrl);
    const productData = response.data;

    console.log("API Response:", productData);

    if (!Array.isArray(productData.data)) {
      console.error("Error: Product data is not an array.");
      return {
        paths: [],
        fallback: false,
      };
    }

    const { total, per_page } = productData;
    const totalPages = Math.ceil(total / per_page);

    const paths = [];
    for (let page = 1; page <= totalPages; page++) {
      const pageResponse = await axios.get(`${apiUrl}?page=${page}`);
      const pageData = pageResponse.data;

      const pagePaths = pageData.data.map((product: { id: number }) => {
        const path = {
          params: { page: page.toString(), id: product.id.toString() },
        };
        // console.log("Generated Path:", path);
        return path;
      });

      paths.push(...pagePaths);
    }

    // console.log("All Paths:", paths);

    return {
      paths,
      fallback: false,
    };
  } catch (error: any) {
    console.error("Error fetching data from API:", error.message);
    throw new Error(`Failed to fetch data from API: ${error.message}`);
  }
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { params } = context;
//   const id = params?.id;

//   try {
//     // Fetch data for the specific product using the id
//     const apiUrl = `https://weird-entry-lara-production.up.railway.app/api/product/${id}`;
//     const response = await axios.get(apiUrl);
//     const productData = response.data;

//     return {
//       props: {
//         selectedProduct: productData as ProductData,
//       },
//     };
//   } catch (error: any) {
//     console.error("Error fetching data from API:", error.message);
//     return {
//       notFound: true,
//     };
//   }
// };

export default ProductDescription;
