import Head from "next/head";
import React, { Fragment } from "react";

export default function Layout_login({ children }) {
  return (
    <Fragment>
      <main>{children}</main>
    </Fragment>
  );
}
