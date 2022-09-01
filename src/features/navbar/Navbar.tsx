import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import Profile from "../profile/Profile";
import {Login} from "../Login/Login";
import NewPassword from "../newPassword/NewPassword";
import Recovery from "../recovery/Recovery";
import Registration from "../registration/Registration";
import Test from "../test/Test";
import {Error404} from "../404/Error404";
import s from './navbar.module.css'

const Navbar = () => {
    return (
        <div className={s.nav}>
            <NavLink to={{pathname:'/'}}>Profile</NavLink>
            <NavLink to={{pathname:'login'}}>Login</NavLink>
            <NavLink to={{pathname:'recovery'}}>Recovery</NavLink>
            <Link to={'registration'}>Registration</Link>
            <Link to={'test'}>Test</Link>
            <Link to={{pathname:'404'}}>Error404</Link>
        </div>
    );
};

export default Navbar;