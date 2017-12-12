import React, { Component } from 'react'
import { Button, Card, Image, Input, Form, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'


import Authenticate from '../Authenticate/Authenticate.jsx'

class JoinParty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            partyName: "",
            channelExists: false,
            openModal: false
        };
    }

    componentDidMount() {
        axios.get('/profile').then( (res) => {
            this.setState({
                isLoggedIn: true
            });
        }).catch( (err) => {
            this.setState({
                isLoggedIn: false
            });
        });

    }

    shouldComponentUpdate(nextProps, nextState){
        console.log("shouldcomponentupdate");
        if (nextState!=this.state)
            return true;
    }


    componentDidUpdate(prevProps, prevState){
        console.log("channel created:")
        console.log(this.state.channelCreated);
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

    render() {
        if (this.state.isLoggedIn){
            return(
                <div className="JoinParty">
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
            )}
            else{

            return(
                <Authenticate />
            )
        }
    }
}

export default JoinParty
