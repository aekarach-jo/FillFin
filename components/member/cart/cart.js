import axios from 'axios';
import { getCookie } from 'cookies-next';
import React, { Fragment, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import nextConfig from '../../../next.config';
import ContactUs from '../../subComponent/contactUs';

const apiUrl = nextConfig.apiPath
export default function Cart() {
    const [cartList, setCartList] = useState()
    useEffect(() => {
        getCartList()
    }, [])

    async function getCartList() {
        const access_token = getCookie("access_token")
        const getCart = await axios({
            method: 'GET',
            url: `${apiUrl}/api/product/getCart`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        const dataCart = getCart.data.cart
        console.log(dataCart)
        setCartList(dataCart)
    }

    function handleDeleteItem(product_code) {
        console.log(product_code)
        Swal.fire({
            title: 'ยืนยันการลบสินค้า',
            icon: 'warning',
            position: 'center',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then(res => {
            if (res.isConfirmed) {
                onDeleteItem(product_code)
            }
        })
    }

    async function onDeleteItem(product_code) {
        const access_token = getCookie("access_token")
        const deleteItem = await axios({
            method: 'GET',
            url: `${apiUrl}/api/product/delele/${product_code}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
    }
    return (
        <Fragment>
            <div className="shopping-cart">
                <h2>ตระกร้าสินค้า</h2>
                <div className="shopping-cart-column">
                    <div className="column-list-left">
                        <table>
                            <thead>
                                <tr className="head-table">
                                    <th>รายการสินค้า</th>
                                    <th className="total">ราคา </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartList
                                    ? <>
                                        {cartList.map((data, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="column-left">
                                                        <img src={`${apiUrl}/${data.path_img}`} />
                                                        <div className="column-text">
                                                            <h4>Massa quis risus eu arcu est sodales. fox.</h4>
                                                            <p>Lorem ipsum dolor sit amet, consectetur 1 adipiscing elit. Posuere mauris </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="column-right">
                                                        <p>999,999BTH</p>
                                                        <button onClick={() => handleDeleteItem(data.product_code)}><i className="fa-regular fa-trash-can" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                    : null
                                }

                            </tbody></table>
                        <div className="column-text-box">
                            <h3>เงือนไขการจัดส่งสินค้า</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna felis id nulla eget. Sed donec faucibus enim in porta tristique. Sed laoreet elementum dictumst blandit at euismod urna. Sed turpis consectetur potenti scelerisque ac.</p>
                            <p>Sit varius pellentesque mattis vitae. Integer nisl nisl neque interdum diam. Sit id viverra lobortis nec elit sit arcu. Ac, adipiscing</p>
                        </div>
                    </div>
                    <div className="column-list-right">
                        <table>
                            <thead>
                                <tr className="head-table">
                                    <th>รายการสินค้า</th>
                                    <th className="total">ราคา </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartList?.map((data, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="column-left">
                                                <div className="column-text">
                                                    <h4>Massa quis risus eu arcu est sodales. fox.</h4>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="column-right">
                                                <p>999,999BTH</p>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                <tr className="td-summary">
                                    <td>รวมราคาสินค้า</td>
                                    <td>999,999BTH</td>
                                </tr>
                                <tr className="td-bottom">
                                    <td>รวมทั้งหมด</td>
                                    <td>999,999BTH</td>
                                </tr>
                            </tbody></table>
                        <button>ชำระค่าสินค้าและบริการ</button>
                    </div>
                </div>
                <ContactUs />
            </div>
        </Fragment>
    )
}
