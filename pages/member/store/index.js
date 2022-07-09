import React, { Fragment } from 'react'

export default function index() {
  return (
   <Fragment>
    <h1>Store</h1>
   </Fragment>
  )
}

export async function getServerSideProps(){
  return {
    props : {data : []}
  }
}