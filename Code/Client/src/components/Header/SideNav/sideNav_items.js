import React, { Component } from 'react';  

import SideNavItem from './sideNav_item';

import style from './sideNav.css';



const items = [
    {
        type: style.sideNavItem,
        icon: 'home',
        text: 'Home',
        link: '/'
    },

    {
        type: style.sideNavItem,
        icon: 'file-text-o',
        text: 'News',
        link: '/news'
    },

    {
        type: style.sideNavItem,
        icon: 'play',
        text: 'Videos',
        link: '/videos'
    },
    
    {
        type: style.sideNavItem,
        icon: 'sign-in',
        text: 'Sign in',
        link: '/sign-in'
    },

    // {
    //     type: style.sideNavItem,
    //     icon: 'sign-out',
    //     text: 'Sign out',
    //     link: '/sign-out'
    // },
];


class SideNavItems extends Component {
    state = {  }
    render() { 
        return ( 
            items.map((item,i) => 
            
                (<SideNavItem key={i} {...item}/>)
            
         )
        )
        }
}

export default SideNavItems;   