import Head from "next/head";
import React, { Fragment } from "react";
import Payment from "../../components/member/payment";
import Footer from "../../components/subComponent/footer";
import Nav from "../../components/subComponent/nav";

export default function payment() {
  return (
    <Fragment>
      <Head> <title>Payment</title> </Head>
      <Payment />
    </Fragment>
  );
}

export async function getServerSideProps(){
  return {
    props : {data : []}
  }
}