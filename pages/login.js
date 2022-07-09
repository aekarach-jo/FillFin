import axios from "axios";
import Head from "next/head";
import React, { Fragment } from "react";
import Login from "../components/signin/Login";
import nextConfig from "../next.config";

export default function login({ banner }) {
  return (
    <Fragment>
      <Head>
        <title>Login</title>
      </Head>
      <Login banner={banner} />
    </Fragment>
  );
}


export async function getServerSideProps(){
  const apiUrl = nextConfig.apiPath
  const apiGetBanner = await axios({
    method : 'GET',
    url : `${apiUrl}/api/website/getAds/login`
  })
  return {
    props : { banner : apiGetBanner.data.ads}
  }
}