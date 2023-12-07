// SizeButtons.tsx
import React from 'react';

interface SizeButtonsProps {
  sizes: string[]; // Assuming sizes are strings, adjust accordingly
}

const SizeButtons: React.FC<SizeButtonsProps> = ({ sizes }) => {
  return (
    <div className="">
      <h4>Polo Sizes</h4>
      <div className="flex my-2">
        {sizes.map((size, index) => (
          <button
            key={index}
            className="text-sm mr-4 border border-[#0C0C1E80] px-2 hover:bg-[#1B2E3C] hover:text-white transition ease-in-out duration-300"
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeButtons;
