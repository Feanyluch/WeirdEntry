import Image from "next/image";
import Link from "next/link";
import { ProductData } from "./product";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementCartCount,
  removeFromCart,
  incrementItem,
  decrementItem,
  addSelectedProduct,
  CartItem,
  fetchUserCart,
} from "@/redux/slices/cartSlice";
import store, { RootState } from "@/redux/store";
import axios from "axios";
import {
  clearCartLocalStorage,
  saveCartToLocalStorage,
  sendItemsToEndpoint,
} from "@/utils/localStorageHelper";
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
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async () => {
    try {
      setLoading(true)
      // Make an API request to get the full details of the selected product
      const response = await axios.get(
        `https://weird-entry-lara-production.up.railway.app/api/product/${product.id}`
      );

      const detailedProduct = response.data;

      // Call the onAddToCart callback with the detailed product information
      onAddToCart(detailedProduct);
      setLoading(false)
    } catch (error: any) {
      console.error("Error fetching product details:", error.message);
    }
  };
  // const handleAddToCart = async () => {
  //   try {
  //     const existingProduct = cartItems.find((item) => item.id === product.id);

  //     // If the product is already in the cart, increment its quantity
  //     if (existingProduct) {
  //       dispatch(incrementItem(existingProduct.id));
  //     } else {
  //       // If the product is not in the cart, add it with a quantity of 1
  //       const cartItem = {
  //         id: product.id,
  //         quantity: 1,
  //         price: product.price,
  //         title: product.title,
  //         product_image: product.product_image,
  //       };
  //       dispatch(addToCart(cartItem));
  //       dispatch(incrementCartCount());
  //     }

  //     dispatch(addSelectedProduct(product));

  //     // Extract the quantity directly from the addToCart action payload
  //     const newlyAddedItemQuantity =
  //       store.getState().cart.items.find((item) => item.id === product.id)
  //         ?.quantity || 0;

  //         // Check if the user is logged in before fetching the user's cart
  //   if (user && user.token) {
  //     // Fetch the user's cart after updating the local cart
  //     try {
  //       const response = await axios.get(
  //         "https://weird-entry-lara-production.up.railway.app/api/cart",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${user.token}`,
  //             Accept: "application/json",
  //           },
  //         }
  //       );

  //       if (response.status === 200) {
  //         const userCart = response.data.items;

  //         // Use the extracted quantity for the newly added item
  //         if (newlyAddedItemQuantity > 0) {
  //           if (userCart[product.id]) {
  //             userCart[product.id].quantity += newlyAddedItemQuantity;
  //           } else {
  //             userCart[product.id] = {
  //               id: product.id,
  //               title: product.title,
  //               price: product.price,
  //               product_image: product.product_image,
  //               quantity: newlyAddedItemQuantity,
  //             };
  //           }
  //         }

  //         // Combine the fetched cart with the items already in the Redux store
  //         const updatedCart = { ...userCart };

  //         // If the user is logged in, send the updated cart to the endpoint
  //         if (user && user.token) {
  //           sendItemsToEndpoint(updatedCart);
  //         }
  //       } else if (response.status === 400) {
  //         // If the user has no cart, send only the newly added item to create the cart
  //         sendItemsToEndpoint({
  //           [product.id]: {
  //             id: product.id,
  //             title: product.title,
  //             price: product.price,
  //             product_image: product.product_image,
  //             quantity: newlyAddedItemQuantity,
  //           },
  //         });
  //       } else {
  //         console.error("Failed to fetch user cart:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user cart:", error);

  //       // If there's an error fetching the user's cart, assume the user has no cart and send only the newly added item
  //       sendItemsToEndpoint({
  //         [product.id]: {
  //           id: product.id,
  //           title: product.title,
  //           price: product.price,
  //           product_image: product.product_image,
  //           quantity: newlyAddedItemQuantity,
  //         },
  //       });
  //     }}
  //   } catch (error) {
  //     console.error("Error handling add to cart:", error);
  //   }
  // };

  return (
    <div>
      <Link href={`/shop/${product.id}`} passHref>
        <div className="rounded-lg h-[200px] relative overflow-hidden">
          {/* <h2 className="absolute z-[9] bg-gray-200 px-4 py-2">-50%</h2> */}
          <Image
            src={product.product_image}
            width={350}
            height={500}
            alt={product.title}
            className=" object-cover transform hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="my-5">
          <h2 className="capitalize h-[50px] text-base">{product.title}</h2>
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
          <h2 className="text-lg my-4 font-bold">
            ₦ {product.price.toLocaleString()}
          </h2>
        </div>
      </Link>
      <div className="flex gap-4 w-full">
        <button
          onClick={handleAddToCart}
          className="text-sm py-3 w-3/4 uppercase border border-[#0C0C1E] rounded-lg hover:bg-[#1B2E3C] hover:text-[#F3E3E2] transition ease-in-out duration-300"
        >
          {loading ? "processing..." : "Add to cart"}
        </button>
        <button className="w-1/4 border border-[#0C0C1E] flex items-center justify-center rounded-lg transition ease-in-out duration-300">
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
