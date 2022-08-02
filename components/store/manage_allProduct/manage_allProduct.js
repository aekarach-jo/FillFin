import axios from 'axios'
import { getCookie } from 'cookies-next'
import React, { Fragment, useState } from 'react'
import Swal from 'sweetalert2'
import nextConfig from '../../../next.config'
import ChooseImage from '../../subComponent/manage-image/chooseImage'
import ShowImage from '../../subComponent/manage-image/showImage'
import st from '../../../styles/store/store.module.scss'

const apiUrl = nextConfig.apiPath
export default function Manage_allProduct({ productList, status }) {

    function handleConfirmDelete(product_code) {
        Swal.fire({
            icon: 'warning',
            position: 'center',
            title: 'ยืนยันการลบสินค้า',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            showCancelButton: true,
            showConfirmButton: true
        }).then(res => {
            if (res.isConfirmed) {
                onDeleteOrder(product_code)
            }
        })
    }

    async function onDeleteOrder(product_code) {
        const access_token = getCookie("access_token")
        const deleteOrder = await axios({
            method: 'GET',
            url: `${apiUrl}/api/store/product/delete/${product_code}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(() => {
            status()
            Swal.fire('ลบแล้ว', '', 'success')
        })
    }

    return (
        <Fragment>
            <div className="column-text-top">
                <h2>สินค้าทั้งหมด</h2>
                <p>รายการสินค้าทั้งหมด {productList.length} รายการ</p>
            </div>
            <div className={`column-product-recommend ${st.box}`}>
                {productList.length > 0
                    ? <>
                        {productList?.map((data, index) => (
                            <div key={index} className={`recommend-column ${st.recCol}`} >
                                <ShowImage image={data.product_img} />
                                <div className="column-img-bottom" style={{ display: 'flex', margin: '0.5rem' }}>
                                    <ChooseImage image={data.product_img} />
                                </div>
                                <div className={`column-text-bottom ${st.productAll}`}>
                                    <h4>{data.name}</h4>
                                    {data.clip != "no"
                                        ?
                                        <>
                                            <div className="column-gift" >
                                                <img src="/assets/icons/icon-gift.png" alt="image-gift" />
                                                <span>มีคลิป</span>
                                            </div>
                                        </>
                                        : null
                                    }
                                    <p className={st.textContent}>{data.content_product}</p>
                                    <div className={`column-btn ${st.colBtn}`}>
                                        <button className={`btn-left ${st.btnPrice}`}>
                                            <i className="fa-solid fa-cart-shopping" />{data.price}</button>
                                        <button
                                            className={`btn-right ${st.btnDelete}`}
                                            onClick={() => handleConfirmDelete(data.product_code)}>
                                            <i className="fa-regular fa-trash-can" />ลบ</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                    : <div className="column-product-recommend" style={{ height: '0px', overflow: "hidden" }}>ไม่มีสินค้า</div>
                }
            </div>
        </Fragment>
    )
}

