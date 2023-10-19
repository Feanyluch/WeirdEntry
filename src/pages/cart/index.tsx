import Breadcrumb from '@/components/BreadCrumb';
import Image from 'next/image';
import React from 'react';

import cartempty from "../../../public/Images/cartempty.png"
import Link from 'next/link';

const NotFound  = () => {
    return (
        <div>
            <Breadcrumb />
            <div className="flex items-center justify-center flex-col">
                <Image src={cartempty} alt="emptycart" />
                <h2 className='uppercase text-3xl my-4'>YOUR CART IS CURRENTLY EMPTY</h2>
                <Link href="/shop"  className='w-[300px] border border-[#0C0C1E] text-center rounded-lg my-8 py-4 text-lg'>Return to shop</Link>
            </div>
        </div>
    )
}

export default NotFound;