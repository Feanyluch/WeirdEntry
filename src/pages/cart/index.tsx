import Breadcrumb from '@/components/BreadCrumb';
import Image from 'next/image';
import React from 'react';

import { ProductData } from "@/components/product";

import cartempty from "../../../public/Images/cartempty.png"
import Link from 'next/link';
import { GetStaticProps } from 'next';

interface HomeProps {
    products: ProductData[]; // Make sure the interface matches the expected prop
  }

const NotFound: React.FC<HomeProps> = ({ products }) =>{
    return (
        <div>
            
      <Breadcrumb products={products} />
            <div className="flex items-center justify-center flex-col">
                <Image src={cartempty} alt="emptycart" />
                <h2 className='uppercase text-3xl my-4'>YOUR CART IS CURRENTLY EMPTY</h2>
                <Link href="/shop"  className='w-[300px] border border-[#0C0C1E] text-center rounded-lg my-8 py-4 text-lg'>Return to shop</Link>
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    // Fetch your JSON data here, for example, using `import`
    const productData = await import('../../../assets/productData.json');
  
    return {
      props: {
        products: productData.products as ProductData[], // Cast the products data to ProductData[]
      },
    };
  };

export default NotFound;