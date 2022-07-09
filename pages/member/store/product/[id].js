import axios from 'axios';
import Head from 'next/head';
import React, { Fragment } from 'react'
import Preview from '../../../../components/store/Preview';
import nextConfig from '../../../../next.config';

export default function productId({ product }) {
  return (
    <Fragment>
      <Head><title>Product</title></Head>
      <Preview product={product} />
    </Fragment>
  )
}

export async function getServerSideProps({ query, req }) {
  const apiUrl = nextConfig.apiPath;
  const access_token = req.cookies.access_token;
  const gender = req.cookies.gender
  const product_code = query.id
  const apiGetProductCode = await axios({
    method: 'GET',
    url: `${apiUrl}/api/product/${product_code}?gender=${gender}`,
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
  return {
    props: { product: apiGetProductCode.data.data }
  }
}

