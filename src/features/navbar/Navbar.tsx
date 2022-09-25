import React from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import s from './navbar.module.css'
import letslearn from './../../images/letsLearn1.png'
import {useAppSelector} from "../../components/hooks";
import avatar from './../../images/avatar.jpg'

export const Navbar = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const name = useAppSelector((state) => state.profile.user.name)
    const navigate = useNavigate()


    const goToProfileOnClickHandler = () => {
        navigate('/login')
    }

    return (
        <div className={s.nav}>
            {/*<NavLink to={{pathname:'/'}}>Profile</NavLink>*/}
            {/*<NavLink to={{pathname: 'login'}}>Login</NavLink>*/}
            {/*<NavLink to={{pathname:'recovery'}}>Recovery</NavLink>*/}
            {/*<Link to={'registration'}>Registration</Link>*/}
            <img className={s.letsLearnImg} src={letslearn} alt=""/>
            {/*<Link to={'packs'}>Packs</Link>*/}
            {/*<Link to={'set-new-password/:token'}>NewPassword</Link>*/}
            {/*<Link to={{pathname:'404'}}>Error404</Link>*/}
            {isLoggedIn
                ? <div style={{alignItems:'center', display:'flex'}} onClick={goToProfileOnClickHandler}>
                    <div>{name}</div>
                    <img src={avatar} alt="" style={{width: '45px', borderRadius:'50%', marginLeft:'10px'}}/>
                </div>
                : <button className={s.LogInButton}>
                    <NavLink to={{pathname: 'login'}} className={s.loginNavLink}>Sign in</NavLink>
                </button>

            }

        </div>
    );
};
