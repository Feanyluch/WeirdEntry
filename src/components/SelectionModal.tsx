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

interface SizeSelectionModalProps {
  sizes: string[];
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
  onClose,
  product,
  onSizeSelect,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleAddToCart = async () => {
    console.log("Clickeddddd");
    console.log(selectedSize);
    console.log(selectedColor);
    console.log(product.id);

    try {
      const existingProduct = cartItems.find((item) => item.id === product.id);

      // If the product is already in the cart, increment its quantity
      if (existingProduct) {
        dispatch(incrementItem(existingProduct.id));
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
      }

      dispatch(addSelectedProduct(product));

      // Extract the quantity directly from the addToCart action payload
      const newlyAddedItemQuantity =
        store.getState().cart.items.find((item) => item.id === product.id)
          ?.quantity || 0;

      // Check if the user is logged in before fetching the user's cart
      if (user && user.token) {
        // Fetch the user's cart after updating the local cart
        try {
          const response = await axios.get(
            "https://weird-entry-lara-production.up.railway.app/api/cart",
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
                Accept: "application/json",
              },
            }
          );

          if (response.status === 200) {
            const userCart = response.data.items;

            // Use the extracted quantity for the newly added item
            if (newlyAddedItemQuantity > 0) {
              if (userCart[product.id]) {
                userCart[product.id].quantity += newlyAddedItemQuantity;
              } else {
                console.log("newly added", selectedSize);
                userCart[product.id] = {
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  product_image: product.product_image,
                  quantity: newlyAddedItemQuantity,
                  size: selectedSize,
                  color: selectedColor,
                };
              }
            }

            // Combine the fetched cart with the items already in the Redux store
            const updatedCart = { ...userCart };

            // If the user is logged in, send the updated cart to the endpoint
            if (user && user.token) {
              sendItemsToEndpoint(updatedCart);
            }
          } else if (response.status === 400) {
            // If the user has no cart, send only the newly added item to create the cart
            sendItemsToEndpoint({
              [product.id]: {
                id: product.id,
                title: product.title,
                price: product.price,
                product_image: product.product_image,
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
          sendItemsToEndpoint({
            [product.id]: {
              id: product.id,
              title: product.title,
              price: product.price,
              product_image: product.product_image,
              quantity: newlyAddedItemQuantity,
              size: selectedSize,
              color: selectedColor,
            },
          });
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
      <div className="relative bg-white p-8 rounded-lg w-[400px]">
        <div className="flex items-center justify-center absolute right-[10px] top-[5px] cursor-pointer text-white bg-[#1B2E3C] rounded-full px-3 pb-[5px]" onClick={onClose}>
          <h2 className="text-2xl">
            x
          </h2>
        </div>
        <h2 className="text-lg font-bold my-2">{title}</h2>

        <div className="flex flex-col gap-4">
          <div className="py-2">
            <h2 className="text-sm mb-2">Select a size:</h2>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`border border-gray-300 rounded-md p-2 ${
                    selectedSize === size ? "bg-[#1B2E3C] text-white" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="py-2">
            <h2 className="text-sm mb-2">Select a color:</h2>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={`border border-gray-300 rounded-md p-2 ${
                    selectedColor === color ? "bg-[#1B2E3C] text-white" : ""
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAddToCart}
            className="bg-[#1B2E3C] text-white px-4 py-2 rounded-md hover:bg-[#29465b]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeSelectionModal;
