import axios from 'axios';
import { getCookie } from 'cookies-next';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react'
import nextConfig from '../../../../next.config';
import ContactUs from '../../../subComponent/contactUs';
import ProductList from './collapse';

const apiUrl = nextConfig.apiPath
export default function Order_member() {
    const [order, setOrder] = useState([])
    useEffect(() => {
        getOrder();
    }, [])

    async function getOrder() {
        const access_token = getCookie("access_token")
        const apiGetOrder = await axios({
            method: 'GET',
            url: `${apiUrl}/api/member/getOrder`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        setOrder(apiGetOrder.data.order)
    }

    function FormatDate({ dateTime }) {
        dateTime = moment().format("DD MMM YYYY");
        return <p>วันที่สั่งซื้อ<span>{dateTime}</span></p>
    }


    return (
        <Fragment>
            <div className="order-list" style={{ minHeight: "calc(100vh - 100px)" }}>
                <div class="img-background-column">
                    <div class="img-background">

                    </div>
                    <div class="column-shadow">
                        <div class="shadow-left"></div>
                        <div class="shadow-right"></div>
                    </div>
                    <div class="column-shadow-white">

                    </div>
                </div>
                <ContactUs />
                <div className="column-order-list">
                    <div class="head-text-top">
                        <h2>รายการออเดอร์</h2>
                    </div>

                    <div className="column-list">
                        <div className="text-head">
                            <p class="text-head-left">รายการสินค้า</p>
                            <p>ราคา</p>
                            <p>การจัดส่ง</p>
                        </div>
                        {order
                            ?
                            <>
                                {order?.map((orders, index) => (
                                    <div key={index} className="column-order">
                                        <div className="text-head-table">
                                            <p>เลขที่ออเดอร์<span>{orders.orderNumber}</span></p>
                                            <FormatDate dateTime={orders.createdAt} />
                                            {orders.paymentStatus == 'pending'
                                                ? <p>การชำระเงิน<span>กำลังดำเนินการ</span></p>
                                                : <p>การชำระเงิน<span>ชำระแล้ว</span></p>
                                            }
                                        </div>
                                        <ProductList productList={orders.product} orderDetail={orders} qty={orders.product.length} />
                                    </div>
                                ))}
                            </>
                            : <p style={{ marginLeft: 'auto', marginRight: 'auto' }}>ไม่มีออเดอร์</p>
                        }
                    </div>
                </div>
            </div>
        </Fragment >
    )
}