import { data } from 'autoprefixer';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import React, { Fragment } from 'react'
import Swal from 'sweetalert2';
import nextConfig from '../../../../next.config';
import ChooseImage from '../../../subComponent/manage-image/chooseImage';
import ShowImage from '../../../subComponent/manage-image/showImage';

const apiUrl = nextConfig.apiPath
export default function Store_member({ stores }) {
    const { all_product, pre_order, review, store_detail, store_post } = stores;

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
                title: 'เพิ่มแล้ว',
                icon: 'success',
                position: 'top-right',
                timer: 800
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
        console.log(getCart);
    }


    return (
        <Fragment>
            <div>
                <div className="detail-column-text-top">
                    <div className="column-text-top">
                        <div className="column-left">
                            <img src={`${apiUrl}/${store_detail.profile_img}`} />
                        </div>
                        <div className="column-right">
                            <h2>{store_detail.name}</h2>
                        </div>
                    </div>
                    <div className="column-text-bottom">
                        <h4>คอนเซ็ปร้าน</h4>
                        <p>{store_detail.concept}</p>
                    </div>
                    <div className="column-text-list">
                        <h2>รายการสินค้า</h2>
                        <p>รายการสินค้าทั้งหมด 25 รายการ</p>
                    </div>
                </div>
                <div className="column-list-product">
                    {all_product.length > 0
                        ?
                        <>
                            {all_product?.map((data, index) => (
                                <div key={index} className="column-list recommend-column">
                                    <ShowImage image={data.product_img} />
                                    <div className="column-img-bottom">
                                        <ChooseImage image={data.product_img} />
                                    </div>
                                    <div className="column-list-bottom">
                                        <h4>{data.name_product}</h4>
                                        <p>{data.content_product}</p>
                                        {data.canbuy
                                            ? <button style={{ cursor: "pointer" }} onClick={() => handleAddtoCard(data.product_code)}><i className="fa-solid fa-cart-shopping" />{data.price}</button>
                                            : <button style={{ cursor: "not-allowed" }}><i className="fa-solid fa fa-eye-slash" aria-hidden="true" /></button>
                                        }
                                    </div>
                                </div>
                            ))}
                        </>
                        : null
                    }


                </div>
                <div className="column-img-sale">
                    <img src="/assets/images/sale.png" />
                </div>
                <div className="column-menu-review">
                    <div className="menu-review">
                        <h3>รีวิวจากลูกค้า</h3>
                        <p>15 การรีวิว</p>
                    </div>
                    <div className="column-review">
                        <div className="column-review-left">
                            <i className="fa-solid fa-user" />
                        </div>
                        <div className="column-review-right">
                            <h3>Volutpat cras nunc neque sit facilisis.</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus, aenean a fermentum ullamcorper proin proin id et pellentesque. Quis sapien ultrices.</p>
                        </div>
                    </div>
                    <div className="column-review">
                        <div className="column-review-left">
                            <i className="fa-solid fa-user" />
                        </div>
                        <div className="column-review-right">
                            <h3>Volutpat cras nunc neque sit facilisis.</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus, aenean a fermentum ullamcorper proin proin id et pellentesque. Quis sapien ultrices.</p>
                        </div>
                    </div>
                    <div className="column-review">
                        <div className="column-review-left">
                            <i className="fa-solid fa-user" />
                        </div>
                        <div className="column-review-right">
                            <h3>Volutpat cras nunc neque sit facilisis.</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus, aenean a fermentum ullamcorper proin proin id et pellentesque. Quis sapien ultrices.</p>
                        </div>
                    </div>
                    <div className="column-review">
                        <div className="column-review-left">
                            <i className="fa-solid fa-user" />
                        </div>
                        <div className="column-review-right">
                            <h3>Volutpat cras nunc neque sit facilisis.</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus, aenean a fermentum ullamcorper proin proin id et pellentesque. Quis sapien ultrices.</p>
                        </div>
                    </div>
                    <div className="column-review">
                        <div className="column-review-left">
                            <i className="fa-solid fa-user" />
                        </div>
                        <div className="column-review-right">
                            <h3>Volutpat cras nunc neque sit facilisis.</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus, aenean a fermentum ullamcorper proin proin id et pellentesque. Quis sapien ultrices.</p>
                        </div>
                    </div>
                    <div className="column-review">
                        <div className="column-review-left">
                            <i className="fa-solid fa-user" />
                        </div>
                        <div className="column-review-right">
                            <h3>Volutpat cras nunc neque sit facilisis.</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus, aenean a fermentum ullamcorper proin proin id et pellentesque. Quis sapien ultrices.</p>
                        </div>
                    </div>
                    <div className="pagination">
                        <button><i className="fa-solid fa-angle-left" /></button>
                        <a href="#" className="active">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">4</a>
                        <a href="#">5</a>
                        <a href="#" className="center">...</a>
                        <a href="#">7</a>
                        <a href="#">8</a>
                        <a href="#">9</a>
                        <a href="#">10</a>
                        <button><i className="fa-solid fa-chevron-right" /></button>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}


