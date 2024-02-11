import Image from "next/image";
import Link from "next/link";
import { ProductData } from "./product";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "@/redux/store";
import pinkFavorite from "../../public/Images/pink-favorite.svg";
import axios from "axios";
import {
  addToFavorite,
  removeFromFavorite,
} from "@/redux/slices/favoriteSlice";
import { useRemoveFromWishlist } from "@/hook/useRemoveFromWishlist";
interface ProductCardProps {
  product: ProductData;
  onAddToCart: (product: ProductData) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  // console.log("Product Card Prop", product);
  // const [showAllStars, setShowAllStars] = useState(false);

  // const totalStars = 5;
  // const grayStars = totalStars - product.rating;
  // const displayStars = showAllStars ? totalStars : product.rating;

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);
  const favoriteItems = useSelector((state: RootState) => state.favorite.items);
  const [loading, setLoading] = useState(false);

  const removeFromWishlist = useRemoveFromWishlist();

  const handleAddToCart = async () => {
    
    try {
      setLoading(true);
      // Make an API request to get the full details of the selected product
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
      const productEndpoint = "product";

      const apiUrl = `${apiBaseUrl}${productEndpoint}/${product.id}`;
      const response = await axios.get(apiUrl);

      const detailedProduct = response.data;

      // Call the onAddToCart callback with the detailed product information
      onAddToCart(detailedProduct);
      setLoading(false);
    } catch (error: any) {
      console.error("Error fetching product details:", error.message);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      // Check if the user is logged in
      if (user && user.token) {
        // Fetch the user's wishlist
        const userWishlist = await fetchUserWishlist();
        console.log({ userWishlist });
        const isProductInWishlist = userWishlist.some(
          (item: { product_id: number }) => item.product_id === product.id
        );

        if (isProductInWishlist) {
          removeFromWishlist(product.id);
        } else {
          addToWishlist(product);
        }
      } else {
        // User is not logged in, proceed with regular favorite toggling
        const isFavorite = favoriteItems.some((item) => item.id === product.id);
        if (isFavorite) {
          dispatch(removeFromFavorite(product.id));
        } else {
          dispatch(addToFavorite(product));
        }
      }
    } catch (error) {
      console.error("Error handling toggle favorite:", error);
    }
  };

  const fetchUserWishlist = async () => {
    try {
      const response = await axios.get(
        "https://weird-entry-lara-production.up.railway.app/api/wishlist",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch user's wishlist");
      }
    } catch (error) {
      console.error("Error fetching user's wishlist:", error);
      return [];
    }
  };

  const addToWishlist = async (productToAdd: any) => {
    try {
      const response = await axios.post(
        "https://weird-entry-lara-production.up.railway.app/api/wishlist/create",
        {
          product_id: productToAdd.id,
          title: productToAdd.title,
          price: productToAdd.price,
          product_image: productToAdd.product_image,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Added to wishlist successfully");
      } else {
        console.error("Failed to add to wishlist:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  // const handleAddToFavorite = async () => {
  //   try {
  //     const isFavorite = favoriteItems.some((item) => item.id === product.id);

  //     if (isFavorite) {
  //       dispatch(removeFromFavorite(product.id));
  //     } else {
  //       dispatch(addToFavorite(product));
  //     }

  //     // Check if the user is logged in before fetching the user's cart
  //     if (user && user.token) {
  //       // Fetch the user's cart after updating the local cart
  //       try {
  //         setLoading(true);
  //         const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  //         const productEndpoint = "wishlist";

  //         const apiUrl = `${apiBaseUrl}${productEndpoint}`;
  //         const response = await axios.get(apiUrl, {
  //           headers: {
  //             Authorization: `Bearer ${user.token}`,
  //             Accept: "application/json",
  //           },
  //         });

  //         if (response.status === 200) {
  //           const userFavorite = response.data.items;

  //           // Use the extracted quantity for the newly added item
  //           const existingFavoriteKey = product.id;
  //           const existingFavorite = userFavorite[existingFavoriteKey];

  //           if (existingFavorite) {
  //             // Check if the existing item has the same size and color
  //             if (existingFavorite) {
  //               // Remove the existing favorite item
  //               console.log("Existing favorite item found. Removing the product from favorites.");
  //               try {
  //                 setLoading(true);
  //                 const removeFavoriteEndpoint = `${apiBaseUrl}wishlist/remove`;

  //                 // Make a request to remove the product from favorites
  //                 const removeResponse = await axios.post(removeFavoriteEndpoint, {
  //                   product_id: product.id,
  //                 }, {
  //                   headers: {
  //                     Authorization: `Bearer ${user.token}`,
  //                     Accept: "application/json",
  //                   },
  //                 });

  //                 if (removeResponse.status === 200) {
  //                   console.log("Product removed from favorites successfully.");
  //                   // Here, you may want to update your Redux store or UI to reflect the change
  //                 } else {
  //                   console.error("Failed to remove product from favorites:", removeResponse.statusText);
  //                 }
  //               } catch (error) {
  //                 console.error("Error removing product from favorites:", error);
  //               } finally {
  //                 setLoading(false);
  //               }
  //             } else {
  //               console.log("newly added");
  //               // Create a new item with the same ID but different size and color
  //               const newFavoriteItem = {
  //                 product_id: product.id,
  //                 title: product.title,
  //                 price: product.price,
  //                 sales_price: product.sales_price,
  //                 product_image: product.product_image,
  //               };
  //               userFavorite[existingFavoriteKey] = newFavoriteItem;
  //             }
  //           } else {
  //             // If there's no existing item, create a new one
  //             console.log("newly added");
  //             const newFavoriteItem = {
  //               product_id: product.id,
  //               title: product.title,
  //               price: product.price,
  //               sales_price: product.sales_price,
  //               product_image: product.product_image,
  //             };
  //             userFavorite[existingFavoriteKey] = newFavoriteItem;
  //           }

  //           // Combine the fetched cart with the items already in the Redux store
  //           const updatedWishlist = { ...userFavorite };

  //           // If the user is logged in, send the updated cart to the endpoint
  //           if (user && user.token) {
  //             sendFavoriteToEndpoint(updatedWishlist);
  //           }
  //           // ... (remaining code)
  //         } else if (response.status === 400) {
  //           setLoading(true);
  //           // If the user has no cart, send only the newly added item to create the cart
  //           const newFavoriteItemKey = product.id;
  //           sendFavoriteToEndpoint({
  //             [newFavoriteItemKey]: {
  //               product_id: product.id,
  //               title: product.title,
  //               price: product.price,
  //               sales_price: product.sales_price,
  //               product_image: product.product_image,
  //             },
  //           });
  //         } else {
  //           console.error("Failed to fetch user cart:", response.statusText);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user cart:", error);

  //         setLoading(true);
  //         // If there's an error fetching the user's cart, assume the user has no cart and send only the newly added item
  //         const newFavoriteItemKey = product.id;
  //         sendFavoriteToEndpoint({
  //           [newFavoriteItemKey]: {
  //             product_id: product.id,
  //             title: product.title,
  //             price: product.price,
  //             sales_price: product.sales_price,
  //             product_image: product.product_image,
  //           },
  //         });
  //         setLoading(false);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error handling add to cart:", error);
  //   }
  // };

  return (
    <div>
      <Link href={`/shop/${product.id}`} passHref>
        <div className="rounded-lg h-[200px] relative overflow-hidden flex items-center justify-center">
          <div
            style={{
              backgroundImage: `url('${product.product_image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100%",
            }}
            className="rounded-lg transform hover:scale-110 transition-transform duration-300"
          ></div>
          <button className="sm:hidden absolute top-3 right-3 z-[9999px] bg-pink-50 p-1 rounded-lg transition ease-in-out duration-300">
            <Image src={pinkFavorite} height={20} width={20} alt="heart" />
          </button>
        </div>

        <div className="my-5">
          <h2 className="capitalize h-[50px] sm:max-h-[50px] sm:h-[50px] text-[14px] sm:text-base">
            {product.title}
          </h2>
          {/* <div className="flex my-2">
            {[...Array(displayStars)].map((_, index) => (
              <Image
                key={index}
                width={16}
                height={16}
                src="https://res.cloudinary.com/duxy2eomx/image/upload/v1697712759/staricon_pz1faa.svg"
                alt="staricon"
              />
            ))}
            {[...Array(grayStars)].map((_, index) => (
              <Image
                key={index}
                width={16}
                height={16}
                src="https://res.cloudinary.com/duxy2eomx/image/upload/v1697713781/nostarticon_zdqlph.svg"
                alt="gray-staricon"
              />
            ))}
          </div> */}
          {product.sales_price ? (
            <div className="flex items-center justify-start gap-2 sm:gap-4 my-4">
              <span className="text-sm sm:text-lg font-bold text-[#1B2E3C]">
                ₦ {product.sales_price.toLocaleString()}
              </span>
              <span className="text-[12px] text-gray-500 line-through mr-2">
                ₦ {product.price.toLocaleString()}
              </span>
            </div>
          ) : (
            <h2 className="text-sm sm:text-lg font-bold my-4 text-[#1B2E3C]">
              ₦ {product.price.toLocaleString()}
            </h2>
          )}
        </div>
      </Link>
      <div className="flex gap-4 w-full">
        <button
          onClick={handleAddToCart}
          className="text-sm py-3 sm:w-3/4 w-full uppercase border border-[#0C0C1E] rounded-lg hover:bg-[#1B2E3C] hover:text-[#F3E3E2] transition ease-in-out duration-300"
        >
          {loading ? "processing..." : "Add to cart"}
        </button>
        <button
          onClick={handleToggleFavorite}
          className="hidden sm:w-1/4 border border-[#0C0C1E] sm:flex items-center justify-center rounded-lg transition ease-in-out duration-300"
        >
          <Image
            src="https://res.cloudinary.com/duxy2eomx/image/upload/v1697712759/Heart_kvhvmp.svg"
            height={25}
            width={25}
            alt="heart"
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
