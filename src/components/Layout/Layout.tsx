import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

import Head from 'next/head';
// import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  title?: string;
};


import dynamic from 'next/dynamic';
import MobileNav from './MobileNav';

const DynamicNavbar = dynamic(() => import('./Navbar'), {
  ssr: false, // Disable server-side rendering for this component
});

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div>
      <DynamicNavbar />
      <Head>
        <title>{title}</title>
      </Head>
      {children}
      <MobileNav />
      <Footer />
    </div>
  );
};

export default Layout;
