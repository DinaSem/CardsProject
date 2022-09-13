import React, {useEffect} from 'react'
import './App.css'
import {ErrorSnackbar} from '../../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from "../auth/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {Error404} from "../404/Error404";
import {Profile} from "../auth/profile/Profile";
import {NewPassword} from "../auth/newPassword/NewPassword";
import {Recovery} from "../auth/recovery/Recovery";
import {Registration} from "../auth/registration/Registration";
import {Navbar} from "../navbar/Navbar";
import {PacksTable} from "../packs/packs-list/packs-table";
import {useAppDispatch, useAppSelector} from "../../components/hooks";
import {initializeAppTC, setAppInitializedAC} from "./app-reducer";

export const App = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector((state) => state.app.isInitialized)
    //const error = useAppSelector((state) => state.app.error)

    useEffect(() => {
        dispatch(initializeAppTC())

        return () => {
            dispatch(setAppInitializedAC(false))///???
        }
    }, [dispatch])


    if (!isInitialized) {
        return (
            <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
                <div>ОЖИДАЕМ ИДЕТ СОЕДИНЕНИЕ С СЕРВЕРОМ</div>
                <p>...is loading</p>
            </div>
        )
    }

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


