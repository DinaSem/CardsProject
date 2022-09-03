import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import s from './navbar.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";

const Navbar = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)

    return (
        <div className={s.nav}>
            <NavLink to={{pathname:'/'}}>Profile</NavLink>
            {!isLoggedIn
                ? <NavLink to={{pathname: 'login'}}>Login</NavLink>
                : <NavLink to={{pathname: 'login'}}>Logout</NavLink>
            }
            <NavLink to={{pathname:'recovery'}}>Recovery</NavLink>
            <Link to={'registration'}>Registration</Link>
            <Link to={'test'}>Test</Link>
            <Link to={{pathname:'404'}}>Error404</Link>
        </div>
    );
};

export default Navbar;