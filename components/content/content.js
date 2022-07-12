import React, { Fragment } from 'react'

export default function Content({ content }) {
    console.log(content)
    return (
        <Fragment>
            <div className="terms-service">
                <div className="img-background">
                    <img className="img-left" src="/assets/images/man.png" />
                    <img className="img-right" src="/assets/images/woman.png" />
                </div>
                <div className="contact-us">
                    <div className="column-contact-us">
                        <div className="text-contact-us">
                            <p>ติดต่อเรา</p>
                        </div>
                        <div className="img-contact-us">
                            <img src="/assets/images/contact.jpg" />
                        </div>
                    </div>
                </div>
                <div className="terms-service-column">
                    <div className="text-head">
                        <h2>Fillfin Terms of Service</h2>
                    </div>
                    <div className="column-text">
                        <h4>01 . Massa quis risus eu arcu est sodales. fox.</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit tristique accumsan nam sapien. Augue facilisi dui pellentesque vitae. Convallis et ut enim est, arcu dis mattis nisl. Donec tincidunt quis consequat, faucibus.
                            Mauris aenean risus, laoreet amet, amet convallis pellentesque viverra sollicitudin. Sed sagittis pulvinar at ultricies augue. </p>
                    </div>
                    <div className="column-text">
                        <h4>02 . Laoreet enim egestas aliquet ac rhoncus vel.</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit tristique accumsan nam sapien. Augue facilisi dui pellentesque vitae. Convallis et ut enim est, arcu dis mattis nisl. Donec tincidunt quis consequat, faucibus.
                            Mauris aenean risus, laoreet amet, amet convallis pellentesque viverra sollicitudin. Sed sagittis pulvinar at ultricies augue. </p>
                    </div>
                    <div className="column-text">
                        <h4>03 . ilisis fermentum velit nisl pulvinar amet sed.</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit tristique accumsan nam sapien. Augue facilisi dui pellentesque vitae. Convallis et ut enim est, arcu dis mattis nisl. Donec tincidunt quis consequat, faucibus.
                            Mauris aenean risus, laoreet amet, amet convallis pellentesque viverra sollicitudin. Sed sagittis pulvinar at ultricies augue. </p>
                    </div>
                    <div className="column-text">
                        <h4>04 . Platea et pretium lectus pretium purus tem</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit tristique accumsan nam sapien. Augue facilisi dui pellentesque vitae. Convallis et ut enim est, arcu dis mattis nisl. Donec tincidunt quis consequat, faucibus.
                            Mauris aenean risus, laoreet amet, amet convallis pellentesque viverra sollicitudin. Sed sagittis pulvinar at ultricies augue. </p>
                    </div>
                    <div className="column-text">
                        <h4>05 . Amet sed laoreet morbi senectus ullamcorper est.</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit tristique accumsan nam sapien. Augue facilisi dui pellentesque vitae. Convallis et ut enim est, arcu dis mattis nisl. Donec tincidunt quis consequat, faucibus.
                            Mauris aenean risus, laoreet amet, amet convallis pellentesque viverra sollicitudin. Sed sagittis pulvinar at ultricies augue. </p>
                    </div>
                    <div className="column-text">
                        <h4>06 . Lorem ipsum dolor sit amet, consectetur adipiscing</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit tristique accumsan nam sapien. Augue facilisi dui pellentesque vitae. Convallis et ut enim est, arcu dis mattis nisl. Donec tincidunt quis consequat, faucibus.
                            Mauris aenean risus, laoreet amet, amet convallis pellentesque viverra sollicitudin. Sed sagittis pulvinar at ultricies augue. </p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
