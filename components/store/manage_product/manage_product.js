import { getCookie } from 'cookies-next'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import axios from "axios";
import FormData from "form-data";
import Swal from 'sweetalert2'
import Image from 'next/image'
import nextConfig from '../../../next.config';

const apiUrl = nextConfig.apiPath

export default function Manage_product({ status }) {
    const inputFirstImage = useRef([])
    const inputSecondImage = useRef([])
    const inputThirdImage = useRef([])
    const inputFourthImage = useRef([])

    const [imageObj, setImageobj] = useState({})

    const [nameMember, setNameMember] = useState("")
    const [namePremium, setNamePremium] = useState("")
    const [contentMember, setContentMember] = useState("")
    const [contentPremium, setContentPremium] = useState("")
    const [priceStandard, setPriceStandard] = useState("")
    const [pricePremium, setPricePremium] = useState("")
    const [clip, setClip] = useState("no")

    function inputImageOnChange(e, name) {
        if (!e.target.files.length) {
            return false;
        }
        if (
            ["image/jpeg", "iamge/jpg", "image/png"].includes(e.target.files[0].type)
        ) {
            const URLs = URL.createObjectURL(e.target.files[0]);
            setImageobj(prev => ({
                ...prev,
                [name]: URLs
            }));
        } else {
            Swal.fire({
                title: "กรุณาอัปโหลดเฉพาะไฟล์รูปภาพ",
                icon: "warning",
                position: "center",
                timer: 1000,
                showConfirmButton: false
            });
        }
    }


    function handleClickCreateProduct() {
        if (inputFirstImage.current.value == "" ||
            inputSecondImage.current.value == "" ||
            inputThirdImage.current.value == "" ||
            inputFourthImage.current.value == "") {
            Swal.fire({
                title: "กรุณาเพิ่มรูปภาพให้ครบ",
                icon: "warning",
                position: "center",
                timer: 1000,
                showConfirmButton: false
            });
            return false;
        }

        Swal.fire({
            title: "success",
            icon: "success",
            position: "center",
        });
        const formData = new FormData()
        formData.append("image", inputFirstImage.current.files[0])
        formData.append("image", inputSecondImage.current.files[0])
        formData.append("image", inputThirdImage.current.files[0])
        formData.append("image", inputFourthImage.current.files[0])
        formData.append("name_member", nameMember)
        formData.append("content_member", contentMember)
        formData.append("name_premium", namePremium)
        formData.append("content_premium", contentPremium)
        formData.append("clip", clip)
        formData.append("price_standard", priceStandard)
        formData.append("price_premium", pricePremium)
        createProduct(formData)
    }
    async function createProduct(params) {
        const access_token = getCookie("access_token")
        const onCreate = await axios({
            method: 'POST',
            url: `${apiUrl}/api/store/product/create`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "multipart/form-data"
            },
            data: params
        })
        status()
    }
    return (
        <Fragment>
            <div className="head-text-column">
                <h2>ลงสินค้า</h2>
                <p>สามารถส่งสินค้าได้ ทั้ง Member,Premium, Exclusive</p>
            </div>
            <div className="column-box">
                <div className="column-box-top">
                    <div className="column-text-top">
                        <i className="fa-solid fa-user" />
                        <h2>ข้อมูลส่วน Member ( จะแสดงในส่วน Premium ด้วย )</h2>
                    </div>
                    <div className="column-images">
                        <div className="left">
                            {imageObj.first
                                ? (
                                    <img
                                        src={imageObj.first}
                                        alt="image-first"
                                        style={{
                                            border: '1px solid #e7e7e7',
                                            borderRadius: "20px",
                                            width: "250px",
                                            height: "250px",
                                            objectFit: "cover",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => inputFirstImage.current.click()}
                                    />
                                ) : (
                                    <i className="fa-solid fa-image"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => inputFirstImage.current.click()} />
                                )}
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                accept=".jpg,.jpeg,.png"
                                ref={inputFirstImage}
                                onChange={(e) => inputImageOnChange(e, "first")}
                            />
                            {imageObj.second
                                ? (
                                    <img
                                        src={imageObj.second}
                                        alt="image-second"
                                        style={{
                                            border: '1px solid #e7e7e7',
                                            borderRadius: "20px",
                                            width: "250px",
                                            height: "250px",
                                            objectFit: "cover",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => inputSecondImage.current.click()}
                                    />
                                ) : (
                                    <i className="fa-solid fa-image"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => inputSecondImage.current.click()} />
                                )}
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                accept=".jpg,.jpeg,.png"
                                ref={inputSecondImage}
                                onChange={(e) => inputImageOnChange(e, "second")}
                            />
                        </div>
                        <div className="right">
                            <div className="column-input">
                                <div className="column-label">
                                    <label >ราคา</label>
                                    <label >BTH</label>
                                </div>
                                <input type="text"
                                    value={priceStandard}
                                    onChange={(e) => setPriceStandard(e.target.value)} />
                                <div className="text-bottom">
                                    <p>***หมายเหตุ รวมค่าส่ง</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form >
                        <div className="column-input">
                            <label >ชื่อสินค้า</label>
                            <input type="text"
                                value={nameMember}
                                onChange={(e) => setNameMember(e.target.value)} />
                        </div>
                        <div className="column-input">
                            <label >รายละเอียดสินค้า</label>
                            <textarea
                                maxLength={100}
                                value={contentMember}
                                onChange={(e) => setContentMember(e.target.value)} />
                        </div>
                    </form>
                </div>
                <div className="column-box-bottom">
                    <div className="column-text-top">
                        <i className="fa-solid fa-crown" />
                        <h2>ข้อมูลส่วน  Premiem, Exclusive (กรณีมีรูปอื่นนอกเหนือจากส่วน Member)</h2>
                    </div>
                    <div className="column-images">
                        <div className="left">
                            {imageObj.third
                                ? (
                                    <img
                                        src={imageObj.third}
                                        alt="image-third"
                                        style={{
                                            border: '1px solid #e7e7e7',
                                            borderRadius: "20px",
                                            width: "250px",
                                            height: "250px",
                                            objectFit: "cover",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => inputThirdImage.current.click()}
                                    />
                                ) : (
                                    <i className="fa-solid fa-image"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => inputThirdImage.current.click()} />
                                )}
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                accept=".jpg,.jpeg,.png"
                                ref={inputThirdImage}
                                onChange={(e) => inputImageOnChange(e, "third")}
                            />
                            {imageObj.fourth
                                ? (
                                    <img
                                        src={imageObj.fourth}
                                        alt="image-fourth"
                                        style={{
                                            border: '1px solid #e7e7e7',
                                            borderRadius: "20px",
                                            width: "250px",
                                            height: "250px",
                                            objectFit: "cover",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => inputFourthImage.current.click()}
                                    />
                                ) : (
                                    <i className="fa-solid fa-image"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => inputFourthImage.current.click()} />
                                )}
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                accept=".jpg,.jpeg,.png"
                                ref={inputFourthImage}
                                onChange={(e) => inputImageOnChange(e, "fourth")}
                            />
                        </div>
                        <div className="right">
                            <div className="column-input">
                                <div className="column-label">
                                    <label >ราคา</label>
                                    <label >BTH</label>
                                </div>
                                <input
                                    type="text"
                                    value={pricePremium}
                                    onChange={(e) => setPricePremium(e.target.value)} />
                                <div className="column-checkbox">
                                    <input className="check-input" type="checkbox" defaultValue={clip} onChange={() => setClip('yes')} />
                                    <label >มีคลิป</label>
                                </div>
                                <div className="text-bottom">
                                    <p>***หมายเหตุ รวมค่าส่ง รวมค่า GP 15%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form>
                        <div className="column-input">
                            <label >ชื่อสินค้า</label>
                            <input
                                type="text"
                                value={namePremium}
                                onChange={(e) => setNamePremium(e.target.value)}
                            />
                        </div>
                        <div className="column-input">
                            <label >รายละเอียดสินค้า</label>
                            <textarea
                                value={contentPremium}
                                onChange={(e) => setContentPremium(e.target.value)} />
                        </div>
                    </form>
                </div>
                <div className="column-button">
                    <button className="btn-left" onClick={() => handleClickCreateProduct()}>ลงสินค้า</button>
                    <button className="btn-right" onCancel={() => onCancel()} >ยกเลิก</button>
                </div>
            </div>
        </Fragment>
    )
}
