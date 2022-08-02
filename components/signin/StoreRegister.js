import React, { Fragment, useEffect, useRef, useState } from "react";
import nextConfig from "../../next.config";
import FormData from "form-data";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import ContactUs from "../subComponent/contactUs";
import Image from "next/image";
import axios from "axios";

const apiUrl = nextConfig.apiPath;

export default function StoreRegister({ content,qrCode }) {
  const router = useRouter();
  let formData = new FormData();

  const [image, setImage] = useState(null);
  const inputImage = useRef(null);

  const [storeName, setStorename] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
  }, [])

  function inputIamgeOnchange(e) {
    const URLs = URL.createObjectURL(e.target.files[0]);
    setImage(URLs);
  }

  function onClickCancel() {
    Swal.fire({
      icon: "warning",
      title: "ยกเลิกการสมัครหรือไม่",
      position: "center",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: '#C93A87',
      showConfirmButton: true,
      confirmButtonText: "ยืนยัน",
    }).then(() => {
      router.push("/login");
    });
  }

  function handleRegis() {
    if (
      storeName == "" ||
      age == "" ||
      image == "" ||
      username == "" ||
      password == ""
    ) {
      Swal.fire({
        icon: "warning",
        position: "center",
        title: "กรุณากรอกข้อมูลให้ครบ",
      });
      return false;
    }
    if (password != confirmPassword) {
      Swal.fire({
        icon: "warning",
        position: "center",
        title: "รหัสผ่านไม่ตรงกัน",
      });
      return false;
    }
    register()
  }

  const register = async () => {
    formData.append("name", storeName);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("age", age);
    formData.append("gender", gender)
    formData.append("image", inputImage.current.files[0]);
    const fetchRegis = await axios.post(
      `${apiUrl}/api/store/register`, formData
    )
      .then(res => {
        if (res.status) {
          Swal.fire({
            title: 'สำเร็จ กรุณาติดต่อแอดมิน',
            icon: 'success',
            position: 'center',
            showConfirmButton: true,
            confirmButtonText: 'ตกลง',
            showCancelButton: false
          }).then(() => {
            router.push('/login')
          })
        }
      })
  }

  return (
    <Fragment>
      <div>
        <div className="apply">
          <ContactUs />
          <div className="column-apply">
            <div className="column-top-apply">
              <div className="column-left">
                <video
                  className="video"
                  width={400}
                  controls
                  muted
                  autoPlay
                  src={`${apiUrl}/streaming${content.videoLink}`}
                  poster='/assets/images/sale.png'
                />
              </div>
              <div className="column-right">
                <h2>ข้อกำหนดการสมัครสมาชิก</h2>
                <h3>(ดู VDO ประกอบ)</h3>
                <p>{content.content}</p>

              </div>
            </div>
            <div className="column-center-apply">
              <div className="column-left">
                <h2>กรอกข้อมูลสมัครร้านค้า</h2>
                <div className="column">
                  <div className="left">
                    <div className="box-column-login">
                      <div className="form-user-login">
                        <div className="form">
                          <div className="label-top">
                            <div className="text-left">*ชื่อร้านค้า</div>
                            <div className="text-right">
                              (กรุณากรอกเป็นภาษาอังกฤษและตัวเลขเท่านั้น)
                            </div>
                          </div>
                          <input
                            type="text"
                            placeholder="User Name"
                            value={storeName}
                            maxLength={30}
                            onChange={(e) => {
                              if (
                                /^[a-zA-Z0-9 ]+$/.test(e.target.value) ||
                                e.target.value == ""
                              ) {
                                setStorename(e.target.value);
                              }
                            }}
                          />
                        </div>
                        <div className="form">
                          <div className="label-top">
                            <div className="text-left">
                              *รหัสผ่าน <p>(Password)</p>
                            </div>
                            <div className="text-right">
                              (กรุณากรอกเป็นไอดีไลน์)
                            </div>
                          </div>
                          <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            value={password}
                            maxLength={20}
                            placeholder="************"
                          />
                        </div>
                        <div className="form">
                          <div className="label-top">
                            <div className="text-left">
                              *ยืนยันรหัสผ่าน<p>(Confirm Password)</p>
                            </div>
                            <div className="text-right">
                              (กรุณากรอกเป็นไอดีไลน์)
                            </div>
                          </div>
                          <input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            value={confirmPassword}
                            placeholder="************"
                            maxLength={20}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form">
                      <div className="label-top">
                        <div className="text-left">
                          ประเภทสินค้า
                        </div>
                        <div className="text-right"></div>
                      </div>
                      <select onChange={(e) => setGender(e.target.value)} defaultValue={'none'} className="form-select form-select"
                        style={{
                          width: "100%",
                          height: "39px",
                          background: "#FFFFFF",
                          border: "1px solid #747474",
                          borderRadius: "5px",
                          outlineStyle: "none",
                          padding: "0 1rem",
                          marginBottom: '1rem'
                        }}>
                        <option disabled value={'none'}>กรุณาเลือกประเภทสินค้า</option>
                        <option value={"men"}>ผู้ชาย</option>
                        <option value={"women"}>ผู้หญิง</option>
                      </select>
                    </div>
                    <div className="form-check mt-3">
                      <input
                        onClick={() => setIsRegister(!isRegister)}
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckChecked"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                        style={{ marginLeft: '10px' }}
                      >
                        ยอมรับเงื่อนไขและข้อตกลงในการใช้บริการ
                        {/* <a href="">{" "}อ่านเงื่อนไข</a> */}
                      </label>
                    </div>
                  </div>
                  <div className="right">
                    <div className="box-column-login">
                      <div className="form-user-login">
                        <div className="form">
                          <div className="label-top">
                            <div className="text-left">
                              *ชื่อผู้ใช้ <p>(User)</p>
                            </div>
                            <div className="text-right">
                              (กรุณากรอกเป็นเบอร์โทรศัพท์)
                            </div>
                          </div>
                          <input
                            maxLength={10}
                            type="text"
                            value={username}
                            placeholder="Lorem ipsum dolor sit amet, consectetur"
                            onChange={(e) => {
                              if (
                                /^[\d]+$/.test(
                                  e.target.value.trim()
                                ) || e.target.value == ""
                              ) {
                                setUsername(e.target.value.trim());
                              }
                            }}
                          />
                        </div>
                        <div className="form">
                          <div className="label-top">
                            <div className="text-left">*อายุ</div>
                          </div>
                          <input
                            type="text"
                            value={age}
                            maxLength={3}
                            placeholder="Lorem ipsum dolor sit amet, consectetur"
                            onChange={(e) => {
                              if (
                                /^[\d]+$/.test(
                                  e.target.value.trim()
                                ) || e.target.value == ""
                              ) {
                                setAge(e.target.value.trim());
                              }
                            }}
                          />
                        </div>
                        <div className="column-upload-img">
                          <div className="column-left">
                            {image ? (
                              <Image
                                src={image}
                                width={500}
                                height={350}
                                alt="image-upload"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectfit: "cover",
                                }}
                              />
                            ) : (
                              <i className="fa-solid fa-image" />
                            )}
                            <input
                              style={{ display: "none" }}
                              type="file"
                              accept="image/*"
                              ref={inputImage}
                              onChange={(e) => inputIamgeOnchange(e)}
                            />
                          </div>
                          <div className="column-right">
                            <h3>อัปโหลดภาพโปรไฟล์ร้าน</h3>
                            <p>ขนาดอัปโหลดไฟล์ภาพ ไม่เกิน 5 Mb</p>
                            <button
                              className="btn-upload"
                              onClick={(e) => inputImage.current.click()}
                            >
                              อัปโหลด
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column-qr-right">
                <div className="left">
                  <h3>ติดต่อ Admin เพื่ออัปโหลด Clip VDO</h3>
                  <p>{qrCode.title} : {qrCode.content}</p>
                </div>
                <div className="right">
                  <Image width={143} height={143} src={`${apiUrl}${qrCode.imageLink}`} alt="image-qrCode" />
                </div>
              </div>
              <div className="form-check mt-3">
                <input
                  onClick={() => setIsRegister(!isRegister)}
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckChecked"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexCheckChecked"
                  style={{ marginLeft: '10px' }}
                >
                  ยอมรับเงื่อนไขและข้อตกลงในการใช้บริการ
                  {/* <a href="">{" "}อ่านเงื่อนไข</a> */}
                </label>
              </div>
              </div>
              <div className="line"></div>
              <div className="btn-column">
                {isRegister ? (
                  <button onClick={() => handleRegis()} className="btn-left">
                    สมัครสมาชิก
                  </button>
                ) : (
                  <button
                    className="btn-left"
                    style={{ backgroundColor: "#e3e3e3", cursor: "not-allowed" }}
                  >
                    สมัครสมาชิก
                  </button>
                )}
                <button onClick={() => onClickCancel()} className="btn-right">
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
}
