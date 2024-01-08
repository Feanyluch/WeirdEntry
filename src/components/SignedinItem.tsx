import { clearUser } from "@/redux/slices/authSlice";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user); // Assuming your token is stored in the user object

  const handleLogout = async () => {
    try {
      // Make a POST request to the logout endpoint
      const response = await fetch(
        "https://weird-entry-api.onrender.com/api/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Clear user from local storage
      dispatch(clearUser());
      router.push("/login");
      console.log("User logged out successfully");
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 w-full hover:bg-[#f3cfcc] cursor-pointer"
    >
      Logout
    </button>
  );
};

const SignedinItem = () => {
  return (
    <div className="bg-[#F3E3E2] w-[150px]">
      <div className="flex items-center justify-center flex-col gap-2">
        <Link
          href="/my-account"
          className="p-2 w-full hover:bg-[#f3cfcc] cursor-pointer"
        >
          My account
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
};

export default SignedinItem;
