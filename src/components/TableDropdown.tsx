// Dropdown.tsx
import React, { useState } from 'react';

interface DropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen: any) => !prevIsOpen);
  };

  
  return (
    <div className="dropdown inline-block relative">
      <button className=" text-[#1B2E3C] text-xl font-semibold py-2 px-4 rounded flex justify-center items-center" onClick={toggleDropdown}>
        {/* Actions
        <svg className="fill-current h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5 8l5 5 5-5z" />
        </svg> */}
        ...
      </button>
      <ul className={`dropdown-menu absolute ${isOpen ? 'block' : 'hidden'} text-gray-700 pt-1 z-[999]`}>
        <li onClick={onEdit} className="cursor-pointer">
          <span className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Edit</span>
        </li>
        <li onClick={onDelete} className="cursor-pointer">
          <span className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">Delete</span>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
