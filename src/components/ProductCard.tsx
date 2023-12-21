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
} from "@/redux/slices/cartSlice";
import store, { RootState } from "@/redux/store";
import axios from "axios";
import { saveCartToLocalStorage } from "@/utils/localStorageHelper";
interface ProductCardProps {
  product: ProductData;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // console.log("Product Card Prop", product);
  // const [showAllStars, setShowAllStars] = useState(false);

  // const totalStars = 5;
  // const grayStars = totalStars - product.rating;
  // const displayStars = showAllStars ? totalStars : product.rating;

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleAddToCart = () => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
  
    if (existingProduct) {
      // If the product is already in the cart, increment its quantity
      dispatch(incrementItem(existingProduct.id));
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      const cartItem = { id: product.id, quantity: 1 };
      dispatch(addToCart(cartItem));
      dispatch(incrementCartCount());
    }
  
    // dispatch(addSelectedProduct(product));
  
    // Make the POST request to the server
    if (typeof window !== 'undefined') {
      // Execute only on the client side
      const apiUrl = "https://weird-entry-lara-production.up.railway.app/api/cart/create";
      const token = `${user.token}`;
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };
  
      const requestData = {
        user_email: `${user.user.email}`,
        items: {
          [product.id]: {
            title: product.title,
            price: product.price,
            id: product.id,
          },
        },
      };
  
      axios
  .post(apiUrl, requestData, { headers })
  .then((response) => {
    console.log("POST request successful", response.data);

    // Create an updated state with the received data
    const updatedCartState: {
      items: CartItem[];
      cartCount: number;
      itemQuantity: number;
      selectedProduct: ProductData[];
    } = {
      items: [
        ...cartItems,
        {
          // id: product.id,
          quantity: 1,
          // selectedProduct: [],
          ...requestData.items[product.id],
        },
      ],
      cartCount: cartItems.length + 1,
      itemQuantity: 0, // Update with the correct value
      selectedProduct: [], // Update with the correct value
    };


    // Save the updated state to local storage
    saveCartToLocalStorage(updatedCartState);

    console.log({updatedCartState})

    // Dispatch the action to update the Redux state
    dispatch(addSelectedProduct(product));

    // You can handle the response as needed
  })
  .catch((error) => {
    console.error("Error making POST request", error);
    // Handle error appropriately
  });

    }
  };
  

  return (
    <div>
      <Link href={`/shop/${product.id}`} passHref>
        <div className="rounded-lg h-[200px] relative overflow-hidden">
          <h2 className="absolute z-[9] bg-gray-200 px-4 py-2">-50%</h2>
          <Image
            src={product.product_image}
            width={350}
            height={500}
            alt={product.title}
            className=" object-cover transform hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="my-5">
          <h2 className="capitalize">{product.title}</h2>
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
          <h2 className="text-lg my-4 font-bold">₦ {product.price.toLocaleString()}</h2>
        </div>
      </Link>
      <div className="flex gap-4 w-full">
        <button
          onClick={handleAddToCart}
          className="text-sm py-3 w-3/4 uppercase border border-[#0C0C1E] rounded-lg hover:bg-[#1B2E3C] hover:text-[#F3E3E2] transition ease-in-out duration-300"
        >
          Add to cart
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
