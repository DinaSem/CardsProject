import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {setEmailAC} from "../Login/auth-reducer";

const Recovery = () => {
    const[email, setEmail]=useState<string>('')
    const dispatch = useDispatch()

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
            <input value={email} onChange={()=>setEmail(email)}/>
        </div>
    );
};

export default Recovery;