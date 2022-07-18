import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router'
import { useAppContext } from '../../../config/state';
import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import nextConfig from '../../../next.config';
import ContactUs from '../../subComponent/contactUs';
import Styles from '../../../styles/cart.module.scss'

const apiUrl = nextConfig.apiPath
export default function Cart() {
    const router = useRouter()
    const state = useAppContext()
    const [cartList, setCartList] = useState()
    const [totalPrice, setTotalPrice] = useState()
    const isLogin = state.isLogin.get_login
    useEffect(() => {
        getCartList()
    }, [])

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 800,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    function handleDeleteItem(product_code) {
        Swal.fire({
            title: 'ยืนยันการลบสินค้า',
            icon: 'warning',
            position: 'center',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor : '#C93A87',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            allowOutsideClick: false,
            animation: true,
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
            url: `${apiUrl}/api/member/cart/delete/${product_code}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(() => {
            Toast.fire({
                icon: 'success',
                title: 'ลบแล้ว'
            })
            getCartList()
        })
    }

    async function getCartList() {
        const access_token = getCookie("access_token")
        const getCart = await axios({
            method: 'GET',
            url: `${apiUrl}/api/member/cart/get`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        const dataCart = getCart.data.cart
        setTotalPrice(getCart.data.totalprice)
        setCartList(dataCart)
        state.cartQty.set_cart_qty(dataCart.length)
    }

    async function handleCheckProduct() {
        const access_token = getCookie('access_token')
        const apiChack = await axios({
            method: 'GET',
            url: `${apiUrl}/api/member/cart/checkProduct`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then((res) => {
            if (res.data.status) {
                router.push('/member/cart/payment');
            } else {
                Swal.fire({
                    title: 'สินค้าบางรายการหมด',
                    icon: 'warning',
                    position: 'center',
                    showConfirmButton: false,
                    timer: 800
                })
            }
        })

    }

    return (
        <Fragment>
            <div className={`shopping-cart ${Styles.minHeight}`} >
                <h2>ตระกร้าสินค้า</h2>
                <div className="shopping-cart-column" >
                    <div className="column-list-left">
                        <table>
                            <thead>
                                <tr className="head-table">
                                    <th style={{ width: '100%' }}>รายการสินค้า</th>
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
                                                        <img 
                                                        src={`${apiUrl}${data.productImg}`} 
                                                        alt="image-product"
                                                       
                                                        />
                                                        <div className="column-text">
                                                            <h4>{data.productName}</h4>
                                                            <p>{data.productContent}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="column-right" >
                                                        <p style={{ marginRight : '0px'}}>{data.productPrice}</p>
                                                        <button onClick={() => handleDeleteItem(data.productCode)}><i className="fa-regular fa-trash-can" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                    : null
                                }
                            </tbody>
                        </table>
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
                                {cartList
                                    ? <>
                                        {cartList.map((data, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="column-left">
                                                        <div className="column-text">
                                                            <h4>{data.productName}</h4>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="column-right">
                                                        <p>{data.productPrice}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                    : null
                                }

                                <tr className="td-summary">
                                    <td>รวมราคาสินค้า</td>
                                    <td>{totalPrice}</td>
                                </tr>
                                <tr className="td-bottom">
                                    <td>รวมทั้งหมด</td>
                                    <td>{totalPrice}</td>
                                </tr>
                            </tbody></table>
                        <button onClick={() => handleCheckProduct()}>ชำระค่าสินค้าและบริการ</button>
                    </div>
                </div>
                <ContactUs />
            </div>
        </Fragment>
    )
}
