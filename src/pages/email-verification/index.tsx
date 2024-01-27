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
        <h2 className="capitalize tracking-[3px] text-xl sm:text-3xl text-center my-4">
          Verification Mail
        </h2>
        <h2 className="text-sm sm:text-lg text-center my-2">
          Hey! We have sent a verification link to your mail.
        </h2>
        <Link
          href="/login"
          className="w-[150px] uppercase sm:w-[200px] hover:bg-[#1B2E3C] hover:text-[#F3E3E2] border border-[#0C0C1E] text-center rounded-lg my-8 py-4 text-sm"
        >
          login
        </Link>
      </div>
    </div>
  );
};

Index.title = "Verify your email - Weird Entry";

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
