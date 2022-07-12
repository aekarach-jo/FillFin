import Link from 'next/link'
import React, { Fragment } from 'react'

export default function Footer() {
  return (
    <Fragment>
      <footer >
        <div className="footer-column"
        // style={{ position:"fixed", bottodm: 0}}
        >
          <div className="column-left">
            © 2022 Fillfin.com All Rights Reserved
          </div>
          <div className="column-right">
            <Link href='/content/terms-of-service'>
              <p style={{ cursor: "pointer" }}>Terms of Service</p>
            </Link>
            <Link href='/content/privacy-policy'>
              <p style={{ cursor: "pointer" }}>Privacy Policy</p>
            </Link>
          </div>
        </div>
      </footer>
    </Fragment>
  )
}
