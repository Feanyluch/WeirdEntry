import Breadcrumb from "@/components/BreadCrumb";
import React, { useEffect, useState } from "react";

import { ProductData } from "@/components/product";
import { GetStaticProps } from "next";
import RoundCheckbox from "@/components/Checkbox";
import Link from "next/link";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";

import { useLogin } from "@/hook/useLogin";

import toright from "../../../public/Images/To-Right.svg";
import eyeIcon from "../../../public/Images/eyeIcon.svg";
import eyeCloseIcon from "../../../public/Images/eyeCloseIcon.svg";
import { login } from "@/service/authService";
import axios from "axios";
import { useRouter } from "next/router";
import { RootState } from "@/redux/store";

interface HomeProps {
  products: ProductData[];
}

const Index: React.FC<HomeProps> & { title: string } = ({ products }) => {
  const {
    email,
    emailError,
    password,
    passwordError,
    showPassword,
    setIsPasswordFocused,
    isEmailFocused,
    setIsEmailFocused,
    //
    handleEmailBlur,
    handlePasswordBlur,
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
    handleShowPasswordClick,
  } = useLogin();
  const [isChecked, setIsChecked] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Check if the user is logged in
  useEffect(() => {
    // Check if the user is logged in
    if (user) {
      // If the user is logged in, redirect to another page (e.g., home page)
      router.replace('/'); // Replace with the path you want to redirect to
    }
  }, [user, router]);

  // If the user is logged in, return null or any loading indicator while the redirection is happening
  if (user) {
    return null;
  }

  const handleCheckboxChange = (newCheckedState: boolean) => {
    console.log(newCheckedState);
    setIsChecked(newCheckedState);
  };

  

  const handleLogin = async () => {
    try {
      const user = await login(cartItems, router, dispatch, { email, password });
      // dispatch(setUser(user));

      // Navigate back by one step in the browser's history
      // router.back();
    } catch (error) {
      // Handle login error
    }
  };

  return (
    <div className="">
      <Breadcrumb products={products} />
      <div className="flex items-center justify-center bg-[#fdf9f9] py-8 max-w-[1200px] mx-auto my-[3rem]">
        <div className="bg-white w-[500px] h-[580px] py-2 px-8">
          <h2 className="text-5xl text-center py-12 uppercase">Login</h2>
          <div className="my-2">
            <div className="py-2">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Email Address"
                className={`h-[60px] w-full px-4 bg-[#f3f4f5] focus:outline-none focus:border-[#1B2E3C] focus:border-2 rounded-lg ${
                  isEmailFocused ? "bg-white" : "bg-[#f3f4f5]"
                }`}
                onFocus={() => setIsEmailFocused(true)}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
              />
            </div>

            {emailError && (
              <span className="text-[#1B2E3C] text-sm py-1">{emailError}</span>
            )}

            <div className="py-2">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  className={`h-[60px] w-full bg-[#f3f4f5] px-4 rounded-lg focus:outline-none focus:border-[#1B2E3C] focus:border-2 ${
                    isEmailFocused ? "bg-white" : "bg-[#f3f4f5]"
                  }`}
                  onChange={handlePasswordChange}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={handlePasswordBlur}
                />
                <div
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={handleShowPasswordClick}
                >
                  <div
                    className={`w-6 h-6 ${
                      showPassword ? "text-[#1B2E3C]" : "text-green-600"
                    }`}
                  >
                    {showPassword ? <Image src={eyeCloseIcon} alt="eye" /> : <Image src={eyeIcon} alt="eye" /> }
                  </div>
                </div>
              </div>
            </div>
            {passwordError && (
              <span className="text-[#1B2E3C] text-sm py-1">
                {passwordError}
              </span>
            )}
          </div>
          <RoundCheckbox
            label="Remember me"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <div className="my-2">
            <button
              onClick={handleLogin}
              className="py-3 px-8 my-4 w-full border-2 transition-all border-[#1B2E3C] hover:bg-[#1B2E3C] hover:text-white rounded-lg uppercase text-xl"
            >
              Login
            </button>
          </div>
          <div className="flex items-center justify-between text-gray-400 py-8">
            <Link href="/forgot-password">Forgot password ?</Link>
            <div className="flex">
              <Link href="/signup">Register</Link>
              <Image src={toright} width={20} height={20} alt="to right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Index.title = "Login - Weird Entry";

export const getStaticProps: GetStaticProps = async () => {
  // Fetch data from the API using Axios
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const productEndpoint = "product";

  const apiUrl = `${apiBaseUrl}${productEndpoint}`;

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

export default Index;
