import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import ContactUs from "../subComponent/contactUs";
import { useRouter } from "next/router";
import Image from "next/image";
import nextConfig from "../../next.config";
import { getCookie, removeCookies, setCookies } from "cookies-next";
import axios from "axios";
import { useAppContext } from "../../config/state";
import Styles from '../../styles/login.module.scss'

export default function Login({ banner }) {
  const state = useAppContext();
  const apiUrl = nextConfig.apiPath;
  const router = useRouter();
  const [pathLogin, setPathLogin] = useState("");
  const [showForm, setShowForm] = useState("member");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (showForm) {
      setPathLogin(showForm == "member" ? "member" : "store");
      setUsername("");
      setPassword("");
    }
  }, [showForm]);

  function onSigninClick() {
    if (username == "" || password == "") {
      Swal.fire({
        icon: "warning",
        position: "center",
        title: "กรุณากรอกข้อมูลให้ครบ",
      });
      return false;
    }

    const formLogin = { username, password };
    login(formLogin, pathLogin);
  }

  async function login(formLogin, pathLogin) {
    removeCookies("name");
    removeCookies("access_token");
    removeCookies("refresh_token");
    removeCookies("member_code");
    removeCookies("storeName");
    removeCookies("gender");
    removeCookies("emptyPackage")

    try {
      const onLogin = await axios.post(
        `${apiUrl}/api/${pathLogin}/signin`,
        formLogin
      );
      const data = onLogin.data;
      console.log(data);
      if (data.status) {
        pathLogin == "member"
          ? (
            state.isLogin.set_login(true),
            state.memberDetail.set_memberDetail(data.data.userName),
            state.dateExpire.set_dateExpire(data.data.dateExpire),
            setCookies("name", data.data.userName),
            setCookies("access_token", data.data.access_token),
            setCookies("refresh_token", data.data.refresh_token),
            setCookies("member_code", data.data.member_code),
            setCookies("gender", data.data.gender),
            setCookies("package", data.data.packageId),
            setCookies("dateExpire", data.data.dateExpire),
            apiGetStatusPackage()
            )
            : ( // pathLogin == "Store"
            state.memberDetail.set_memberDetail(data.data.storeName),
            state.isStore.set_isStore(true),
            state.isLogin.set_login(true),
            setCookies("name", data.data.storeName),
            setCookies("access_token", data.data.access_token),
            setCookies("refresh_token", data.data.refresh_token),
            setCookies("storeName", data.data.storeName),
            setCookies("gender", data.data.gender),
            setCookies("storeCode", data.data.storeCode),
            router.push("/store")
          )
      } else {
        await Swal.fire({
          title: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
          icon: "error",
          timer: 1000,
          showCancelButton: false,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        position: "center",
        title: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
      });
    }
  }

  async function apiGetStatusPackage() {
    const mcode = getCookie("member_code");
    try {
      const sPackage = await axios({
        method: "GET",
        url: `${apiUrl}/api/package/checkPackage/${mcode}`,
      });
      const statusPack = sPackage.data;
      console.log(statusPack);
      if (!statusPack.status) {
        setCookies("emptyPackage", true);
        state.emptyPackage.set_emptyPackage(true)
        router.push(`/member/package`);
      } else {
        setCookies("emptyPackage", false);
        state.emptyPackage.set_emptyPackage(false)
        router.push(`/member`);
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        position: "center",
        title: err.response.data.description,
      });
    }
  }


  return (
    <Fragment>
      <div>
        <div className={`detil-login ${Styles.minHeight}`}>
          <div className="img-background">
            <Image
              width={404}
              height={1050}
              alt="image-gender"
              className="img-left"
              src="/assets/images/man.png"
              layout="fixed"
            />
            <Image
              width={404}
              height={1050}
              alt="image-gender"
              className="img-right"
              src="/assets/images/woman.png"
              layout="fixed"
            />
          </div>
          <ContactUs />
          <div className="column-shadow" style={{ zIndex: "-1" }}>
            <div className="shadow-left" />
            <div className="shadow-right" />
          </div>
          <div className="column-login">
            <div className="column-img-top">
              <Image
                width={1096}
                height={300}
                src={`${apiUrl}/${banner[0].image}`}
                alt="image-banner"
              />
            </div>
            <div className="column-text-login">
              <h2>เข้าสู่ระบบ</h2>
              <div className="box-column-login">
                <div className="menu-navbar" id="menu-navbar">
                  {showForm == "member" ? (
                    <>
                      <button
                        className="btn-navbar active"
                        onClick={() => setShowForm("member")}
                      >
                        สำหรับผู้ซื้อสินค้า
                      </button>
                      <button
                        className="btn-navbar "
                        onClick={() => setShowForm("store")}
                      >
                        สำหรับร้านค้า
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn-navbar "
                        onClick={() => setShowForm("member")}
                      >
                        สำหรับผู้ซื้อสินค้า
                      </button>
                      <button
                        className="btn-navbar active"
                        onClick={() => setShowForm("store")}
                      >
                        สำหรับร้านค้า
                      </button>
                    </>
                  )}
                </div>
                <div className="form-user-login active" id="user">
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
                      type="text"
                      value={username}
                      placeholder="Username"
                      maxLength={10}
                      onChange={(e) => {
                        if (
                          /^[0-9]+$/.test(
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
                      <div className="text-left">
                        รหัสผ่าน <p>(Password)</p>
                      </div>
                      <div className="text-right">(กรุณากรอกเป็นไอดีไลน์)</div>
                    </div>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      value={password}
                      placeholder="Password"
                    />
                    <a className="text-bottom">ลืมชื่อผู้ใช้ หรือ รหัสผ่าน</a>
                  </div>
                </div>
                <button onClick={() => onSigninClick()} className="btn-login">
                  เข้าระบบ
                </button>
              </div>
            </div>
            <div className="column-text-detail">
              <h2>หรือ</h2>
              <p>
                หากคุณยังไม่มีบัญชีผู้ใช้ สามารถเข้าไปสมัครได้ที่ด้านล่างนี้เลย
              </p>
            </div>
            {showForm == "member" ? (
              <Link href="/member/register">
                <button className="btn-menbar">สมัครสมาชิก</button>
              </Link>
            ) : (
              <Link href="/store/register">
                <button className="btn-menbar">สมัครร้านค้า</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
