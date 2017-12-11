import React, { Component } from 'react'
import { Button, Card, Image, Input, Form, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './StartParty.scss'

class StartParty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            userInfo: [],
            track: "",
            artists: [],
            accessToken: "",
            refreshToken: "",
            partyName: "",
            channelCreated: false,
            channelConflict: false
        };
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        axios.get('/profile').then( (res) => {
            this.setState({
                isLoggedIn: true,
                userInfo: res.data.user.profile,
                accessToken: res.data.user.accessToken,
                refreshToken: res.data.user.refreshToken
            });
        }).catch( (err) => {
            this.setState({
                isLoggedIn: false,
                userInfo: [],
                userName: "",
                userPhoto: "",
                accessToken: "",
                refreshToken: ""
            });
        });

    }

    shouldComponentUpdate(nextProps, nextState){
        console.log("shouldcomponentupdate");
        return true;
    }

    componentDidUpdate(prevProps, prevState){
        console.log("channel created:")
        console.log(this.state.channelCreated);
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


    inputPartyName(event){
        this.setState({
            partyName: event.target.value
        });
    }
    formSubmit(event){
        axios.post('/channels/'+this.state.partyName)
            .then((res)=>{
                this.setState({
                channelCreated: true,
                channelConflict: false
            });
            console.log("channel "+this.state.partyName+ " created");
        }).catch((err)=>{
            // prevent creating channels with same name
            this.setState({
                channelCreated: false,
                channelConflict: true
            })
        });   
    }
    goToChannel(event){
        axios.get('/channels/'+this.state.partyName)
            .then((res)=>{
                console.log("channel to "+this.state.partyName);
        }).catch((err)=>{
            console.log(err);
        });
    }

    logOut() {
        axios.get('/logout').then( (res) => {
            console.log("Logged out");
        })
    }

    render() {
        if (this.state.channelConflict){
            return(<div>Existing Channel</div>)
        }
        if (this.state.isLoggedIn) {
            return(
                <div className="StartParty">
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
                        START YOUR OWN PARTY!!!
                        </h1> 
                        
                        <div className="ui blue inverted segment">
                            <Form className="ui inverted huge form" onSubmit={(e)=>this.formSubmit(e)}>
                                <div className="inline field">
                                    <label>Enter Your Party Name:</label>
                                    <Input className="ui input focus" type="text" placeholder="ex) AwesomeMusic"
                                        onChange={(e)=>this.inputPartyName(e)}/>
                                </div>
                                        <Button className="ui inverted submit button">Create!</Button>
                            </Form>
                            <div>
                                {this.state.channelCreated ? (
                                    <Modal className="ui modal" open={true}>
                                        <h1 className="ui header green">CHANNEL CREATED</h1>

                                            <h1>Click to go to Channel "<span className="ui header red">{this.state.partyName}</span>"</h1>
                                            <div className="modalbutton">
                                                <Link to={'/channels/'+this.state.partyName}>
                                                    <Button className="ui green button" onClick={(e)=>this.goToChannel(e)}>Go! </Button>
                                                </Link>
                                            </div>

                                    </Modal> ) : (null) }
                            </div>
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

export default StartParty
