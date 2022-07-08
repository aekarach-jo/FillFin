import Image from 'next/image'
import React, { Fragment } from 'react'
import nextConfig from '../../next.config'
import ContactUs from '../subComponent/contactUs'

export default function Preview({ product }) {

  return (
    <Fragment>
      <div className="detail-product">
        <div className="detail-product-column">
          <div className="detail-left">
            <div className="column-images">
              <ChooseImage image={product.product_img} />
            </div>
            <h1>{product.name_product}</h1>
            <p>{product.content_product}</p>
            <p>sed. Turpis vitae, cras curabitur pharetra, a ultrices tortor commodo auctor. Et, donec pulvinar commodo pharetra et. Sagittis tincidunt vestibulum, id risus. Id metus, sit orci a id lectus. Posuere erat lectus eu mauris nunc turpis nullam.
              Condimentum ultrices lacus pulvinar vestibulum convallis. Nullam habitant a erat aenean enim congue quisque.</p>
            <div className="column-text-bottom">
              <p>ราคา</p>
              <h1>{product.price} BTH</h1>
            </div>
          </div>
          <div className="detail-right">
            <ShowImage image={product.product_img} />
            <button><i className="fa-solid fa-xmark" /></button>
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
    style={{ cursor: "pointer" }}
    className="image-main"
    onError={e => {
      e.target.setAttribute('src', '/assets/images/product.png');
      return false;
    }} />;
}

function ChooseImage({ image }) {
  if (!image) {
    return <img src="/assets/images/product.png" />
  }

  const apiUrl = nextConfig.apiPath
  let image_split = image.split(",");
  const response = image_split.map((data, index) => {
    return (
      <img
        key={index}
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

