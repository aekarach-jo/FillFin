import axios from 'axios';
import { getCookie } from 'cookies-next';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react'
import useCollapse from 'react-collapsed';
import nextConfig from '../../../../next.config';

const apiUrl = nextConfig.apiPath
export default function Order_member() {
    const [orderList, setOrderList] = useState([]);
    const [order, setOrder] = useState([])

    const [checkOrderQty, setCheckOrderQty] = useState()

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
        console.log(apiGetOrder.data.order);
        setOrder(apiGetOrder.data.order)

        // console.log(apiGetOrder.data.order[0]);
        // for (let index = 0; index < order2.length; index++) {
        //     if (order1.product_id != order2[index].product_id) {
        //         // console.log(Array(order2[index]))
        //         setOrderList(Array(order2[index]))
        //     }
        // }
    }

    function FormatDate({ dateTime }) {
        dateTime = moment().format("DD MMM YYYY");
        return <p>วันที่สั่งซื้อ<span>{dateTime}</span></p>
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
                        {order
                            ?
                            <>
                                {order?.map((orders, index) => (
                                    <div className="column-order">
                                        <div key={index} className="text-head-table">
                                            <p>เลขที่ออเดอร์<span>{orders.orderNumber}</span></p>
                                            <FormatDate dateTime={orders.createdAt} />
                                            {orders.paymentStatus == 'pending'
                                                ? <p>การชำระเงิน<span>กำลังดำเนินการ</span></p>
                                                : <p>การชำระเงิน<span>ชำระแล้ว</span></p>
                                            }

                                        </div>
                                        <ProductList productList={orders.product} orderDetail={orders} qty={checkOrderQty} />
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

function ProductList({ productList, orderDetail, qty }) {

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    const [isOpen, setIsOpen] = useState(false)
    const [products, setProducts] = useState()
    const product = productList[0]
    for (let i = 0; i < productList.length; i++) {
        if (product.product_id != productList[i].product_id) {
            setProducts(Array(productList[i]))
        }
    }

    return (
        <Fragment>
            {productList
                ?
                <div className="column-list-detail" >
                    {isOpen
                        ?
                        <>
                            {products?.map((data, index) => (
                                <div className='collapse' key={index}  {...getCollapseProps()}>
                                    <div className="column-text-detail" >
                                        <div className="column-left" >
                                            <div className="img-left">
                                                <img src={`${apiUrl}${data.product_image}`} />
                                            </div>
                                            <div className="text-right">
                                                <h4>{data.product_name}</h4>
                                                <p>{data.product_content}</p>
                                            </div>
                                        </div>
                                        <div className="column-center">
                                            <p>{data.price}</p>
                                        </div>
                                        <div className="column-right">
                                            {data.product_status == 'shipping'
                                                ? <p>เตรียมจัดส่ง</p>
                                                : <p>จัดส่งแล้ว</p>
                                            }

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                        :
                        <>
                            <div className='collapse'>
                                <div className="column-text-detail" >
                                    <div className="column-left" >
                                        <div className="img-left">
                                            <img src={`${apiUrl}${product.product_image}`} />
                                        </div>
                                        <div className="text-right">
                                            <h4>{product.product_name}</h4>
                                            <p>{product.product_content}</p>
                                        </div>
                                    </div>
                                    <div className="column-center">
                                        <p>{product.price}</p>
                                    </div>
                                    <div className="column-right">
                                        {product.product_status == 'shipping'
                                            ? <p>เตรียมจัดส่ง</p>
                                            : <p>จัดส่งแล้ว</p>
                                        }

                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    <div className="column-none-list" id="btn-list">
                        <div {...getToggleProps()}>
                            {qty > 1
                                ?
                                <button className="btn-down" onClick={() => setIsOpen(!isOpen)}>
                                    {!isExpanded
                                        ? <i className="fa-solid fa-angle-down" />
                                        : <i className="fa-solid fa-angle-up" />
                                    }
                                    {isExpanded ? 'ซ่อนรายการ' : 'แสดงรายการ'}
                                </button>
                                : false
                            }

                        </div>
                    </div>
                    <div className="column-address-bottom">
                        <div className="column-address">ข้อมูลจัดส่ง</div>
                        <div className="column-address">
                            <h4>ชื่อ-นามสกุล</h4>
                            <p>{orderDetail.name}</p>
                        </div>
                        <div className="column-address center">
                            <h4>ที่อยู่</h4>
                            <p>{orderDetail.address}</p>
                        </div>
                        <div className="column-address">
                            <h4>เบอร์โทร</h4>
                            <p>{orderDetail.phone}</p>
                        </div>
                        <div className="column-address">
                            <h4>หมายเหตุ</h4>
                            <p>{orderDetail.note}</p>
                        </div>
                    </div>

                </div>
                : <p style={{ marginLeft: 'auto', marginRight: 'auto' }}>ไม่พบสินค้า</p>
            }

        </Fragment>
    )
}