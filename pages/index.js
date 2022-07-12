import axios from 'axios';
import Head from 'next/head';
import { Fragment } from 'react'
import Index from '../components/index/Index';
import nextConfig from '../next.config';

export default function Home({ banner, content }) {
  return (
    <Fragment>
      <Head><title>FillFin</title></Head>
      <Index banner={banner} content={content}/>
    </Fragment>
  )
}

export async function getServerSideProps() {
  const apiUrl = nextConfig.apiPath
  const [apiGetBanner, apiGetContent] = await Promise.all([
    axios({
      method: 'GET',
      url: `${apiUrl}/api/website/getAds/home`
    }),
    axios({
      method: 'GET',
      url: `${apiUrl}/api/website/content/home`
    })
  ])
  return {
    props: {
      banner: apiGetBanner.data.ads,
      content: apiGetContent.data.content
    }
  }
}