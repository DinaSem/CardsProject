import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logOutTC, setIsLoggedOutAC, updateUserTC} from "../Login/auth-reducer";
import {Navigate} from "react-router-dom";
import {AppRootStateType} from "../../app/store";
import {UserDataResponseType} from "../../api/cards-api";
import {EditableSpan} from '../../components/EditableSpan/EditableSpan';
import TextField from "@mui/material/TextField";


const Profile = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    // @ts-ignore
    const userName = useSelector<AppRootStateType, string >((state) => state.auth.user?.name)
    const dispatch = useDispatch()
    const [nameFromInput, setNameFromInput] = useState<string>('')

    const onClickHandler = () => {
        dispatch(logOutTC())
    }
    const onClickNewNameHandler = () => {
        // debugger
        dispatch(updateUserTC(nameFromInput))
    }
    useEffect(() => {
        userName && setNameFromInput(userName)

    }, [userName])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }


    return (
        <div>
            <div style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 'auto',
                maxHeight: '100vh',
                width: '6em'
            }}><h1 style={{color: 'black'}}>Profile</h1></div>
            <div>
                <EditableSpan value={nameFromInput} onChange={setNameFromInput}/>
                <button onClick={onClickNewNameHandler}>SAVE</button>
            </div>
            <button onClick={onClickHandler}>Logout</button>
        </div>
    )
};

export default Profile;