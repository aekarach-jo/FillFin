import Head from 'next/head';
import React, { Fragment } from 'react'
import Cover from '../../../components/subComponent/cover';
import nextConfig from '../../../next.config';
import axios from 'axios';
import Store_member from '../../../components/member/store/store_member/store_member';
import Store_premium from '../../../components/member/store/store_premium/store_premium';

export default function StoreId({ store }) {
  const standard = store.standard
  if (standard) { // package guest and member
    return (
      <Fragment>
        <Head>Store</Head>
        <Cover />
        <Store_member stores={store} />
      </Fragment>
    )
  }
  if (!standard) { // package premium and exclusive
    return (
      <Fragment>
        <Head>Store</Head>
        <Cover />
        <Store_premium stores={store} />
      </Fragment>
    )
  }
}

export async function getServerSideProps({ query, res }) {
  const apiUrl = nextConfig.apiPath;
  const access_token = res.req.cookies.access_token;
  const gender = res.req.cookies.gender;
  const store_code = query.storeId

  try {
    const getStorebyStoreCode = await axios({
      method: 'GET',
      url: `${apiUrl}/api/product/${gender}/store/${store_code}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      timeout : 5000
    })
    return {
      props: {
        store: getStorebyStoreCode.data.data
      }
    }
  }
  catch (error) {
    console.log("error")
    console.log(error);

    return {
      props: {}
    }
  }

}

