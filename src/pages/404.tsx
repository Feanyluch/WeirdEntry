import React from "react";
import cartempty from "../../public/Images/cartempty.png";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center flex-col my-6">
      <Image src={cartempty} alt="emptycart" />
      <h2 className="uppercase text-lg sm:text-xl text-center my-4">
        product with the selected category is not available
      </h2>
    </div>
  );
};

export default NotFound;
