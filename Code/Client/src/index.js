import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './styles/style.css'
import Routes from './routes';


class App extends Component {


    render() {
        return (
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(
    <App/>, document.getElementById('root'));
