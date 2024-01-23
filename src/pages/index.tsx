import Image from "next/image";
import { Inter } from "next/font/google";
import { Nokora } from "next/font/google";
import Navbar from "@/components/Layout/Navbar";
import Banner from "@/components/Banner";
import axios from "axios";

import banner1 from "../../public/Images/banner1.png";
import Energy from "../../public/Images/Energy.svg";
import Dollar from "../../public/Images/Dollar.svg";
import Star from "../../public/Images/Star.svg";
import staricon from "../../public/Images/staricon.svg";
import Heart from "../../public/Images/Heart.svg";

import shirt from "../../public/Images/shirt.png";
import short1 from "../../public/Images/short1.png";
import short2 from "../../public/Images/short2.png";
import cargo from "../../public/Images/cargo.png";
import tshirt from "../../public/Images/tshirt.png";
import girl from "../../public/Images/girl.png";

import RelatedProducts from "@/components/RelatedProducts";

import { ProductData } from "@/components/product";
import { GetStaticProps } from "next";

interface HomeProps {
  products?: { data: ProductData[] } | undefined; // Make sure the interface matches the expected prop
}

const inter = Inter({ subsets: ["latin"] });

const Home: React.FC<HomeProps> & { title: string } = ({ products }) => {
  return (
    <div
      style={{ fontFamily: "'Nokora', sans-serif" }}
      className={`${inter.className} text-[#1B2E3C] bg-white`}
    >
      <Banner />
      {/* <Image src={banner1} alt="banner" /> */}

      <div className="py-8 sm:py-16">
        <h2 className="text-center text-xl tracking-[3.6px] mx-4">
          What makes us different
        </h2>
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-[30px] sm:gap-[40px] mt-[50px]">
            <div className="flex items-center justify-center flex-col text-center sm:items-start sm:justify-start sm:flex-row sm:text-start gap-2">
              <Image src={Energy} alt="energy" className="mb-[16px]" />
              <div>
                <h2 className="text-lg mb-[8px]">Super Fast Delivery</h2>
                <p className="text-sm w-[250px] sm:w-full">
                  Order before 3pm and get your order the next hour as standard
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col text-center sm:items-start sm:justify-start sm:flex-row sm:text-start gap-2">
              <Image src={Dollar} alt="dollar" className="mb-[16px]" />
              <div>
                <h2 className="text-lg mb-[8px]">Affordable Prices</h2>
                <p className="text-sm w-[250px] sm:w-full">
                  For our material and quality you won’t find better prices
                  anywhere else
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col text-center sm:items-start sm:justify-start sm:flex-row sm:text-start gap-2">
              <Image src={Star} alt="Star" className="mb-[16px]" />
              <div>
                <h2 className="text-lg mb-[8px]">Trend Masters</h2>
                <p className="text-sm w-[250px] sm:w-full">
                  Trend is not an issue, we set standards that can’t be met by
                  others
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col text-center sm:items-start sm:justify-start sm:flex-row sm:text-start gap-2">
              <Image src={Star} alt="Star" className="mb-[16px]" />
              <div>
                <h2 className="text-lg mb-[8px]">Trend Masters</h2>
                <p className="text-sm w-[250px] sm:w-full">
                  Trend is not an issue, we set standards that can’t be met by
                  others
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 py-[60px] bg-[#1B2E3C] ">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <Image src={shirt} alt="shirt" />
          </div>
          <div className="grid grid-row-2 gap-8">
            <Image src={short1} alt="short1" />
            <Image src={short2} alt="short2" />
          </div>
          <div>
            <Image src={cargo} alt="cargo" />
          </div>
        </div>
      </div>
      <div className="text-center py-8 sm:py-[60px]">
        <h2 className="text-lg tracking-[3.6px] font-light">Latest Release</h2>
        <h2 className="my-2">+</h2>
        <h2 className="text-4xl font-normal">TRENDING</h2>
      </div>
      <div className="max-w-[1200px] mx-4 sm:mx-auto my-4 sm:my-[50px]">
        <RelatedProducts products={products} />
      </div>
      <div className="max-w-[1200px] mx-auto my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="flex items-start justify-center bg-[#1B2E3C] text-[#F3E3E2] px-12 ">
            <div className="">
              <h2 className="text-center text-3xl my-8">ABOUT</h2>
              <p className="my-2 text-[16px]">
                Lorem ipsum dolor sit amet consectetur. Neque interdum ante
                pretium suscipit nec vitae. Ultrices libero fames morbi risus
                consequat. Lacinia tortor facilisis pellentesque mattis. Eu
                pharetra a neque sed condimentum arcu neque. <br /> <br />
                Lorem ipsum dolor sit amet consectetur. Neque interdum ante
                pretium suscipit nec vitae. Ultrices libero fames morbi risus
                consequat. Lacinia tortor facilisis pellentesque mattis. Eu
                pharetra a neque sed condimentum arcu neque.
              </p>
            </div>
          </div>
          <div>
            <Image src={girl} alt="girl" />
          </div>
        </div>
      </div>
    </div>
  );
};

Home.title = "Weird Entry - A brand collection for clothing";

export const getStaticProps: GetStaticProps = async () => {
  // Fetch data from the API using Axios
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const productEndpoint = "/product";

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
export default Home;
