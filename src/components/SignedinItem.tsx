import Link from 'next/link'
import React from 'react'

const SignedinItem = () => {
  return (
    <div className='bg-[#F3E3E2] w-[150px]'>
        <div className="flex items-center justify-center flex-col gap-2">
            <Link href="/my-account" className='p-2 w-full hover:bg-[#f3cfcc] cursor-pointer'>My account</Link>
            <Link href="/my-account" className='p-2 w-full hover:bg-[#f3cfcc] cursor-pointer'>Setting</Link>
        </div>
    </div>
  )
}

export default SignedinItem
