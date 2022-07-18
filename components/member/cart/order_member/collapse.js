import { Fragment, useEffect, useRef, useState } from "react";
import nextConfig from "../../../../next.config";

const apiUrl = nextConfig.apiPath

export default function ProductList({ productList, orderDetail, qty }) {
    const rootRef = useRef(null);
    const { isCollapse, onCollapse } = UseCollapse(rootRef);
    return (
        <Fragment>
            {productList
                ?
                <div className="column-list-detail">
                    <div ref={rootRef} style={{ overflow: "hidden", transition: "height 0.3s" }}>
                        {productList?.map((data, index) => (
                            <div key={index}>
                                <div className="column-text-detail" >
                                    <div className="column-left" >
                                        <div className="img-left">
                                            <img src={`${apiUrl}${data.product_image}`} alt="image-productList" />
                                        </div>
                                        <div className="text-right">
                                            <h4>{data.product_name}</h4>
                                            <p>{data.product_content}</p>
                                        </div>
                                    </div>
                                    <div className="column-center">
                                        <p>{data.price}</p>
                                    </div>
                                    <div className="column-right">
                                        {data.product_status == 'pending'
                                            ? <p>เตรียมจัดส่ง</p>
                                            : <p>จัดส่งแล้ว</p>
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
                                        <i class="fa-solid fa-angle-down" style={{ marginRight: '0.5rem' }}> </i>
                                        แสดงรายการ
                                    </>
                                    : <>
                                        <i class="fa-solid fa-angle-up" style={{ marginRight: '0.5rem' }}> </i>
                                        ซ่อนรายการ
                                    </>
                                }

                            </button>
                            : false
                        }
                    </div>
                    <div className="column-address-bottom">
                        <div className="column-address">ข้อมูลจัดส่ง</div>
                        <div className="column-address">
                            <h4>ชื่อ-นามสกุล</h4>
                            <p>{orderDetail.name}</p>
                        </div>
                        <div className="column-address center">
                            <h4>ที่อยู่</h4>
                            <p>{orderDetail.address}</p>
                        </div>
                        <div className="column-address">
                            <h4>เบอร์โทร</h4>
                            <p>{orderDetail.phone}</p>
                        </div>
                        <div className="column-address">
                            <h4>หมายเหตุ</h4>
                            <p>{orderDetail.note}</p>
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
            setIsCollapse(true);
        } else {
            _root.style.height = _root.getAttribute("data-styleHeight");
            setIsCollapse(false);
        }
    }

    return { isCollapse, onCollapse };
}
