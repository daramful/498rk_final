import React, { Component } from 'react'
import { Button, Card, Image, Input, Form, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import styles from './JoinParty.scss'

class JoinParty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            userInfo: [],
            accessToken: "",
            refreshToken: "",
            partyName: "",
            channelExists: false,
            openModal: false
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
        console.log('asd');
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
        axios.get('/channels/'+this.state.partyName)
            .then((res)=>{
                console.log(res);
                this.setState({
                    channelExists: true,
                    openModal: true
            });
            console.log("channel "+this.state.partyName+ " exists");
        }).catch((err)=>{
            console.log('channel does not exist');
            this.setState({
                channelExists: false,
                openModal: true
            });
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
    closeModal(event){
        this.setState({
            openModal: false
        });
    }

    logOut() {
        axios.get('/logout').then( (res) => {
            console.log("Logged out");
        })
    }

    render() {
        if (this.state.isLoggedIn) {
            return(
                <div className="JoinParty">
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
                        JOIN THE PARTY!!!
                        </h1> 
                        
                        <div className="ui blue inverted segment">
                            <Form className="ui inverted huge form" onSubmit={(e)=>this.formSubmit(e)}>
                                <div className="inline field">
                                    <label>Enter an Existing Party Name:</label>
                                    <Input className="ui input focus" type="text" placeholder="ex) AwesomeMusic"
                                        onChange={(e)=>this.inputPartyName(e)}/>
                                </div>
                                        <Button className="ui inverted submit button">Join!</Button>
                            </Form>
                            <div>
                                {this.state.channelExists ? (
                                    <Modal className="ui modal" open={this.state.openModal}>
                                        <h1 className="ui header green">JOIN CHANNEL</h1>

                                            <h1>Click to go to Channel "<span className="ui header green">{this.state.partyName}</span>"</h1>
                                            <div className="modalbutton">
                                                <Link to={'/channels/'+this.state.partyName}>
                                                    <Button className="ui green button" onClick={(e)=>this.goToChannel(e)}>Go! </Button>
                                                </Link>
                                            </div>

                                    </Modal> ) : (
                                    <Modal className="ui modal" open={this.state.openModal}>
                                        <h1 className="ui header red">CHANNEL "<span className="ui header red">{this.state.partyName}</span>" DOES NOT EXIST</h1>

                                            <h1>Please Re-enter the Channel Name</h1>
                                            <div className="modalbutton">
                                                <Link to={'/joinParty/'}>
                                                    <Button className="ui green button" onClick={(e)=>this.closeModal(e)}>Back</Button>
                                                </Link>
                                            </div>

                                    </Modal>)}
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

export default JoinParty
