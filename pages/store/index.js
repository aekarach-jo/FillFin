import axios from 'axios';
import { getCookie } from 'cookies-next';
import Head from 'next/head';
import React, { Fragment, useState } from 'react'
import Store_premium from '../../components/member/store/store_premium/store_premium';
import Store from '../../components/store/Store';
import Cover from '../../components/subComponent/cover';
import nextConfig from '../../next.config';

export default function StorePage({ storeObj }) {
  const [changeView, setChangeView] = useState(true)
  function updateChangeView(bool) {
    setChangeView(bool);
  }

  if (changeView) {
    return (
      <Fragment>
        <Head><title>Store</title></Head>
        <Store stores={storeObj.data} statusChange={updateChangeView} />
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <Head><title>UserView</title></Head>
        <Cover />
        <Store_premium stores={storeObj.data} statusChange={updateChangeView} />
      </Fragment>
    )
  }

}

export async function getServerSideProps({ query, res }) {

  const apiUrl = nextConfig.apiPath;
  const access_token = res.req.cookies.access_token;
  const store_code = query.storeId
  const member_code = res.req.cookies.member_code
  try {
    const onGetStoreData = await axios({
      method: 'GET',
      url: `${apiUrl}/api/store/getDataAll`,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    const store = onGetStoreData.data
    return {
      props: {
        storeObj: store
      }
    }
  }
  catch (error) {
    console.log(error);
    return {}
  }
}
