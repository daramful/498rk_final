import React, { Component } from 'react'
import { Button, Card, Image, Input, Form, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './StartParty.scss'

import Authenticate from '../Authenticate/Authenticate.jsx'

class StartParty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            partyName: "",
            channelCreated: false,
            channelConflict: false
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
        console.log(this.state.isLoggedIn);
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

    render() {
        if (this.state.channelConflict){
            return(<div>Existing Channel</div>)
        }
        if (this.state.isLoggedIn){
            return(
                <div className="StartParty">
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
        }
        else{

            return(
                <Authenticate />
            )

}
    }
}

export default StartParty
