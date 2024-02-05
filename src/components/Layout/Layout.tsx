import React, { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

import Head from "next/head";
// import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

import dynamic from "next/dynamic";
import MobileNav from "./MobileNav";
import MobileSearch from "./MobileSearch";
import { NotificationProvider } from "../NotificationContext";

const DynamicNavbar = dynamic(() => import("./Navbar"), {
  ssr: false, // Disable server-side rendering for this component
});

const DynamicMobileNavbar = dynamic(() => import("./MobileNav"), {
  ssr: false, // Disable server-side rendering for this component
});

const Layout = ({ children, title }: LayoutProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => {
    console.log("clicked");
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };
  return (
    <NotificationProvider>
      <div>
        <DynamicNavbar />
        <MobileSearch isSearchOpen={isSearchOpen} onClose={closeSearch} />
        <Head>
          <title>{title}</title>
        </Head>
        {children}
        <DynamicMobileNavbar onSearchClick={openSearch} />
        <Footer />
      </div>
    </NotificationProvider>
  );
};

export default Layout;
