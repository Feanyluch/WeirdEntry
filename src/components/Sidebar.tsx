// src/components/Sidebar.tsx
import bag from "../assets/Images/bag.svg"
import Tab from "./Tab";
import Image from "next/image";
import { useRouter } from "next/router";

import hamburger from "../assets/Images/hamburger.svg";
import weirdlogo from "../assets/Images/white-logo.png";

interface SidebarProps {
  isOpen: boolean;
  onToggleSidebar: () => void; // Added prop to handle toggle from parent
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggleSidebar }) => {
  const router = useRouter();
  return (
    <nav
      className={`${
        isOpen ? "w-[20%]" : "w-16"
      } bg-[#1B2E3C] transition-all duration-300`}
    >
      <div className="flex items-center justify-between px-4 pb-12 pt-6">
        <Image
          src={weirdlogo}
          alt="logo"
          className={`${isOpen ? "block" : "hidden"}`}
        />
        <div onClick={onToggleSidebar} className="bg-white cursor-pointer">
          <Image src={hamburger} alt="hamburger" />
        </div>
      </div>
      <h2 className="text-white px-8 py-2 font-light uppercase text-lg hidden">
        General
      </h2>
      <div className={`${isOpen ? "" : "p-4"} flex flex-col gap-1`}>
        <Tab
          route="/"
          icon={
            <Image src={bag} alt="" />
          }
          label="Dashboard"
          isOpen={isOpen}
        />
        <Tab
          route="/product"
          icon={
            <Image src={bag} alt="" />
          }
          label="Product"
          isOpen={isOpen}
        />
        <Tab
          route="/inventory"
          icon={
            <Image src={bag} alt="" />
          }
          label="Inventory"
          isOpen={isOpen}
        />
        <Tab
          route="/home"
          icon={
            <Image src={bag} alt="" />
          }
          label="Customers"
          isOpen={isOpen}
        />
        <Tab
          route="/home"
          icon={
            <Image src={bag} alt="" />
          }
          label="Review"
          isOpen={isOpen}
        />
        <Tab
          route="/home"
          icon={
            <Image src={bag} alt="" />
          }
          label="Payment"
          isOpen={isOpen}
        />
        <Tab
          route="/home"
          icon={
            <Image src={bag} alt="" />
          }
          label="CMS"
          isOpen={isOpen}
        />
      </div>
    </nav>
  );
};

export default Sidebar;
