import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {forgotPasswordTC, setEmailAC, setNewPasswordTC} from "../Login/auth-reducer";
import {useParams} from "react-router-dom";

const NewPassword = () => {
    const[password, setPassword]=useState<string>('')
    const dispatch = useDispatch()
    const param = useParams<'token'>()
    const resetPasswordToken = param.token

    const onClickHandler = useCallback(() => {
        if(resetPasswordToken){
            dispatch(setNewPasswordTC(password,resetPasswordToken))
        }},[dispatch, password, resetPasswordToken])
console.log('password',password)
console.log('resetPasswordToken',resetPasswordToken)
    return (
        <div>
            <div style={{marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 'auto',
                maxHeight:'100vh',
                width: '6em'}}><h1>New Password</h1></div>
            <input value={password} onChange={(e)=>setPassword(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>SEND</button>
        </div>
    );
};

export default NewPassword;