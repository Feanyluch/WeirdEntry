import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

import dynamic from 'next/dynamic';

const DynamicNavbar = dynamic(() => import('./Navbar'), {
  ssr: false, // Disable server-side rendering for this component
});

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <DynamicNavbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
