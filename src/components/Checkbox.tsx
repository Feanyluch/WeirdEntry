// components/RoundCheckbox.tsx

import React, { useState } from 'react';

interface RoundCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}

const RoundCheckbox: React.FC<RoundCheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={() => onChange(!checked)}
        />
        <div className={`w-4 h-4 ${checked ? "bg-[#1B2E3C]" : "bg-white border-gray-400"} rounded-full shadow-inner border border-gray-400}`}></div>
        {/* <div className={`absolute w-[200px] h-[300px] rounded-full z-[999] bg-red-700 border-2 ${checked ? 'border-blue-600' : 'border-purple-600'} transform scale-0 transition-transform`}></div> */}
      </div>
      <div className={`ml-3 font-normal text-xs ${checked ? 'text-[#1B2E3C]' : "text-[#1B2E3C80]"}`}>{label}</div>
    </label>
  );
};

export default RoundCheckbox;