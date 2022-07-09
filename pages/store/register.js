import Head from "next/head";
import React, { Fragment } from "react";
import StoreRegister from "../../components/signin/StoreRegister";
export default function register() {
  return (
    <Fragment>
       <Head>
        <title>Register</title>
      </Head>
      <StoreRegister />
    </Fragment>
  );
}

export async function getServerSideProps(){
  return {
    props : {data : []}
  }
}