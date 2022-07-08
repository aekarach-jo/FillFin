import axios from "axios";
import { getCookie, removeCookies } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useAppContext } from "../../config/state";
import nextConfig from "../../next.config";

const apiUrl = nextConfig.apiPath
export default function Nav() {
  const state = useAppContext()
  const router = useRouter()
  const [user, setUser] = useState()
  const [cart, setCart] = useState()
  const [dropdownActive, setDropdownActive] = useState(false)
  const [dropdownActiveMenu, setDropdownActiveMenu] = useState(false)
  const isLogin = state.isLogin.get_login

  useEffect(() => {
    getCartList()
    getUsername()
  }, [])

  function getUsername() {
    const username = getCookie("name")
    if (username) {
      const slic = username.slice(3, 6)
      const repl = username.replace(slic, "****")
      setUser(repl)
      state.isLogin.set_login(true)
    } else {
      return false;
    }
  }

  async function getCartList() {
    try {
      const access_token = getCookie("access_token")
      const getCart = await axios({
        method: 'GET',
        url: `${apiUrl}/api/member/cart/get`,
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      const dataCart = getCart.data.cart.length
      setCart(dataCart)
    }
    catch (error) {
      console.log(error);
    }
  }

  async function onSignOut() {
    removeCookies("name")
    removeCookies("gender")
    removeCookies("access_token")
    removeCookies("member_code")
    removeCookies("store_code")
    removeCookies("refresh_token")
    state.isLogin.set_login(false)
    router.push('/')

  }

  return (
    <Fragment>
      <header>
        <div className="column-right">
          <a href="/">
            <div className="column-left">
              <img src="/assets/images/logo-fillfin.png" />
            </div>
          </a>
        </div>
        <div className="column-right">
          {isLogin
            ?
            <>
              <div className="column-time-member">
                <p><i className="fa-regular fa-clock" />เวลาสมาชิกคงเหลือ: 365 วัน</p>
                <button className="btn-apply">เพิ่มระยะเวลา</button>
              </div>
              <div className="column-dropdown-tel">
                <button onClick={() => setDropdownActive(prev => !prev)}>{user}<i className="fa-solid fa-angle-down" /></button>
                <div className={`dropdown-tel  ${dropdownActive && 'active'}`} id="dropdown-tel">
                  <div className="column-time-member">
                    <p><i className="fa-regular fa-clock" />เวลาสมาชิกคงเหลือ: 365 วัน</p>
                    <button className="btn-apply">เพิ่มระยะเวลา</button>
                  </div>
                  <button>รายการสั่งซื้อ</button>
                  <button onClick={() => onSignOut()}>ออกจากระบบ</button>
                </div>
              </div>
              <div className="column-btn-cart-shopping">
                <Link href="/member/cart">
                  <button className="btn-cart-shopping">
                    <i className="fa-solid fa-cart-shopping" />
                    {state.cartQty.get_cart_qty != 0
                      ? <div className="column-mumber" style={{ cursor: "pointer" }}><span>{state.cartQty.get_cart_qty}</span></div>
                      : <div className="column-mumber" style={{ cursor: "pointer" }}><span>{cart}</span></div>
                    }
                  </button>
                </Link>
              </div>
              <div className="column-menubar">
                <button className="btn-bars" onClick={() => setDropdownActiveMenu(prev => !prev)}><i className="fa-solid fa-bars" /></button>
                <div className={`navbar ${dropdownActiveMenu && 'active'}`} id="navbar">
                  <ul>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">ติดต่อเรา</a></li>
                  </ul>
                </div>
              </div>
            </>
            :
            <>
              <Link href="/login">
                <button className="btn-login">เข้าสู่ระบบ</button>
              </Link>
              <Link href="/store/register">
                <button className="btn-apply">สมัครร้านค้า</button>
              </Link>
              {/* <Link href="/member/cart"> */}
              <button className="btn">
                <i className="fa-solid fa-cart-shopping" />
              </button>
              {/* </Link> */}
            </>
          }
        </div>
      </header>
    </Fragment>
  );
}
