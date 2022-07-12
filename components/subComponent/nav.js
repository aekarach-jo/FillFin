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
  const [username, setUsername] = useState(getCookie('name'))


  useEffect(() => {
    checkLogin()
  }, [])

  async function checkLogin() {
    const access_token = getCookie("access_token")
    if (access_token) {
      const apiCheck = await axios({
        method: 'POST',
        url: `${apiUrl}/api/member/checkToken`,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
          token: access_token
        })
      })
      if (apiCheck.data.status) {
        getUsername()
      } else {
        state.isLogin.set_login(false)
      }
    }
  }

  function getUsername() {
    if (username) {
      const slic = username.slice(3, 6)
      const repl = username.replace(slic, "****")
      setUser(repl)
      getCartList()
      state.isLogin.set_login(true)
    } else {
      state.isLogin.set_login(true)
    }
  }

  async function getCartList() {
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
          <div className="column-left">
            <Link href='/'>
              <img src="/assets/images/logo-fillfin.png" />
            </Link>
          </div>
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
                  <Link href='/member/order'>
                    <button>รายการสั่งซื้อ</button>
                  </Link>
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
                    <li>
                      <Link href="/content/1">Terms of Service</Link>
                    </li>
                    <li>
                      <Link href="/content/2">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link href="#">ติดต่อเรา</Link>
                    </li>
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
              {/* <Link href="/member/cart">
              <button className="btn">
                <i className="fa-solid fa-cart-shopping" />
              </button>
              </Link> */}
            </>
          }
        </div>
      </header>
    </Fragment>
  );
}
