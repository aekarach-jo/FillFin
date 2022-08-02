import axios from 'axios';
import { getCookie, setCookies } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { useAppContext } from '../../config/state';
import nextConfig from '../../next.config';
import Styles from '../../styles/package.module.scss'

const apiUrl = nextConfig.apiPath
export default function ShowPackage({ packagesList }) {
    const state = useAppContext()
    const router = useRouter()
    const [packageGender, setPackageGender] = useState(packagesList)
    const [gender, setGender] = useState(getCookie("gender"));
    const [packages, setPackage] = useState([]);
    const [packageId, setPackageId] = useState(getCookie('package'))

    useEffect(() => {
        apiGetStatusPackage()
        apiCheckPackage()
        // กรองเอาเฉพาะแพ็คเกจของเพศที่สมัคร
    }, []);

    async function apiGetStatusPackage() { // กรณีรีเฟรชหน้าจอหลังจากแอดมินอนุมัติ
        const mcode = getCookie("member_code")
        const access_token = getCookie("access_token")
        try {
            const sPackage = await axios({
                method: 'GET',
                url: `${apiUrl}/api/package/statusPayment/${mcode}`,
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            const payStatus = sPackage.data
            console.log(payStatus)
            if (payStatus.statusPay == 'pending') {
                router.push(`/member/payment`);
            } else {
                const found = packageGender.filter((p) => p.gender == gender)
                setPackage(found)
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                position: "center",
                title: err.description,
            });
        }
    }

    async function apiCheckPackage() {
        const mcode = getCookie("member_code");
        try {
          const sPackage = await axios({
            method: "GET",
            url: `${apiUrl}/api/package/checkPackage/${mcode}`,
          });
          const statusPack = sPackage.data;
          console.log(statusPack);
          if (!statusPack.status) {
            state.emptyPackage.set_emptyPackage(true)
          } else {
            state.emptyPackage.set_emptyPackage(false)
          }
        } catch (err) {
          console.log(err);
          Swal.fire({
            icon: "error",
            position: "center",
            // title: err.response.statusText,
          });
        }
      }

    function choosPackage(pack) {
        console.log(pack);
        Swal.fire({
            icon: 'question',
            title: 'ยืนยันการเลือกแพ็กเกจ ' + pack.name,
            position: 'center',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#C93A87'
        })
            .then(res => {
                if (res.isConfirmed) {
                    setCookies('package', pack.package_id)
                    router.push('/member/payment')
                }
            })
    }

    return (
        <Fragment>
            <h1 style={{ textAlign: 'center', alignItems: 'center', margin: '2rem' }}>เลือกแพ็กเกจ</h1>
            <div className={Styles.containers} >
                {packages.length > 0 && packages?.map((data, index) => (
                    <div key={index} className={Styles.card}>
                        {data.package_id == packageId}
                        <div className="column-detail">
                            <div className="column-img">
                                <Image
                                    width={217}
                                    height={223}
                                    src={`${apiUrl}${data.image}`}
                                    style={{ cursor: "pointer" }}
                                    alt="image-package"
                                    quality={20}
                                />
                                <div className="bg-img">
                                    <h2>{data.name}</h2>
                                    <div className="bg-color">
                                    </div>
                                </div>
                            </div>
                            <div className="text-line">
                                <p>{data.content}</p>
                            </div>
                            <div className="text" style={{ display: 'inline-flex', margin: '1rem' }}>
                                <button onClick={() => choosPackage(data)}
                                    className={Styles.chooseBtn}
                                >เลือก</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Fragment >
    )
}
