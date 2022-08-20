import axios from 'axios';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import React, { Fragment } from 'react'
import Swal from 'sweetalert2';
import { useAppContext } from '../../../../../config/state';
import nextConfig from '../../../../../next.config';
import ContactUs from '../../../../subComponent/contactUs';
import ChooseImage from '../../../../subComponent/manage-image/chooseImage'
import ShowImage from '../../../../subComponent/manage-image/showImage'
import st from '../../../../../styles/store/store.module.scss'
const apiUrl = nextConfig.apiPath
export default function Show_product({ productList }) {
    console.log(productList)
    const state = useAppContext()

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

    async function handleAddtoCard(product_code) {
        const access_token = getCookie("access_token")
        const addProductToCart = await axios({
            method: 'GET',
            url: `${apiUrl}/api/member/cart/add/${product_code}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then((res) => {
            if (res.data.description == 'product was add to cart.') {
                Toast.fire({
                    icon: 'success',
                    title: 'เพิ่มแล้ว'
                })
                getCart()
            } else {
                Toast.fire({
                    icon: 'warning',
                    title: 'สินค้า' + res.data.productName + "มีในตะกร้าแล้ว"
                })
            }


        })
    }


    async function getCart() {
        const access_token = getCookie("access_token")
        const getCart = await axios({
            method: 'GET',
            url: `${apiUrl}/api/member/cart/get`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        const cartQty = getCart.data.cart.length
        if (cartQty > 0) {
            state.cartQty.set_cart_qty(cartQty)
        }
    }

    return (
        <Fragment>
            <div className="column-text-top">
                <h2>สินค้าทั้งหมด</h2>
                <p>รายการสินค้าทั้งหมด {productList.length} รายการ</p>
            </div>
            <div className={`column-product-recommend ${st.box}`} style={{ height: "100%" }}>
                {productList.length > 0
                    ? <>
                        {productList?.map((data, index) => (
                            <div key={index} className="recommend-column">
                                <Link href={`/member/store/product/${data.product_code}`} >
                                    <div>
                                        <ShowImage image={data.product_img} />
                                    </div>
                                </Link>
                                <div className="column-img-bottom" style={{ display: 'flex', margin: '0.5rem' }}>
                                    <ChooseImage image={data.product_img} />
                                </div>
                                <div className={`column-text-bottom ${st.productAll}`}>
                                    <h4>{data.name_product}</h4>
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
                                    {data.canbuy
                                        ? <button style={{ cursor: "pointer", }} onClick={() => handleAddtoCard(data.product_code)}><i className="fa-solid fa-cart-shopping" />{data.price}</button>
                                        : <button style={{ cursor: "not-allowed", }} ><i className="fa-solid fa fa-eye-slash" aria-hidden="true" /></button>
                                    }
                                </div>
                            </div>
                        ))}
                    </>
                    : <div className="column-product-recommend" style={{ height: '0px', overflow: "hidden" }}>ไม่มีสินค้า</div>
                }
            </div>
            <ContactUs />
        </Fragment>
    )
}
