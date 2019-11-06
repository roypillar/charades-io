import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';


import Home from './components/Home/home';
import Layout from './hoc/Layout/layout';
import Game from './game';
import JoinGame from './components/Home/joingame';
import CreateGame from './components/Home/creategame';

class Routes extends Component {
    state = {}
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/create-game" exact component={CreateGame}/>
                    <Route path="/join-game" exact component={JoinGame}/>
                    <Route path="/:id" exact component={Game}/>
                </Switch>
            </Layout>
        );
    }
}

export default Routes;