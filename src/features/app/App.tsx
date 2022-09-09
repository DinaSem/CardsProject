import React, {useEffect} from 'react'
import './App.css'
import {ErrorSnackbar} from '../../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from "../Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {Error404} from "../404/Error404";
import Profile from "../profile/Profile";
import NewPassword from "../newPassword/NewPassword";
import Recovery from "../recovery/Recovery";
import {Registration} from "../registration/Registration";
import Test from "../test/Test";
import Navbar from "../navbar/Navbar";
import {useDispatch} from "react-redux";
import {initializeAppTC} from "../../bll/auth-reducer";
import {PacksTable} from "../packs-list/packs-table";



export const App = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(initializeAppTC())
    },[dispatch])

    return <div className="App">
        <ErrorSnackbar/>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Profile/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='newpass' element={<NewPassword/>}/>
            <Route path='recovery' element={<Recovery/>}/>
            <Route path='registration' element={<Registration/>}/>
            <Route path='set-new-password/:token' element={<NewPassword/>}/>
            <Route path='packs' element={<PacksTable/>}/>
            <Route path='404' element={<Error404/>}/>
            <Route path='*' element={<Navigate to='/404'/>}/>
        </Routes>

    </div>
}


