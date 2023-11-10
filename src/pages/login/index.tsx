import Breadcrumb from "@/components/BreadCrumb";
import React, { useState } from "react";

import { ProductData } from "@/components/product";
import { GetStaticProps } from "next";
import RoundCheckbox from "@/components/Checkbox";
import Link from "next/link";
import Image from "next/image";

import { useLogin } from "@/hook/useLogin";

import toright from "../../../public/Images/To-Right.svg";

interface HomeProps {
  products: ProductData[];
}

const Index: React.FC<HomeProps> = ({ products }) => {
  const {
    name,
    setName,
    nameError,
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    setPasswordError,
    // setEmailError,
    passwordError,
    showPassword,
    rememberMe,
    setRememberMe,
    isPasswordFocused,
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

  const handleCheckboxChange = (newCheckedState: boolean) => {
    console.log(newCheckedState);
    setIsChecked(newCheckedState);
  };

  return (
    <div className="">
      <Breadcrumb products={products} />
      <div className="flex items-center justify-center bg-[#fdf9f9] py-8 w-[1200px] mx-auto my-[3rem]">
        <div className="bg-white w-[500px] h-[580px] py-2 px-8">
          <h2 className="text-5xl text-center py-12 uppercase">Login</h2>
          <div className="my-2">
            <div className="py-2">
              <div
                className={`custom-input-group ${
                  isEmailFocused ? "focused" : ""
                }`}
              >
                <label
                  htmlFor="email"
                  className={`text-[12.8px] ${
                    isEmailFocused ? "text-[#1B2E3C] font-bold" : "text-[#BEBEBE]"
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Johnsondoe@nomail.com"
                  className={`h-[60px] bg-[#f3f4f5] focus:outline-none focus:border-[#1B2E3C] focus:border-2 ${isEmailFocused ? "bg-white" : "bg-[#f3f4f5]"}`}
                  onFocus={() => setIsEmailFocused(true)}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                />
              </div>

              {emailError && (
                <span className="text-[#1B2E3C] text-sm py-1">
                  {emailError}
                </span>
              )}
            </div>

            <div className="py-2">
              <div
                className={`custom-input-group ${
                  isPasswordFocused ? "focused" : ""
                }`}
              >
                <label
                  htmlFor="password"
                  className={`text-[12.8px] font-normal ${
                    isPasswordFocused ? "text-[#1B2E3C]" : "text-[#BEBEBE]"
                  }`}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    placeholder="**********"
                    className={`h-[60px] bg-[#f3f4f5] focus:outline-none focus:border-[#1B2E3C] focus:border-2 ${isEmailFocused ? "bg-white" : "bg-[#f3f4f5]"}`}
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
          </div>
          <RoundCheckbox
            label="Remember me"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <div className="my-2">
            <button className="py-3 px-8 my-4 w-full border-2 transition-all border-[#1B2E3C] hover:bg-[#1B2E3C] hover:text-white rounded-lg uppercase text-xl">
              Login
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