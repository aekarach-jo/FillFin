import axios from 'axios'
import { getCookie } from 'cookies-next'
import FormData from 'form-data'
import React, { Fragment, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import nextConfig from '../../../next.config'
import st from '../../../styles/store/store.module.scss'

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
                setEmptyForm()
            }
        })
    }

    function handleClickCreatePost() {
        // if (inputFirstImage.current.value == [] || inputSecondImage.current.value == []) {
        //     Swal.fire({
        //         title: "กรุณาเพิ่มรูปภาพให้ครบ",
        //         icon: "warning",
        //         position: "center",
        //         timer: 1000,
        //         showConfirmButton: false
        //     });
        //     return false;
        // }
        if (!price || !productName || !description) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'กรุณาเพิ่มข้อมูลให้ครบ',
                timer: 1000,
                showConfirmButton: false
            })
            return false;
        }

        const formData = new FormData()
        formData.append('premium', inputFirstImage.current.files[0])
        formData.append('premium', inputSecondImage.current.files[0])
        formData.append('name_premium', productName)
        formData.append('content_premium', description)
        formData.append('price_premium', price)
        formData.append('clip', clip)
        createPost(formData)
    }

    async function createPost(params) {
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
        Swal.fire({
            title: "success",
            icon: "success",
            position: "center",
        });
        setEmptyForm()
        status()
    }

    function setEmptyForm() {
        setImageobj({})
        setProductName("")
        setDescription("")
        setPrice("")
        setClip("no")
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
                    <div className={`column-images ${st.colImage}`}>
                        <div className={`left ${st.boxImage}`}>
                            {imageObj.first
                                ? (
                                    <img
                                        src={imageObj.first}
                                        alt="image-first"
                                        className={st.manage_image}
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
                                        src={imageObj.second}
                                        alt="iamge-second"
                                        className={st.manage_image}
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
                        <div className="right">
                            <div className="column-input" style={{ maxWidth: '246px' }}>
                                <div className="column-label">
                                    <label >ราคา</label>
                                    <label >BTH</label>
                                </div>
                                <input
                                    type="text"
                                    value={price}
                                    maxLength={10}
                                    onChange={(e) => {
                                        if (
                                            /^[0-9]+$/.test(e.target.value) ||
                                            e.target.value == ""
                                        ) { setPrice(e.target.value) }
                                    }}
                                />
                                <div className="column-checkbox">
                                    <input className="check-input" type="checkbox" value={clip} onChange={() => setClip('yes')} />
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
                                maxLength={50}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </div>
                        <div className="column-input">
                            <label >รายละเอียดสินค้า</label>
                            <textarea
                                value={description}
                                maxLength={100}
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
