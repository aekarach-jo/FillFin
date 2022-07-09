import React, { Fragment } from 'react'

export default function order() {
  return (
    <Fragment><h1>Order</h1></Fragment>
  )
}

export async function getServerSideProps(){
  return {
    props : {data : []}
  }
}