import Head from 'next/head';
import { Fragment } from 'react'
import Index from '../components/index/Index';

export default function Home() {
  return (
    <Fragment>
      <Head><title>FillFin</title></Head>
      <Index />
    </Fragment>
  )
}

