import Image from "next/image";
import React, { Fragment, useState } from "react";

export default function Cover({ data }) {
  const [cover, setCover] = useState([data]);
  return (
    <Fragment>
      <div className="banner-top">
        <div className="banner">
          <div className="column-banner">
          </div>
            <Image
              src="/assets/images/banner.png"
              // width={200}
              // height={200}
              layout="fill"
              alt="iamge-cover"
            />
          <div className="column-text">
            <div className="column">
              <h1>WOMEN</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
