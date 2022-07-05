import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

export default function Nav({ data }) {
  return (
    <Fragment>
      <header>
        <div className="column-right">
          <a href="/">
            <Image
              style={{ cursor: "pointer" }}
              src="/assets/images/logo-fillfin.png"
              alt="Fillfin_logo"
              width={122}
              height={46}
              layout='fixed'
            />
          </a>
        </div>
        <div className="column-right">
          <Link href="/login">
            <button className="btn-login">เข้าสู่ระบบ</button>
          </Link>
          <Link href="/store/register">
            <button className="btn-apply">สมัครร้านค้า</button>
          </Link>
          <Link href="/member/cart">
          <button className="btn">
            <i className="fa-solid fa-cart-shopping" />
          </button>
          </Link>
          <button className="btn">
            <i className="fa-solid fa-bars" />
          </button>
        </div>
      </header>
    </Fragment>
  );
}
