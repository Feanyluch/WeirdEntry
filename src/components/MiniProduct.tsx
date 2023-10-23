import React from "react";
import Image from "next/image"

const MiniProducts =() => {
    return (
        <div className="">
            <Image src="" alt="item1" />
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
    )
}

export default MiniProducts;