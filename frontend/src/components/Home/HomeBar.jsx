import React, { Component } from 'react'
import { Button, Input, Icon,Dropdown,Card,Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './Home.scss'

class HomeBar extends Component {

    constructor(props){
        super(props);
        console.log("constructor");
        this.state={
            isLoggedIn: false,
            userInfo: [],
            userName: "",
            userPhoto: "",
            accessToken: "",
            refreshToken: ""
        };
        this.logOut = this.logOut.bind(this);
    }

    componentWillMount(){
        console.log("componentWillMount");
    }

    componentDidMount(){
        console.log("componentDidMount");
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
        console.log(this.state.accessToken);
        console.log(this.state.isLoggedIn);
    }

    componentWillReceiveProps(nextProps){
        console.log("componentwillreceiveprops");;
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log("shouldcomponentupdate");
        return true;
    }

        //never change this.setState() here
    componentWillUpdate(nextProps, nextState){
        console.log("componentwillupdate");
    }

    componentDidUpdate(prevProps, prevState){
        console.log("componentdidupdate");
        console.log(this.state.accessToken);
        console.log(this.state.isLoggedIn);
    }

    componentWillUnmount(){
        console.log("componentWillUnmount");
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
            this.setState({
                isLoggedIn: false
            });
            console.log("Logged out");
        })
    }

    render() {
        if (this.state.isLoggedIn){
            return(<div className="ui fixed inverted menu">
                            <div className="ui container">  
                                <div className="menu item">
                                    <i id="mic" className="fa fa-microphone" aria-hidden="true"> </i>           DROP
                                </div>
                                <Link to="/">
                                    <Button className="ui inverted yellow button">
                                        <i className="fa fa-home" aria-hidden="true"></i> Home
                                    </Button>
                                </Link>
                                <Link to="/about">
                                    <Button className="ui inverted yellow button">
                                        <i className="fa fa-globe" aria-hidden="true"></i>  About
                                    </Button>
                                </Link>
                                <Link to="/startParty">
                                    <Button className="ui inverted orange button">
                                        Start New Party
                                    </Button>
                                </Link>
                                <Link to="/joinParty">
                                    <Button className="ui inverted orange button">
                                        Join a Party
                                    </Button>
                                </Link>
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
                                <Link to="/contact">
                                    <Button className="ui black button">Contact</Button>   
                                </Link>
                            </div>
                        </div>)
        }
        else{
            return(<div className="ui fixed inverted menu">
                        <div className="ui container">  
                            <div className="menu item">
                                <i id="mic" className="fa fa-microphone" aria-hidden="true"> </i>  DROP
                            </div>
                            <Link to="/">
                                <Button className="ui inverted yellow button">
                                    <i className="fa fa-home" aria-hidden="true"></i>  Home
                                </Button>
                            </Link>
                            <Link to="/about">
                                <Button className="ui inverted yellow button">
                                    <i className="fa fa-globe" aria-hidden="true"></i>  About
                                </Button>
                            </Link>
                            <Link to="/startParty">
                                <Button className="ui inverted orange button">
                                    Start New Party
                                </Button>
                            </Link>
                            <Link to="/joinParty">
                                <Button className="ui inverted orange button">
                                    Join a Party
                                </Button>
                            </Link>
                            <div className="menu item right" />
                                <Link to="/login">
                                <Button className="ui yellow button">Login</Button>
                                </Link>
                                <Link to="/signup">
                                <Button className="ui yellow button">Sign Up</Button>
                                </Link>
                                <Link to="/contact">
                                    <Button className="ui black button">Contact</Button>   
                                </Link>
                        </div>
                    </div>)

        }
    }
}

export default HomeBar

