import axios from 'axios'
import Head from 'next/head'
import React, { Fragment } from 'react'
import MemberRegister from '../../components/signin/memberRegister'
import nextConfig from '../../next.config'

const apiUrl = nextConfig.apiPath

export default function register({ packageList, content }) {
  return (
    <Fragment>
      <Head>
        <title>Register</title>
      </Head>
      <MemberRegister packageData={packageList.data} content={content} />
    </Fragment>
  )
}

export async function getServerSideProps({ req, res }) {
  const [apiPackage, apiContent] = await Promise.all([
    axios({
      method: 'GET',
      url: `${apiUrl}/api/package/get`,
      headers: {
        'Content-Type': 'application/json'
      }
    }),
    axios({
      method: 'GET',
      url: `${apiUrl}/api/website/content/term-member`
    })
  ])
  return {
    props: {
      packageList: apiPackage.data,
      content: apiContent.data.content
    }
  }
}
