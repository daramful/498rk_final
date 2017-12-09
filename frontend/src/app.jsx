import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
// import Signup from './components/Register/Register.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import StartParty from './components/StartParty/StartParty.jsx';
import JoinParty from './components/JoinParty/JoinParty.jsx';
import Channel from './components/Channel/Channel.jsx';

import styles from './styles/main.scss';

render(
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
			<Route exact path="/dashboard" component={Dashboard}/>
			<Route exact path="/startParty" component={StartParty}/>
			<Route exact path="/joinParty" component={JoinParty}/>
			<Route exact path="/channels/:id" component={Channel}/>
        </Switch>
    </Router>,
    document.getElementById('react-app')
);
