import axios from 'axios';
import { getCookie } from 'cookies-next';
import React, { Fragment } from 'react'
import Swal from 'sweetalert2';
import nextConfig from '../../../../../next.config';
import ChooseImage from '../../../../subComponent/manage-image/chooseImage'
import ShowImage from '../../../../subComponent/manage-image/showImage'

const apiUrl = nextConfig.apiPath
export default function Show_product({ productList }) {

    async function handleAddtoCard(product_code) {
        console.log(product_code);
        const access_token = getCookie("access_token")
        const addProductToCart = await axios({
            method: 'GET',
            url: `${apiUrl}/api/product/addToCart/${product_code}`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(() => {
            Swal.fire({
                title : 'เพิ่มแล้ว',
                icon : 'success',
                position : 'top-right',
                timer : 800
            })
            getCart()
        })
    }

    async function getCart() {
        const access_token = getCookie("access_token")
        const getCart = await axios({
            method: 'GET',
            url: `${apiUrl}/api/product/getCart`,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        console.log(getCart.data.cart);
    }



    return (
        <Fragment>
            <div className="column-text-top">
                <h2>สินค้าทั้งหมด</h2>
                <p>รายการสินค้าทั้งหมด 25 รายการ</p>
            </div>
            <div className="column-product-recommend">
                {productList.length > 0
                    ? <>{productList?.map((data, index) => (
                        <div key={index} className="recommend-column">
                            <ShowImage image={data.product_img} />
                            <div className="column-img-bottom">
                                <ChooseImage image={data.product_img} />
                                <p>{data.product_image}</p>
                            </div>
                            <div className="column-text-bottom">
                                <h4>{data.name_product}</h4>
                                <div className="column-gift">
                                    {data.show_gift != "no"
                                        ?
                                        <>
                                            <img src="/assets/icons/icon-gift.png" />
                                            <span>มีคลิป</span>
                                        </>
                                        : null
                                    }
                                </div>
                                <p>{data.content_product}</p>
                                {data.canbuy
                                    ? <button style={{ cursor: "pointer" }} onClick={() => handleAddtoCard(data.product_code)}><i className="fa-solid fa-cart-shopping" />{data.price}</button>
                                    : <button style={{ cursor: "not-allowed" }} ><i className="fa-solid fa fa-eye-slash" aria-hidden="true" /></button>
                                }
                            </div>
                        </div>
                    ))}
                    </>
                    : <p>ไม่มีสินค้า</p>
                }
            </div>
        </Fragment>
    )
}
