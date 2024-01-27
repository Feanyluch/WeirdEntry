import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/BreadCrumb";
import axios from "axios";
import { GetStaticProps } from "next";
import { ProductData } from "@/components/product";
import EmailVerification from "@/components/EmailVerification";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";

interface HomeProps {
  products: ProductData[];
}

const Index: React.FC<HomeProps> & { title: string } = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    // Extract the token from the URL
    const { query } = router;
    const token = query.token as string;

    // Check if the token is present
    if (token) {
      // Set up headers with the token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Make a GET request using the token as a header
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
      const verificationEndpoint = "/confirm-email";
      const apiUrl = `${apiBaseUrl}${verificationEndpoint}`;

      axios
        .get(apiUrl, { headers })
        .then((response) => {
          // Handle the response as needed
          console.log("Email confirmation successful", response.data);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error confirming email:", error.message);
        });
    }
  }, [router]);

  // Check if the user is logged in
  useEffect(() => {
    // Check if the user is logged in
    if (user) {
      // If the user is logged in, redirect to another page (e.g., home page)
      router.replace("/"); // Replace with the path you want to redirect to
    }
  }, [user, router]);

  // If the user is logged in, return null or any loading indicator while the redirection is happening
  if (user) {
    return null;
  }

  return (
    <div>
      {/* <Breadcrumb products={products} /> */}
      <div className="flex items-center justify-center flex-col my-12">
        <EmailVerification />
        <h2 className="uppercase tracking-[3px] text-xl sm:text-3xl text-center my-4">
          start shopping
        </h2>
        <h2 className="text-sm sm:text-lg text-center my-1">
          Your email has been verified
        </h2>
        <Link
          href="/login"
          className="w-[150px] uppercase sm:w-[200px] hover:bg-[#1B2E3C] hover:text-[#F3E3E2] border border-[#0C0C1E] text-center rounded-lg my-8 py-4 text-xs sm:text-sm"
        >
          proceed to login
        </Link>
      </div>
    </div>
  );
};

Index.title = "Email Verified - Weird Entry";

// export const getStaticProps: GetStaticProps = async () => {
//   // Fetch data from the API using Axios
//   const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
//   const productEndpoint = "product";

//   const apiUrl = `${apiBaseUrl}${productEndpoint}`;

//   try {
//     const response = await axios.get(apiUrl);
//     const productData = response.data;
//     console.log("Product Data", productData);

//     return {
//       props: {
//         products: productData as ProductData[],
//       },
//     };
//   } catch (error: any) {
//     console.error("Error fetching data from API:", error.message);
//     throw new Error(`Failed to fetch data from API: ${error.message}`);
//   }
// };

export default Index;
