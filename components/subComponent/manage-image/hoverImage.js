import React from 'react'
import nextConfig from '../../../next.config';

export default function HoverImage({ image }) {
    const apiUrl = nextConfig.apiPath
    const image_split = image.split(",");
    return (
        <img
            src={`${apiUrl}${image_split[0]}`}
            data-src1={`${apiUrl}${image_split[0]}`}
            data-src2={`${apiUrl}${image_split[1]}`}
            onMouseOver={(e) => {
                e.target.setAttribute("src", e.target.getAttribute("data-src2"));
            }}
            onMouseLeave={(e) => {
                e.target.setAttribute("src", e.target.getAttribute("data-src1"));
            }}
            alt="image-hover"
        />
    )
}
