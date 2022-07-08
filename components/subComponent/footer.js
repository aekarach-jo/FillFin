import React, { Fragment } from 'react'
import { useAppContext } from '../../config/state'

export default function Footer() {
  const state = useAppContext()


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
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </footer>
    </Fragment>
  )
}
