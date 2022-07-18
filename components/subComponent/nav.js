import axios from "axios";
import { getCookie, removeCookies } from "cookies-next";
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
  const [username, setUsername] = useState(getCookie('name'))
  const [isStore, setIsStore] = useState(getCookie("storeName"))
  const [emptyPackage, setEmptyPackage] = useState(getCookie("emptyPackage"))

  const getIsStore = state.isStore.get_isStore
  const isLogin = state.isLogin.get_login
  const store = state.isStore.get_isStore
  const empPackage = state.emptyPackage.get_emptyPackage
  const cartQty = state.cartQty.get_cart_qty
  const usernameCon = state.memberDetail.get_memberDetail

  useEffect(() => {
    checkLogin()
  }, [isLogin])

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
        state.isLogin.set_login(true)
        getUsername()
      } else {
        state.isLogin.set_login(false)
      }
    }
  }

  function getUsername() {
    const cookieUsername = getCookie('name')
    state.memberDetail.set_memberDetail(cookieUsername)
    if (cookieUsername) {
      const slic = cookieUsername.slice(5, 8)
      const repl = cookieUsername.replace(slic, "****")
      setUser(repl)
      if (isStore == undefined) {
        getCartList()
        setCart(state.cartQty.get_cart_qty)
      } else {
        state.isStore.set_isStore(true)
      }
    }
  }

  async function getCartList() {
    const access_token = getCookie("access_token")
    try {
      const getCart = await axios({
        method: 'GET',
        url: `${apiUrl}/api/member/cart/get`,
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      const dataCart = getCart.data.cart.length
      state.cartQty.set_cart_qty(dataCart)
    }
    catch (err) {
      console.log(err.response);
    }
  }


  function onSignOut() {
    removeCookies("name")
    removeCookies("gender")
    removeCookies("access_token")
    removeCookies("member_code")
    removeCookies("store_code")
    removeCookies("storeName")
    removeCookies("refresh_token")
    removeCookies("emptyPackage")
    removeCookies("package")

    state.cartQty.set_cart_qty(0)
    state.isLogin.set_login(false)
    state.isStore.set_isStore(false)
    state.emptyPackage.set_emptyPackage(false)
    state.memberDetail.set_memberDetail("")
    router.push('/')
  }

  return (
    <Fragment>
      <header>
        <div className="column-right">
          <div className="column-left">
            <Link href='/'>
              <img style={{ cursor: "pointer" }} src="/assets/images/logo-fillfin.png" alt="image-logo" />
            </Link>
          </div>
        </div>
        <div className="column-right">
          {isLogin
            ?
            <>
              {!emptyPackage && !empPackage && !getIsStore
                ? <div className="column-time-member">
                  <p><i className="fa-regular fa-clock" />เวลาสมาชิกคงเหลือ: 365 วัน</p>
                  <button className="btn-apply">เพิ่มระยะเวลา</button>
                </div>
                : false
              }
              <div className="column-dropdown-tel">
                <button onClick={() => setDropdownActive(prev => !prev)}>{user || usernameCon}<i className="fa-solid fa-angle-down" /></button>
                <div className={`dropdown-tel  ${dropdownActive && 'active'}`} id="dropdown-tel">
                  {isStore == undefined
                    ? <>
                      <div className="column-time-member">
                        <p><i className="fa-regular fa-clock" />เวลาสมาชิกคงเหลือ: 365 วัน</p>
                        <button className="btn-apply">เพิ่มระยะเวลา</button>
                      </div>
                      <Link href='/member/order'>
                        <button>รายการสั่งซื้อ</button>
                      </Link>
                    </>
                    : false
                  }
                  <button onClick={() => onSignOut()}>ออกจากระบบ</button>
                </div>
              </div>
              {!emptyPackage && !empPackage && !getIsStore
                ? <div className="column-btn-cart-shopping">
                  <Link href="/member/cart">
                    <button className="btn-cart-shopping">
                      <i className="fa-solid fa-cart-shopping" />
                      <div className="column-mumber" style={{ cursor: "pointer" }}><span>{cartQty}</span></div>
                    </button>
                  </Link>
                </div>
                : null
              }

              <div className="column-menubar">
                <button className="btn-bars" onClick={() => setDropdownActiveMenu(prev => !prev)}><i className="fa-solid fa-bars" /></button>
                <div className={`navbar ${dropdownActiveMenu && 'active'}`} id="navbar">
                  <ul>
                    <li>
                      <Link href="/content/terms-of-service"><p style={{ cursor: 'pointer' }}>Terms of Service</p></Link>
                    </li>
                    <li>
                      <Link href="/content/privacy-policy"><p style={{ cursor: 'pointer' }}>Privacy Policy</p></Link>
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
