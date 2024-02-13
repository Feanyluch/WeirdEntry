import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import AccountLayout from "@/components/Layout/AccountLayout";
import { GetStaticProps } from "next";
import { ProductData } from "@/components/product";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

import Shirt from "../../../public/Images/newshirt.png";

interface Order {
  cart: any;
  order_status: string;
  id: string;
  productId: string;
  productName: string;
  orderNumber: string;
  orderDate: string;
  // Add more fields as per your order data structure
}

interface HomeProps {
  products: ProductData[];
}

const MyAccount: React.FC<HomeProps> & { title: string } = ({ products }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
        const productEndpoint = "order";

        const apiUrl = `${apiBaseUrl}${productEndpoint}`;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${user.token}`, // Replace <token> with the actual token
            Accept: "application/json",
          },
        });
        setOrders(response.data.data);
      } catch (error: any) {
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="" style={{ fontFamily: "'Nokora', sans-serif" }}>
      <AccountLayout>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-normal tracking-[2px]">
            Open Orders ({orders.length})
          </h2>
          {/* <h2 className="text-sm font-normal tracking-[2px]">Closed Orders</h2> */}
        </div>
        <div className="w-full h-[1px] bg-[#0C0C1E80] my-[20px]"></div>
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between">
              <div className="flex items-center justify-start gap-4">
                <Image src={Shirt} width={100} height={50} alt="shirt" />
                <div>
                  <h2 className="text-sm font-normal">{order.productName}</h2>
                  <p className="text-lg font-bold my-1">
                    ₦ {order.cart.items_amount.toLocaleString()}
                  </p>
                  <span className="text-xs font-light">
                  {new Date(order.cart.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
              <span className="bg-[#1B2E3C] text-[#F3E3E2] py-2 px-4 rounded-lg text-xs">
                {order.order_status}
              </span>
            </div>
          ))}
        </div>
      </AccountLayout>
    </div>
  );
};

MyAccount.title = "Orders - Weird Entry";

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

export default MyAccount;
