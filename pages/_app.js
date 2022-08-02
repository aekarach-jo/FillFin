import "../styles/globals.scss";
import Head from "next/head";
import Nav from "../components/subComponent/nav";
import Footer from "../components/subComponent/footer";
import { AppWrapper } from "../config/state";
import Loading from "../components/subComponent/loading";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ScrollToTop from "../components/subComponent/scrollToTop";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <AppWrapper>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Loading loading={loading} />  
      <Nav />
      <ScrollToTop />
      <Component {...pageProps} />
      <Footer />
    </AppWrapper>
  );
}

export default MyApp;
