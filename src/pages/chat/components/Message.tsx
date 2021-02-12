import React, { useEffect, useRef } from 'react'
import {format} from 'date-fns'
import "./Message.css";

export default function Message(props: any) {
    const { message, lastMessage} = props;
    const {body, date, username, ownedByCurrentUser} = message;
    const anchorRef: any = useRef();

    useEffect(() => {
        if (lastMessage){
            anchorRef.current.scrollIntoView()
        }
    }, [])
    
    return (
        <div ref={anchorRef} className="message">
            <div className="profile">{username}</div>
            <div className={`message-box ${ownedByCurrentUser && 'owner'}`}>
                <div>
                    <div>{body}</div>
                </div>
                <div className="message-box-timestamp">{format(new Date(date), "HH:mmaaa")}</div>
            </div>
        </div>
    )
}
