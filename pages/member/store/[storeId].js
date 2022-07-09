import Head from 'next/head';
import React, { Fragment } from 'react'
import Cover from '../../../components/subComponent/cover';
import nextConfig from '../../../next.config';
import axios from 'axios';
import Store_member from '../../../components/member/store/store_member/store_member';
import Store_premium from '../../../components/member/store/store_premium/store_premium';

export default function StoreId({ store, bannerCover, bannerAds }) {
  console.log(bannerAds);
  const standard = store.standard
  if (standard) { // package guest and member
    return (
      <Fragment>
        <Head>Store</Head>
        <Cover banner={bannerCover.banner} />
        <Store_member stores={store} bannerAds={bannerAds.ads} />
      </Fragment>
    )
  }
  if (!standard) { // package premium and exclusive
    return (
      <Fragment>
        <Head>Store</Head>
        <Cover banner={bannerCover.banner} />
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
  const formGetBanner = {
    gender: gender,
    page: "store"
  }
  const [getStorebyStoreCode, getBannerCover, getBannerAds] = await Promise.all([
    axios({
      method: 'GET',
      url: `${apiUrl}/api/product/${gender}/store/${store_code}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }),
    axios({
      method: 'POST',
      url: `${apiUrl}/api/website/getBanner`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: formGetBanner
    }),
    axios({
      method: 'GET',
      url: `${apiUrl}/api/website/getAds/store`
    })
  ])
  return {
    props: {
      store: getStorebyStoreCode.data.data,
      bannerCover: getBannerCover.data,
      bannerAds: getBannerAds.data
    }
  }
}

