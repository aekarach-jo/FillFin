import axios from 'axios'
import Head from 'next/head'
import React, { Fragment } from 'react'
import ShowPackage from '../../components/member/showPackage'
import nextConfig from '../../next.config'

const apiUrl = nextConfig.apiPath

export default function packagePage({ packagesList }) {
  return (
    <Fragment>
      <Head><title>Package</title></Head>
      <ShowPackage packagesList={packagesList} />
    </Fragment>
  )
}
export async function getServerSideProps() {
  const apiGetPackage = await axios({
    method: 'GET',
    url: `${apiUrl}/api/package/get`
  })
  return {
    props: { packagesList: apiGetPackage.data.data }
  }
}