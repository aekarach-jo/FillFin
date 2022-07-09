import { getCookie } from "cookies-next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import nextConfig from "../../next.config";
import ContactUs from "../subComponent/contactUs";
import ChooseImage from "../subComponent/manage-image/chooseImage";
import HoverImage from "../subComponent/manage-image/hoverImage";
import ShowImage from "../subComponent/manage-image/showImage";

const apiUrl = nextConfig.apiPath;

export default function ShowProduct({ stores }) {
  const { store_all, product_recom } = stores;

  useEffect(() => {
  }, []);

  return (
    <Fragment>
      <div>
        <div className="product">
          <ContactUs />
          <div className="col-product">
            <div className="column-left">
              <h2>สินค้าแนะนำ</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
              <div className="column-product-recommend">
                {product_recom?.map((data, index) => (
                  <Fragment key={index}>
                    <div className="recommend-column">
                      <ShowImage image={data.product_img} />
                      <div className="column-img-bottom">
                        <ChooseImage image={data.product_img} />
                      </div>
                      <div className="column-text-bottom">
                        <h4>{data.name_product}</h4>
                        <p>{data.content_product}</p>
                        {data.canbuy
                          ? <button><i className="fa-solid fa-cart-shopping" />{data.price}</button>
                          : <button style={{ cursor: "not-allowed" }} ><i className="fa-solid fa fa-eye-slash" /></button>
                        }
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
            <div className="column-right">
              <div className="text-column-top">
                <h2>WOMEN</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
              </div>
              <form className="search">
                <input type="text" placeholder="ค้นหาชื่อร้าน" name="search" />
                <button type="submit">
                  <i className="fa fa-search" />
                </button>
              </form>
              <div className="column-product">
                {store_all?.map((data, index) => (
                  <div key={index} className="column">
                    <Link href={`/member/store/${data.store_code}`}>
                      <div>
                        <div
                          className="column-top"
                          style={{ cursor: "pointer" }}
                        >
                          <Image
                            src={`${apiUrl}/${data.store_profile}`}
                            style={{ cursor: "pointer" }}
                            width={40}
                            height={40}
                            alt="store_profile"
                          />
                          <p>{data.store_name}</p>
                        </div>
                        <div
                          className="column-center"
                          style={{ cursor: "pointer" }}
                        >
                          <HoverImage image={data.product_img} />
                          <p>{data.content_product}</p>
                        </div>
                      </div>
                    </Link>
                    <div className="column-bottom">
                      {data.canbuy
                        ? <button><i className="fa-solid fa-cart-shopping" />{data.price}</button>
                        : <button style={{ cursor: "not-allowed",  bottom: 0 }} ><i className="fa-solid fa fa-eye-slash" aria-hidden="true" /></button>
                      }
                    </div>
                  </div>
                ))}
              </div>
              <div className="pagination">
                <button>
                  <i className="fa-solid fa-angle-left" />
                </button>
                <a href="#" className="active">
                  1
                </a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
                <a href="#" className="center">
                  ...
                </a>
                <a href="#">7</a>
                <a href="#">8</a>
                <a href="#">9</a>
                <a href="#">10</a>
                <button>
                  <i className="fa-solid fa-chevron-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

