import Image from 'next/image'
import React, { Fragment } from 'react'

export default function ContactUs() {
    return (
        <Fragment>
            <div className="contact-us">
                <div className="column-contact-us">
                    <div className="text-contact-us">
                        <p>ติดต่อเรา</p>
                    </div>
                    <div className="img-contact-us">
                        <Image width={57} height={57} src="/assets/images/contact.jpg" alt="image-contactUs" />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
