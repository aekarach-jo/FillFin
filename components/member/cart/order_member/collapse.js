import { Rating, Stack } from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Fragment, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import nextConfig from "../../../../next.config";
import st from '../../../../styles/orderMember.module.scss'

const apiUrl = nextConfig.apiPath

export default function ProductList({ productList, orderDetail, qty, getAllProduct }) {
    const rootRef = useRef(null);
    const { isCollapse, onCollapse } = UseCollapse(rootRef);

    function onReview(data, e, orderNumber) {
        Swal.fire({
            imageUrl: apiUrl + data.product_image,
            imageWidth: 300,
            imageHeight: 350,
            imageAlt: 'Custom image',
            title: 'รีวิวสินค้า',
            text: data.product_name,
            html: `<textarea class="border-2" type="text" style="padding: 0.7rem ;border-radius: 10px ; width: 70%" id="message"/>`,
            showCancelButton: true,
            confirmButtonText: 'รีวิว',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: "#ffb300",
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
            preConfirm: () => {
                if (document.getElementById("message").value.trim() == "") {
                    return false;
                }
                return document.getElementById("message").value.trim()
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const formReview = {
                    productId: parseInt(data.product_id),
                    message: result.value,
                    orderNumber: orderNumber,
                    star: parseInt(e.target.value)
                }
                apiCreateReview(formReview)
            } else {
                return false;
            }
        })
    }

    async function apiCreateReview(formReview) {
        getAllProduct()
        console.log(formReview);
        const access_token = getCookie('access_token')
        const apiCreate = await axios({
            method: 'POST',
            url: `${apiUrl}/api/member/order/review`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            data: formReview
        }).then(() => {
            Swal.fire('', 'รีวิวแล้ว', 'success')
            getAllProduct()
        })
    }


    return (
        <Fragment>
            {productList
                ?
                <div className="column-list-detail">
                    <div ref={rootRef} style={{ overflow: "hidden", transition: "height 0.3s" }}>
                        {productList?.map((data, index) => (
                            <div key={index}>
                                <div className="column-text-detail">
                                    <div className="column-left">
                                        <div className="img-left">
                                            <img src={`${apiUrl}${data.product_image}`} alt="image-productList" />
                                        </div>
                                        <div className="text-right">
                                            <h4>{data.product_name}</h4>
                                            <p >{data.product_content}</p>
                                        </div>
                                    </div>
                                    
                                        <div className="column-center">
                                            <p style={{ textAlign : 'center' ,margin : '1rem'}} >{data.price}</p>
                                        </div>
                                        <div className="column-right">
                                            {data.product_status == 'pending' &&
                                                <p >เตรียมจัดส่ง</p>
                                            }
                                            {data.product_status == 'shipping' &&
                                                <p >กำลังจัดส่ง</p>
                                            }
                                            {data.product_status == 'success' &&
                                                <div className={st.rating}>
                                                    <p style={{ textAlign : 'center' ,margin : '1rem'}}>จัดส่งแล้ว</p>
                                                    <Stack spacing={1}>
                                                        <Rating name="size-medium" defaultValue={0} onClick={(e) => onReview(data, e, orderDetail.orderNumber)} />
                                                    </Stack>
                                                </div>
                                            }
                                            {data.product_status == 'accepted' &&
                                                <p>ได้รับสินค้าแล้ว</p>
                                            }
                                        </div>
                                 
                                </div>
                            </div>
                        ))
                        }
                    </div>
                    <div className="column-none-list" id="btn-list">
                        {qty > 1
                            ? <button onClick={onCollapse}>
                                {isCollapse
                                    ? <>
                                        <i className="fa-solid fa-angle-down" style={{ marginRight: '0.5rem' }}> </i>
                                        แสดงรายการ
                                    </>
                                    : <>
                                        <i className="fa-solid fa-angle-up" style={{ marginRight: '0.5rem' }}> </i>
                                        ซ่อนรายการ
                                    </>
                                }

                            </button>
                            : false
                        }
                    </div>
                    <div className={st.footerAddress}>
                    <p>ข้อมูลจัดส่ง</p>
                        <div className="column-address">
                            <p>ชื่อ-นามสกุล</p>
                            <p>{orderDetail.name}</p>
                        </div>
                        <div className="column-address ">
                            <p>ที่อยู่</p>
                            <p>{orderDetail.address}</p>
                        </div>
                        <div className="column-address">
                            <p>เบอร์โทร</p>
                            <p>{orderDetail.phone}</p>
                        </div>
                        <div className="column-address" style={{ maxWidth: '13rem', wordBreak: 'break-word', overflow: 'hidden' }}>
                            <p>หมายเหตุ</p>
                            <p className={st.textContent}>{orderDetail.note}</p>
                        </div>
                    </div>

                </div>
                : <p style={{ marginLeft: 'auto', marginRight: 'auto' }}>ไม่พบสินค้า</p>
            }
        </Fragment>
    );
}


function UseCollapse(root) {
    const [isCollapse, setIsCollapse] = useState(false);

    useEffect(() => {
        root.current.style.height = root.current.getBoundingClientRect().height + "px";
    }, []);

    function onCollapse(e) {
        const _root = root.current;
        const rootStyle = _root.getBoundingClientRect();
        const child = _root.firstElementChild;
        const childStyle = child.getBoundingClientRect();

        if (!_root.getAttribute("data-styleHeight"))
            _root.setAttribute("data-styleHeight", rootStyle.height + 'px');

        if (rootStyle.height != childStyle.height) {
            _root.style.height = childStyle.height + 'px';
            setIsCollapse(!isCollapse);
        } else {
            _root.style.height = _root.getAttribute("data-styleHeight");
            setIsCollapse(!isCollapse);
        }
    }

    return { isCollapse, onCollapse };
}



{/* <Fragment>
            {productList
                ?
                <div className="column-list-detail">
                    <div ref={rootRef} style={{ overflow: "hidden", transition: "height 0.3s" }}>
                        {productList?.map((data, index) => (
                            <div key={index}>
                                <div className={`${st.productLayout} ${data.length != 1 && `border-b-2`}`} >
                                    <div className={`${st.colLeft}`}>
                                        <div className={st.img_left}>
                                            <img src={`${apiUrl}${data.product_image}`} alt="image-productList" />
                                        </div>
                                        <div className={`${st.text_right}`}>
                                            <h4>{data.product_name}</h4>
                                            <p>{data.product_content}</p>
                                        </div>
                                    </div>
                                    <div className={st.colGroup}>
                                        <div className={st.colCenter}>
                                            <p className={st.price}>{data.price}</p>
                                        </div>
                                        <div className={`${st.column_right}`}>
                                            {data.product_status == 'pending' &&
                                                <p >เตรียมจัดส่ง</p>
                                            }
                                            {data.product_status == 'shipping' &&
                                                <p >กำลังจัดส่ง</p>
                                            }
                                            {data.product_status == 'success' &&
                                                <div className={st.rating}>
                                                    <p>จัดส่งแล้ว</p>
                                                    <Stack spacing={1}>
                                                        <Rating name="size-medium" defaultValue={0} onClick={(e) => onReview(data, e, orderDetail.orderNumber)} />
                                                    </Stack>
                                                </div>
                                            }
                                            {data.product_status == 'accepted' &&
                                                <p>ได้รับสินค้าแล้ว</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                    <div className="column-none-list" id="btn-list">
                        {qty > 1
                            ? <button onClick={onCollapse}>
                                {isCollapse
                                    ? <>
                                        <i className="fa-solid fa-angle-down" style={{ marginRight: '0.5rem' }}> </i>
                                        แสดงรายการ
                                    </>
                                    : <>
                                        <i className="fa-solid fa-angle-up" style={{ marginRight: '0.5rem' }}> </i> 
ซ่อนรายการ
                                    </>
                                }

                            </button >
                            : false
                        }
                    </div >
    <div className={st.footerAddress}>
        <h3>ข้อมูลจัดส่ง</h3>
        <div className="column-address">
            <h4>ชื่อ-นามสกุล</h4>
            <p>{orderDetail.name}</p>
        </div>
        <div className="column-address ">
            <h4>ที่อยู่</h4>
            <p>{orderDetail.address}</p>
        </div>
        <div className="column-address">
            <h4>เบอร์โทร</h4>
            <p>{orderDetail.phone}</p>
        </div>
        <div className="column-address" style={{ maxWidth: '13rem', wordBreak: 'break-word', overflow: 'hidden' }}>
            <h4>หมายเหตุ</h4>
            <p className={st.textContent}>{orderDetail.note}</p>
        </div>
    </div>

                </div >
                : <p style={{ marginLeft: 'auto', marginRight: 'auto' }}>ไม่พบสินค้า</p>
            }
        </Fragment >*/}