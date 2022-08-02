import Image from 'next/image'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import st from '../../styles/contactUs.module.scss'

export default function ContactUs() {
    const chatBody = useRef(0)
    const [toggleChat, setToggleChat] = useState(false)
    const [fakeConversation, setFakeConversation] = useState([]);
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (toggleChat) {
            API_GET_DATA().then(res => {
                setFakeConversation(res);
                setTimeout(() => {
                    if (chatBody.current != null) {
                        chatBody.current
                            .scrollTo({
                                behavior: "smooth",
                                top: chatBody.current.scrollHeight,
                            })
                    }
                }, 500)
            })
        }
    }, [toggleChat])

    function API_GET_DATA() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    {
                        id: 1,
                        is_admin: true,
                        message: 'Admin'
                    },
                    {
                        id: 2,
                        is_admin: false,
                        message: 'member'
                    },
                    {
                        id: 3,
                        is_admin: true,
                        message: 'Admin'
                    },
                    {
                        id: 4,
                        is_admin: true,
                        message: 'Admin'
                    },
                    {
                        id: 5,
                        is_admin: false,
                        message: 'member'
                    },

                ])
            }, 350)
        })
    }

    function onSendMessageClick() {
        setFakeConversation(prev => ([
            ...prev,
            {
                id: Math.random(),
                is_admin: false,
                message: message
            }
        ]))
        setMessage('')
        setTimeout(() => {
            chatBody.current
                .scrollTo({
                    behavior: "smooth",
                    top: chatBody.current.scrollHeight,
                })
        }, 200)
    }


    return (
        <Fragment>
            <div className="contact-us">
                <div className="column-contact-us">
                    {!toggleChat &&
                        <div className="text-contact-us">
                            <p>ติดต่อเรา</p>
                        </div>
                    }
                    <div className="img-contact-us" onClick={() => setToggleChat(!toggleChat)}>
                        <Image className={st.logoContact} width={57} height={57} src="/assets/images/contact.jpg" alt="image-contactUs" />
                    </div>
                </div>
            </div>
            {toggleChat &&
                <div className={st.chatContent}>
                    <div className={st.chatHeader}>
                        <p>Fillfin</p>
                    </div>
                    <div className={st.chatBody} ref={chatBody}>
                        {fakeConversation?.map((data, index) => (
                            <div key={data.id}>
                                {!data.is_admin
                                    ? <div className={st.memberChat}>
                                        <img className={st.iconMember} src="/assets/images/product.png" alt="image-contactUs" />
                                        <p>{data.message}</p>
                                    </div>
                                    : <div className={st.adminChat}>
                                        <img className={st.iconAdmin} src="/assets/images/contact.jpg" alt="image-contactUs" />
                                        <p>{data.message}</p>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                    <div className={st.chatFooter}>
                        <span className={st.iconPlus}>
                            <i className="fa-solid fa-circle-plus"></i>
                        </span>
                        <textarea
                            value={message}
                            type="text"
                            onChange={(e) => setMessage(e.target.value)} />
                        <span className={st.iconSend}>
                            <i
                                className="fa-solid fa-paper-plane"
                                onClick={(e) => onSendMessageClick()}
                            ></i>
                        </span>
                    </div>
                </div>
            }
        </Fragment>
    )
}
