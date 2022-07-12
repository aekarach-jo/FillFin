import React, { Fragment, useEffect, useRef, useState } from "react";
import nextConfig from "../../next.config";
import FormData from "form-data";
import Swal from "sweetalert2";
import Image from "next/image";
import ContactUs from "../subComponent/contactUs";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import axios from "axios";

const apiUrl = nextConfig.apiPath;

export default function Payment() {
  const router = useRouter()
  const inputImage = useRef(null);
  const [image, setImage] = useState(null);

  const [bankList, setBankList] = useState([]);
  const [bank, setBank] = useState([]);
  const [isLoadSuccess, setIsLoadSuccess] = useState(false);
  const [toggleShowPass, setToggleShowPass] = useState(true);

  const [packageData, setpackageData] = useState([]);
  const [member, setMember] = useState([])
  const [statusPackage, setStatusPackage] = useState()
  const [dropdownActiveBank, setDropdownActiveBank] = useState(false)


  useEffect(() => {
    apiGetpackage(),
      getBank(),
      apiGetStatusPackage()
  }, []);
  async function apiGetpackage() {
    try {
      const mcode = getCookie("member_code")
      const getPackage = await fetch(`${apiUrl}/api/package/getBill/${mcode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const packageJson = await getPackage.json()
      console.log(packageJson)
      !packageJson.status
        ? null
        : setpackageData(packageJson.data)
      setMember(packageJson.data)
    }
    catch (err) {
      console.log(err);
    }
  }

  async function apiGetStatusPackage() {
    const mcode = getCookie("member_code")
    const access_token = getCookie("access_token")
    const sPackage = await fetch(`${apiUrl}/api/package/statusPayment/${mcode}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    const statusJson = await sPackage.json()
    if (statusJson.data == 'confirm') {
      Swal.fire({
        title: 'อนุมัติแล้ว กรุณาล็อกอินใหม่อีกครั้ง',
        icon: 'success',
        position: 'center',
        showConfirmButton: false,
        timer: 1700
      }).then(() => { router.push('/login') })
    } else {
      setStatusPackage(statusJson.data)
    }
  }

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

  async function getBank() {
    const bankData = await axios(`${apiUrl}/api/bank/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const bank = bankData.data
    setBank(bank.data[0])
    setBankList(bank.data)
    setTimeout(() => setIsLoadSuccess(true), 2000);
  };

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
      cancelButtonText: 'ยกเลิก'
    }).then((res) => {
      if (res.isConfirmed) {
        createPayment()
      }
    })
  }

  async function createPayment() {
    try {
      const mcode = getCookie("member_code")
      let formData = new FormData();
      formData.append('slip', inputImage.current.files[0]);
      formData.append('member_code', mcode);
      formData.append('bank_ref', bank)
      const pay = await fetch(`${apiUrl}/api/package/createPayment`, {
        method: "POST",
        body: formData,
      })
      const data = await pay.json()
      if (data.status) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'สำเร็จ รอการอนุมัติ',
        }).then(() => {
          setStatusPackage("pending")
        })
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: res.description,
          showConfirmButton: false,
          timer: 1000
        })
      }
    } catch (err) { }
  };

  return (
    <Fragment>
      <div>
        <div className="detail-pay">
          <div className="column-detail-pay">
            <div className="text-top">
              <h2>รายละเอียดการชำระค่าสมาชิก</h2>
            </div>
            <div className="column-table">
              <table>
                <tbody>
                  <tr>
                    <th>รายละเอียดแพ็กเกจ</th>
                    <th />
                  </tr>
                  <tr>
                    <td>แพ็กเก็จ {packageData.name}</td>
                    <td className="td-right">{packageData.price} BTH</td>
                  </tr>
                  <tr>
                    <td>
                      ระยะเวลาสมาชิกแพ็กเก็จ {packageData.name}
                      ({packageData.day} วัน)
                    </td>
                    <td />
                  </tr>
                  <tr>
                    <td>รวมทั้งหมด</td>
                    <td>{packageData.price} BTH</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="column-detail-member">
              <h2>ข้อมูลผู้สมัครสมาชิก</h2>
              <div className="text-column">
                <div className="column-left">
                  <p>
                    ชื่อผู้ใช้<span>(User)</span>
                  </p>
                  <p>{member.username}</p>
                </div>
                <div className="column-right">
                  <p>
                    รหัสผ่าน<span>(Password)</span>
                  </p>
                  {toggleShowPass ? (
                    <p>
                      *******
                      <button>
                        <i
                          onClick={() => setToggleShowPass(false)}
                          className="fa-solid fa-eye"
                        />
                      </button>
                    </p>
                  ) : (
                    <p>
                      {member.password}
                      <button>
                        <i
                          onClick={() => setToggleShowPass(true)}
                          className="fa-solid fa-eye"
                        />
                      </button>
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="column-pay-subscription">
              {statusPackage == "pending"
                ? <h1 style={{ textAlign: 'center' }}>กรุณารอแอดมินยืนยันการชำระเงิน</h1>
                : <>
                  <h2>ชำระค่าสมัครสมาชิก</h2>
                  <div className="column-pay">
                    <div className="pay-dropdown">
                      <div className="dropdown-toggle" onClick={() => setDropdownActiveBank(prev => !prev)}>
                        <div className="dropdown-toggle-left"  style={{ display : 'flex'}}>
                          <img src={`${apiUrl}${bank.image}`} width={35} height={25} style={{ alignItems: "center", marginRight : '1rem' }} />
                          <span>
                            {bank.bank_name} / {bank.bank_number} / {bank.name}
                          </span>
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
                    <div className="column-img-pay">
                      <div
                        className="column-left"
                        style={{ height: "300px", width: "250px" }}
                      >
                        {image ? (
                          <img
                            src={image}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
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
                      <div className="column-right">
                        <h3>อัฟโหลดสลิป</h3>
                        <p>ขนาดอัฟโหลดไฟล์ภาพ ไม่เกิน 5 Mb</p>
                        <button onClick={() => inputImage.current.click()}>
                          อัฟโหลด
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              }
            </div>
            <div className="btn-bottom">
              {statusPackage == "pending"
                ? null
                : <Fragment>
                  {isLoadSuccess ? (
                    <button onClick={() => handleSend()} className="btn-out">
                      ส่ง
                    </button>
                  ) : (
                    <p>กำลังโหลดข้อมูล</p>
                  )}
                </Fragment>
              }
            </div>
          </div>
          <ContactUs />
        </div>
      </div>
    </Fragment>
  );
}
