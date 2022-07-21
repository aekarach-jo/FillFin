import { Dialog, Transition, Combobox } from '@headlessui/react'
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from 'react'
import nextConfig from '../../../next.config';
import Styles from '../../../styles/modal.module.scss'
import FormData from "form-data";
import Swal from 'sweetalert2';

const apiUrl = nextConfig.apiPath

export default function ModalEdit({ storeDetail , status}) {
    const formData = new FormData()
    const [isOpen, setIsOpen] = useState(false)
    const [storeName, setStoreName] = useState(storeDetail.name)
    const [age, setAge] = useState(storeDetail.age)
    const [weight, setWeight] = useState(storeDetail.weight)
    const [height, setHeight] = useState(storeDetail.height)
    const [bwh, setBwh] = useState(storeDetail.bwh)
    const [image, setImage] = useState(storeDetail.profile_img)

    const inputProfileImage = useRef([])
    const [imageObj, setImageobj] = useState(`${apiUrl}${image}`)

    useEffect(() => {
    }, [])

    function inputImageOnChange(e) {
        if (!e.target.files.length) {
            return false;
        }
        if (
            ["image/jpeg", "iamge/jpg", "image/png"].includes(e.target.files[0].type)
        ) {
            const URLs = URL.createObjectURL(e.target.files[0]);
            setImageobj(URLs)
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

    async function onEditStore() {
        const access_token = getCookie('access_token')
        const storeCode = getCookie('storeCode')
        formData.append('image', inputProfileImage.current.files[0])
        formData.append('storeCode', storeCode)
        formData.append('name', storeName)
        formData.append('age', age)
        formData.append('weight', weight)
        formData.append('height', height)
        formData.append('bwh', bwh)

        const apiEdit = await axios({
            method: 'POST',
            url: `${apiUrl}/api/store/updateProfile`,
            headers : {
                Authorization: `Bearer ${access_token}`
            },
            data: formData
        }).then((res) => {
           
            Swal.fire({
                icon: 'success',
                position: 'center',
                title: 'แก้ไขแล้ว',
                showConfirmButton: false,
                timer: 1000
            }).then(() => { status(), setIsOpen(!isOpen) })

        })
    }

    return (
        <>
            <button >
                <i onClick={() => setIsOpen(!isOpen)} className="fa-solid fa-pen-to-square" />
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(!isOpen)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className={Styles.st_dialog} />
                    </Transition.Child>

                    <div className={Styles.st_content}>
                        <div className={Styles.st_content_layout}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className={Styles.st_panel}>
                                    {imageObj
                                        ? <img
                                            src={imageObj}
                                            className={Styles.st_image}
                                            alt="image-first"

                                            onClick={() => inputProfileImage.current.click()}
                                        />
                                        : <img src={`${apiUrl}${image}`} alt="image"
                                            className={Styles.st_image}
                                            onClick={() => inputProfileImage.current.click()} />
                                    }
                                    <input
                                        type="file"
                                        style={{ display: 'none' }}
                                        accept=".jpg,.jpeg,.png"
                                        ref={inputProfileImage}
                                        onChange={(e) => inputImageOnChange(e)}
                                    />
                                    <Dialog.Title
                                        as="h1"
                                        className={Styles.st_title}
                                    >
                                        แก้ไขข้อมูลร้านค้า
                                    </Dialog.Title>
                                    <div className={Styles.st_colInput}>
                                        <Combobox>
                                            <div className={Styles.st_inputGroup}>
                                                <label className={Styles.st_label}>ชื่อร้านค้า</label>
                                                <Combobox.Input
                                                    className={Styles.st_input}
                                                    value={storeName}
                                                    placeholder={storeName}
                                                    onChange={(e) => setStoreName(e.target.value)}
                                                />
                                            </div>
                                            <div className={Styles.st_inputGroup}>
                                                <label className={Styles.st_label}>อายุ</label>
                                                <Combobox.Input
                                                    className={Styles.st_input}
                                                    value={age}
                                                    placeholder={age}
                                                    onChange={(e) => setAge(e.target.value)}
                                                />
                                            </div>
                                            <div className={Styles.st_inputGroup}>
                                                <label className={Styles.st_label}>น้ำหนัก</label>
                                                <Combobox.Input
                                                    className={Styles.st_input}
                                                    value={weight}
                                                    placeholder={weight}
                                                    onChange={(e) => setWeight(e.target.value)}
                                                />
                                            </div>
                                            <div className={Styles.st_inputGroup}>
                                                <label className={Styles.st_label}>ส่วนสูง</label>
                                                <Combobox.Input
                                                    className={Styles.st_input}
                                                    value={height}
                                                    placeholder={height}
                                                    onChange={(e) => setHeight(e.target.value)}
                                                />
                                            </div>
                                            <div className={Styles.st_inputGroup}>
                                                <label className={Styles.st_label}>สัดส่วน</label>
                                                <Combobox.Input
                                                    className={Styles.st_input}
                                                    value={bwh}
                                                    placeholder={bwh}
                                                    onChange={(e) => setBwh(e.target.value)}
                                                />
                                            </div>
                                        </Combobox>
                                    </div>

                                    <div className={Styles.btn_group}>
                                        <button
                                            type="button"
                                            className={Styles.st_confirm_button}
                                            onClick={() => onEditStore()}
                                        >
                                            ยืนยัน
                                        </button>
                                        <button
                                            type="button"
                                            className={Styles.st_cancel_button}
                                            onClick={() => setIsOpen(!isOpen)}
                                        >
                                            ยกเลิก
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
