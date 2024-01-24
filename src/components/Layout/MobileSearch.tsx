// MobileSearch.tsx
import React from "react";
import SearchComponent from "../SearchComponent";

interface MobileSearchProps {
  isSearchOpen: boolean;
  onClose: () => void;
}

const MobileSearch: React.FC<MobileSearchProps> = ({ isSearchOpen, onClose }) => {
  return (
    <div className={`z-[999999px] flex items-center justify-center w-full bg-white ${isSearchOpen ? "my-4" : "my-0"} sm:hidden`}>
      {isSearchOpen && <SearchComponent onSearchToggle={onClose} isSearchOpen={isSearchOpen} />}
    </div>
  );
};

export default MobileSearch;
