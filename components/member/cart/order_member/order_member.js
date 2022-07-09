import axios from 'axios';
import { getCookie } from 'cookies-next';
import React, { Fragment, useEffect, useState } from 'react'
import nextConfig from '../../../../next.config';

const apiUrl = nextConfig.apiPath
export default function Order_member() {
    const [orderList, setOrderList] = useState()

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
        console.log(apiGetOrder);
        setOrderList(apiGetOrder.data[0])
    }

    async function onShowOrderList() {
        const access_token = getCookie("access_token")
        const apiGetOrder = await axios({
            method: 'GET',
            url: `${apiUrl}/api/member/getOrder`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        console.log(apiGetOrder);
        setOrderList(apiGetOrder.data)
    }

    return (
        <Fragment>
            <div className="order-list">
                <div className="img-background">
                    <img className="img-left" src="/assets/images/man.png" />
                    <img className="img-right" src="/assets/images/woman.png" />
                </div>
                <div className="contact-us">
                    <div className="column-contact-us">
                        <div className="text-contact-us">
                            <p>ติดต่อเรา</p>
                        </div>
                        <div className="img-contact-us">
                            <img src="/assets/images/contact.jpg" />
                        </div>
                    </div>
                </div>
                <div className="column-order-list">
                    <div className="head-text-top">
                        <h2>รายการสั่งซื้อ</h2>
                    </div>
                    <div className="column-list">
                        <div className="text-head">
                            <p>รายการสินค้า</p>
                            <p>ราคา</p>
                            <p>การจัดส่ง</p>
                        </div>
                        <div className="column-order">
                            <div className="text-head-table">
                                <p>เลขที่ออเดอร์<span>OD123456</span></p>
                                <p>วันที่สั่งซื้อ<span>25 june 2022</span></p>
                                <p>การชำระเงิน<span>โอนเงินสำเร็จ</span></p>
                            </div>
                            <div className="column-list-detail">
                                <div className="column-text-detail">
                                    <div className="column-left">
                                        <div className="img-left">
                                            <img src="/assets/images/product.png" />
                                        </div>
                                        <div className="text-right">
                                            <h4>Massa quis risus eu arcu est sodales. fox.</h4>
                                            <p>Lorem ipsum dolor sit amet, consectetur 1 adipiscing elit. Posuere mauris </p>
                                        </div>
                                    </div>
                                    <div className="column-center">
                                        <p>999,999 BTH</p>
                                    </div>
                                    <div className="column-right">
                                        <p>จัดส่งแล้ว</p>
                                    </div>
                                </div>
                                <div className="column-none-list active" id="btn-list">
                                    <button className="btn-down" onClick={() => onShowOrderList()}><i className="fa-solid fa-angle-down" />แสดงรายการ รายการ</button>
                                    <button className="btn-up " id="btn-up" ><i className="fa-solid fa-angle-up" />ซ่อนรายการ รายการ</button>
                                </div>
                                <div className="column-address-bottom">
                                    <div className="column-address">ข้อมูลจัดส่ง</div>
                                    <div className="column-address">
                                        <h4>ชื่อ-นามสกุล</h4>
                                        <p>นาย กอไก่ ไข่เต็มเล้า</p>
                                    </div>
                                    <div className="column-address center">
                                        <h4>ที่อยู่</h4>
                                        <p>อาคารสีเทาดำ 123/45 ตำบล/แขวง: เมืองขอนแก่น, อำเภอ/เขต: เมืองขอนแก่น
                                            จังหวัด: ขอนแก่น, รหัสไปรษณีย์: 40000 </p>
                                    </div>
                                    <div className="column-address">
                                        <h4>เบอร์โทร</h4>
                                        <p>0896363636</p>
                                    </div>
                                    <div className="column-address">
                                        <h4>หมายเหตุ</h4>
                                        <p>ไม่ต้องซัก จัดมาแบบเบิ้มๆ</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column-order">
                            <div className="text-head-table">
                                <p>เลขที่ออเดอร์<span>OD123456</span></p>
                                <p>วันที่สั่งซื้อ<span>25 june 2022</span></p>
                                <p>การชำระเงิน<span>กำลังตรวจสอบ</span></p>
                            </div>
                            <div className="column-list-detail">
                                <div className="column-text-detail">
                                    <div className="column-left">
                                        <div className="img-left">
                                            <img src="/assets/images/product.png" />
                                        </div>
                                        <div className="text-right">
                                            <h4>Massa quis risus eu arcu est sodales. fox.</h4>
                                            <p>Lorem ipsum dolor sit amet, consectetur 1 adipiscing elit. Posuere mauris </p>
                                        </div>
                                    </div>
                                    <div className="column-center">
                                        <p>999,999 BTH</p>
                                    </div>
                                    <div className="column-right">
                                        <p>เตรียมจัดส่ง</p>
                                    </div>
                                </div>
                                <div className="column-address-bottom">
                                    <div className="column-address">ข้อมูลจัดส่ง</div>
                                    <div className="column-address">
                                        <h4>ชื่อ-นามสกุล</h4>
                                        <p>นาย กอไก่ ไข่เต็มเล้า</p>
                                    </div>
                                    <div className="column-address center">
                                        <h4>ที่อยู่</h4>
                                        <p>อาคารสีเทาดำ 123/45 ตำบล/แขวง: เมืองขอนแก่น, อำเภอ/เขต: เมืองขอนแก่น
                                            จังหวัด: ขอนแก่น, รหัสไปรษณีย์: 40000 </p>
                                    </div>
                                    <div className="column-address">
                                        <h4>เบอร์โทร</h4>
                                        <p>0896363636</p>
                                    </div>
                                    <div className="column-address">
                                        <h4>หมายเหตุ</h4>
                                        <p>ไม่ต้องซัก จัดมาแบบเบิ้มๆ</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
