import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

export default function index({ data }) {
    // const url = useRouter()
    // const [productId, setProductId] = useState(1)
    // return (
    //     <div>
    //         {data.store}
    //         <br />
    //         <Link href={{
    //             pathname : `${url.asPath}/${productId}`,
    //             query : productId
    //         }}>productId</Link>
    //     </div>
    // )
}

export async function getServerSideProps(){
    return {
      props : {data : []}
    }
  }