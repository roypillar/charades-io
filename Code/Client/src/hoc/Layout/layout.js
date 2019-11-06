import React, {Component} from 'react';
import './layout.css';

import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';


class Layout extends Component {
    state = {
        showNav: false
    }

    toggleSideNav = (show) => {
        this.setState({showNav: show});
    }

    render() {
        return (
            <div>
                <Header
                    showNav={this.state.showNav}
                    onHideNav={() => this.toggleSideNav(false)}
                    onShowNav={() => this.toggleSideNav(true)}
                    /> 
                    {this.props.children}
                <Footer/>
            </div>
        );
    }
}

export default Layout;
