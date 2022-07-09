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

    const [cartList, setCartList] = useState()
    const [totalPrice, setTotalPrice] = useState()
    const [netPrice, setNetPrice] = useState()

    const [fullname, setFullname] = useState()
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()
    const [subDistrict, setSubDistrict] = useState()
    const [district, setDistrict] = useState()
    const [province, setProvince] = useState()
    const [postalCode, setPostalCode] = useState()
    const [note, setNote] = useState()

    const inputImage = useRef(null);
    const [image, setImage] = useState(null);
    const [bankList, setBankList] = useState([]);
    const [bank, setBank] = useState("");

    const [dropdownActiveBank, setDropdownActiveBank] = useState(false)

    useEffect(() => {
        getCartList(),
            getBank()
    }, [])

    function inputImageOnChange(e) {
        if (!e.target.files.length) {
            return false;
        }
        if (
            ["image/jpeg", "iamge/jpg", "image/png"].includes(e.target.files[0].type)
        ) {
            const URLs = URL.createObjectURL(e.target.files[0]);
            setImage(URLs);
        } else {
            Swal.fire({
                title: "กรุณาอัฟโหลดเฉพาะไฟล์รูปภาพ",
                icon: "warning",
                position: "center",
            });
        }
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
            console.log(getCart.data)
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
                title: "กรุณาอัฟโหลดสลิป",
            });
            return false;
        }
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'ยืนยันการชำระหรือไม่',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            allowOutsideClick: false
        }).then((res) => {
            if (res.isConfirmed) {
                const formData = new FormData()
                formData.append('totalprice', totalPrice)
                formData.append('netprice', netPrice)
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
                            <form >
                                <div className="column-input">
                                    <label >*ชื่อ</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setFullname(e.target.value)}
                                    />
                                </div>
                                <div className="column-input">
                                    <label >*ที่อยู่</label>
                                    <textarea
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="column-input">
                                    <label >*เบอร์โทร</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setPhone(e.target.value.trim())}
                                        maxLength={10}
                                    />
                                </div>
                                <div className="column">
                                    <div className="column-input">
                                        <label >*ตำบล/แขวง</label>
                                        <input
                                            type="text"
                                            onChange={(e) => setSubDistrict(e.target.value)}
                                        />
                                    </div>
                                    <div className="column-input">
                                        <label >*อำเภอ/เขต</label>
                                        <input
                                            type="text"
                                            onChange={(e) => setDistrict(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="column-input">
                                        <label >*จังหวัด</label>
                                        <input
                                            type="text"
                                            onChange={(e) => setProvince(e.target.value)}
                                        />
                                    </div>
                                    <div className="column-input">
                                        <label >*รหัสไปรษณีย์</label>
                                        <input
                                            type="text"
                                            onChange={(e) => setPostalCode(e.target.value.trim())}
                                        />
                                    </div>
                                </div>
                                <div className="column-input">
                                    <label >ข้อความฝากถึงผู้ขาย</label>
                                    <textarea onChange={(e) => setNote(e.target.value)} />
                                </div>
                            </form>
                        </div>
                        <div className="column-right">
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
                                                        <img src={`${apiUrl}/${data.image}`} />
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
                                        style={{ height: "300px", width: "230px" }}
                                    >
                                        {image ? (
                                            <img
                                                src={image}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain",
                                                }}
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
                                        <h3>อัฟโหลดสลิป</h3>
                                        <p>ขนาดอัฟโหลดไฟล์ภาพ ไม่เกิน 5 Mb</p>
                                        <button type='button' onClick={() => inputImage.current.click()}>
                                            อัฟโหลด
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
