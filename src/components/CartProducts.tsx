import React, { useState, useEffect } from "react";
import Image from "next/image";
import DeleteSvg from "../../public/Images/delete.svg";
import Favorite from "../../public/Images/Heart.svg";
import { ProductData } from "@/components/product";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import cancel from "../../public/Images/cancel.svg";
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
  CartItem,
} from "@/redux/slices/cartSlice";
import axios from "axios";

interface CartProductProps {
  cartData: ProductData[];
}

const CartProducts: React.FC<CartProductProps> = ({
  cartData: initialCartData,
}) => {
  console.log({ initialCartData });
  const [localCartData, setLocalCartData] = useState(initialCartData);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(false);
  // const cartItem = cartItems.find((item) => item.id === product.id);
  // const initialQuantity = cartItem ? cartItem.quantity : 0;

  //   const cartItemKey = `${product.id}_${product.size}_${product.color}`;
  // const cartItem = cartItems[cartItemKey];
  // const initialQuantity = cartItem ? cartItem.quantity : 0;

  //   const [quantity, setQuantity] = useState(initialQuantity);

  //   // const existingProductKey = `${product.id}_${product.size}_${product.color}`;
  //   //     const existingProduct = cartItems[existingProductKey];

  //   useEffect(() => {
  //     // Set the local state to the updated quantity when it changes in the Redux store
  //     setQuantity(initialQuantity);
  //   }, [initialQuantity]);

  // Inside your component

  useEffect(() => {
    if (!user) {
      setLocalCartData(initialCartData);
    }
  }, [initialCartData, user]);

  const refreshCartData = async () => {
    try {
      setLoading(true); 
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
      const productEndpoint = "cart";

      const apiUrl = `${apiBaseUrl}${productEndpoint}`;
      // Make an API call to fetch the latest cart data
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        // Update the local cart data with the latest data from the server
        setLocalCartData(response.data.items);
      } else {
        console.error(
          "Failed to fetch updated cart data:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching updated cart data:", error);
    }finally {
      setLoading(false); // Set loading to false when fetching data ends
    }
  };

  const incrementQuantity = async (productKey: any) => {
    const product = initialCartData[productKey];
    console.log("product quantity", product.quantity);
    dispatch(incrementItem(productKey));
    dispatch(
      updateItemQuantity({ productKey, quantity: product.quantity + 1 })
    );

    if (user) {
      await sendUpdateToEndpoint(productKey, product.quantity + 1, user.token);
      // Refresh cart data after updating
      await refreshCartData();
    }
  };

  const decrementQuantity = async (productKey: any) => {
    const product = initialCartData[productKey];
    if (product.quantity > 0) {
      dispatch(decrementItem(productKey));
      dispatch(
        updateItemQuantity({ productKey, quantity: product.quantity - 1 })
      );
    }
    // If user is logged in, send update to /cart/create endpoint
    if (user) {
      if (product.quantity > 0) {
        await sendUpdateToEndpoint(
          productKey,
          product.quantity - 1,
          user.token
        );
        // Refresh cart data after updating
        await refreshCartData();
      }
    }
  };

  const handleDeleteFromCart = async (productKey: any) => {
    const product = initialCartData[productKey];
    // If user is logged in, remove the product from the cart
    if (user) {
      await removeProductFromCart(productKey, user.token);
    }

    // const cartItem = { id: product.id, quantity: 1 };
    dispatch(removeFromCart({ productKey }));
    // dispatch(deleteSelectedProduct({ id: cartItem.id }));
    dispatch(decrementCartCount());
    // console.log("Item removed", cartItem);

    // Refresh cart data after deletion
    await refreshCartData();
  };

  const sendUpdateToEndpoint = async (
    productKey: any,
    newQuantity: number,
    token: any
  ) => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const productEndpoint = "cart";

    const apiUrl = `${apiBaseUrl}${productEndpoint}`;
    const product = initialCartData[productKey];
    console.log({ product });

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
        console.log({ userCart });
        console.log(userCart[productKey]);
        console.log("Product Key", productKey);

        // Update the quantity for the specific product in the cart
        if (initialCartData[productKey]) {
          initialCartData[productKey].quantity = newQuantity;
        } else {
          // If the product is not in the cart, add it with the new quantity
          initialCartData[productKey] = {
            id: product.id,
            title: product.title,
            price: product.price,
            sales_price: product.sales_price,
            color: product.color,
            size: product.size,
            product_image: product.product_image,
            quantity: newQuantity,
          };
        }

        // Remove any undefined products from the cart
        // delete cartData.undefined;

        // Send the updated cart to the endpoint
        const updateResponse = await axios.post(
          apiUrl + "/create",
          {
            user_email: `${user.user.email}`,
            items: initialCartData,
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

  const removeProductFromCart = async (productKey: any, token: any) => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const productEndpoint = "cart";

    const apiUrl = `${apiBaseUrl}${productEndpoint}`;

    const product = initialCartData[productKey];

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
        delete initialCartData[productKey];
        console.log("deleted product ", productKey, "from cart");

        // Send the updated cart to the endpoint
        const updateResponse = await axios.post(
          apiUrl + "/create",
          {
            user_email: `${user.user.email}`,
            items: initialCartData,
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
    <div className="flex flex-col gap-6 px-2 text-[#1B2E3C]">
      {Object.entries(localCartData).map(([productKey, product]) => (
        <div
          className="h-[230PX] relative grid grid-cols-2 gap-4 sm:bg-[#F3E3E2] rounded-lg px-4 sm:px-[40px] py-6 border border-gray-200 mx-4 sm:mx-0"
          key={productKey}
        >
          <div className="h-full flex items-center justify-center overflow-hidden">
            <Image
              src={product.product_image as unknown as string}
              alt="item1"
              width={200}
              height={50}
              className="object-cover transform hover:scale-110 transition-transform duration-300 rounded-lg"
            />
          </div>

          <div className="flex items-start justify-center flex-col gap-[5px] h-full">
            <h2 className="text-xs sm:text-sm font-normal uppercase max-w-[170px] sm:max-w-full">
              {product.title}
            </h2>
            <h1 className="font-bold text-sm my-1">
              {product.sales_price ? (
                <div className="flex items-center justify-start gap-2 sm:gap-4 my-1">
                  <span className="text-sm sm:text-lg font-bold text-[#1B2E3C]">
                    ₦ {product.sales_price.toLocaleString()}
                  </span>
                  <span className="text-[12px] text-gray-500 line-through mr-2">
                    ₦ {product.price.toLocaleString()}
                  </span>
                </div>
              ) : (
                <h2 className="text-sm sm:text-lg font-bold my-1 text-[#1B2E3C]">
                  ₦ {product.price.toLocaleString()}
                </h2>
              )}
            </h1>

            <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-3 sm:gap-6">
              <div className="flex gap-1">
                <h2 className="text-xs sm:text-sm">Size: </h2>
                <p className="text-xs sm:text-sm"> {product.size}</p>
              </div>
              <div className="flex gap-1">
                <h2 className="text-xs sm:text-sm">Color: </h2>
                <p className="text-xs sm:text-sm"> {product.color}</p>
              </div>
            </div>
            <div className="flex items-center justify-start gap-[4px] sm:gap-[12px] text-xs sm:text-sm my-1">
              <h2 className="text-xs sm:text-sm">Qty:</h2>
              <button
                className="text-lg px-2 rounded-lg"
                onClick={() => decrementQuantity(productKey)}
                disabled={loading}
              >
                -
              </button>
              <h2 className="text-sm">{product.quantity}</h2>
              <button
                className="text-lg px-2 rounded-lg"
                onClick={() => incrementQuantity(productKey)}
                disabled={loading}
              >
                +
              </button>
            </div>
            <div className="absolute top-6 right-1 sm:right-3 rounded-full bg-red-500 p-[6px] block sm:hidden">
              <Image
                src={cancel}
                width={10}
                height={10}
                alt=""
                className="cursor-pointer "
                onClick={() => handleDeleteFromCart(productKey)}
              />
            </div>

            <div className="py-1 hidden sm:flex justify-between items-center sm:gap-4">
              {/* <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src={Favorite}
                  width={20}
                  height={20}
                  alt="delete icon"
                />
                <h2 className="text-xs uppercase">Add to wishlist</h2>
              </div> */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                // onClick={handleDeleteFromCart}
                onClick={() => handleDeleteFromCart(productKey)}
              >
                <Image
                  src={DeleteSvg}
                  width={20}
                  height={20}
                  alt="delete icon"
                />
                <h2 className="text-xs uppercase">Delete</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartProducts;
