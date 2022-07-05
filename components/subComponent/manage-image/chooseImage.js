import React from 'react'
import nextConfig from '../../../next.config';

export default function ChooseImage({ image }) {
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
            .closest(".recommend-column")
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

