import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';

import styles from './styles/main.scss';

render(
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
			<Route exact path="/dashboard" component={Dashboard}/>
        </Switch>
    </Router>,
    document.getElementById('react-app')
);
