import Head from 'next/head'
import React, { Fragment } from 'react'
import PaymentSummary from '../../../components/member/cart/paymentSummary/paymentSummary'

export default function payment() {
  return (
    <Fragment>
      <Head><title>Payment</title></Head>
      <PaymentSummary />
    </Fragment>
  )
}

export async function getServerSideProps(){
  return {
    props : {data : []}
  }
}