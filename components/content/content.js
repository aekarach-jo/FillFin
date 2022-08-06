import React, { Fragment } from 'react'
import ContactUs from '../subComponent/contactUs'

export default function Content({ content }) {
    return (
        <Fragment>
            <div className="terms-service">
                <div className="img-background">
                    <img className="img-left" src="/assets/images/man.png" alt="image-men" />
                    <img className="img-right" src="/assets/images/woman.png" alt="image-women" />
                </div>
                <ContactUs />
                <div className="terms-service-column">
                    <div className="text-head">
                        <h2>{content.title}</h2>
                    </div>
                    <div className="column-text">
                        <div style={{ wordWrap: 'break-word', display: 'inline-block' }}>
                            <div className="editor" dangerouslySetInnerHTML={{ __html: `${content.content}` }} />
                        </div>
                        {/* {content.content} */}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
