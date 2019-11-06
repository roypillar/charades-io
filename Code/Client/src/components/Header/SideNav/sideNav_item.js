import React from 'react';
import { Link } from 'react-router-dom';

import FontAwesome from 'react-fontawesome';



const SideNavItem = (props) => {
    return ( 
        <div className={props.type}>
        <Link to={props.link}>
             <FontAwesome name={props.icon}/>
             {props.text}
        </Link>
           
        </div>
     );
}
 
export default SideNavItem;