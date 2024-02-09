// src/components/Dashboard.tsx
import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
import { useRouter } from "next/router";
import DashboardContent from "@/components/DashboardContent";
import ProductContent from "@/components/ProductContent";
import Inventory from "@/components/Inventory";
import AddProduct from "@/components/AddProduct";
import Sidebar from "@/components/Sidebar";

// import ProfileContent from "../components/ProductContent";
// import DashboardContent from "../components/DashboardContent";
// import ProductContent from "../components/ProductContent";
// import AddProduct from "../components/AddProduct";
// import Inventory from "../components/Inventory";

const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
      <div
        className={`${
          isSidebarOpen ? "w-[80%]" : "w-full"
        } bg-gray-100 overflow-auto`}
      >
        {/* Main Content Goes Here */}
        <div className="flex items-center justify-between gap-4 border-b-gray-500 w-full bg-white px-12 py-4 ">
          <div className="flex py-4 px-4 items-center justify-start gap-4 w-[60%] bg-gray-100 rounded-lg">
            {/* <CiSearch
                style={{ color: "#1B2E3C", height: "25px", width: "25px" }}
              /> */}
            <input
              type=" search"
              name="search"
              placeholder="Search..."
              className="outline-none bg-transparent w-full"
            />
          </div>
          <div className="rounded-full border-1 h-12 w-12 bg-[#1B2E3C]"></div>
        </div>
        <DashboardContent />
        <ProductContent />
        <AddProduct />
        <Inventory />
      </div>
    </div>
  );
};

export default AdminDashboard;
