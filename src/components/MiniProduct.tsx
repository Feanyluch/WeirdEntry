import React from "react";
import Image from "next/image";

import shirt2 from "../../public/Images/shirt2.png";

const MiniProducts = () => {
  return (
    <div className="p-2">
      <div className="">
        <Image src={shirt2} alt="item1" width={100} height={100} />
      </div>
      <div className="">
        <h2>Product XYZ</h2>
        <h1>$4, 000</h1>
        <div className="flex items-center justify-center">
          <h2>-</h2>
          <h2>0</h2>
          <h2>+</h2>
        </div>
      </div>
    </div>
  );
};

export default MiniProducts;
