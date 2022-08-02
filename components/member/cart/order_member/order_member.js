import { height } from '@mui/system';
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
        console.log(order);
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
        dateTime = moment(dateTime).format("DD MMM YYYY");
        return <p>วันที่สั่งซื้อ<span>{dateTime}</span></p>
    }

    async function getAllProduct() {
        const access_token = getCookie('access_token')
        const getAll = await axios({
            method: 'GET',
            url: `${apiUrl}/api/member/getOrder`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(res => {
            setOrder(res.data.order)
            console.log(res.data.order);
        })

    }



    return (
        <Fragment>
            <div className="order-list" style={{ minHeight: "calc(100vh - 100px)" }}>
                <div className="img-background-column">
                    <div className="img-background">

                    </div>
                    <div className="column-shadow">
                        <div className="shadow-left"></div>
                        <div className="shadow-right"></div>
                    </div>
                    <div className="column-shadow-white">

                    </div>
                </div>
                <ContactUs />
                <div className="column-order-list" style={{ zIndex: 0 }}>
                    <div className="head-text-top">
                        <p style={{ fontSize: '24px' }}>รายการออเดอร์</p>
                    </div>

                    <div className="column-list" style={{ marginBottom: "5rem" }}>
                        <div className="text-head">
                            <p className="text-head-left">รายการสินค้า</p>
                            <p>ราคา</p>
                            <p>การจัดส่ง</p>
                        </div>
                        {order.length > 0
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
                                        <ProductList productList={orders.product} orderDetail={orders} qty={orders.product.length} getAllProduct={getAllProduct} />
                                    </div>
                                ))}
                            </>
                            : <p style={{ padding: '1rem', height: "3rem", textAlign: 'center' }}>ไม่มีออเดอร์</p>
                        }
                    </div>
                </div>
            </div>
        </Fragment >
    )
}