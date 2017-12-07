import React, { Component } from 'react'
import { Button, Input } from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import styles from './Modal.scss'

class MakeChannelModal extends Component {

	constructor(props){
		super(props);
		console.log("constructor");
		this.state={
			channelName: ''
		}

        this.clickHandler = this.clickHandler.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
	}

	inputChangeHandler(event) {

        this.setState({
            channelName: event.target.value
        })
    }

    clickHandler() {
		this.props.history.push('/channels/' + this.state.channelName);
    }


    render(){
     	return(
        
			<div className="ui active modal">
	  			<div className="header">Create a New Channel</div>
	  			<div className="loginbody">
		    		<div className="fillout">
			    		<div className="channelName">
			      			<span>Channel Name: </span>                            
			      			<Input
                                onChange = { this.inputChangeHandler }
                                placeholder="Channel Name"
                                label = "Channel Name"
                                value = { this.state.channelName } />
			    		</div>
		    		</div>
		    		<Button>
                    	<Link to={{ pathname: '/channels/' + this.state.channelName }}>
					  		SUBMIT
						</Link>
                    </Button>
	    		</div>
			</div>
     )
    }
}

export default MakeChannelModal