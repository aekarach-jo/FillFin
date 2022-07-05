
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'

export default function productId() {
  // const router = useRouter()
  // const productId  = router.query
  return (
    <Fragment>
        {/* < /> */}
    </Fragment>
  )
}


export async function getServerSideProps({params}){
  return {
    props : { data : [] }
  }
}

