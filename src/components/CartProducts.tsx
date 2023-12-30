import React, { useState, useEffect } from "react";
import Image from "next/image";
import DeleteSvg from "../../public/Images/delete.svg";
import Favorite from "../../public/Images/Heart.svg";
import { ProductData } from "@/components/product";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addToCart,
  incrementCartCount,
  decrementCartCount,
  removeFromCart,
  incrementItem,
  decrementItem,
  addSelectedProduct,
  updateItemQuantity,
  deleteSelectedProduct,
} from "@/redux/slices/cartSlice";
import axios from "axios";

interface MiniProductProps {
  product: ProductData;
  cartItems: { id: number; quantity: number }[];
}

const CartProducts: React.FC<MiniProductProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const initialQuantity = cartItem ? cartItem.quantity : 0;

  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    // Set the local state to the updated quantity when it changes in the Redux store
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const incrementQuantity = () => {
    dispatch(incrementItem(product.id));
    dispatch(
      updateItemQuantity({ productId: product.id, quantity: quantity + 1 })
    );
    if (user) {
      sendUpdateToEndpoint(product.id, product.quantity + 1, user.token);
      console.log(product.id);
      console.log({ product });
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      dispatch(incrementItem(product.id));
      dispatch(
        updateItemQuantity({ productId: product.id, quantity: quantity - 1 })
      );
    }
    // If user is logged in, send update to /cart/create endpoint
    if (user) {
      if (product.quantity > 0) {
        sendUpdateToEndpoint(product.id, product.quantity - 1, user.token);
      }
    }
  };

  const handleDeleteFromCart = () => {
    // If user is logged in, remove the product from the cart
    if (user) {
      removeProductFromCart(product.id, user.token);
    }

    const cartItem = { id: product.id, quantity: 1 };
    dispatch(removeFromCart({ id: cartItem.id }));
    dispatch(deleteSelectedProduct({ id: cartItem.id }));
    dispatch(decrementCartCount());
    console.log("Item removed", cartItem);
  };

  const sendUpdateToEndpoint = async (
    productId: number,
    newQuantity: number,
    token: any
  ) => {
    const apiUrl =
      "https://weird-entry-lara-production.up.railway.app/api/cart";

    try {
      // Fetch the user's current cart
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        const userCart = response.data.items;

        // Update the quantity for the specific product in the cart
        if (userCart[productId]) {
          userCart[productId].quantity = newQuantity;
        } else {
          // If the product is not in the cart, add it with the new quantity
          userCart[productId] = {
            title: product.title,
            price: product.price,
            product_image: product.product_image,
            quantity: newQuantity,
          };
        }

        // Remove any undefined products from the cart
        delete userCart.undefined;

        // Send the updated cart to the endpoint
        const updateResponse = await axios.post(
          apiUrl + "/create",
          {
            user_email: `${user.user.email}`,
            items: userCart,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (updateResponse.status !== 200) {
          console.error("Error updating cart:", updateResponse.statusText);
        } else {
          // console.log('Update successfully sent to the endpoint.');
        }
      } else {
        console.error("Failed to fetch user cart:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeProductFromCart = async (productId: number, token: any) => {
    const apiUrl =
      "https://weird-entry-lara-production.up.railway.app/api/cart";

    try {
      // Fetch the user's current cart
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        const userCart = response.data.items;

        // Remove the product from the cart
        delete userCart[productId];

        // Send the updated cart to the endpoint
        const updateResponse = await axios.post(
          apiUrl + "/create",
          {
            user_email: `${user.user.email}`,
            items: userCart,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (updateResponse.status !== 200) {
          console.error("Error updating cart:", updateResponse.statusText);
        } else {
          // console.log('Update successfully sent to the endpoint.');
        }
      } else {
        console.error("Failed to fetch user cart:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Image
        src={product.product_image}
        alt="item1"
        width={200}
        height={50}
        className="rounded-lg h-[150px]"
      />
      <div className="flex flex-col gap-[5px]">
        <h2 className="text-sm font-normal uppercase">{product.title}</h2>
        <h1 className="font-bold text-sm my-1">
          ₦ {product.price.toLocaleString()}
        </h1>

        <div className="flex items-center justify-between gap-6">
          <div className="flex gap-1">
            <h2 className="text-sm">Size: </h2>
            <p className="text-sm"> {product.size}</p>
          </div>
          <div className="flex items-center justify-start gap-[12px] text-sm my-1">
            <h2 className="text-sm">Qty:</h2>
            <button
              className="text-lg px-2 rounded-lg"
              onClick={decrementQuantity}
            >
              -
            </button>
            <h2>{user ? product.quantity : quantity}</h2>
            <button
              className="text-lg px-2 rounded-lg"
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>
        </div>
        <div className="py-2 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src={Favorite} width={20} height={20} alt="delete icon" />
            <h2 className="text-xs uppercase">Add to wishlist</h2>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleDeleteFromCart}
          >
            <Image src={DeleteSvg} width={20} height={20} alt="delete icon" />
            <h2 className="text-xs uppercase">Delete</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProducts;
