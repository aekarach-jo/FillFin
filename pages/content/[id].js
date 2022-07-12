import axios from 'axios'
import Head from 'next/head'
import React, { Fragment } from 'react'
import nextConfig from '../../next.config'
import Content from '../../components/content/content'

export default function ContentPage({ content }) {
  return (
    <Fragment>
      <Head><title>{content.title}</title></Head>
      <Content content={content} />
    </Fragment>
  )
}

export async function getServerSideProps({ params }) {
  const apiUrl = nextConfig.apiPath
  const response = await axios({
    method: 'GET',
    url: `${apiUrl}/api/website/content/${params.id}`
  })
  return {
    props: {
      content: response.data.content

    }
  }
}




    // <div style={{ height : '100vh'}} dangerouslySetInnerHTML={{
    //   __html : data.content
    // }}>

    // </div>
// let contentMock = `
// <h1>Where does it come from?</h1>
//   <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
// `