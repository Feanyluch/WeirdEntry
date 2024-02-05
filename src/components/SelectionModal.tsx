// SizeSelectionModal.tsx

import {
  addSelectedProduct,
  addToCart,
  incrementCartCount,
  incrementItem,
} from "@/redux/slices/cartSlice";
import store, { RootState } from "@/redux/store";
import { sendItemsToEndpoint } from "@/utils/localStorageHelper";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductData } from "./product";

import Image from "next/image";
import cancel from "../../public/Images/cancel.svg";
import AddNotification from "./AddNotification";
import { useNotification } from "./NotificationContext";

interface SizeSelectionModalProps {
  sizes: string[];
  product_image: any;
  colors: string[];
  title: string;
  product: ProductData;
  onClose: () => void;
  onSizeSelect: (selectedSize: string) => void;
}

const SizeSelectionModal: React.FC<SizeSelectionModalProps> = ({
  sizes,
  colors,
  title,
  product_image,
  onClose,
  product,
  onSizeSelect,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // const [showNotification, setShowNotification] = useState(false);
  const { showNotification } = useNotification();

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleAddToCart = async () => {
    console.log("Clickeddddd");
    console.log(selectedSize);
    console.log(selectedColor);
    console.log(product.id);

    try {
      // Check if the selected color and size combination already exists in the cart
      // const existingProduct = Array.isArray(cartItems)
      //   ? cartItems.find(
      //       (item) =>
      //         item.id === product.id &&
      //         item.size === selectedSize &&
      //         item.color === selectedColor
      //     )
      //   : null;

      const existingProductKey = `${product.id}_${selectedSize}_${selectedColor}`;
      const existingProduct = cartItems[existingProductKey as any];

      console.log({ existingProductKey });
      console.log({ existingProduct });

      if (existingProduct) {
        if (
          existingProduct.size === selectedSize &&
          existingProduct.color === selectedColor
        ) {
          console.log("This line is triggered");

          // Dispatch action to increment the item
          dispatch(incrementItem(existingProductKey));
          showNotification();
          onClose()
        }
      } else {
        // If the product is not in the cart, add it with a quantity of 1
        console.log("CartItem", selectedSize);
        const cartItem = {
          id: product.id,
          quantity: 1,
          price: product.price,
          title: product.title,
          product_image: product.product_image,
          size: selectedSize,
          color: selectedColor,
        };
        dispatch(addToCart(cartItem));
        dispatch(incrementCartCount());
        showNotification();
        onClose()
      }

      // dispatch(addSelectedProduct(product));

      // Extract the quantity directly from the addToCart action payload
      // const newlyAddedItemQuantity =
      //   store
      //     .getState()
      //     .cart.items.find(
      //       (item) =>
      //         item.id === product.id &&
      //         item.size === selectedSize &&
      //         item.color === selectedColor
      //     )?.quantity || 0;

      // Check if the user is logged in before fetching the user's cart
      if (user && user.token) {
        // Fetch the user's cart after updating the local cart
        try {
          setLoading(true);
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
            const existingCartItemKey = `${product.id}_${selectedSize}_${selectedColor}`;
            const existingCartItem = userCart[existingCartItemKey];

            if (existingCartItem) {
              // Check if the existing item has the same size and color
              if (
                existingCartItem.size === selectedSize &&
                existingCartItem.color === selectedColor
              ) {
                console.log("This line is triggered");
                existingCartItem.quantity += 1; // Increment by 1 since it's a new item
              } else {
                console.log("newly added", selectedSize);
                // Create a new item with the same ID but different size and color
                const newCartItem = {
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  product_image: product.product_image,
                  quantity: 1, // Quantity is 1 for a newly added item
                  size: selectedSize,
                  color: selectedColor,
                };
                userCart[existingCartItemKey] = newCartItem;
              }
            } else {
              // If there's no existing item, create a new one
              console.log("newly added", selectedSize);
              const newCartItem = {
                id: product.id,
                title: product.title,
                price: product.price,
                product_image: product.product_image,
                quantity: 1, // Quantity is 1 for a newly added item
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

            setLoading(false);
            showNotification();
            onClose()
            // ... (remaining code)
          } else if (response.status === 400) {
            setLoading(true);
            // If the user has no cart, send only the newly added item to create the cart
            const newCartItemKey = `${product.id}_${selectedSize}_${selectedColor}`;
            sendItemsToEndpoint({
              [newCartItemKey]: {
                id: product.id,
                title: product.title,
                price: product.price,
                product_image: product.product_image,
                quantity: 1,
                size: selectedSize,
                color: selectedColor,
              },
            });
            setLoading(false);
            showNotification();
            onClose()
          } else {
            console.error("Failed to fetch user cart:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching user cart:", error);

          setLoading(true);
          // If there's an error fetching the user's cart, assume the user has no cart and send only the newly added item
          const newCartItemKey = `${product.id}_${selectedSize}_${selectedColor}`;
          sendItemsToEndpoint({
            [newCartItemKey]: {
              id: product.id,
              title: product.title,
              price: product.price,
              product_image: product.product_image,
              quantity: 1,
              size: selectedSize,
              color: selectedColor,
            },
          });
          setLoading(false);

          showNotification();
          onClose()
        }
      }
    } catch (error) {
      console.error("Error handling add to cart:", error);
    }
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  // const closeNotification = () => {
  //   setShowNotification(false);
  // };

  //   const handleAddToCart = () => {
  //     if (selectedSize) {
  //       onSizeSelect(selectedSize);
  //       onClose();
  //     } else {
  //       // Handle case where no size is selected
  //       // You can show an error message or take appropriate action
  //     }
  //   };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-[999px]">
      <div className="bg-white p-8 rounded-lg w-[500px] mx-4 h-fit overflow-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-lg font-bold my-2 text-[#0C0C1E]">
            {title}
          </h2>
          <div className="cursor-pointer" onClick={onClose}>
            <Image src={cancel} alt="" height={15} width={15} />
          </div>
        </div>

        <div className="flex items-start justify-center">
          <div className="grid grid-cols-2 gap-4 sm:gap-0 my-8">
            <div className="rounded-lg h-full flex items-center justify-center overflow-hidden">
              <Image
                src={product.product_image}
                alt="item1"
                width={150}
                height={50}
                className="object-cover h-full transform hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col gap-4 h-full py-1">
              <div className="py-2">
                <h2 className="text-sm mb-2 text-[#0C0C1E] font-light">
                  Select a size
                </h2>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`border border-gray-300 rounded-full p-2 text-xs sm:text-sm hover:text-[#F3E3E2] hover:bg-[#1B2E3C] ${
                        selectedSize === size
                          ? "bg-[#1B2E3C] text-[#F3E3E2]"
                          : ""
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="py-2">
                <h2 className="text-sm mb-2 text-[#0C0C1E] font-light">
                  Select a color
                </h2>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      className={`border border-gray-300 rounded-full text-xs sm:text-sm p-2 hover:text-[#F3E3E2] hover:bg-[#1B2E3C] ${
                        selectedColor === color
                          ? "bg-[#1B2E3C] text-[#F3E3E2]"
                          : ""
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize || !selectedColor || loading}
            className={`px-4 py-2 text-xs sm:text-sm rounded-md hover:bg-[#29465b] ${
              loading
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-[#1B2E3C] text-[#F3E3E2]"
            }`}
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
        {/* {showNotification && (
          <AddNotification
            message={`Product added to the cart`}
            onClose={closeNotification}
          />
        )} */}
      </div>
    </div>
  );
};

export default SizeSelectionModal;
