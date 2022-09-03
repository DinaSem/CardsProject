import React, {useEffect} from 'react'
import './App.css'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {Error404} from "../features/404/Error404";
import Profile from "../features/profile/Profile";
import NewPassword from "../features/newPassword/NewPassword";
import Recovery from "../features/recovery/Recovery";
import {Registration} from "../features/registration/Registration";
import Test from "../features/test/Test";
import Navbar from "../features/navbar/Navbar";
import {useDispatch} from "react-redux";
import {initializeAppTC} from "../features/Login/auth-reducer";




export const App = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(initializeAppTC())
    },[])
    return <div className="App">
        <ErrorSnackbar/>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Profile/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='newpass' element={<NewPassword/>}/>
            <Route path='recovery' element={<Recovery/>}/>
            <Route path='registration' element={<Registration/>}/>
            <Route path='test' element={<Test/>}/>
            <Route path='404' element={<Error404/>}/>
            <Route path='*' element={<Navigate to='/404'/>}/>
        </Routes>

    </div>
}


