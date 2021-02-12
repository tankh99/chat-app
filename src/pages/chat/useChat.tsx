import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';

const DOMAIN_URL = window.location.hostname + ':4000'
const NEW_MESSAGE_EVENT = "newChatMessage"

const useChat = (roomId: string) => {

    const [messages, setMessages]: any = useState([])
    // const socket = io(DOMAIN_URL, {transports: ["websocket", "xhr-polling", "htmlfile", "jsonp-polling"]})
    const socketRef: any = useRef();
    
    useEffect(() => {
        socketRef.current = io(DOMAIN_URL, {
            query: {roomId}
        })

        socketRef.current.on("connection", (socket:any) => {
            console.log(socket)
        })

        socketRef.current.on("connect_error", (err: any) => {
            console.log(err)
        })

        socketRef.current.on('connect_timeout', function(err: any) {
            console.log("client connect_timeout: ", err);
        });

        socketRef.current.on(NEW_MESSAGE_EVENT, (message:any) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId == socketRef.current.id
            }
            setMessages((oldMessages: any) => [...oldMessages, incomingMessage]);
        })
        // socketRef.on("connection", (socket: any) => {
        //     console.log(socket)
        // })


        // socketRef.current.on(NEW_MESSAGE_EVENT, (data: any) => {
        //     console.log(data)
        // })
        return () => {
            socketRef.current.disconnect();
        }
    }, [roomId])

    const sendMessage = (message: string, username:string) => {
        socketRef.current.emit(NEW_MESSAGE_EVENT, {
            body: message,
            username,
            senderId: socketRef.current.id,
            date: new Date()
        })
    }

    return {messages, sendMessage};
}

export default useChat