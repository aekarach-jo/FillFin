import React, { Fragment } from "react";
import Head from "next/head";
import Script from "next/script";

export default function Layout_main({ children }) {
  return (
    <Fragment>
      <main>{children}</main>
    </Fragment>
  );
}
