import Head from "next/head";
import React, { Fragment } from "react";
import Login from "../components/signin/Login";

export default function login({ bannerJson }) {
  return (
    <Fragment>
      <Head>
        <title>Login</title>
      </Head>
      <Login banner={bannerJson} />
    </Fragment>
  );
}


export async function getServerSideProps() {

  return {
    props: { data : [] },
  };
}
