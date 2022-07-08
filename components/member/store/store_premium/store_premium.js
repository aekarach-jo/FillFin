import { setCookies } from 'cookies-next';
import Image from 'next/image';
import React, { Fragment } from 'react'
import nextConfig from '../../../../next.config';
import Show_post from './show_post/show_post';
import Show_preoder from './show_preoder/show_preoder';
import Show_product from './show_product/show_product';

const apiUrl = nextConfig.apiPath
export default function Store_premium({ stores }) {
    const { all_product, pre_order, review, store_detail, store_post } = stores;

    return (
        <Fragment>
            <div className="stone-premiem">
                <div className="premiem-column-left">
                    <div className="column-text-top">
                        <div className="column-text-left">
                        <Image width={100} height={100} src={`${apiUrl}/${store_detail.profile_img}`} />
                        </div>
                        <div className="column-text-right">
                            <h2>{store_detail.name}</h2>
                            <div className="column-text">
                                <div className="text-left">
                                    <p>{store_detail.age}</p>
                                    <p>{store_detail.bwh}</p>
                                </div>
                                <div className="text-right">
                                    <p>{store_detail.weight}</p>
                                    <p>{store_detail.height}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {store_detail.standard
                        ? <button onClick={() => statusChange(true)}>Back to store view</button>
                        : null
                    }
                    <div className="column-text-center">
                        <h3>คอนเซ็ปร้าน</h3>
                        <p>{store_detail.concept}</p>
                    </div>
                    {/* <iframe src={"https://www.youtube.com/embed/CUfPYWtydgk"} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                     <video
                        style={{ width : '100%'}}
                        controls
                        muted
                        autoPlay
                        src={`http://192.168.1.51:3000/video/AWAKENING_NEWZEALAND.mp4`}
                        // poster='/assets/images/sale.png'
                        
                    />
                    <div className="column-box-product">
                        <Show_post postList={store_post} />
                    </div>
                </div>
                <div className="premiem-column-right">
                    <div className="column-box-product">
                        <Show_product productList={all_product} />
                    </div>
                    <div className="column-box-product">
                        <Show_preoder preOrderList={pre_order} />
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
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
