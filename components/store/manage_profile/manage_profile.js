import axios from 'axios'
import { getCookie } from 'cookies-next'
import FormData from 'form-data'
import Image from 'next/image'
import React, { Fragment, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import nextConfig from '../../../next.config'

const apiUrl = nextConfig.apiPath
export default function Manage_profile({ status }) {
    const inputFirstImage = useRef([])
    const inputSecondImage = useRef([])
    const inputThirdImage = useRef([])
    const inputFourthImage = useRef([])

    const [imageObj, setImageobj] = useState({})
    const [caption, setCaption] = useState()

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

        const formData = new FormData()
        formData.append("image", inputFirstImage.current.files[0])
        formData.append("image", inputSecondImage.current.files[0])
        formData.append("image", inputThirdImage.current.files[0])
        formData.append("image", inputFourthImage.current.files[0])
        formData.append("caption", caption)
        createPost(formData)
    }

    async function createPost(params) {
        try {
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
            console.log(onCreate)
            Swal.fire({
                title: "success",
                icon: "success",
                position: "center",
            });
            status()
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <Fragment>
            <div className="head-text-column">
                <h2>เขียนโปรไฟล์ผู้ขาย</h2>
            </div>
            <div className="column-product-recommend">
                <div className="recommend-column">
                    <div className="column-calendar">
                        <img src="/assets/icons/icon-calendar.png" />
                        <h4>16 June 2023</h4>
                    </div>
                    <div className="detail-text">
                    </div>
                    <div className="column-img">
                        {imageObj.first
                            ? (
                                <img
                                    // width={350}
                                    // height={400}
                                    src={imageObj.first}
                                    // style={{
                                    //     borderRadius: "20px",
                                    //     width: "100%",
                                    //     height: "100%",
                                    //     objectFit: "cover",
                                    //     cursor: "pointer"
                                    // }}
                                    onClick={() => inputFirstImage.current.click()}
                                />
                            ) : (
                                <img
                                    src="/assets/images/empty.png"
                                    alt=""
                                    style={{ cursor: "pointer" }}
                                    onClick={() => inputFirstImage.current.click()}
                                />
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
                                    // width={350}
                                    // height={400}
                                    src={imageObj.second}
                                    // style={{
                                    //     borderRadius: "20px",
                                    //     width: "100%",
                                    //     height: "100%",
                                    //     objectFit: "cover",
                                    //     cursor: "pointer"
                                    // }}
                                    onClick={() => inputSecondImage.current.click()}
                                />
                            ) : (
                                <img
                                    src="/assets/images/empty.png"
                                    alt=""
                                    style={{ cursor: "pointer" }}
                                    onClick={() => inputSecondImage.current.click()}
                                />
                            )}
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            accept=".jpg,.jpeg,.png"
                            ref={inputSecondImage}
                            onChange={(e) => inputImageOnChange(e, "second")}
                        />
                        {imageObj.third
                            ? (
                                <img
                                    // width={350}
                                    // height={400}
                                    src={imageObj.third}
                                    // style={{
                                    //     borderRadius: "20px",
                                    //     width: "100%",
                                    //     height: "100%",
                                    //     objectFit: "cover",
                                    //     cursor: "pointer"
                                    // }}
                                    onClick={() => inputThirdImage.current.click()}
                                />
                            ) : (
                                <img
                                    src="/assets/images/empty.png"
                                    alt=""
                                    style={{ cursor: "pointer" }}
                                    onClick={() => inputThirdImage.current.click()}
                                />
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
                                    // width={350}
                                    // height={400}
                                    src={imageObj.fourth}
                                    // style={{
                                    //     borderRadius: "20px",
                                    //     width: "100%",
                                    //     height: "100%",
                                    //     objectFit: "cover",
                                    //     cursor: "pointer"
                                    // }}
                                    onClick={() => inputFourthImage.current.click()}
                                />
                            ) : (
                                <img
                                    src="/assets/images/empty.png"
                                    alt=""
                                    style={{ cursor: "pointer" }}
                                    onClick={() => inputFourthImage.current.click()}
                                />
                            )}
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            accept=".jpg,.jpeg,.png"
                            ref={inputFourthImage}
                            onChange={(e) => inputImageOnChange(e, "fourth")}
                        />
                    </div>
                    <form>
                        <label>แคปชั่น (Caption)</label>
                        <textarea onChange={(e) => setCaption(e.target.value)}></textarea>
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
