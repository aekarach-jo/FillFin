import { Fragment, useEffect, useState } from "react";
import "../styles/globals.scss";
import Head from "next/head";
import Nav from "../components/subComponent/nav";
import Footer from "../components/subComponent/footer";
import { useRouter } from "next/router";
import { AppWrapper } from "../config/state";

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [isFooter, setFooter] = useState(router.pathname)
  useEffect(() => {
  }, []);

  return (
    <AppWrapper>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Nav/>
      <Component {...pageProps} />
      {isFooter != '/member/store/product/[id]'
        ? <Footer />
        : null
      }
    </AppWrapper>
  );
}

export default MyApp;
