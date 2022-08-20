import axios from 'axios'
import { getCookie } from 'cookies-next'
import FormData from 'form-data'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import nextConfig from '../../../../next.config'
import ContactUs from '../../../subComponent/contactUs'

const apiUrl = nextConfig.apiPath
export default function PaymentSummary() {
    const router = useRouter()
    const [dropdownActiveBank, setDropdownActiveBank] = useState(false)
    const inputImage = useRef(null);

    // ข้อมูลแพ็กเกจ
    const [cartList, setCartList] = useState()
    const [totalPrice, setTotalPrice] = useState()
    const [netPrice, setNetPrice] = useState()


    // ฟอร์มรายละเอียดที่อยู่
    const [fullname, setFullname] = useState()
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()
    const [subDistrict, setSubDistrict] = useState()
    const [district, setDistrict] = useState()
    const [province, setProvince] = useState()
    const [postalCode, setPostalCode] = useState()
    const [note, setNote] = useState()
    const [image, setImage] = useState(null);
    const [bankList, setBankList] = useState([]);
    const [bank, setBank] = useState("");

    useEffect(() => {
        getCartList(),
            getBank()
    }, [])

    function inputImageOnChange(e) {
        if (!e.target.files.length) {
            return false;
        }
        if (
            ["image/jpeg", "iamge/jpg", "image/png", "image/webp"].includes(e.target.files[0].type)
        ) {
            const URLs = URL.createObjectURL(e.target.files[0]);
            setImage(URLs);
        } else {
            Swal.fire({
                title: "กรุณาอัปโหลดเฉพาะไฟล์รูปภาพ",
                icon: "warning",
                position: "center",
            });
        }
    }

    function popupShowImage(image) {
        Swal.fire({
            imageUrl: image,
            imageWidth: 400,
            imageHeight: 520,
            imageAlt: 'Custom image',
            showConfirmButton: false,
            background: 'rgba(0,0,0,0)',

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
        setNetPrice(getCart.data.netprice)
        setCartList(dataCart)
    }
    async function getBank() {
        const bankData = await fetch(`${apiUrl}/api/bank/get`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const bankJson = await bankData.json()
        setBankList(bankJson.data);
        setBank(bankJson.data[0])
    }

    function handleSend() {
        if (bank == "") {
            Swal.fire({
                icon: "warning",
                title: "กรุณาเลือกบัญชี",
            });
            return false;
        }
        if (!image) {
            Swal.fire({
                icon: "warning",
                title: "กรุณาอัปโหลดสลิป",
            });
            return false;
        }
        Swal.fire({
            position: 'center',
            icon: 'question',
            title: 'ยืนยันการชำระหรือไม่',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#C93A87',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            allowOutsideClick: false
        }).then((res) => {
            if (res.isConfirmed) {
                const formData = new FormData()
                // formData.append('totalprice', totalPrice)
                // formData.append('netprice', netPrice)
                formData.append('name', fullname)
                formData.append('address', address)
                formData.append('phone', phone)
                formData.append('district', district)
                formData.append('subdistrict', subDistrict)
                formData.append('province', province)
                formData.append('code', postalCode)
                formData.append('note', note)
                formData.append('bank_ref', bank.id)
                formData.append('image', inputImage.current.files[0])
                createOrder(formData)
            }
        })
    }

    async function createOrder(formData) {
        const access_token = getCookie("access_token")
        const apiCreateOrder = await axios({
            method: 'POST',
            url: `${apiUrl}/api/member/createOrder`,
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            data: formData
        }).then(res => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'ชำระสำเร็จ',
            }).then(() => {
                router.push(`/member/order`)
            })
        })
    }

    return (
        <Fragment>
            <div className="pay-summery">
                <div className="pay-summery-column">
                    <div className="text-top">
                        <h2>สรุปรายการชำระเงิน</h2>
                    </div>
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
                                <td>{netPrice}</td>
                            </tr>
                            <tr className="td-bottom">
                                <td>รวมทั้งหมด</td>
                                <td>{totalPrice}</td>
                            </tr>
                        </tbody></table>
                    <div className="column-informatin">
                        <div className="column-left">
                            <h2>ข้อมูลจัดส่ง</h2>
                            <form >
                                <div className="column-input">
                                    <label >*ชื่อ</label>
                                    <input
                                        type="text"
                                        defaultValue={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                    />
                                </div>
                                <div className="column-input">
                                    <label >*ที่อยู่</label>
                                    <textarea
                                        defaultValue={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="column-input">
                                    <label >*เบอร์โทร</label>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => {
                                            if (
                                                /^[0-9]+$/.test(
                                                    e.target.value.trim()
                                                ) || e.target.value == ""
                                            ) {
                                                setPhone(e.target.value.trim());
                                            }
                                        }}
                                        maxLength={10}
                                    />
                                </div>
                                <div className="column">
                                    <div className="column-input">
                                        <label >*ตำบล/แขวง</label>
                                        <input
                                            type="text"
                                            defaultValue={subDistrict}
                                            maxLength={20}
                                            onChange={(e) => setSubDistrict(e.target.value)}
                                        />
                                    </div>
                                    <div className="column-input">
                                        <label >*อำเภอ/เขต</label>
                                        <input
                                            type="text"
                                            defaultValue={district}
                                            maxLength={20}
                                            onChange={(e) => setDistrict(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="column-input">
                                        <label >*จังหวัด</label>
                                        <input
                                            type="text"
                                            defaultValue={province}
                                            maxLength={20}
                                            onChange={(e) => setProvince(e.target.value)}
                                        />
                                    </div>
                                    <div className="column-input">
                                        <label >*รหัสไปรษณีย์</label>
                                        <input
                                            type="text"
                                            maxLength={5}
                                            value={postalCode}
                                            onChange={(e) => {
                                                if (
                                                    /^[0-9]+$/.test(
                                                        e.target.value.trim()
                                                    ) || e.target.value == ""
                                                ) { setPostalCode(e.target.value.trim()) }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="column-input">
                                    <label >ข้อความฝากถึงผู้ขาย</label>
                                    <textarea
                                        maxLength={200}
                                        defaultValue={note}
                                        onChange={(e) => setNote(e.target.value)} />
                                </div>
                            </form>
                        </div>
                        <div className="column-right">
                            <h2>ชำระค่าสินค้าและบริการ</h2>
                            <form>
                                <div className="pay-dropdown">
                                    <div className="dropdown-toggle" onClick={() => setDropdownActiveBank(prev => !prev)}>
                                        <div className="dropdown-toggle-left">
                                            <Image src={`${apiUrl}/${bank.image}`} width={47} height={25} />
                                            {bank.bank_name} / {bank.bank_number} / {bank.name}
                                        </div>
                                        <div className="dropdown-toggle-right">
                                            <i className="fa-solid fa-angle-down" />
                                        </div>
                                    </div>
                                    <div className={`pay-dropdown-menu ${dropdownActiveBank && 'active'}`} id="pay-dropdown-menu">
                                        {bankList
                                            ?
                                            <>
                                                {bankList?.map((data, index) => (
                                                    <div key={index} className="dropdown-item" onClick={() => {
                                                        setDropdownActiveBank(prev => !prev)
                                                        setBank(data)
                                                    }
                                                    }>
                                                        <img src={`${apiUrl}/${data.image}`} alt="image-bankList" />
                                                        {data.bank_name} / {data.bank_number} / {data.name}
                                                    </div>
                                                ))}
                                            </>
                                            : <p>ไม่มีข้อมูล</p>
                                        }
                                    </div>
                                </div>
                                <div className="column-upload-slip">
                                    <div
                                        className="left"
                                        style={{ height: "auto", width: "200px" }}
                                    >
                                        {image ? (
                                            <img
                                                src={image}
                                                alt="image-slip"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain",
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => popupShowImage(image)}
                                            />
                                        ) : (
                                            <i className="fa-solid fa-image" />
                                        )}
                                        <input
                                            style={{ display: "none" }}
                                            type="file"
                                            accept=".jpeg,.jpg,.png"
                                            ref={inputImage}
                                            onChange={(e) => inputImageOnChange(e)}
                                        />
                                    </div>
                                    <div className="right">
                                        <h3>อัปโหลดสลิป</h3>
                                        <p>ขนาดอัปโหลดไฟล์ภาพ ไม่เกิน 5 Mb</p>
                                        <button type='button' onClick={() => inputImage.current.click()}>
                                            อัปโหลด
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <button onClick={() => handleSend()}>ส่ง</button>
                        </div>
                    </div>
                </div>
                <ContactUs />
            </div>
        </Fragment>
    )
}
