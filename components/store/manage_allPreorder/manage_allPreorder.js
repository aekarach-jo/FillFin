import axios from 'axios'
import { getCookie } from 'cookies-next'
import React, { Fragment } from 'react'
import Swal from 'sweetalert2'
import nextConfig from '../../../next.config'
import ChooseImage from '../../subComponent/manage-image/chooseImage'
import ShowImage from '../../subComponent/manage-image/showImage'

const apiUrl = nextConfig.apiPath
export default function Manage_allPreorder({ preOrderList , status}) {
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
                <h2>สินค้าจองล่วงหน้า (PRE-ORDER)</h2>
                <p>รายการสินค้าจองล่วงหน้า (PRE-ORDER) ทั้งหมด {preOrderList.length} รายการ</p>
            </div>
            {preOrderList.length > 0
                ? <>
                    <div className="column-product-recommend">
                        {preOrderList?.map((data, index) => (
                            <div key={index} className="recommend-column">
                                <ShowImage image={data.product_img} />
                                <div className="column-img-bottom">
                                    <ChooseImage image={data.product_img} />
                                </div>
                                <div className="column-text-bottom">
                                    <h4>{data.name}</h4>
                                    <div className="column-gift">
                                        {data.clip != "no"
                                            ?
                                            <>
                                                <img src="/assets/icons/icon-gift.png" alt="image-gift" />
                                                <span>มีคลิป</span>
                                            </>
                                            : null
                                        }
                                    </div>
                                    <p>{data.content_product}</p>
                                    <div className="column-btn">
                                        <button
                                            className="btn-left">
                                            <i className="fa-solid fa-cart-shopping" />{data.price}</button>
                                        <button
                                            onClick={() => handleConfirmDelete(data.product_code)}
                                            className="btn-right">
                                            <i className="fa-regular fa-trash-can" />ลบ</button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </>
                :  <div className="column-product-recommend" style={{ height : '0px' , overflow : "hidden"}}>ไม่มีสินค้า PRE-ORDER</div>
            }
        </Fragment>
    )
}
