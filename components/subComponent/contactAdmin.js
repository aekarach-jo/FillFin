import React, { Fragment } from 'react'
import nextConfig from '../../next.config'

const apiUrl = nextConfig.apiPath
export default function ContactAdmin({ qrCode }) {
    return (
        <Fragment>
             <footer>
                <div className="footer-column-top">
                    <button className="btn-admin">ติดต่อแอดมิน</button>
                    <div className="column-center">
                        <button className="btn-line">ไลน์ {qrCode.content}</button>
                    </div>
                    <img src={`${apiUrl}${qrCode.imageLink}`} alt="qr" />
                </div>
            </footer>
        </Fragment>
    )
}
