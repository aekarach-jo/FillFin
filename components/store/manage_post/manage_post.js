import axios from 'axios'
import { getCookie } from 'cookies-next'
import FormData from 'form-data'
import Image from 'next/image'
import React, { Fragment, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import nextConfig from '../../../next.config'
import moment from 'moment'

const apiUrl = nextConfig.apiPath
export default function Manage_post({ status }) {
    const inputFirstImage = useRef([])
    const inputSecondImage = useRef([])
    const inputThirdImage = useRef([])
    const inputFourthImage = useRef([])

    const [imageObj, setImageobj] = useState({})
    const [caption, setCaption] = useState("")
    const dateToday = useRef(new Date)

    function FormetDate({ dateTime }) {
        dateTime = moment().format("DD MMM YYYY");
        return <h4>{dateTime}</h4>
    }

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

        const formData = new FormData()
        formData.append("image", inputFirstImage.current.files[0])
        formData.append("image", inputSecondImage.current.files[0])
        formData.append("image", inputThirdImage.current.files[0])
        formData.append("image", inputFourthImage.current.files[0])
        formData.append("caption", caption)
        createPost(formData)
    }

    async function createPost(params) {
        const access_token = getCookie("access_token")
        const onCreate = await axios({
            method: 'POST',
            url: `${apiUrl}/api/store/post/create`,
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "multipart/form-data"
            },
            data: params
        })
        status()
        Swal.fire({
            title: "success",
            icon: "success",
            position: "center",
        }).then(() => {
            setCaption("")
            setImageobj("")
        })
    }

    return (
        <Fragment>
            <div className="head-text-column">
                <h2>เขียนโปรไฟล์ผู้ขาย</h2>
            </div>
            <div className="column-product-recommend">
                <div className="recommend-column">
                    <div className="column-calendar">
                        <img src="/assets/icons/icon-calendar.png" alt="image-calender" />
                        <FormetDate dateTime={dateToday} />
                    </div>
                    <div className="detail-text">
                    </div>
                    <div className="column-img">
                        {imageObj.first
                            ? (
                                <img
                                    style={{
                                        borderRadius: "10px",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        cursor: "pointer"
                                    }}
                                    alt="image-first"
                                    src={imageObj.first}
                                    onClick={() => inputFirstImage.current.click()}
                                />
                            ) : (
                                <div style={{ cursor: "pointer" }} className="bg-img" onClick={() => inputFirstImage.current.click()}>
                                    <i className="fa-regular fa-image"></i>
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
                                    src={imageObj.second}
                                    alt="image-second"
                                    style={{
                                        borderRadius: "10px",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => inputSecondImage.current.click()}
                                />
                            ) : (
                                <div style={{ cursor: "pointer" }} className="bg-img" onClick={() => inputSecondImage.current.click()}>
                                    <i className="fa-regular fa-image"></i>
                                </div>
                            )}
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            accept=".jpg,.jpeg,.png,.webp"
                            ref={inputSecondImage}
                            onChange={(e) => inputImageOnChange(e, "second")}
                        />
                        {imageObj.third
                            ? (
                                <img
                                    src={imageObj.third}
                                    alt="image-third"
                                    style={{
                                        borderRadius: "10px",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => inputThirdImage.current.click()}
                                />
                            ) : (
                                <div style={{ cursor: "pointer" }} className="bg-img" onClick={() => inputThirdImage.current.click()}>
                                    <i className="fa-regular fa-image"></i>
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
                                    style={{
                                        borderRadius: "10px",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => inputFourthImage.current.click()}
                                />
                            ) : (
                                <div style={{ cursor: "pointer" }} className="bg-img" onClick={() => inputFourthImage.current.click()}>
                                    <i className="fa-regular fa-image"></i>
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
                    <form>
                        <label>แคปชั่น (Caption)</label>
                        <textarea style={{ padding : '0.7rem'}} value={caption} onChange={(e) => setCaption(e.target.value)}></textarea>
                    </form>
                    <div className="column-button">
                        <button className="btn-left" onClick={() => handleClickCreateProduct()}>โพสต์</button>
                        <button className="btn-right">ยกเลิก</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
