import Breadcrumb from "@/components/BreadCrumb";
import React, { useEffect, useState } from "react";
import axios from "axios";

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
import { signup } from "@/service/authService";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";

interface HomeProps {
  products: ProductData[];
}

const Index: React.FC<HomeProps> & { title: string } = ({ products }) => {
  const {
    first_name,
    setFirstName,
    last_name,
    setLastName,
    lastNameError,
    firstNameError,
    email,
    setEmail,
    city,
    setCity,
    cityError,
    setCityError,
    state,
    stateError,
    setState,
    setStateError,
    address,
    setAddress,
    addressError,
    setAddressError,
    emailError,
    password,
    setPassword,
    setPasswordError,
    // setEmailError,
    passwordError,
    showPassword,
    //

    isStateFocused,
    isCityFocused,
    setIsCityFocused,
    setIsStateFocused,
    isFirstNameFocused,
    setIsFirstNameFocused,
    isAddressFocused,
    setIsAddressFocused,
    isLastNameFocused,
    setIsLastNameFocused,
    password_confirmation,
    setConfirmPassword,
    setConfirmPasswordError,
    // setEmailError,
    confirmPasswordError,
    showConfirmPassword,
    rememberMe,
    setRememberMe,
    isPasswordFocused,
    setIsPasswordFocused,
    isConfirmPasswordFocused,
    setIsConfirmPasswordFocused,
    isEmailFocused,
    setIsEmailFocused,
    //
    handleCityBlur,
    handleCityChange,
    handleStateBlur,
    handleStateChange,
    handleAddressBlur,
    handleAddressChange,
    handleEmailBlur,
    handleFirstNameBlur,
    handleLastNameBlur,
    handlePasswordBlur,
    handleConfirmPasswordBlur,
    handleSubmit,
    handleEmailChange,
    handleFirstNameChange,
    handleLastNameChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleShowPasswordClick,
    handleShowConfirmPasswordClick,
  } = useLogin();
  const [isChecked, setIsChecked] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  const handleCheckboxChange = (newCheckedState: boolean) => {
    console.log(newCheckedState);
    setIsChecked(newCheckedState);
  };

  const dispatch = useDispatch();

  // Check if the user is logged in
  useEffect(() => {
    // Check if the code is running on the client-side
    if (typeof window !== 'undefined') {
      // Check if the user is logged in
      if (user) {
        // If the user is logged in, redirect to another page (e.g., home page)
        router.replace('/'); // Replace with the path you want to redirect to
      }
    }
  }, [user, router]);

  // If the user is logged in, return null or any loading indicator while the redirection is happening
  if (user) {
    return null;
  }

  const handleSignup = async () => {
    try {
      const user = await signup(router, {
        email,
        password,
        first_name,
        last_name,
        address,
        city,
        state,
        password_confirmation,
      });
      setFirstName("");
      setLastName("");
      setAddress("");
      setState("");
      setCity("")
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      console.log("user details", user);
      // dispatch(setUser(user));
      // Redirect or perform further actions
    } catch (error) {
      console.error("Signup error:", error);
      // Handle signup error, display error messages, etc.
    }
  };

  return (
    <div className="">
      <Breadcrumb products={products} />
      <div className="flex items-center justify-center bg-[#fdf9f9] py-8 max-w-[1200px] mx-auto my-[3rem]">
        <div className="bg-white w-[500px]  py-2 px-8">
          <h2 className="text-5xl text-center py-12 uppercase">Register</h2>
          <div className="my-2">
            <div className="">
              <div className="py-2">
              <div className="flex flex-col">
                    <label className="pb-2 text-[#1B2E3C80] text-xs">
                      First Name
                    </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={first_name}
                  placeholder="First Name"
                  className={`h-[60px] w-full px-4 bg-[#f3f4f5] focus:outline-none focus:border-[#1B2E3C] focus:border-2 rounded-lg ${
                    isFirstNameFocused ? "bg-white" : "bg-[#f3f4f5]"
                  }`}
                  onFocus={() => setIsFirstNameFocused(true)}
                  onChange={handleFirstNameChange}
                  onBlur={handleFirstNameBlur}
                />
                </div>
              </div>

              {firstNameError && (
                <span className="text-[#1B2E3C] text-sm py-1">
                  {firstNameError}
                </span>
              )}
            </div>
            <div className="">
              <div className="py-2">
              <div className="flex flex-col">
                    <label className="pb-2 text-[#1B2E3C80] text-xs">
                      Last Name
                    </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={last_name}
                  placeholder="Last Name"
                  className={`h-[60px] w-full px-4 bg-[#f3f4f5] focus:outline-none focus:border-[#1B2E3C] focus:border-2 rounded-lg ${
                    isLastNameFocused ? "bg-white" : "bg-[#f3f4f5]"
                  }`}
                  onFocus={() => setIsLastNameFocused(true)}
                  onChange={handleLastNameChange}
                  onBlur={handleLastNameBlur}
                />
                </div>
              </div>

              {lastNameError && (
                <span className="text-[#1B2E3C] text-sm py-1">
                  {lastNameError}
                </span>
              )}
            </div>
            <div className="">
              <div className="py-2">
              <div className="flex flex-col">
                    <label className="pb-2 text-[#1B2E3C80] text-xs">
                      Address
                    </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  placeholder="Delivery Address"
                  className={`h-[60px] w-full px-4 bg-[#f3f4f5] focus:outline-none focus:border-[#1B2E3C] focus:border-2 rounded-lg ${
                    isAddressFocused ? "bg-white" : "bg-[#f3f4f5]"
                  }`}
                  onFocus={() => setIsAddressFocused(true)}
                  onChange={handleAddressChange}
                  onBlur={handleAddressBlur}
                />
                </div>
              </div>

              {addressError && (
                <span className="text-[#1B2E3C] text-sm py-1">
                  {addressError}
                </span>
              )}
            </div>
            <div className="">
              <div className="py-2">
              <div className="flex flex-col">
                    <label className="pb-2 text-[#1B2E3C80] text-xs">
                      City
                    </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  placeholder="Delivery City"
                  className={`h-[60px] w-full px-4 bg-[#f3f4f5] focus:outline-none focus:border-[#1B2E3C] focus:border-2 rounded-lg ${
                    isCityFocused ? "bg-white" : "bg-[#f3f4f5]"
                  }`}
                  onFocus={() => setIsCityFocused(true)}
                  onChange={handleCityChange}
                  onBlur={handleCityBlur}
                />
                </div>
              </div>

              {cityError && (
                <span className="text-[#1B2E3C] text-sm py-1">
                  {cityError}
                </span>
              )}
            </div>
            <div className="">
              <div className="py-2">
              <div className="flex flex-col">
                    <label className="pb-2 text-[#1B2E3C80] text-xs">
                      State
                    </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={state}
                  placeholder="Delivery State"
                  className={`h-[60px] w-full px-4 bg-[#f3f4f5] focus:outline-none focus:border-[#1B2E3C] focus:border-2 rounded-lg ${
                    isStateFocused ? "bg-white" : "bg-[#f3f4f5]"
                  }`}
                  onFocus={() => setIsStateFocused(true)}
                  onChange={handleStateChange}
                  onBlur={handleStateBlur}
                />
                </div>
              </div>

              {stateError && (
                <span className="text-[#1B2E3C] text-sm py-1">
                  {stateError}
                </span>
              )}
            </div>            
            <div className="">
              <div className="py-2">
              <div className="flex flex-col">
                    <label className="pb-2 text-[#1B2E3C80] text-xs">
                      Email
                    </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Email Address"
                  className={`h-[60px] w-full px-4 bg-[#f3f4f5] focus:outline-none focus:border-[#1B2E3C] focus:border-2 rounded-lg ${
                    isEmailFocused ? "bg-white" : "bg-[#f3f4f5]"
                  }`}
                  onFocus={() => setIsLastNameFocused(true)}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                />
                </div>
              </div>

              {emailError && (
                <span className="text-[#1B2E3C] text-sm py-1">
                  {emailError}
                </span>
              )}
            </div>

            <div className="">
              <div className="py-2">
              <div className="flex flex-col">
                    <label className="pb-2 text-[#1B2E3C80] text-xs">
                      Password
                    </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    className={`h-[60px] w-full bg-[#f3f4f5] px-4 rounded-lg focus:outline-none focus:border-[#1B2E3C] focus:border-2 ${
                      isPasswordFocused ? "bg-white" : "bg-[#f3f4f5]"
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
              </div>
              {passwordError && (
                <span className="text-[#1B2E3C] text-sm py-1">
                  {passwordError}
                </span>
              )}
            </div>
            <div className="">
              <div className="py-2">
              <div className="flex flex-col">
                    <label className="pb-2 text-[#1B2E3C80] text-xs">
                      Confirm Password
                    </label>
                <div className="relative">

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={password_confirmation}
                    placeholder="Confirm Password"
                    className={`h-[60px] w-full bg-[#f3f4f5] px-4 rounded-lg focus:outline-none focus:border-[#1B2E3C] focus:border-2 ${
                      isConfirmPasswordFocused ? "bg-white" : "bg-[#f3f4f5]"
                    }`}
                    onChange={handleConfirmPasswordChange}
                    onFocus={() => setIsConfirmPasswordFocused(true)}
                    onBlur={handleConfirmPasswordBlur}
                  />
                  <div
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={handleShowConfirmPasswordClick}
                  >
                    <div
                      className={`w-6 h-6 ${
                        showConfirmPassword
                          ? "text-[#1B2E3C]"
                          : "text-green-600"
                      }`}
                    >
                      {showConfirmPassword ? <Image src={eyeCloseIcon} alt="eye" /> : <Image src={eyeIcon} alt="eye" /> }
                    </div>
                  </div>
                </div>
                </div>
              </div>
              {confirmPasswordError && (
                <span className="text-[#1B2E3C] text-sm py-1">
                  {confirmPasswordError}
                </span>
              )}
            </div>
          </div>
          {/* <RoundCheckbox
            label="Remember me"
            checked={isChecked}
            onChange={handleCheckboxChange}
          /> */}
          <div className="my-2">
            <button
              onClick={handleSignup}
              className="py-3 px-8 my-4 w-full border-2 transition-all border-[#1B2E3C] hover:bg-[#1B2E3C] hover:text-white rounded-lg uppercase text-xl"
            >
              Sign up
            </button>
          </div>
          <div className="flex items-center justify-end text-gray-400 py-8">
            {/* <Link href="/">Forgot password ?</Link> */}
            <div className="flex flex-end">
              <Link href="/login">Login</Link>
              <Image src={toright} width={20} height={20} alt="to right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Index.title = "Sign up - WeirdEntry";

export const getStaticProps: GetStaticProps = async () => {
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
