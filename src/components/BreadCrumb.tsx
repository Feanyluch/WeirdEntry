import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import toright from "../../public/Images/toright.svg";
import { ProductData } from "@/components/product"; // Import the ProductData type
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

interface BreadcrumbProps {
  products?: ProductData[] | { data: ProductData[] } | undefined; // Make the prop optional
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ products }) => {
  const router = useRouter();
  const pathnames = router.asPath.split("/").filter((x) => x);

  const formatPageName = (name: string) => {
    // Replace hyphens with spaces and capitalize words
    const formattedName = name.replace(/-/g, " ").toUpperCase();

    // Remove query parameters from the formatted name
    const withoutQueryParams = formattedName.split("?")[0];

    return withoutQueryParams;
  };

  // const selectedProduct = Array.isArray(products)
  //   ? products.find(
  //       (product) => product.id.toString() === pathnames[pathnames.length - 1]
  //     )
  //   : products && products.data
  //   ? products.data.find(
  //       (product) => product.id.toString() === pathnames[pathnames.length - 1]
  //     )
  //   : undefined;

  const { id } = router.query;

  // Use state to store the selected product
  const [selectedProduct, setSelectedProduct] = useState<
    ProductData | undefined
  >(undefined);

  useEffect(() => {
    const fetchProductData = async () => {
      const apiUrl = `https://weird-entry-lara-production.up.railway.app/api/product/${id}`;

      try {
        const response = await axios.get(apiUrl);
        const productData = response.data;
        setSelectedProduct(productData);
      } catch (error: any) {
        console.error("Error fetching product data from API:", error.message);
      } finally {
        // setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);

  console.log({ selectedProduct });

  return (
    <div className="bg-[#1B2E3C] h-[200px] sm:h-[240px] flex items-end justify-center text-[#F3E3E2] py-[20px]">
      <div className="flex gap-[72px] justify-center items-center flex-col">
        <h2 className="uppercase text-3xl sm:text-4xl text-center">
          {selectedProduct
            ? formatPageName(selectedProduct.title)
            : formatPageName(pathnames[pathnames.length - 1])}
        </h2>
        <div className="flex items-center justify-center text-xs uppercase">
          <Link href="/">Home</Link>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const key = isLast ? "last" : name; // Assign a unique key

            return isLast ? (
              <React.Fragment key={key}>
                <Image src={toright} alt="toright" height={20} width={20} />
                <span>
                  {formatPageName(
                    selectedProduct ? selectedProduct.title : name
                  )}
                </span>
              </React.Fragment>
            ) : (
              <React.Fragment key={key}>
                <Image src={toright} alt="toright" height={20} width={20} />{" "}
                <Link href={routeTo}>{formatPageName(name)}</Link>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Fetch data from the API using Axios
  const apiUrl =
    "https://weird-entry-lara-production.up.railway.app/api/product"; // Replace with your actual API endpoint

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

export const getStaticPaths: GetStaticPaths = async () => {
  const apiUrl =
    "https://weird-entry-lara-production.up.railway.app/api/product"; // Replace with your actual API endpoint

  try {
    const response = await axios.get(apiUrl);
    const productData = response.data;
    console.log("Product Data", productData);

    // Create an array of product IDs for the dynamic paths
    const paths = productData.map(
      (product: { id: { toString: () => any } }) => ({
        params: { id: product.id.toString() },
      })
    );

    return {
      props: {
        products: productData as ProductData[],
      },
      paths,
      fallback: false,
    };
  } catch (error: any) {
    console.error("Error fetching data from API:", error.message);
    throw new Error(`Failed to fetch data from API: ${error.message}`);
  }
};

export default Breadcrumb;
