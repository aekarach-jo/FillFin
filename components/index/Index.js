import React, { Fragment, useEffect, useState } from "react";
import Banner from "../subComponent/banner";
import ContactUs from "../subComponent/contactUs";
import { useRouter } from "next/router";
import Image from "next/image";
import Script from "next/script";
import { getCookie, setCookies } from "cookies-next";


export default function Index({ banner, video }) {
  const router = useRouter();
  const [men, setMen] = useState("men");
  const [women, setWomen] = useState("women");

  useEffect(() => { 
    
  }, []);

  function setGender(gender) {
    const mcode = getCookie("member_code")
    if (mcode) {
      setCookies("gender", gender)
      router.push("/member");
    } else {
      setCookies("gender", gender)
      router.push("/member");
    }
  }

  return (
    <Fragment>
      <div className="detil-index">
        <div className="img-background">
          <Image
            width={404}
            height={1050}
            className="img-left"
            src="/assets/images/man.png"
            layout="fixed"
            alt="image-gender"
          />
          <Image
            width={404}
            height={1050}
            className="img-right"
            src="/assets/images/woman.png"
            layout="fixed"
            alt="image-gender"
          />
        </div>
        <ContactUs />
        <div className="column-shadow">
          <div className="shadow-left" />
          <div className="shadow-right" />
        </div>
        <div className="column-detil-index">
          <div className="column-vedio">
            <iframe
              width={460}
              height={260}
              src="https://www.youtube.com/embed/CUfPYWtydgk"
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <p className="text-vedio">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              tempore dolore id porro quos maxime, fugiat sint minus odit
              dolores repudiandae! Dolore nostrum dolor libero est? Officiis
              ratione est vel.
            </p>
          </div>
          <Banner />
          <div className="column-text">
            <h2>หมวดหมู่สินค้า</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique
              pharetra, mattis quam volutpat.
            </p>
          </div>
          <div className="column-btn">
            <button onClick={() => setGender(men)}>ผู้ชาย</button>
            <button onClick={() => setGender(women)}>ผู้หญิง</button>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique
            pharetra, mattis quam volutpat. Cursus leo, nec sit massa, euismod
            elementum. Massa euismod penatibus semper cursus nisi. Sit sed
            feugiat elementum amet. Sit eget bibendum mauris, mauris nisi ut
            neque.
          </p>
        </div>
      </div>
      <Script src="https://unpkg.com/swiper@8/swiper-bundle.min.js"></Script>
    </Fragment>
  );
}
