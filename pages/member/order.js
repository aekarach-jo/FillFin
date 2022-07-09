import Head from 'next/head'
import React, { Fragment } from 'react'
import Order_member from '../../components/member/cart/order_member/order_member'

export default function order() {
  return (
    <Fragment>
      <Head><title>Order</title></Head>  
      <Order_member />
    </Fragment>
  )
}

export async function getServerSideProps(){
  return {
    props : {data : []}
  }
}