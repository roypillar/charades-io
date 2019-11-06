import React from 'react';
import {Link} from 'react-router-dom';

import style from './footer.css';

import {CURRENT_YEAR} from '../../config';

const Footer = () => (
    <div className={style.footer}>
        <Link to="/" className={style.logo}>
            <img alt="logo" src="/images/logo.png"/>
        </Link>
        <div>
            @Charades app All rights reserved 2018-{CURRENT_YEAR}
        </div>
    </div>
);

export default Footer;