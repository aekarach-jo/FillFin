import axios from "axios";
import { getCookie } from "cookies-next";
import React, { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import nextConfig from "../../next.config";
import Manage_profilePost from "./manage_allPost/manage_allPost";
import Manage_allPreorder from "./manage_allPreorder/manage_allPreorder";
import Manage_allProduct from "./manage_allProduct/manage_allProduct";
import Manage_post from "./manage_post/manage_post";
import Manage_preorder from "./manage_preorder/manage_preorder";
import Manage_product from "./manage_product/manage_product";
import st from '../../styles/store/store.module.scss'
import ModalEdit from "./modal/modalEdit";
import ContactUs from "../subComponent/contactUs";
import ContactAdmin from "../subComponent/contactAdmin";
const apiUrl = nextConfig.apiPath;
export default function Store({ stores, statusChange, qrCode }) {
  const { all_product, pre_order, review, store_detail, store_post } = stores;
  const [allProduct, setAllProduct] = useState(all_product)
  const [preAllOder, setPreAllOder] = useState(pre_order)
  const [storePost, setStorePost] = useState(store_post)
  const [storeDetail, setStoreDetail] = useState(store_detail)
  const [statusGetDataAll, setStatusGetDataAll] = useState(false);
  const [concept, setConcept] = useState("")
  const [onPopupModal, setOnPopupModal] = useState(false)

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
    console.log(response.data.data);
    setAllProduct(response.data.data.all_product)
    setStorePost(response.data.data.store_post)
    setPreAllOder(response.data.data.pre_order)
    setStoreDetail(response.data.data.store_detail)
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
            <div className={`column-text-top ${st.profile_group}`}>
              <div className={`text-top-left ${st.profile_image}`}>
                <div className="column-img">
                  <img src={`${apiUrl}${storeDetail.profile_img}`} alt="image-profile" />
                  <button >
                    <i onClick={() => setOnPopupModal(!onPopupModal)}
                      className="fa-solid fa-camera" />
                  </button>
                </div>
              </div>
              <div className="text-top-right">
                <ModalEdit storeDetail={storeDetail} status={handleStatusChange} />
                <h2>{storeDetail.name}</h2>
                <div className="column-text-botttom">
                  <div className="text-left">
                    <p>อายุ : {storeDetail.age} ปี</p>
                    <p>สัดส่วน BWH : {storeDetail.bwh}</p>
                  </div>
                  <div className={`text-center ${st.textGroup}`}>
                    <p>น้ำหนัก : {storeDetail.weight} กก.</p>
                    <p>ส่วนสูง : {storeDetail.height} ชม.</p>
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
                <h2>เขียนคำอธิบายคอนเซ็ปต์ร้าน</h2>
              </div>
              <form>
                <label>คอนเซ็ปต์ร้าน (คำอธิบายตัวตนของผู้ขาย)</label>
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
              <Manage_profilePost postList={storePost} status={handleStatusChange} />
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
              <Manage_allProduct productList={allProduct} status={handleStatusChange} />
            </div>
            <div className="column-box-product">
              <Manage_allPreorder preOrderList={preAllOder} status={handleStatusChange} />
            </div>
          </div>
        </div>
        <ContactUs />
      </div>
      <ContactAdmin qrCode={qrCode} />
    </Fragment>
  );
}


