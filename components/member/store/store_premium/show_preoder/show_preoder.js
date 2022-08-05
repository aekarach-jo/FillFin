import React, { Fragment } from 'react'
import ChooseImage from '../../../../subComponent/manage-image/chooseImage'
import ShowImage from '../../../../subComponent/manage-image/showImage'
import st from '../../../../../styles/store/store.module.scss'

export default function Show_preoder({ preOrderList }) {
    return (
        <Fragment>
            <div className="column-text-top">
                <h2>สินค้าจองล่วงหน้า (PRE-ORDER)</h2>
                <p>รายการสินค้าจองล่วงหน้า (PRE-ORDER) ทั้งหมด {preOrderList.length} รายการ</p>
            </div>
            {preOrderList.length > 0
                ? <>
                    <div className={`column-product-recommend ${st.box}`}>
                        {preOrderList?.map((data, index) => (
                            <div key={index} className="recommend-column">
                                <ShowImage image={data.product_img} />
                                <div className="column-img-bottom" style={{ display: 'flex', margin: '0.5rem 0' }}>
                                    <ChooseImage image={data.product_img} />
                                </div>
                                <div className={`column-text-bottom ${st.productAll}`}>
                                    <h4>{data.name}</h4>
                                    {data.clip != "no"
                                        ?
                                        <>
                                            <div className="column-gift">
                                                <img src="/assets/icons/icon-gift.png" alt="image-gift" />
                                                <span>มีคลิป</span>
                                            </div>
                                        </>
                                        : null
                                    }
                                    <p>{data.content_product}</p>
                                    {data.canbuy
                                        ? <button><i className="fa-solid fa-cart-shopping" />{data.price}</button>
                                        : <button style={{ cursor: "not-allowed" }} ><i className="fa-solid fa fa-eye-slash" aria-hidden="true" /></button>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </>
                : <div className="column-product-recommend" style={{ height: '0px', overflow: "hidden" }}>ไม่มีสินค้า PRE-ORDER</div>
            }
        </Fragment>
    )
}
