import React from 'react';
import {FormFieldProps} from './formProps'
import {Input} from 'antd'

interface P extends FormFieldProps {
    [x:string]:any
}

export default function TextField(props: P) {
    const {name, label, value, formikBag, ...rest} = props
    const {values, handleChange, errors} = formikBag
    return (
        <div className="input">
            {label ? <label>{label}</label> : null}
            <Input
                name={name}
                value={value ? value : values[name]}
                onChange={handleChange}
                {...rest}/>
            {errors[name] && 
                <div className="err-msg">{errors[name]}</div>
            }
        </div>
    )
}