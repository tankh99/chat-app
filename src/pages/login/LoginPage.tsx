import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useHistory } from 'react-router-dom';

export default function LoginPage() {

    const history = useHistory();

    const handleSubmit = (values: any) => {
        console.log(values);
        const {username} = values
        localStorage.setItem("username", username);
        history.push("/chat", values)
    }

    return (
        <div>
            <Formik
                initialValues={{username: ""}}
                onSubmit={(values: any) => handleSubmit(values)}>
                <Form>
                    <Field name={"username"} placeholder="wackyhorse99"/>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>

        </div>
    )
}
