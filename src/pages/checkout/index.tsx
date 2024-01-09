import { useEffect, useState } from "react";

import Breadcrumb from "@/components/BreadCrumb";
import CartProducts from "@/components/CartProducts";
import Image from "next/image";
import React from "react";

import { ProductData } from "@/components/product";

import cartempty from "../../../public/Images/cartempty.png";

import VeriryCircle from "../../../public/Images/Verify-Circle.svg";
import Circle from "../../../public/Images/Circle.svg";
import Shirt from "../../../public/Images/newshirt.png";
import Link from "next/link";
import { GetStaticProps } from "next";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CheckoutProducts from "@/components/CheckoutProducts";
import RoundCheckbox from "@/components/Checkbox";
import axios from "axios";

import { PaystackButton } from "react-paystack";

interface HomeProps {
  products?: { data: ProductData[] } | undefined; // Make the prop optional
}

// Define the CheckboxStates interface
interface CheckboxStates {
  addCard: boolean;
  bankTransfer: boolean;
  terms: boolean;
  // Add more checkboxes as needed
}

interface CartItem {
  quantity: number;
  // Add other properties as needed
  page: number;
  id: number;
  title: string;
  description: string;
  price: number;
  size: string;
  color: string;
  product_image: string;
  sizes: { id: number; title: string; description: string }[]; // Update this line
  colors: { id: number; title: string; description: string }[]; // Update this line
}

const Checkout: React.FC<HomeProps> & { title: string } = ({ products }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user)
  const cartItems = useSelector((state: RootState) => state.cart.items);
  console.log({ cartItems });

  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState(user?.user?.first_name || '');
  const [lastName, setLastName] = useState(user?.user?.last_name || '');
  const [state, setState] = useState(user?.user?.state || '');
  const [city, setCity] = useState(user?.user?.city || '');
  const [zipCode, setZipCode] = useState(user?.user?.zipCode || '');
  const [address, setAddress] = useState(user?.user?.address || '');
  // Create an array of checkbox states
  const [checkboxStates, setCheckboxStates] = useState<CheckboxStates>({
    addCard: false,
    bankTransfer: false,
    terms: false,
    // Initialize more checkboxes as needed
  });

  // Function to handle checkbox changes
  const handleCheckboxChange = (checkboxName: keyof CheckboxStates) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [checkboxName]: !prevStates[checkboxName],
    }));

    // Uncheck the other checkbox
    if (checkboxName === "addCard") {
      setCheckboxStates((prevStates) => ({
        ...prevStates,
        bankTransfer: false,
      }));
    } else if (checkboxName === "bankTransfer") {
      setCheckboxStates((prevStates) => ({
        ...prevStates,
        addCard: false,
      }));
    }
  };

  // const selectedProducts = useSelector(
  //   (state: RootState) => state.cart.selectedProduct
  // );

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        if (user?.token) {
          // Fetch cart data from the database endpoint
          const response = await axios.get(
            "https://weird-entry-api.onrender.com/api/cart",
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
                Accept: "application/json",
              },
            }
          );

          // const itemsArray: CartItem[] = Object.values(response.data.items);
          const itemsArray = response.data.items;
          console.log({ itemsArray });
          setCartData(itemsArray);
        } else {
          // Use cart data from the Redux store for non-logged-in users
          setCartData(cartItems as CartItem[]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setError("Error fetching cart data");
        setLoading(false);
      }
    };

    fetchCartData();
  }, [user?.token, cartItems]); // Dependencies on user?.token and cartItems

  const uniqueSelectedProducts = Object.values(cartData).map((item) => item);

  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const item of uniqueSelectedProducts) {
      if (products && Array.isArray(products.data)) {
        const product = products.data.find((p) => p.id === item.id);

        if (product) {
          const priceAsNumber = product.price;
          console.log("Product Price:", product.price);
          console.log("Price as Number:", priceAsNumber);
          console.log("Item Quantity:", item.quantity);

          if (!isNaN(priceAsNumber)) {
            subtotal += priceAsNumber * item.quantity;
            console.log("Subtotal after this iteration:", subtotal);
          }
        }
      }
    }
    return subtotal;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    // const shippingChargePercentage = 0; // Adjust based on your requirement
    // const shippingCharge = (subtotal * shippingChargePercentage) / 100;
    const shippingCharge = 4000;
    return subtotal + shippingCharge;
  };

  const subtotal = calculateSubtotal();
  const total = calculateTotal();

  
  const paystackConfig = {
    reference: new Date().getTime(),
    email: "ayebo@yopmail.com", // Assuming you have the user's email in your Redux store
    amount: total * 100, // Paystack amount is in kobo (multiply by 100)
    publicKey: "your_public_key",
    channels: ["card", "bank_transfer"],
    currency: "NGN",
  };

  const handlePaymentSuccess = (response: { reference: any; }) => {
    // Send the order details to your backend API
    const orderDetails = {
      user_id: user.id, // Assuming you have the user's ID in your Redux store
      cart_id: "01hk3zz1a3xxp6er0sxptqb75a", // Replace with the actual cart ID
      subtotal: subtotal,
      delivery_fee: 4000, // Replace with the actual delivery fee
      total: total,
      shipping_address: "ikotun", // Replace with the actual shipping address
      payment_ref: response.reference,
    };

    // Make a POST request to your order create endpoint
    axios
      .post(
        "https://weird-entry-api.onrender.com/api/order/create",
        orderDetails,
        {
          headers: {
            Authorization: "Bearer Token", // Replace with the actual token
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Order placed successfully:", response.data);
        // Redirect or perform any necessary actions
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        // Handle the error appropriately
      });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg w-full p-4 text-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (Object.keys(cartData).length === 0) {
    return (
      <div>
        <Breadcrumb products={products} />
        <div className="flex items-center justify-center flex-col">
          <Image src={cartempty} alt="emptycart" />
          <h2 className="uppercase text-3xl my-4">
            YOUR CART IS CURRENTLY EMPTY
          </h2>
          <Link
            href="/shop"
            className="w-[300px] border border-[#0C0C1E] text-center rounded-lg my-8 py-4 text-base"
          >
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="" style={{ fontFamily: "'Nokora', sans-serif" }}>
      <Breadcrumb products={products} />

      <div className="bg-[#fdf9f9] max-w-[1200px] px-[70px] pt-[60px] pb-[30px] mx-auto my-[60px]">
        <div className="flex gap-[40px]">
          <div className="w-[58%] flex flex-col gap-[30px]">
            <div className="bg-white rounded-lg p-[40px]">
              <h2 className="uppercase text-sm font-normal">
                Delivery Details
              </h2>
              <div className="w-full h-[1px] bg-[#0C0C1E80] my-[20px]"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[#1B2E3C80] text-xs">First Name</label>
                  <input
                    type="text"
                    className="rounded px-2 bg-[#1B2E3C0D] h-[40px] outline-none capitalize text-sm"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[#1B2E3C80] text-xs">Last Name</label>
                  <input
                    type="text"
                    className="rounded px-2 bg-[#1B2E3C0D] h-[40px] outline-none capitalize text-sm"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 my-[20px]">
                <div className="flex flex-col">
                  <label className="text-[#1B2E3C80] text-xs">State</label>
                  <input
                    type="text"
                    className="rounded px-2 bg-[#1B2E3C0D] h-[40px] outline-none capitalize text-sm"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[#1B2E3C80] text-xs">City</label>
                  <input
                    type="text"
                    className="rounded px-2 bg-[#1B2E3C0D] h-[40px] outline-none capitalize text-sm"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[#1B2E3C80] text-xs">Zip Code</label>
                  <input
                    type="text"
                    className="rounded px-2 bg-[#1B2E3C0D] h-[40px] outline-none capitalize text-sm"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-[#1B2E3C80] text-xs">Address</label>
                <input
                  type="text"
                  className="rounded px-2 bg-[#1B2E3C0D] h-[40px] outline-none capitalize text-sm"
                  value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            {/* <div className="bg-white rounded-lg p-[40px]">
              <h2 className="uppercase text-sm font-normal">
                Delivery Details
              </h2>
              <div className="w-full h-[1px] bg-[#0C0C1E80] my-[20px]"></div>

              <div className="flex items-center justify-between bg-[#1B2E3C0D] h-[40px] rounded p-2">
                <div className="flex items-center justify-center gap-2">
                  <Image
                    src={VeriryCircle}
                    width={20}
                    height={20}
                    alt="verifyIcon"
                  />
                  <h2 className="text-xs ">Standard Shipping</h2>
                </div>
                <p className="text-[#1B2E3C80] font-normal text-xs">
                  within 30 minutes
                </p>
                <h2 className="font-bold text-xs">N4,000</h2>
              </div>
            </div> */}
            {/* <div className="bg-white rounded-lg p-[40px]">
              <h2 className="uppercase text-sm font-normal">Payment method</h2>
              <div className="w-full h-[1px] bg-[#0C0C1E80] my-[20px]"></div>

              <div className="flex flex-col gap-[20px]">
                <div className="bg-[#1B2E3C0D] h-[40px] rounded p-2 flex items-center justify-start gap-2 cursor-pointer">
                  <RoundCheckbox
                    label="Add Card"
                    checked={checkboxStates.addCard}
                    onChange={() => handleCheckboxChange("addCard")}
                  />
                </div>
                <div className="bg-[#1B2E3C0D] h-[40px] rounded p-2 flex items-center justify-start gap-2 cursor-pointer">
                  <RoundCheckbox
                    label="Bank Transfer"
                    checked={checkboxStates.bankTransfer}
                    onChange={() => handleCheckboxChange("bankTransfer")}
                  />
                </div>
              </div>
            </div> */}
            <div className="flex items-center justify-start gap-4 my-2">
              <RoundCheckbox
                label="By clicking place order, I agree to the Terms and Conditions"
                checked={checkboxStates.terms}
                onChange={() => handleCheckboxChange("terms")}
              />
              {/* <p className="text-xs">
                By clicking place order, I agree to the Terms and Conditions
              </p> */}
            </div>
            <div className="flex items-center justify-center">
              <button className="bg-[#1B2E3C] text-[#F3E3E2] px-[80px] py-[17px] rounded">
                Place Order
              </button>
              <PaystackButton
                {...paystackConfig}
                text="Place Order"
                onSuccess={(response: any) => handlePaymentSuccess(response)}
                onClose={() => console.log("Payment closed")}
              />
            </div>
          </div>
          <div className="w-[42%] h-[630px] bg-white rounded-lg p-[40px]">
            <h2 className="uppercase text-sm font-normal">items</h2>
            <div className="w-full h-[1px] bg-[#0C0C1E80] my-[20px]"></div>
            <div className="h-[330px] overflow-auto">
              <CheckoutProducts cartData={cartData} />
            </div>

            <div className="w-full h-[1px] bg-[#0C0C1E80] my-[20px]"></div>

            <div className="px-4 py-4">
              <div className="py-[10px] flex items-center justify-between">
                <h2 className="text-sm font-normal">Subtotal</h2>
                <h2 className="text-sm font-normal">
                  N{subtotal.toLocaleString()}
                </h2>
              </div>
              <div className="py-[10px] flex items-center justify-between">
                <h2 className="text-sm font-normal">Delivery Charge (Fixed)</h2>
                <h2 className="text-sm font-normal">N4,000</h2>
              </div>
              <div className="py-[10px] flex items-center justify-between">
                <h2 className="text-sm font-bold">Total</h2>
                <h2 className="text-sm font-bold">N{total.toLocaleString()}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Checkout.title = "Check out - Weird Entry";

export const getStaticProps: GetStaticProps = async () => {
  // Fetch data from the API using Axios
  const apiUrl = "https://weird-entry-api.onrender.com/api/product"; // Replace with your actual API endpoint

  try {
    const response = await axios.get(apiUrl);
    const productData = response.data;
    console.log("Product Data", productData);

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

export default Checkout;
