import { Fragment, useEffect } from "react";
import "../styles/globals.scss";
import Head from "next/head";
// import 'tailwindcss/tailwind.css'
// import 'bootstrap/dist/css/bootstrap.css'
import Nav from "../components/subComponent/nav";
import Footer from "../components/subComponent/footer";

function MyApp({ Component, pageProps }) {
  useEffect(() => {}, []);

  // if (Component.getLayout) {
  //   return Component.getLayout(<Component {...pageProps} />);
  // }

  return (
    <Fragment>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </Fragment>
  );
}

export default MyApp;
