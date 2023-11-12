import Breadcrumb from "@/components/BreadCrumb";
import React, { useState } from "react";

import { ProductData } from "@/components/product";
import { GetStaticProps } from "next";
import RoundCheckbox from "@/components/Checkbox";
import Link from "next/link";
import Image from "next/image";

import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";

import { useLogin } from "@/hook/useLogin";

import toright from "../../../public/Images/To-Right.svg";
import { signup } from "@/service/authService";

interface HomeProps {
  products: ProductData[];
}

const Index: React.FC<HomeProps> = ({ products }) => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    lastNameError,
    firstNameError,
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    setPasswordError,
    // setEmailError,
    passwordError,
    showPassword,
    //

    
    isFirstNameFocused,
    setIsFirstNameFocused,
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

  const handleCheckboxChange = (newCheckedState: boolean) => {
    console.log(newCheckedState);
    setIsChecked(newCheckedState);
  };

  const dispatch = useDispatch();

  const handleSignup = async () => {
    try {
      const user = await signup({
        email,
        password,
        firstName,
        lastName,
        password_confirmation,
      });
      console.log("user details", user);
      dispatch(setUser(user));
      // Redirect or perform further actions
    } catch (error) {
      console.error("Signup error:", error);
      // Handle signup error, display error messages, etc.
    }
  };

  return (
    <div className="">
      <Breadcrumb products={products} />
      <div className="flex items-center justify-center bg-[#fdf9f9] py-8 w-[1200px] mx-auto my-[3rem]">
        <div className="bg-white w-[500px]  py-2 px-8">
          <h2 className="text-5xl text-center py-12 uppercase">Login</h2>
          <div className="my-2">
            <div className="">
              <div className="py-2">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  placeholder="First Name"
                  className={`h-[60px] w-full px-4 bg-[#f3f4f5] focus:outline-none focus:border-[#1B2E3C] focus:border-2 rounded-lg ${
                    isFirstNameFocused ? "bg-white" : "bg-[#f3f4f5]"
                  }`}
                  onFocus={() => setIsFirstNameFocused(true)}
                  onChange={handleFirstNameChange}
                  onBlur={handleFirstNameBlur}
                />
              </div>

              {firstNameError && (
                <span className="text-[#1B2E3C] text-sm py-1">
                  {firstNameError}
                </span>
              )}
            </div>
            <div className="">
              <div className="py-2">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  placeholder="Last Name"
                  className={`h-[60px] w-full px-4 bg-[#f3f4f5] focus:outline-none focus:border-[#1B2E3C] focus:border-2 rounded-lg ${
                    isLastNameFocused ? "bg-white" : "bg-[#f3f4f5]"
                  }`}
                  onFocus={() => setIsLastNameFocused(true)}
                  onChange={handleLastNameChange}
                  onBlur={handleLastNameBlur}
                />
              </div>

              {lastNameError && (
                <span className="text-[#1B2E3C] text-sm py-1">
                  {lastNameError}
                </span>
              )}
            </div>
            <div className="">
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
                  onFocus={() => setIsLastNameFocused(true)}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                />
              </div>

              {lastNameError && (
                <span className="text-[#1B2E3C] text-sm py-1">
                  {lastNameError}
                </span>
              )}
            </div>

            <div className="">
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
                      <Image src={toright} alt="eye" />
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
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={password_confirmation}
                    placeholder="Confirm Password"
                    className={`h-[60px] w-full bg-[#f3f4f5] px-4 rounded-lg focus:outline-none focus:border-[#1B2E3C] focus:border-2 ${
                      isEmailFocused ? "bg-white" : "bg-[#f3f4f5]"
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
                      <Image src={toright} alt="eye" />
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
          <RoundCheckbox
            label="Remember me"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <div className="my-2">
            <button
              onClick={handleSignup}
              className="py-3 px-8 my-4 w-full border-2 transition-all border-[#1B2E3C] hover:bg-[#1B2E3C] hover:text-white rounded-lg uppercase text-xl"
            >
              Sign up
            </button>
          </div>
          <div className="flex items-center justify-between text-gray-400 py-8">
            <Link href="/">Forgot password ?</Link>
            <div className="flex">
              <Link href="/">Register</Link>
              <Image src={toright} width={20} height={20} alt="to right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const productData = await import("../../../assets/productData.json");

  return {
    props: {
      products: productData.products as ProductData[],
    },
  };
};

export default Index;
