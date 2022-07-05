import React, { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import nextConfig from "../../next.config";
import { useRouter } from "next/router";
import Image from "next/image";
import { setCookies } from "cookies-next";

const apiUrl = nextConfig.apiPath;

export default function MemberRegister({ packageData }) {
  const [packageGender, setPackageGender] = useState(packageData)
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false); //checkbox

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("none");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [packages, setPackage] = useState([]);
  const [packageId, setPackageId] = useState(null)

  useEffect(() => {
    if (gender != "none") {
      const found = packageGender.filter((p) => p.gender == gender)
      setPackage(found)
    } else {
       const found = packageGender.filter((p) => p.gender == 'men')
    setPackage(found)
    }
  }, [gender, packageGender]);

  function handleRegis() {
    if (username == "" || password == "" || confirmPassword == "") {
      Swal.fire({
        icon: "warning",
        position: "center",
        title: "กรุณากรอกข้อมูลให้ครบ",
      });
      return false;
    }
    // if (username.length != 10) {
    //   Swal.fire({
    //     icon: "warning",
    //     position: "center",
    //     title: "กรุณากรอกเบอร์โทรศัพท์ให้ครบ",
    //   });
    //   return false;
    // }

    if (password != confirmPassword) {
      Swal.fire({
        icon: "warning",
        position: "center",
        title: "รหัสผ่านไม่ตรงกัน",
      });
      return false;
    }
    if (gender == "none") {
      Swal.fire({
        icon: "warning",
        position: "center",
        title: "กรุณาเลือกประเภทสินค้า",
      });
      return false;
    }
    if (packageId == null) {
      Swal.fire({
        icon: "warning",
        position: "center",
        title: "กรุณาเลือกแพ็กเกจ",
      });
      return false;
    }

    const formRegis = {
      username: username,
      password: password,
      gender: gender,
      package_id: packageId
    };
    register(formRegis);
  }


  const register = async (formRegis) => {
    try {
      const fetchRegis = await fetch(`${apiUrl}/api/member/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formRegis),
      })
      const resJson = await fetchRegis.json();
      if (resJson.status == true) {
        await Swal.fire({
          icon: "success",
          title: resJson.description,
          position: "center",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          setCookies("member_code", resJson.data); // เก็บ user-code ไว้ดึงข้อมูลในหน้า payment
          router.push(`/member/payment`)
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: resJson.description,
          position: "center",
          showConfirmButton: false,
          timer: 1000,
        })
      }
    } catch (err) {
      console.log(err);
    }
  }

  function onClickCancel() {
    Swal.fire({
      icon: "warning",
      title: "ยกเลิกการสมัครหรือไม่",
      position: "center",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      showConfirmButton: true,
      confirmButtonText: "ยืนยัน",
    }).then((res) => {
      if (res.isConfirmed) {
        router.push("/login");
      }
    });
  }

  return (
    <Fragment>
      <div>
        <div className="apply">
          <div className="column-apply">
            <div className="column-top-apply">
              <div className="column-left">
                <iframe
                  width={536}
                  height={300}
                  src="https://www.youtube.com/embed/CUfPYWtydgk"
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="column-right">
                <h2>ข้อกำหนดการสมัครสมาชิก</h2>
                <h3>(ดู VDO ประกอบ)</h3>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
                  fuga nulla accusantium eum quis facilis commodi maxime rerum
                  iste itaque repellendus consequatur, error assumenda quo nisi
                  ipsa suscipit consectetur quia. Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Unde fuga nulla accusantium eum
                  quis facilis commodi maxime rerum iste itaque repellendus
                  consequatur, error assumenda quo nisi ipsa suscipit
                  consectetur quia. Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit. Unde fuga nulla accusantium eum quis facilis
                  commodi maxime rerum iste itaque repellendus consequatur,
                  error assumenda quo nisi ipsa suscipit consectetur quia.
                </p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
                  fuga nulla accusantium eum quis facilis commodi maxime rerum
                  iste itaque repellendus consequatur, error assumenda quo nisi
                  ipsa suscipit consectetur quia.
                </p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
                  fuga nulla accusantium eum quis facilis commodi maxime rerum
                  iste itaque repellendus consequatur, error assumenda quo nisi
                  ipsa suscipit consectetur quia.
                </p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
                  fuga nulla accusantium eum quis facilis commodi maxime rerum
                  iste itaque repellendus consequatur, error assumenda quo nisi
                  ipsa suscipit consectetur quia. Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Unde fuga nulla accusantium eum
                  quis facilis commodi maxime rerum iste itaque repellendus
                  consequatur, error assumenda quo nisi ipsa suscipit
                  consectetur quia.
                </p>
              </div>
            </div>
            <div className="column-center-apply">
              <div className="column-left">
                <div className="column-text-login">
                  <h2>กรอกข้อมูลผู้สมัคร</h2>
                  <div className="box-column-login">
                    <div className="form-user-login">
                      <div className="form">
                        <div className="label-top">
                          <div className="text-left">
                            ชื่อผู้ใช้ <p>(User)</p>
                          </div>
                          <div className="text-right">
                            (กรุณากรอกเป็นเบอร์โทรศัพท์)
                          </div>
                        </div>
                        <input
                          onChange={(e) => {
                            // if (
                            //   /^[\d]+$/.test(
                            //     e.target.value.trim()
                            //   ) || e.target.value == ""
                            // ) {
                              setUsername(e.target.value.trim());
                            // }
                          }}
                          type="text"
                          value={username}
                          placeholder="Username"
                          // maxLength={10}
                        />
                      </div>
                      <div className="form">
                        <div className="label-top">
                          <div className="text-left">
                            รหัสผ่าน <p>(Password)</p>
                          </div>
                          <div className="text-right">
                            (กรุณากรอกเป็นไอดีไลน์)
                          </div>
                        </div>
                        <input
                          onChange={(e) => setPassword(e.target.value.trim())}
                          type="password"
                          value={password}
                          placeholder="************"
                        />
                      </div>
                      <div className="form">
                        <div className="label-top">
                          <div className="text-left">
                            ยืนยัน รหัสผ่าน<p>(Confirm Password)</p>
                          </div>
                          <div className="text-right">
                            (กรุณากรอกเป็นไอดีไลน์)
                          </div>
                        </div>
                        <input
                          onChange={(e) =>
                            setConfirmPassword(e.target.value.trim())
                          }
                          type="password"
                          value={confirmPassword}
                          placeholder="************"
                        />
                      </div>
                      <div className="form">
                        <div className="label-top">
                          <div className="text-left">
                            ประเภทสินค้า<p>(Product type)</p>
                          </div>
                          <div className="text-right"></div>
                        </div>
                        <select onChange={(e) => setGender(e.target.value)} defaultValue={'none'} className="form-select form-select">
                          <option disabled value={'none'}>กรุณาเลือกประเภทสินค้า</option>
                          <option value={"men"}>ผู้ชาย</option>
                          <option value={"women"}>ผู้หญิง</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-check">
                  <input
                    onClick={() => setIsRegister(true)}
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckChecked"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckChecked"
                  >
                    ยอมรับเงื่อนไขและข้อตกลงในการใช้บริการ
                    <a href="">{" "}อ่านเงื่อนไข</a>
                  </label>
                </div>
              </div>
              <div className="column-right">
                <h2>เลือกแพ็กเก็จ</h2>
                <div className="column">
                  {packages.length > 0 && packages?.map((data, index) => (
                    <button
                      key={index}
                      onClick={() => setPackageId(data.package_id)}
                      className="column-detail"
                    >
                      <Image
                        width={203}
                        height={230}
                        src={`${apiUrl}${data.image}`}
                        style={{ cursor: "pointer" }}
                        alt="image-package"
                        quality={20}
                      />
                      <div className="text-line">
                        <p>{data.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
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
