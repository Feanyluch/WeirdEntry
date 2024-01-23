import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import Layout from "@/components/Layout/Layout";

import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Provider } from "react-redux";
import store from "../redux/store";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import LoadingSpinner from "@/components/LoadingSpinner";

// Define an interface for page components
interface PageComponent extends React.FC {
  title?: string;
}

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
    };
  }, []);
  // Extract the title from the Component or use a default title
  const title = (Component as PageComponent).title || 'Default Title';
  return (
    <Provider store={store}>
      {loading && <LoadingSpinner />}
      <Layout title={title}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}