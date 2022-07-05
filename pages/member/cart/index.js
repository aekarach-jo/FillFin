import axios from 'axios'
import Head from 'next/head'
import React, { Fragment } from 'react'
import Cart from '../../../components/member/cart/cart';
import nextConfig from '../../../next.config';

const apiUrl = nextConfig.apiPath
export default function CartPage() {
  return (
    <Fragment>
      <Head><title>Cart</title></Head>
      <Cart />
    </Fragment>
  )
}

