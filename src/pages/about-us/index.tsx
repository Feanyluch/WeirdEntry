import React from 'react'
import Image from "next/image"
import Link from 'next/link'

import toright from "../../../public/Images/toright.svg"

const index = () => {
  return (
    <div>
      <div className='bg-[#1B2E3C] h-[299px] flex items-center justify-center text-white'>
        <div className='flex justify-between items-center flex-col'>
            <h2 className='uppercase text-5xl '>about us</h2>
            <div className="flex text-lg uppercase mt-24"><Link href="/">Home</Link><Image src={toright} alt="toright" /> about us</div>
        </div>
      </div>
    </div>
  )
}

export default index
