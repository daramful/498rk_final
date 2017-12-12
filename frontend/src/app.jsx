import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import StartParty from './components/StartParty/StartParty.jsx';
import JoinParty from './components/JoinParty/JoinParty.jsx';
import Channel from './components/Channel/Channel.jsx';
import HomeBar from './components/Home/HomeBar.jsx';
import Authenticate from './components/Authenticate/Authenticate.jsx';
import Contact from './components/Contact/Contact.jsx';
import styles from './styles/main.scss';



render(
    <Router>
        <div>
            <HomeBar />
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
        			<Route exact path="/startParty" component={StartParty}/>
        			<Route exact path="/joinParty" component={JoinParty}/>
        			<Route exact path="/channels/:id" component={Channel}/>
                    <Route exact path="/authenticate" component={Authenticate}/>
                    <Route exact path="/contact" component={Contact}/>
                </Switch>
        </div>
    </Router>,
    document.getElementById('react-app')
);
