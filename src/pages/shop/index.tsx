import React from 'react'
import Image from "next/image"
import Link from "next/link"

import toright from "../../../public/Images/toright.svg"

const index = () => {
  return (
    <div>
      <div className='bg-[#1B2E3C] h-[299px] flex items-center justify-center text-white'>
        <div className=''>
            <h2 className='uppercase text-5xl '>Shop</h2>
            <div className="flex mt-20 text-lg uppercase"><Link href="/">Home</Link><Image src={toright} alt="toright" /> Shop</div>
        </div>
      </div>
    </div>
  )
}

export default index
