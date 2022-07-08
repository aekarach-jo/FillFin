import Link from 'next/link';
import React from 'react'
import nextConfig from '../../../next.config';

export default function ShowImage({ image }) {
    if (!image) {
        return <img src="/assets/images/product.png" />
    }
    const apiUrl = nextConfig.apiPath
    let image_split = image.split(",");
    return <img
        src={`${apiUrl}/${image_split[0]}`}
        style={{ cursor: "pointer" }}
        className="image-main"
        onError={e => {
            e.target.setAttribute('src', '/assets/images/product.png');
            return false;
        }} />;
}
