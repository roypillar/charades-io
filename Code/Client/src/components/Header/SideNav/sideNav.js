import React, {Component} from 'react';
import SideNav from 'react-simple-sidenav';

import SideNavItems from './sideNav_items';

class MySideNav extends Component {
    state = {}

    render() {
        return (
            <div>
                <SideNav 
                showNav={this.props.showNav}
                onHideNav={this.props.onHideNav}
                onShowNav={this.props.onShowNav}
                navStyle={{
                    background: '#242424',
                    maxWidth: '180px',
                }}
                    >
                    <SideNavItems items={this.props.sideNavItems}/>
                </SideNav>
            </div>
        );
    }
}

export default MySideNav;
