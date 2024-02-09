// src/components/HomeContent.tsx
import React from "react";
import { FaSearch } from "react-icons/fa";
import StatCard from "./StatCard";

const HomeContent: React.FC = () => {
  const statData = [
    { title: "Total Sales", value: "#200,000" },
    { title: "New Customers", value: "23" },
    { title: "Ecommerce Revenue", value: "1002" },
    { title: "Successful Purchase", value: "32" },
  ];
  return (
    <div className="">
      <div className="mx-12 py-4">
        <div className=" flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Welcome back, Admin</h2>
            <p>Here is what is happening in your store today</p>
          </div>
          <div className="flex gap-2">
            <button className="border py-3 rounded-lg px-4 border-gray-700">
              Previous week
            </button>
            <button className="bg-[#1b2e3c] px-4 py-3 text-white rounded-lg">
              All Time{" "}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 my-4">
          {statData.map((stat, index) => (
            <StatCard key={index} title={stat.title} value={stat.value} />
          ))}
        </div>

        <div className="px-4 py-6 bg-white">
          <div className="flex items-center justify-between py-2">
            <h2>Activities</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 my-4">
            <div className="border border-gray-100 flex items-start justify-start p-4 rounded-lg">
              <div className="flex">
                <div></div>
                <div className="flex flex-col">
                  <span>Total Sales</span>
                  <h2 className="font-bold">10</h2>
                </div>
              </div>
            </div>
            <div className="border border-gray-100 flex items-start justify-start p-4 rounded-lg">
              <div className="flex">
                <div></div>
                <div className="flex flex-col">
                  <span>Total Sales</span>
                  <h2 className="font-bold">10</h2>
                </div>
              </div>
            </div>
            <div className="border border-gray-100 flex items-start justify-start p-4 rounded-lg">
              <div className="flex">
                <div></div>
                <div className="flex flex-col">
                  <span>Total Sales</span>
                  <h2 className="font-bold">10</h2>
                </div>
              </div>
            </div>
            <div className="border border-gray-100 flex items-start justify-start p-4 rounded-lg">
              <div className="flex">
                <div></div>
                <div className="flex flex-col">
                  <span>Total Sales</span>
                  <h2 className="font-bold">10</h2>
                </div>
              </div>
            </div>
            <div className="border border-gray-100 flex items-start justify-start p-4 rounded-lg">
              <div className="flex">
                <div></div>
                <div className="flex flex-col">
                  <span>Total Sales</span>
                  <h2 className="font-bold">10</h2>
                </div>
              </div>
            </div>
            <div className="border border-gray-100 flex items-start justify-start p-4 rounded-lg">
              <div className="flex">
                <div></div>
                <div className="flex flex-col">
                  <span>Total Sales</span>
                  <h2 className="font-bold">10</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
