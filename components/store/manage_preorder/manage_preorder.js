import axios from 'axios'
import { getCookie } from 'cookies-next'
import FormData from 'form-data'
import Image from 'next/image'
import React, { Fragment, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import nextConfig from '../../../next.config'

export default function Manage_preorder({ status }) {
    const inputFirstImage = useRef([])
    const inputSecondImage = useRef([])

    const [imageObj, setImageobj] = useState({})
    const [price, setPrice] = useState()
    const [clip, setClip] = useState('no')
    const [productName, setProductName] = useState()
    const [description, setDescription] = useState()

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

    function onCancel() {
        Swal.fire({
            title: 'ยกเลิกการลงสินค้า',
            icon: 'info',
            position: 'center',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            cancelButtonColor: 'red',
            showConfirmButton: true,
            confirmButtonText: 'ตกลง'
        }).then(res => { //ยังไม่ล้างข้อความ
            if (res.isConfirmed) {
                setImageobj(""),
                    setPrice(""),
                    setClip('no'),
                    setProductName(""),
                    setDescription("")
            }
        })
    }

    function handleClickCreatePost() {
        if (inputFirstImage.current.value == "" || inputSecondImage == "") {
            Swal.fire({
                position: 'center',
                icon: 'center',
                title: 'กรุณาเพิ่มรูปภาพให้ครบ',
                timer: 1000,
                showConfirmButton: false
            })
            return false;
        }

        const formData = new FormData()
        formData.append('image', inputFirstImage.current.files[0])
        formData.append('image', inputSecondImage.current.files[0])
        formData.append('name_premium', productName)
        formData.append('content_premium', description)
        formData.append('price_premium', price)
        formData.append('clip', clip)
        createPost(formData)
    }

    async function createPost(params) {
        try {
            const apiUrl = nextConfig.apiPath
            const access_token = getCookie('access_token')
            const onCreate = await axios({
                method: 'POST',
                url: `${apiUrl}/api/store/productPre/create`,
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
                <h2>ลงสินค้าจองล่วงหน้า (PRE-ORDER)</h2>
                <p>สามารถส่งสินค้าได้ ทั้ง Premiem, Exclusive </p>
            </div>
            <div className="column-box">
                <div className="column-box-bottom">
                    <div className="column-text-top">
                        <i className="fa-solid fa-clock" />
                        <h2>ลงสินค้า</h2>
                    </div>
                    <div className="column-images">
                        <div className="left">
                            {imageObj.first
                                ? (
                                    <Image
                                        width={500}
                                        height={500}
                                        src={imageObj.first}
                                        style={{
                                            borderRadius: "20px",
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => inputFirstImage.current.click()}
                                    />
                                ) : (
                                    <i className="fa-regular fa-image"
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
                                    <Image
                                        width={500}
                                        height={500}
                                        src={imageObj.second}
                                        style={{
                                            borderRadius: "20px",
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => inputSecondImage.current.click()}
                                    />
                                ) : (
                                    <i className="fa-regular fa-image"
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
                                <input 
                                type="text" 
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                />
                                <div className="column-checkbox">
                                    <input className="check-input" type="checkbox" value={clip} onChange={() => setClip('yes')}/>
                                    <label>มีคลิป</label>
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
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            />
                        </div>
                        <div className="column-input">
                            <label >รายละเอียดสินค้า</label>
                            <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
                <div className="column-button">
                    <button className="btn-left" onClick={() => handleClickCreatePost()}>ลงสินค้า</button>
                    <button className="btn-right" onClick={() => onCancel()}>ยกเลิก</button>
                </div>
            </div>
        </Fragment>
    )
}
