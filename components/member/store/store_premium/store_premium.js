import Image from 'next/image';
import React, { Fragment } from 'react';
import nextConfig from '../../../../next.config';
import ContactAdmin from '../../../subComponent/contactAdmin';
import Show_post from './show_post/show_post';
import Show_preoder from './show_preoder/show_preoder';
import Show_product from './show_product/show_product';
import { useAppContext } from '../../../../config/state';
import st from '../../../../styles/product/premium.module.scss'
const apiUrl = nextConfig.apiPath

export default function Store_premium({ stores, qrCode, statusChange }) {
    const state = useAppContext()
    const { all_product, pre_order, review, store_detail, store_post } = stores;
    const isStore = state.isStore.get_isStore
    console.log(review)
    return (
        <Fragment>
            <div className="stone-premiem">
                <div className={`premiem-column-left ${st.contentCol}`}>
                    <div className="column-text-top">
                        <div className="column-text-left">
                            <Image width={100} height={100} src={`${apiUrl}/${store_detail.profile_img}`} />
                        </div>
                        <div className="column-text-right" >
                            <h2>{store_detail.name}</h2>
                            <div className="column-text">
                                <div className="text-left">
                                    <p>อายุ : {store_detail.age}</p>
                                    <p>สัดส่วน BWH : {store_detail.bwh}</p>
                                </div>
                                <div className="text-right">
                                    <p>น้ำหนัก : {store_detail.weight} กก.</p>
                                    <p>ส่วนสูง : {store_detail.height} ชม.</p>
                                </div>
                                {isStore &&
                                    <div >
                                        <button className={st.backToStore} onClick={() => statusChange(true)}>
                                            <i className="fa-regular fa-eye" />
                                            ดูมุมมองร้านค้า
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="column-text-center">
                        <h3>คอนเซ็ปต์ร้าน</h3>
                        <p>{store_detail.concept}</p>
                    </div>
                    {store_detail.profile_video &&
                        <video
                            className="video"
                            style={{ width: '100%' }}
                            controls
                            muted
                            autoPlay
                            src={`${apiUrl}/streaming/${store_detail.profile_video}`}
                            poster='/assets/images/product.png'
                        />
                    }
                    <div className="column-box-product" >
                        <Show_post postList={store_post} />
                    </div>
                </div>
                <div className={`premiem-column-right ${st.contentCol}`}>
                    <div className="column-box-product">
                        <Show_product productList={all_product} />
                    </div>
                    <div className="column-box-product">
                        <Show_preoder preOrderList={pre_order} />
                    </div>
                    <div className={`column-menu-review ${st.colReview}`}>
                        <div className="menu-review">
                            <h3>รีวิวจากลูกค้า</h3>
                            <p>{review.length} การรีวิว</p>
                        </div>
                        {review?.map((data, index) => (
                            <div key={index} className={st.contentHeight}>
                                <div className="column-review">
                                    <div className="column-review-left">
                                        <i className="fa-solid fa-user" />
                                    </div>
                                    <div className="column-review-right">
                                        <h3>{data.memberName}</h3>
                                        <p>{data.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ContactAdmin qrCode={qrCode} />
        </Fragment>
    )
}
