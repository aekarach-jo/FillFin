import Head from "next/head";
import Script from "next/script";
import React, { Fragment } from "react";

export default function Layout_register({ children }) {
  return (
    <Fragment>
      <main>{children}</main>
    </Fragment>
  );
}
