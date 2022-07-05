import Image from "next/image";
import React, { Fragment } from "react";

export default function Banner({ data }) {
  return (
    <Fragment>
      <div className="swiper">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <Image width={1096} height={300} src="/assets/images/sale.png" alt="image-banner1"/>
          </div>
          <div className="swiper-slide">
            <Image width={1096} height={300} src="/assets/images/sale.png" alt="image-banner2"/>
          </div>
          <div className="swiper-slide">
            <Image width={1096} height={300} src="/assets/images/sale.png" alt="image-banner3"/>
          </div>
        </div>
        <div className="swiper-pagination" />
      </div>
    </Fragment>
  );
}
