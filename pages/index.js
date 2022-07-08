import axios from 'axios';
import Head from 'next/head';
import { Fragment } from 'react'
import Index from '../components/index/Index';
import nextConfig from '../next.config';

export default function Home({ banner}) {
  return (
    <Fragment>
      <Head><title>FillFin</title></Head>
      <Index banner={banner}/>
    </Fragment>
  )
}

export async function getServerSideProps(){
  const apiUrl = nextConfig.apiPath
  const apiGetBanner = await axios({
    method : 'GET',
    url : `${apiUrl}/api/website/getAds/home`
  })
  return {
    props : { banner : apiGetBanner.data.ads}
  }
}