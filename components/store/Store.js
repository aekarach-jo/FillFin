import axios from "axios";
import { getCookie, setCookies } from "cookies-next";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import nextConfig from "../../next.config";
import StorePage from "../../pages/store";
import Manage_profilePost from "./manage_allPost/manage_allPost";
import Manage_allPreorder from "./manage_allPreorder/manage_allPreorder";
import Manage_allProduct from "./manage_allProduct/manage_allProduct";
import Manage_post from "./manage_post/manage_post";
import Manage_preorder from "./manage_preorder/manage_preorder";
import Manage_product from "./manage_product/manage_product";

const apiUrl = nextConfig.apiPath;
export default function Store({ stores, statusChange }) {
  const { all_product, pre_order, review, store_detail, store_post } = stores;
  const [allProduct, setAllProduct] = useState(all_product)
  const [preAllOder, setPreAllOder] = useState(pre_order)
  const [storePost, setStorePost] = useState(store_post)
  const [statusGetDataAll, setStatusGetDataAll] = useState(false);
  const [concept, setConcept] = useState("")

  useEffect(() => {
    if (statusGetDataAll) {
      getDataAll();
    }
  }, [statusGetDataAll]);

  async function updateConcept() {
    const access_token = getCookie('access_token')
    const update = await axios({
      method: 'POST',
      url: `${apiUrl}/api/store/updateConcept`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        concept: concept
      })
    }).then(res => {
      Swal.fire('สำเร็จ', '', 'success')
    })
  }

  async function getDataAll() {
    const access_token = getCookie("access_token");
    const response = await axios({
      method: "GET",
      url: `${apiUrl}/api/store/getDataAll`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    setAllProduct(response.data.data.all_product)
    setStorePost(response.data.data.store_post)
    setPreAllOder(response.data.data.pre_order)
    setStatusGetDataAll(false);
  }

  function handleStatusChange() {
    setStatusGetDataAll(true);
  }
  return (
    <Fragment>
      <div className="sell-product">
        <div className="sell-product-column">
          <div className="product-column-left">
            <div className="column-text-top">
              <div className="text-top-left">
                <div className="column-img">
                  <img src={`${apiUrl}/${store_detail.profile_img}`} />
                  <button>
                    <i className="fa-solid fa-camera" />
                  </button>
                </div>
              </div>
              <div className="text-top-right">
                <button>
                  <i className="fa-solid fa-pen-to-square" />
                </button>
                <h2>{store_detail.name}</h2>
                <div className="column-text-botttom">
                  <div className="text-left">
                    <p>อายุ : {store_detail.age} ปี</p>
                    <p>สัดส่วน BWH : {store_detail.bwh}35-18-36</p>
                  </div>
                  <div className="text-center">
                    <p>น้ำหนัก : {store_detail.weight}43 กก.</p>
                    <p>ส่วนสูง : {store_detail.height}167 ชม.</p>
                  </div>
                  <div className="text-right">
                    <button onClick={() => statusChange(false)}>
                      <i className="fa-regular fa-eye" />
                      ดูมุมมองลูกค้า
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="box-column">
              <div className="head-text-column">
                <h2>เขียนคำอธิบายคอนเซ็ปร้าน</h2>
              </div>
              <form>
                <label>คอนเซ็ปร้าน (คำอธิบายตัวตนของผู้ขาย)</label>
                <textarea
                  placeholder={store_detail.concept}
                  onChange={(e) => setConcept(e.target.value)} />
              </form>
              <div className="column-button">
                <button className="btn-left" onClick={() => updateConcept()}>โพส</button>
                <button className="btn-right">ยกเลิก</button>
              </div>
            </div>
            <div className="column-text-provision">
              <h3>ข้อกำหนดการ โพสต์โปรไฟล์ผู้ขาย</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et,
                volutpat egestas leo arcu. Pulvinar nec risus, vitae cursus
                vulputate. Id suscipit est, ullamcorper consequat, gravida
                porttitor risus, tempor. Morbi odio lobortis ornare volutpat
                molestie. Amet, elit fames vel mauris, nunc facilisi massa.
                Auctor.
              </p>
            </div>
            <div className="column-seller-profile">
              <Manage_post status={handleStatusChange} />
            </div>
            <div className="column-box-product">
              <Manage_profilePost postList={storePost} />
            </div>
          </div>
          <div className="product-column-right">
            <div className="post-product">
              <Manage_product status={handleStatusChange} />
            </div>
            <div className="post-product">
              <Manage_preorder status={handleStatusChange} />
            </div>

            <div className="column-box-product">
              <Manage_allProduct productList={allProduct} />
            </div>
            <div className="column-box-product">
              <Manage_allPreorder preOrderList={preAllOder} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
