import React, { Fragment } from 'react'
import ChooseImage from '../../../../subComponent/manage-image/chooseImage'
import ShowImage from '../../../../subComponent/manage-image/showImage'

export default function Show_preoder({ preOrderList }) {
    return (
        <Fragment>
            <div className="column-text-top">
                <h2>สินค้าสั่งจองล่วงหน้า (PRE-ORDER)</h2>
                <p>รายการสินค้าสั่งจองล่วงหน้า (PRE-ORDER) ทั้งหมด 25 รายการ</p>
            </div>
            <div className="column-product-recommend">
                {preOrderList?.map((data, index) => (
                    <div key={index} className="recommend-column">
                        <ShowImage image={data.product_img} />
                        <div className="column-img-bottom">
                            <ChooseImage image={data.product_img} />
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
                                ? <button><i className="fa-solid fa-cart-shopping" />{data.price}</button>
                                : <button style={{ cursor: "not-allowed" }} ><i className="fa-solid fa fa-eye-slash" aria-hidden="true" /></button>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
    )
}
