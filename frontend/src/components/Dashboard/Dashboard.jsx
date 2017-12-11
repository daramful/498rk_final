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
            userInfo: [],
            track: "",
            artists: [],
            accessToken: "",
            refreshToken: ""
        }
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        axios.get('/profile').then( (res) => {
            this.setState({
                isLoggedIn: true,
                userInfo: res.data.user.profile,
                accessToken: res.data.user.accessToken,
                refreshToken: res.data.user.refreshToken,
            })
        }).catch( (err) => {
            this.setState({
                isLoggedIn: false,
                userInfo: [],
                userName: "",
                userPhoto: "",
                accessToken: "",
                refreshToken: ""
            })
        });
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log("shouldcomponentupdate");
        return true;
    }

    viewProfile(event){
        axios.get('https://api.spotify.com/v1/me', 
            { headers: { 'Authorization': 'Bearer ' + this.state.accessToken } })
            .then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            });
        console.log(this.state.userInfo);

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
                                <Image className="ui small circular image" src={this.state.userInfo.photos[0]} onClick={(e)=>this.viewProfile(e)}/>
                            </div>
                            <div className="menu item" onClick={(e)=>this.viewProfile(e)}>{this.state.userInfo.displayName}</div>
                            <Link to="/" onClick={this.logOut}>
                                <Button className="ui yellow button">
                                    Log Out
                                </Button>   
                            </Link>
                        </div>
                    </div>
                    <div className="ui main text container">
                        <h1 className="ui header">
                        Join Channel
                        </h1> 
                        <div className="partyButtons">
                            <Link to="/startParty">
                                <Button className="ui orange button">
                                    Start New Party!
                                </Button>
                            </Link>
                            <Link to="joinParty">
                                <Button className="ui orange button">
                                    Join a Party!
                                </Button>
                            </Link>
                        </div>
                        
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
                <div className="unauthorized">
                    <Card className="olive card">
                        <div className="unauthorized_text">
                            <h1>You must log in before you can see this page</h1>
                            <Link to="/login">
                                <Button className="ui olive button">
                                    LOGIN
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            )
        }
    }
}

export default Dashboard
