import axios from "axios";
import Head from "next/head";
import React, { Fragment } from "react";
import StoreRegister from "../../components/signin/StoreRegister";
import nextConfig from "../../next.config";

const apiUrl = nextConfig.apiPath
export default function register({ content ,qrCode}) {
  return (
    <Fragment>
      <Head>
        <title>Register</title>
      </Head>
      <StoreRegister content={content} qrCode={qrCode}/>
    </Fragment>
  );
}

export async function getServerSideProps() {
  const [apiContentStore, apiContentLine] = await Promise.all([
    axios({
      method: 'GET',
      url: `${apiUrl}/api/website/content/term-store`
    }),
    axios({
      method: 'GET',
      url: `${apiUrl}/api/website/content/line-website`
    })
  ])
  return {
    props: { 
      content: apiContentStore.data.content ,
      qrCode : apiContentLine.data.content
    }
  }
}