import React, { Fragment, useEffect, useRef, useState } from "react";
import nextConfig from "../../next.config";
import FormData from "form-data";
import Swal from "sweetalert2";
import ContactUs from "../subComponent/contactUs";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import axios from "axios";
import Styles from "../../styles/payment.module.scss"

const apiUrl = nextConfig.apiPath;

export default function Payment() {
  const router = useRouter()
  const inputImage = useRef(null);
  const [image, setImage] = useState(null);

  const [bankList, setBankList] = useState([]);
  const [bank, setBank] = useState([]);
  const [isLoadSuccess, setIsLoadSuccess] = useState(false);
  const [toggleShowPass, setToggleShowPass] = useState(false);

  const [packageData, setpackageData] = useState([]);
  const [member, setMember] = useState({})
  const [statusPackage, setStatusPackage] = useState()
  const [dropdownActiveBank, setDropdownActiveBank] = useState(false)


  useEffect(() => {
    apiGetpackage(),
      getBank(),
      apiGetStatusPackage()
  }, [toggleShowPass]);
  async function apiGetpackage() {
    const packageId = getCookie("package")
    const member_code = getCookie('member_code')
    try {
      const getPackage = await axios({
        method: 'POST',
        url: `${apiUrl}/api/package/getSelect`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          memberCode: member_code,
          packageId: packageId
        }
      })
      const packageData = getPackage.data
      setpackageData(packageData.package)
      if (toggleShowPass) {
        setMember(packageData.package)
      } else {
        const slic = packageData.package.password.slice(2, 6)
        const repl = packageData.package.password.replace(slic, "****")
        const pass = {
          username: packageData.package.username,
          password: repl
        }
        setMember(pass)
      }
    }
    catch (err) {
      console.log(err);
      Swal.fire({
        title: "err.response.description",
        icon: 'error',
        position: 'center',
      })
    }
  }

  async function apiGetStatusPackage() { // ????????????????????????????????????????????????????????????????????????????????????????????????????????????
    const mcode = getCookie("member_code")
    const access_token = getCookie("access_token")
    const sPackage = await axios({
      method: 'GET',
      url: `${apiUrl}/api/package/statusPayment/${mcode}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    const payStatus = sPackage.data
    if (payStatus.data == 'confirm') {
      Swal.fire({
        title: '????????????????????????????????? ????????????????????????????????????????????????????????????????????????',
        icon: 'success',
        position: 'center',
        showConfirmButton: false,
        timer: 1700
      }).then(() => {
        router.push('/login')
      })
    } else {
      setStatusPackage(payStatus.statusPay)
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
        title: "?????????????????????????????????????????????????????????????????????????????????",
        icon: "warning",
        position: "center",
      });
    }
  }

  async function getBank() {
    const bankData = await axios({
      method: 'GET',
      url: `${apiUrl}/api/bank/get`,
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
        title: "?????????????????????????????????????????????",
      });
      return false;
    }
    if (!image) {
      Swal.fire({
        icon: "warning",
        title: "????????????????????????????????????????????????",
      });
      return false;
    }
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: '????????????????????????????????????????????????????????????',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#C93A87',
      confirmButtonText: '??????????????????',
      cancelButtonText: '??????????????????'
    }).then((res) => {
      if (res.isConfirmed) {
        createPayment()
      }
    })
  }

  async function createPayment() {
    const mcode = getCookie("member_code")
    const packId = getCookie("package")

    try {
      let formData = new FormData();
      formData.append('slip', inputImage.current.files[0])
      formData.append('memberCode', mcode)
      formData.append('bankRef', bank.id)
      formData.append('packageId', packId)
      const create = await axios({
        method: "POST",
        url: `${apiUrl}/api/package/createPayment`,
        data: formData,
      })
      const data = create.data
      if (data.status) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '?????????????????? ????????????????????????????????????',
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
    } catch (err) {
      console.log(err);
    }
  };

  function showImageSlip(e) {
    const getImage = e.target.getAttribute("src")
    Swal.fire({
      text: "??????????????????????????????????????? :" + " " + bank.bank_name,
      imageUrl: getImage,
      imageWidth: 400,
      imageHeight: 450,
      imageAlt: 'Custom image',
    })
  }

  return (
    <Fragment>
      <div>
        <div className="detail-pay">
          <div className={`column-detail-pay ${Styles.minHeight}`} >
            <div className="text-top">
              <h2>??????????????????????????????????????????????????????????????????????????????</h2>
            </div>
            <div className="column-table">
              <table>
                <tbody>
                  <tr>
                    <th>???????????????????????????????????????????????????</th>
                    <th />
                  </tr>
                  <tr>
                    <td>????????????????????? {packageData.packageName}</td>
                    <td className="td-right" style={{ textAlign: 'center' }}>{packageData.price} BTH</td>
                  </tr>
                  <tr>
                    <td>
                      ??????????????????????????????????????????????????????????????? {packageData.packageName}
                      ({packageData.day} ?????????)
                    </td>
                    <td />
                  </tr>
                  <tr>
                    <td>??????????????????????????????</td>
                    <td style={{ textAlign: 'center' }}>{packageData.price} BTH</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="column-detail-member">
              <h2>????????????????????????????????????????????????????????????</h2>
              <div className="text-column">
                <div className="column-left">
                  <p>
                    ??????????????????????????????<span>(User)</span>
                  </p>
                  <p>{member.username}</p>
                </div>
                <div className="column-right">
                  <p>
                    ????????????????????????<span>(Password)</span>
                  </p>
                  {toggleShowPass ? (
                    <p>
                      {member.password}
                      <button>
                        <i
                          onClick={() => setToggleShowPass(!toggleShowPass)}
                          className="fa-solid fa-eye"
                        />
                      </button>
                    </p>
                  ) : (
                    <p>
                      {member.password}
                      <button>
                        <i
                          onClick={() => setToggleShowPass(!toggleShowPass)}
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
                ? <h2 style={{ textAlign: 'center' }}>??????????????????????????????????????????????????????????????????????????????????????????</h2>
                : <>
                  <h2>??????????????????????????????????????????????????????</h2>
                  <div className="column-pay">
                    <div className="pay-dropdown">
                      <div className="dropdown-toggle" onClick={() => setDropdownActiveBank(prev => !prev)}>
                        <div className="dropdown-toggle-left" style={{ display: 'flex' }}>
                          <img 
                          src={`${apiUrl}${bank.image}`} 
                          width={35} 
                          height={25} 
                          alt="image-bank"
                          style={{ alignItems: "center", marginRight: '1rem' }} />
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
                                <img src={`${apiUrl}${data.image}`} alt="image-banklist"/>
                                {data.bank_name} / {data.bank_number} / {data.name}
                              </div>
                            ))}
                          </>
                          : <p>?????????????????????????????????</p>
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
                            alt="image-slip"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "content",
                            }}
                            onClick={(e) => showImageSlip(e)}
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
                        <h3>?????????????????????????????????</h3>
                        <p>?????????????????????????????????????????????????????? ????????????????????? 5 Mb</p>
                        <button onClick={() => inputImage.current.click()}>
                          ?????????????????????
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
                      ?????????
                    </button>
                  ) : (
                    <p>?????????????????????????????????????????????</p>
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
