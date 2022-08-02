import React, { Fragment, useEffect } from "react";
import Cover from "../../components/subComponent/cover";
import Head from "next/head";
import nextConfig from "../../next.config";
import ShowProduct from "../../components/member/showProduct";
import axios from "axios";

export default function showProduct({ storeObj, bannerCover }) {
  return (
    <Fragment>
      <Head>
        <title>FillFin</title>
      </Head>
      <Cover banner={bannerCover.banner} />
      <ShowProduct stores={storeObj} banner={bannerCover.banner}/>
    </Fragment>
  );
}

export async function getServerSideProps({ query, res }) {
  const page = query.page || 1
  const apiUrl = nextConfig.apiPath
  const access_token = res.req.cookies.access_token
  const gender = res.req.cookies.gender;
  const formGetBanner = {
    gender: gender,
    page: "all-store"
  }
  const [getAllStore, getBannerCover] = await Promise.all([
    axios({
      method: 'GET',
      url: `${apiUrl}/api/product/${gender}/allStore?page=${page}`,
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
    })
  ])

  return {
    props: {
      storeObj: getAllStore.data,
      bannerCover: getBannerCover.data
    }
  };
}