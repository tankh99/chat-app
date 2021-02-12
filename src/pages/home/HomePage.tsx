import { Button, Input, notification } from 'antd'
import { Formik, Form } from 'formik'
import React from 'react'
import { useHistory } from 'react-router-dom';
import "./HomePage.css"
import * as Yup from 'yup'
import TextField from '../../components/form/TextField';

const validationSchema = Yup.object().shape({
    roomID: Yup.string().required("Room ID is required"),
    username: Yup.string()
})

export default function HomePage() {

    const history: any = useHistory();
    const goToRoom = (values: any) => {
        const {username, roomID} = values;
        // localStorage.setItem("username", username)
        history.push(`/chat/${values.roomID}`, {username})
    }
    return (
        <div className="home-page">
            <div>
            <h1 className="home-page-title">Join a Chatroom</h1>
            <Formik
                initialValues={{username: "", roomID: ""}}
                validationSchema={validationSchema}
                onSubmit={(values: any) => goToRoom(values)}>
                    {(formikBag: any) => {
                        return (
                            <Form className="form">
                                <TextField size="large" name="roomID" placeholder="Room Name" formikBag={formikBag}/>
                                <TextField size="large" name="username" placeholder="Username" formikBag={formikBag}/>
                                <button className="join-room-btn" type="submit">Join Room</button>
                            </Form>
                        )
                    }}
            </Formik>
            </div>
        </div>
    )
}
