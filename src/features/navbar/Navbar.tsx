import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import s from './navbar.module.css'

export const Navbar = () => {
    return (
        <div className={s.nav}>
            <NavLink to={{pathname:'/'}}>Profile</NavLink>
            <NavLink to={{pathname: 'login'}}>Login</NavLink>
            <NavLink to={{pathname:'recovery'}}>Recovery</NavLink>
            <Link to={'registration'}>Registration</Link>
            <Link to={'packs'}>Packs</Link>
            <Link to={'set-new-password/:token'}>NewPassword</Link>
            <Link to={{pathname:'404'}}>Error404</Link>
        </div>
    );
};
