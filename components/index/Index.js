import React, { Fragment, useState } from "react";
import Banner from "../subComponent/banner";
import ContactUs from "../subComponent/contactUs";
import { useRouter } from "next/router";
import Image from "next/image";
import { getCookie, setCookies } from "cookies-next";
import nextConfig from "../../next.config";

const apiUrl = nextConfig.apiPath
export default function Index({ banner, content }) {
  const router = useRouter();
  const [men, setMen] = useState("men");
  const [women, setWomen] = useState("women");

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
      <div className="detil-index-column">
        <div className="detil-index" style={{ minHeight : 'calc(100vh - 100px)'}}>
          <div className="img-background">
            <Image
              width={404}
              height={1047}
              className="img-left"
              src="/assets/images/man.png"
              alt="image-gender"
            />
            <Image
              width={404}
              height={1047}
              className="img-right"
              src="/assets/images/woman.png"
              alt="image-gender"
            />
          </div>
          <ContactUs />
          <div className="column-shadow">
            <div className="shadow-left" />
            <div className="shadow-right" />
          </div>
          <div className="column-detil-index" >
            <div className="column-vedio" style={{ alignItems: "center" , marginTop : "1rem" }}>
              <video
                className="video"
                width={400}
                controls
                muted
                autoPlay
                loop
                src={`${apiUrl}/streaming${content.videoLink}`}
                // poster='/assets/images/sale.png'
              />
              <p className="text-vedio" style={{ margin : '15px 0 28px 0'}}>{content.content}</p>
            </div>
            <Banner banner={banner} />
            <div className="column-text">
              <h2>หมวดหมู่สินค้า</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique pharetra, mattis quam volutpat.</p>
            </div>
            <div className="column-btn">
              <button onClick={() => setGender(men)}>ผู้ชาย</button>
              <button onClick={() => setGender(women)}>ผู้หญิง</button>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique pharetra, mattis quam volutpat. Cursus leo, nec sit massa, euismod elementum. Massa euismod penatibus semper cursus nisi. Sit sed feugiat elementum amet. Sit eget bibendum mauris, mauris nisi ut neque.</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
