import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Tab from "@/components/Tab";

import Useraccount from "../../../public/Images/Useraccount.svg";
import box from "../../../public/Images/box.svg";
import card from "../../../public/Images/card.svg";
import Address from "../../../public/Images/Address.svg";

interface TabData {
  id: number;
  label: string;
  route: string;
  content: string;
  image: string; // Specify the image property
}

const tabs: TabData[] = [
  {
    id: 1,
    label: "Account Details",
    route: "/my-account",
    content: "Account Details",
    image: "../../../public/Images/Useraccount.svg",
  },
  {
    id: 2,
    label: "Orders",
    route: "/my-account/orders",
    content: "Orders",
    image: "../../../public/Images/box.svg",
  },
  {
    id: 3,
    label: "Payment",
    route: "/my-account/payment-method",
    content: "Payment Methods",
    image: "../../../public/Images/card.svg",
  },
  {
    id: 4,
    label: "Address Book",
    route: "/my-account/address-book",
    content: "Address Book",
    image: "../../public/Images/Address.svg",
  },
  {
    id: 5,
    label: "Account Management",
    route: "/my-account/account-management",
    content: "Account Management",
    image: "../../public/Images/Useraccount.svg",
  },
  {
    id: 6,
    label: "Logout",
    route: "/",
    content: "null",
    image: "../../public/Images/Useraccount.svg",
  },
];

interface AccountLayoutProps {
  children: React.ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const router = useRouter();
  const { query } = router;

  // Extract the tab parameter from the query object
  const tabFromQuery = query.tab ? parseInt(query.tab as string) : undefined;

  // Find the active tab based on the extracted tab parameter or default to the first tab
  const activeTab = tabs.find(
    (tab) =>
      tab.id === tabFromQuery || (tabFromQuery === undefined && tab.id === 1)
  );

  useEffect(() => {
    console.log("Query Object:", query);
    console.log("Query Tab:", query.tab);
  }, [query]);

  return (
    <div className="bg-[#fdf9f9] max-w-[1200px] px-[50px] py-[50px] mx-auto my-[60px]">
      <div
        className="flex gap-[40px] w-full"
        style={{ fontFamily: "'Nokora', sans-serif" }}
      >
        {/* Overlay */}
        {isMobileNavOpen && (
          <div
            className="fixed inset-0 z-10 bg-black opacity-50"
            onClick={() => setIsMobileNavOpen(false)}
          />
        )}
        <div
          className={`${
            isMobileNavOpen ? "fixed top-0 left-0 w-[60%] z-50" : "hidden"
          } transition-transform duration-300 w-[30%] h-fit bg-white flex flex-col ease-in-out transform translate-x-0 md:translate-x-0 md:block`}
        >
          <button
            className="flex items-start justify-end  p-2 bg-blue-500 text-white mb-4 md:hidden"
            onClick={() => setIsMobileNavOpen(false)}
          >
            <FontAwesomeIcon icon={faClose} />
            kkkkkkkkkkkkkkkkkkk
          </button>
          <div className="">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                label={tab.label}
                isActive={tab.id === activeTab?.id}
                imaget={<Image src={tab.image} width={20} height={10} alt="" />} // Use the Image component with the imported image
                route={`${tab.route}?tab=${tab.id}`} // Include the query parameter here
              />
            ))}
          </div>
        </div>
        <div className="w-full bg-white p-4 overflow-auto">
          <button
            className="flex items-center justify-center p-2 bg-blue-500 text-white mb-4 md:hidden"
            onClick={() => setIsMobileNavOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className="w-[100%]bg-white rounded-lg p-[40px]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
