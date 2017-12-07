import React, { Component } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './Dashboard.scss'

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            userName: "",
            userPhoto: ""
        }
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        axios.get('/profile').then( (res) => {
            console.log(res.data);
            console.log(res.data.user.displayName);
            this.setState({
                isLoggedIn: true,
                userName: res.data.user.displayName,
                userPhoto: res.data.user.photos[0]
            })
        }).catch( (err) => {
            this.setState({
                isLoggedIn: false,
                userName: "",
                userPhoto: ""
            })
        })
    }

    logOut() {
        axios.get('/logout').then( (res) => {
            console.log("Logged out");
        })
    }

    render() {
        if (this.state.isLoggedIn) {
            return(
                <div className="Dashboard">
                    <div className="ui fixed inverted menu">
                        <div className="ui container">  
                            <div className="menu item">
                                MIC DROP
                            </div>
                            <div className="menu item">
                                Home
                            </div>
                            <div className="menu item">
                                About
                            </div>
                            <div className="menu item right" />
                            <div className="profileImage">
                                <Image className="ui small circular image" src={this.state.userPhoto} />
                            </div>
                            <div className="menu item">{this.state.userName}</div>
                            <Link to="/" onClick={this.logOut}>
                                <Button className="ui yellow button">
                                    Log Out
                                </Button>   
                            </Link>
                        </div>
                    </div>
                    <div className="ui main text container">
                        <h1 className="ui header">
                        Welcome to MIC DROP
                        </h1> 
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <div>
                            <Button className="ui orange button" role="button" value="new" onClick={(e)=>{this.startNew(e)}}>
                                Start New Party!
                            </Button>
                            <Button className="ui orange button" role="button" value="join" onClick={(e)=>{this.joinExist(e)}}>
                                Join a Party!
                            </Button>
                        </div>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                        <p>Description Everywhere</p>
                    </div>
                    <div className="ui inverted vertical footer segment">
                        <div className="ui center aligned container">
                            <div className="ui vertical inverted small divided list">
                                <div className="asdsad">
                                    <h2 className="ui inverted header">Developers</h2>
                                    <p>hlee295</p>
                                    <p>jsong78</p>
                                    <p>ykim164</p>
                                    <p>hpark125</p>
                                </div>
                            </div>
                            <div className="ui inverted section divider"></div>
                            <div className="ui horizontal inverted small divided list">
                                <p>CS498 RK1 Final Project</p>
                                <p>University of Illinois at Urbana-Champaign</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="Dashboard">
                    <Card>
                        <h1>You must log in before you can see this page.</h1>
                        <Link to="/login">
                            Back
                        </Link>
                    </Card>
                </div>
            )
        }
    }
}

export default Dashboard
