import axios from "axios";
import { getCookie } from "cookies-next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import nextConfig from "../../next.config";
import ContactUs from "../subComponent/contactUs";
import ChooseImage from "../subComponent/manage-image/chooseImage";
import HoverImage from "../subComponent/manage-image/hoverImage";
import ShowImage from "../subComponent/manage-image/showImage";
import st from '../../styles/product/productAll.module.scss'
import Pagination from "../subComponent/pagination";
const apiUrl = nextConfig.apiPath;

export default function ShowProduct({ stores ,banner}) {
  const { store_all, product_recom } = stores.data;
  const [searchStore, setSearchStore] = useState("")
  const [value] = useDebounce(searchStore, 500);
  const [page, setPage] = useState()

  const [storeAll, setStoreAll] = useState(stores.data.store_all)
  const current_page = stores.data.current_page
  const pages = {
    current_page: stores.data.current_page,
    per_page: stores.data.per_page,
    total_page: stores.data.total_page,
    total_store: stores.data.total_store
  }
  useEffect(() => {
    search()
  }, [value])
  async function search() {
    const params = new URLSearchParams({
      page: current_page,
      search: value
    })
    const access_token = getCookie('access_token')
    const gender = getCookie('gender')
    const apiSearch = await axios({
      method: 'GET',
      url: `${apiUrl}/api/product/${gender}/allStore?${params.toString()}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    setStoreAll(apiSearch.data.data.store_all)
  }

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
                {product_recom.length > 0
                  ? <>
                    {product_recom?.map((data, index) => (
                      <div key={index} className={`recommend-column ${st.productAll_storeCard}`}>
                        <ShowImage image={data.product_img} />
                        <div className="column-img-bottom" style={{ display: 'flex', margin: '0.5rem 0' }}>
                          <ChooseImage image={data.product_img} />
                        </div>
                        <div className="column-text-bottom">
                          <h4>{data.name_product}</h4>
                          <p className={st.textContent}>{data.content_product}</p>
                          {data.canbuy
                            ? <button><i className="fa-solid fa-cart-shopping" />{data.price}</button>
                            : <button style={{ cursor: "not-allowed" }} ><i className="fa-solid fa fa-eye-slash" /></button>
                          }
                        </div>
                      </div>
                    ))}
                  </>
                  : <p>ไม่มีสินค้าแนะนำ</p>
                }
              </div>
            </div>
            <div className="column-right">
              <div className="text-column-top">
                <h2>{banner.title}</h2>
                <p>{banner.content}</p>
              </div>
              <form className="search">
                <input type="text" placeholder="ค้นหาชื่อร้าน" name="search" onChange={(e) => { setSearchStore(e.target.value) }} />
                <button type="submit">
                  <i className="fa fa-search" />
                </button>
              </form>
              <div className="column-product">
                {storeAll?.map((data, index) => (
                  <div key={index} className={`column ${st.productAll_storeCard}`}>
                    <Link href={`/member/store/${data.store_code}`}>
                      <div>
                        <div
                          className="column-top"
                          style={{ cursor: "pointer" }}
                        >
                          <Image
                            src={`${apiUrl}${data.store_profile}`}
                            style={{ cursor: "pointer" }}
                            width={40}
                            height={40}
                            alt="store_profile"
                          />
                          <p>{data.store_name}</p>
                        </div>
                        <div
                          className="column-center "
                          style={{ cursor: "pointer" }}
                        >
                          {!data.preOrder
                            ? <HoverImage image={data.product_img} />
                            : <img src={`${apiUrl}${data.product_img}`} alt="image-preOrder" />
                          }
                          <p className={st.textContent} style={{ textAlign: 'center' }}>{data.content_product}</p>
                        </div>
                      </div>
                    </Link>
                    <div className="column-bottom">
                      {data.preOrder
                        ? <Link href={`/member/store/${data.store_code}`}><button ><i className="fa-regular fa-clock"></i>สั่งจองเท่านั้น {data.totalProduct} รายการ</button></Link>
                        : <Link href={`/member/store/${data.store_code}`}><button >สินค้าในร้านทั้งหมด {data.totalProduct} รายการ</button></Link>
                      }
                    </div>
                  </div>
                ))}
              </div>
              <Pagination page={pages} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

