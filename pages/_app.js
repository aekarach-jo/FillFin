import "../styles/globals.scss";
import Head from "next/head";
import Nav from "../components/subComponent/nav";
import Footer from "../components/subComponent/footer";
import { AppWrapper } from "../config/state";
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {

  return (
    <AppWrapper>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </AppWrapper>
  );
}

export default MyApp;
