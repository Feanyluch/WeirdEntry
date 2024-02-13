import Image from "next/image";
import Link from "next/link";
import { ProductData } from "./product";
import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "@/redux/store";
import pinkFavorite from "../../public/Images/pink-favorite.svg";
import hearty from "../../public/Images/hearty.svg";
import heart1 from "../../public/Images/heart1.svg";
import heart2 from "../../public/Images/heart2.svg";
import heart3 from "../../public/Images/heart3.svg";
import heart4 from "../../public/Images/heart4.svg";
import axios from "axios";
import {
  addToFavorite,
  removeFromFavorite,
} from "@/redux/slices/favoriteSlice";
import { useRemoveFromWishlist } from "@/hook/useRemoveFromWishlist";
import { useNotification } from "./NotificationContext";
interface ProductCardProps {
  product: ProductData;
  onAddToCart: (product: ProductData) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const favoriteItems = useSelector((state: RootState) => state.favorite.items);
  const [loading, setLoading] = useState(false);
  const [isProductInWishlist, setIsProductInWishlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const removeFromWishlist = useRemoveFromWishlist();
  const { showNotification } = useNotification();

  const [isAnimating, setIsAnimating] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [hearty, heart1, heart2, heart3, heart4];

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isAnimating) {
      intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? prevIndex : prevIndex + 1
        );
      }, 100); // Adjust the interval as per your requirement
    } else {
      // Reset animation to the first image when isAnimating becomes false
      setCurrentImageIndex(0);
    }
    return () => clearInterval(intervalId);
  }, [isAnimating, images]);

  // const isFavorite = favoriteItems.some(item => item.id === product.id)

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

  useEffect(() => {
    // Update isProductInWishlist if user is logged in
    if (user && user.token) {
      fetchUserWishlist()
        .then((userWishlist) => {
          if (Array.isArray(userWishlist)) {
            const isInWishlist = userWishlist.some(
              (item: { product_id: number }) => item.product_id === product.id
            );
            setIsProductInWishlist(isInWishlist);
          }
        })
        .catch((error) =>
          console.error("Error fetching user wishlist:", error)
        );
    }

    // Update isFavorite
    setIsFavorite(favoriteItems.some((item) => item.id === product.id));
  }, [user, favoriteItems, product.id]);


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

  const handleToggleFavorite = async () => {
    try {
      // Set loading state to true to indicate that the process is ongoing
      // setLoading(true);
      
      if (user && user.token) {
        const userWishlist = await fetchUserWishlist();
        if (Array.isArray(userWishlist)) {
          if (isProductInWishlist) {
            await removeFromWishlist(product.id);
            showNotification("Product Removed from Wishlist")
          } else {
            await addToWishlist(product);
            showNotification("Product Added to Wishlist")
          }
        } else {
          console.log("User wishlist is empty. Adding product to wishlist.");
          await addToWishlist(product);
          showNotification("Product Added to Wishlist")
        }
      } else {
        if (isFavorite) {
          dispatch(removeFromFavorite(product.id));
          showNotification("Product Removed from Wishlist")
        } else {
          dispatch(addToFavorite(product));
          showNotification("Product Added to Wishlist")
        }
      }
      
      // Manually update local state to reflect changes
      setIsFavorite(!isFavorite);
      
      // Trigger a refresh of the data from the server to ensure UI reflects latest state
      const updatedWishlist = await fetchUserWishlist();
      if (Array.isArray(updatedWishlist)) {
        const isInWishlist = updatedWishlist.some(item => item.product_id === product.id);
        setIsProductInWishlist(isInWishlist);
      }
    } catch (error) {
      console.error("Error handling toggle favorite:", error);
    } finally {
      // Set loading state to false when the process is completed (either successfully or with error)
      // setLoading(false);
    }
    setIsAnimating(prevIsAnimating => !prevIsAnimating);
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

  return (
    <div>
      <Link href={`/shop/${product.id}`} passHref>
        <div className="rounded-lg h-[200px] relative overflow-hidden flex items-center justify-center">
          <div
            style={{
              backgroundImage: `url('${product.product_image[0]}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100%",
            }}
            className="rounded-lg transform hover:scale-110 transition-transform duration-300"
          ></div>
          <button className="sm:hidden absolute top-3 right-3 z-[9999px] bg-pink-50 p-1 rounded-lg transition ease-in-out duration-300">
            <Image src={user ? (isProductInWishlist ? images[images.length - 1] : pinkFavorite) : (isFavorite ? images[images.length - 1] : pinkFavorite)} height={20} width={20} alt="heart" />
          </button>
        </div>

        <div className="my-5">
          <h2 className="capitalize h-[50px] sm:max-h-[50px] sm:h-[50px] text-[14px] sm:text-base">
            {product.title}
          </h2>
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
          className={`hidden sm:w-1/4 border border-[#0C0C1E] sm:flex items-center justify-center rounded-lg transition ease-in-out duration-300 ${
            user ? (isProductInWishlist ? "border border-red-500 bg-red-100" : "") : isFavorite ? "" : ""
          }`}
        >
          <Image
            src={user ? (isProductInWishlist ? images[images.length - 1] : images[0]) : (isFavorite ? images[images.length - 1] : images[0])}
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
