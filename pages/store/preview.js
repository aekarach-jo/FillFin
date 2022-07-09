import React from 'react'

export default function preview() {
  return (
    <div>preview</div>
  )
}

export async function getServerSideProps(){
  return {
    props : {}
  }
}