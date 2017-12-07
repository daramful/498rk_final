import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

// Include your new Components here
import Home from './components/Home/Home.jsx';
import RecTest from './components/Home/RecTest.jsx';
import Example from './components/Home/Example.jsx';
import Channel from './components/Home/Channel.jsx';
import Music from './components/Home/Music.jsx';

// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.
require('./styles/main.scss');

render(
    
    <Router> 
        <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/RecTest" component={RecTest}/>
            <Route exact path="/Example" component={Example}/>
            <Route exact path="/Music" component={Music}/>
            <Route path="/channels/:id" component={ (props) => (<Channel {...props}/>)} />
        </div>
    </Router>,

    // Define your router and replace <Home /> with it!
    document.getElementById('app')
);
