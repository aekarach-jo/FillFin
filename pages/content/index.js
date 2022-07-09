import React, { Fragment } from 'react'

export default function Home() {
  return (
    <Fragment>
      <div className="container">
        <h1>Conetent</h1>
      </div>
    </Fragment>
  )
}

export async function getServerSideProps() {
  return {
    props: { data: [] }
  }
}