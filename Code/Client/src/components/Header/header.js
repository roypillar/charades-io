import React from 'react';
import style from './header.css';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import SideNav from './SideNav/sideNav';

const Header = (props) => {

    const navBars = () => (
        <div>
            <FontAwesome
                name="bars"
                onClick={props.onShowNav}
                style={{
                color: '#265F18',
                paddingTop: '12px',
                paddingLeft: '12px',
                paddingRight: '12px',

                cursor: 'pointer'
            }}/>
        </div>
    )

    const logo = () => (
        <Link to="/" className={style.logo}>
            <img alt="logo" src="/images/logo.png"/>
        </Link>
    )

    return (
        <header className={style.header}>
            <SideNav {...props}/>
            <div className={style.headerOpt}>
                {navBars()}
                {logo()}
            </div>
        </header>
    )
}

export default Header;