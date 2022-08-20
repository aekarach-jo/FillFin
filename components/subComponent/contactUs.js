import axios from 'axios'
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useAppContext } from '../../config/state'
import nextConfig from '../../next.config'
import st from '../../styles/contactUs.module.scss'
const { io } = require("socket.io-client");

const apiSocket = nextConfig.socketPath
const apiUrl = nextConfig.apiPath
export default function ContactUs() {
    const chatBody = useRef(0)
    const [toggleChat, setToggleChat] = useState(false)
    const [conversation, setConversation] = useState([]);
    const [message, setMessage] = useState('')
    const state = useAppContext()
    const socket = io(apiSocket)
    const access_token = getCookie('access_token')
    const isLogin = state.isLogin.get_login
    const isStore = state.isStore.get_isStore
    const [statusRead, setStatusRead] = useState(true)
    const username = getCookie('name')
    useEffect(() => {
        if (toggleChat) {
            apiReadChat()
            apiGetChat()
        }
        console.log(isStore);
    }, [toggleChat])


    socket.on("connect", () => {
        console.log('connected'); // x8WIv7-mJelg7on_ALbx
    });

    socket.on(`user-${username}`, (req, res) => {
        console.log(res)
        console.log(req)
        onSetChatMessage(req)
    })

    function onSetChatMessage(req) {
        setConversation(prev => ([
            ...prev,
            {
                username: req.username,
                role: req.role,
                message: req.message
            }
        ]))
        apiGetChat()
        setMessage('')
        // setTimeout(() => {
        //     if (toggleChat) {
        //         chatBody.current
        //             .scrollTo({
        //                 behavior: "smooth",
        //                 top: chatBody.current.scrollHeight,
        //             })
        //     }
        // }, 200)
    }

    async function apiGetChat() {
        try {
            await axios({
                method: 'get',
                url: `${apiUrl}/api/member/getOldChat`,
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
            }).then(res => {
                setStatusRead(res.data.statusRead)
                setConversation(res.data.oldMessage);
                if (toggleChat) {
                    setTimeout(() => {
                        if (chatBody.current != null) {
                            chatBody.current
                                .scrollTo({
                                    behavior: "smooth",
                                    top: chatBody.current.scrollHeight,
                                })
                        }
                    }, 500)
                }
                console.log(res);
            })
        } catch (err) {
            console.log(err);
        }
    }
    async function apiReadChat() {
        try {
            await axios({
                method: 'get',
                url: `${apiUrl}/api/member/readChat`,
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
            })
        } catch (err) {
            console.log(err);
        }
    }



    async function onSendMessageClick() {
        setConversation(prev => ([
            ...prev,
            {
                role: 'member',
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
        try {
            await axios({
                method: 'POST',
                url: `${apiUrl}/api/member/chatToAdmin`,
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                data: {
                    message: message,
                }
            }).then(res => {
                console.log(res);
            })
        } catch (err) {
            console.log(err);
        }
    }

    const something = (event) => {
        if (event.keyCode === 13) {
            onSendMessageClick()
        }
    }


    return (
        <Fragment>
            {isLogin && !isStore &&
                <>
                    <div className="contact-us">
                        <div className="column-contact-us">
                            {!toggleChat &&
                                <div className="text-contact-us">
                                    <p>ติดต่อเรา</p>
                                </div>
                            }
                            <div className="img-contact-us" onClick={() => setToggleChat(!toggleChat)}>
                                {!statusRead &&
                                    < div className={st.statusChat}>
                                        <div className={st.newMessage}>  </div>
                                    </div>
                                }
                                <Image className={st.logoContact} width={57} height={57} src="/assets/images/contact.jpg" alt="image-contactUs" />
                            </div>
                        </div>
                    </div>
                    {
                        toggleChat &&
                        <div className={st.chatContent}>
                            <div className={st.chatHeader}>
                                <p>Fillfin</p>
                            </div>
                            <div className={st.chatBody} ref={chatBody}>
                                {conversation?.map((data, index) => (
                                    <div key={index}>
                                        {data.role == 'member'
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
                                <input
                                    value={message}
                                    type="text"
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => something(e)}
                                />
                                <span className={st.iconSend}>
                                    <i
                                        className="fa-solid fa-paper-plane"
                                        onClick={(e) => onSendMessageClick()}
                                    ></i>
                                </span>
                            </div>
                        </div>
                    }
                </>
            }
        </Fragment >
    )
}
