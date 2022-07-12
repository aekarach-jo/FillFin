import axios from "axios";
import Head from "next/head";
import React, { Fragment } from "react";
import StoreRegister from "../../components/signin/StoreRegister";
import nextConfig from "../../next.config";

const apiUrl = nextConfig.apiPath
export default function register({ content }) {
  return (
    <Fragment>
       <Head>
        <title>Register</title>
      </Head>
      <StoreRegister content={content}/>
    </Fragment>
  );
}

export async function getServerSideProps(){
  const apiContent = await axios({
    method : 'GET',
    url : `${apiUrl}/api/website/content/term-store`
  })
  return {
    props : {content : apiContent.data.content}
  }
}