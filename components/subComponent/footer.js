import React, { Fragment } from 'react'

export default function Footer() {
  return (
    <Fragment>
      <footer>
        <div className="footer-column"  style={{ bottom : 0 ,width : '100%'}}>
          <div className="column-left">
            © 2022 Fillfin.com All Rights Reserved
          </div>
          <div className="column-right">
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </footer>
    </Fragment>
  )
}
