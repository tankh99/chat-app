import { Button } from 'antd';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import "./ChatPage.css"
import {ArrowLeftOutlined, BackwardOutlined, SendOutlined} from '@ant-design/icons';
import useChat from './useChat';
import Message from './components/Message';

export default function ChatPage() {
    const location: any = useLocation();
    const [username, setUsername] = useState("")

    const {id: roomId}: any = useParams();
    const {messages, sendMessage} = useChat(roomId)
    

    useEffect(() => {
        // if (location.state){
        //     setUsername(location.state.username)
        // }
        setUsername(location.state && location.state.username ? location.state.username : "Anonymous")
        // setUsername(localStorage.getItem("username") || "Anonymous")

    }, [])

    

    const handleSubmit = (values: any, {resetForm}: any) => {
        console.log(values)
        sendMessage(values.message, username)
        resetForm()
    }

    return (
        <div className="chat-page">
            <div className="chat-window">
                <div className="chat-window-header">
                    <Link to="/home" className="chat-window-back-link">
                    <ArrowLeftOutlined color="white" />
                    </Link>
                    <div className="chat-window-title">{roomId}</div>
                    <div></div>
                </div>
                
                <div className="chat-box-container">
                <div className="chat-box">
                    <div className="messages-list">
                        {messages.map((message: any, i: number) => {
                            // console.log(messages)
                            // console.log(message);
                            const lastMessage = i == messages.length - 1
                            return (
                                <Message 
                                    key={i}
                                    message={message} 
                                    lastMessage={lastMessage}/>
                            )
                        })}
                    </div>
                </div>
                </div>
                <div className="typing-area-container">
                <Formik
                    initialValues={{message: ""}}
                    onSubmit={handleSubmit}>
                    <Form className="typing-area">
                        <Field className="type-box" name="message" placeholder="Type something..."/>
                        <Button className="send-btn" type="primary" shape="circle" size="large" icon={<SendOutlined/>}></Button>
                    </Form>
                </Formik>
                </div>
                
            </div>
        </div>
    )
}
