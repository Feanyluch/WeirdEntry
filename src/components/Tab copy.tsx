import React from "react";
import { NavLink } from 'react-router-dom';

interface TabProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  isOpen: boolean;
  // activeClassName?: string;
}

const Tab: React.FC<TabProps> = ({ to, label, icon, isOpen }) => {
  return (
    <NavLink
      to={to}
      // activeClassName="border-l-4 border-blue-500"
      className={`gap-2 w-full h-16 text-white ${
        isOpen ? "" : "items-center"
      }`}
    >
      {isOpen ? (
        <div className="flex items-center justify-start mx-4 my-4 gap-8">
          <div className="h-4 w-4">{icon}</div>
          <h1 className="text-xl text-[#F3E3E2] font-light">{label}</h1>
        </div>
      ) : (
        <div className="flex items-center justify-center my-8">{icon}</div>
      )}
    </NavLink>
  );
};

export default Tab;
