import React from "react";
import Link from "next/link";

interface TabProps {
  label: string;
  isActive: boolean;
  route: string;
  imaget: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ label, isActive, route, imaget }) => {
  return (
    <Link href={route} as={route}>
      <div
        className={`flex items-center justify-start gap-4 py-4 px-6 cursor-pointer hover:bg-[#F4F5F5] transition-all ${
          isActive ? "bg-[#F4F5F5]" : "text-black"
        }`}
      >
        <div>{imaget}</div>
        <h2 className="text-sm font-normal">{label}</h2>
      </div>
    </Link>
  );
};

export default Tab;
