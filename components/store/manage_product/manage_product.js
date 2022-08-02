import { getCookie } from 'cookies-next'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import axios from "axios";
import FormData from "form-data";
import Swal from 'sweetalert2'
import nextConfig from '../../../next.config';
import st from '../../../styles/store/store.module.scss'

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
            ["image/jpeg", "iamge/jpg", "image/png", "image/webp"].includes(e.target.files[0].type)
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
        // if (inputFirstImage.current.value == "" ||
        //     inputSecondImage.current.value == "" ||
        //     inputThirdImage.current.value == "" ||
        //     inputFourthImage.current.value == "") {
        //     Swal.fire({
        //         title: "กรุณาเพิ่มรูปภาพให้ครบ",
        //         icon: "warning",
        //         position: "center",
        //         timer: 1000,
        //         showConfirmButton: false
        //     });
        //     return false;
        // }

        // Swal.fire({
        //     title: "success",
        //     icon: "success",
        //     position: "center",
        // });
        const formData = new FormData()
        formData.append("standard", inputFirstImage.current.files[0])
        formData.append("standard", inputSecondImage.current.files[0])
        formData.append("premium", inputThirdImage.current.files[0])
        formData.append("premium", inputFourthImage.current.files[0])
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
        setEmptyForm()
    }

    function setEmptyForm() {
        setImageobj({})
        setNameMember('')
        setNamePremium('')
        setContentMember('')
        setContentPremium('')
        setPriceStandard('')
        setPricePremium('')
        setClip('')
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
                    <div className={`column-images ${st.colImage}`}>
                        <div className={`left ${st.boxImage}`}>
                            {imageObj.first
                                ? (
                                    <img
                                        className={st.manage_image}
                                        alt="image-first"
                                        src={imageObj.first}
                                        onClick={() => inputFirstImage.current.click()}
                                    />
                                ) : (
                                    <div onClick={() => inputFirstImage.current.click()}>
                                        <i className={`fa-regular fa-image ${st.iconEmpty}`} ></i>
                                    </div>
                                )}
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                accept=".jpg,.jpeg,.png,.webp"
                                ref={inputFirstImage}
                                onChange={(e) => inputImageOnChange(e, "first")}
                            />
                            {imageObj.second
                                ? (
                                    <img
                                        className={st.manage_image}
                                        src={imageObj.second}
                                        alt="image-second"
                                        onClick={() => inputSecondImage.current.click()}
                                    />
                                ) : (
                                    <div onClick={() => inputSecondImage.current.click()}>
                                        <i className={`fa-regular fa-image ${st.iconEmpty}`} ></i>
                                    </div>
                                )}
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                accept=".jpg,.jpeg,.png,.webp"
                                ref={inputSecondImage}
                                onChange={(e) => inputImageOnChange(e, "second")}
                            />
                        </div>
                        <div className="right" style={{ marginTop :"1rem" }}>
                            <div className="column-input" style={{ maxWidth:'246px'}}>
                                <div className="column-label">
                                    <label >ราคา</label>
                                    <label >BTH</label>
                                </div>
                                <input type="text"
                                    value={priceStandard}
                                    maxLength={10}
                                    onChange={(e) => {
                                        if (
                                            /^[0-9]+$/.test(e.target.value) ||
                                            e.target.value == ""
                                        ) { setPriceStandard(e.target.value) }
                                    }} />
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
                                maxLength={50}
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
                    <div className={`column-images ${st.colImage}`}>
                        <div className={`left ${st.boxImage}`}>
                            {imageObj.third
                                ? (
                                    <img
                                        src={imageObj.third}
                                        alt="image-third"
                                        className={st.manage_image}
                                        onClick={() => inputThirdImage.current.click()}
                                    />
                                ) : (
                                    <div onClick={() => inputThirdImage.current.click()}>
                                        <i className={`fa-regular fa-image ${st.iconEmpty}`} ></i>
                                    </div>
                                )}
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                accept=".jpg,.jpeg,.png,.webp"
                                ref={inputThirdImage}
                                onChange={(e) => inputImageOnChange(e, "third")}
                            />
                            {imageObj.fourth
                                ? (
                                    <img
                                        src={imageObj.fourth}
                                        alt="image-fourth"
                                        className={st.manage_image}
                                        onClick={() => inputFourthImage.current.click()}
                                    />
                                ) : (
                                    <div onClick={() => inputFourthImage.current.click()}>
                                        <i className={`fa-regular fa-image ${st.iconEmpty}`} ></i>
                                    </div>
                                )}
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                accept=".jpg,.jpeg,.png,.webp"
                                ref={inputFourthImage}
                                onChange={(e) => inputImageOnChange(e, "fourth")}
                            />
                        </div>
                        <div className="right"style={{ marginTop :"1rem" }}>
                            <div className="column-input" style={{ maxWidth : '246px'}}>
                                <div className="column-label">
                                    <label >ราคา</label>
                                    <label >BTH</label>
                                </div>
                                <input
                                    type="text"
                                    value={pricePremium}
                                    maxLength={10}
                                    onChange={(e) => {
                                        if (
                                            /^[0-9]+$/.test(e.target.value) ||
                                            e.target.value == ""
                                        ) { setPricePremium(e.target.value) }
                                    }} />
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
                                maxLength={50}
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
