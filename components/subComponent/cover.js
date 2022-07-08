import Image from "next/image";
import React, { Fragment, useState } from "react";
import nextConfig from "../../next.config";

const apiUrl = nextConfig.apiPath
export default function Cover({ banner }) {
  return (
    <Fragment>
      <div className="banner-top">
        <div className="banner">
          <div className="column-banner">
          </div>
            <Image
              src={`${apiUrl}/${banner.image}`}
              layout="fill"
              alt="iamge-cover"
            />
          <div className="column-text">
            <div className="column">
              <h1>{banner.title}</h1>
              <p>{banner.content}</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
