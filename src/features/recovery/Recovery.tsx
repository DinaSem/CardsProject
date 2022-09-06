import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {forgotPasswordTC, setEmailAC} from "../Login/auth-reducer";

const Recovery = () => {
    const[email, setEmail]=useState<string>('')
    const dispatch = useDispatch()

    const onClickHandler = () => {
        if(email){
            dispatch(forgotPasswordTC(email))
        }
    }

    if(email){
        dispatch(setEmailAC(email))
    }
    return (
        <div>
            <div style={{marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 'auto',
                maxHeight:'100vh',
                width: '6em'}}><h1>Recovery page</h1></div>
            <input value={email} onChange={(e)=>setEmail(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>SEND</button>
        </div>
    );
};

export default Recovery;