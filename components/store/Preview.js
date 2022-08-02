import Router from 'next/router'
import React, { Fragment } from 'react'
import nextConfig from '../../next.config'
import ContactUs from '../subComponent/contactUs'
import st from '../../styles/product/preview.module.scss'


export default function Preview({ product }) {
  return (
    <Fragment>
      <div className={`detail-product ${st.contentHeight}`}>
        <div className="detail-product-column">
          <div className="detail-left">
            <div className={`column-images ${st.chooseImage}`}>
              <ChooseImage image={product.product_img} />
            </div>
            <h1>{product.name_product}</h1>
            <p>{product.content_product}</p>
            <hr />
            <div className="column-text-bottom">
              <p>ราคา</p>
              <p className={st.textPrice}>{product.price} BTH</p>
            </div>
          </div>
          <div className="detail-right">
            <ShowImage image={product.product_img} />
            <button 
            style={{ position : 'absolute' , top : 0, right : 24}}
            onClick={() => Router.back()} >
              <i className="fa-solid fa-xmark" />
              </button>
          </div>
        </div>
        <ContactUs />
      </div>
    </Fragment>
  )
}

function ShowImage({ image }) {
  if (!image) {
    return <img src="/assets/images/product.png" />
  }
  const apiUrl = nextConfig.apiPath
  let image_split = image.split(",");
  return <img
    src={`${apiUrl}${image_split[0]}`}
    alt="image-preview"
    style={{ cursor: "pointer" }}
    className="image-main"
    onError={e => {
      e.target.setAttribute('src', '/assets/images/product.png');
      return false;
    }} />;
}

function ChooseImage({ image }) {
  if (!image) {
    return <img src="/assets/images/product.png" alt="image-product" />
  }

  const apiUrl = nextConfig.apiPath
  let image_split = image.split(",");
  const response = image_split.map((data, index) => {
    return (
      <img
        key={index}
        alt="image-product"
        src={`${apiUrl}/${data}`}
        onClick={(e) => {
          e.target
            .closest(".detail-product")
            .querySelector(".image-main")
            .setAttribute("src", e.target.getAttribute("src"));
        }}
        onError={e => {
          e.target.setAttribute('src', '/assets/images/product.png');
          return false;
        }}
      />
    );
  });
  return response;
}

