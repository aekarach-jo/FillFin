import Head from 'next/head'
import React, { Fragment } from 'react'
import Cart from '../../../components/member/cart/cart';

export default function CartPage() {
  return (
    <Fragment>
      <Head><title>Cart</title></Head>
      <Cart />
    </Fragment>
  )
}

export async function getServerSideProps(){
  return {
    props : {data : []}
  }
}