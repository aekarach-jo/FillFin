import axios from 'axios';
import Head from 'next/head';
import React, { Fragment, useState } from 'react'
import Store_premium from '../../components/member/store/store_premium/store_premium';
import Store from '../../components/store/Store';
import Cover from '../../components/subComponent/cover';
import nextConfig from '../../next.config';

export default function StorePage({ storeObj, bannerCover,qrCode }) {
  const [changeView, setChangeView] = useState(true)
  function updateChangeView(bool) {
    setChangeView(bool);
  }
  if (changeView) {
    return (
      <Fragment>
        <Head><title>Store</title></Head>
        <Store stores={storeObj.data} statusChange={updateChangeView} qrCode={qrCode}/>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <Head><title>UserView</title></Head>
        <Cover banner={bannerCover}/>
        <Store_premium stores={storeObj.data} statusChange={updateChangeView} qrCode={qrCode}/>
      </Fragment>
    )
  }
}

export async function getServerSideProps({ res }) {
  const apiUrl = nextConfig.apiPath;
  const access_token = res.req.cookies.access_token;
  const gender = res.req.cookies.gender;
  const formGetBanner = {
    gender: gender,
    page: "all-store"
  }
  const [onGetStoreData, getBannerCover,apiContentLine] = await Promise.all([
    axios({
      method: 'GET',
      url: `${apiUrl}/api/store/getDataAll`,
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
      url: `${apiUrl}/api/website/content/line-website`
    })
  ])
  const store = onGetStoreData.data
  const bannerCover = getBannerCover.data.banner
  return {
    props: {
      storeObj: store,
      bannerCover : bannerCover,
      qrCode : apiContentLine.data.content
    }
  }
}
