import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import styles from './Modal.scss'

class Modal extends Component {

    render(){
     	return(
        
			<div className="ui active modal">
	  			<div className="header">Create a new account</div>
	  			<div className="loginbody">
		  			<button className="ui teal button" role="button">Sign Up with Facebook</button> 
		  			<button className="ui teal button" role="button">Sign Up with Google</button> 
		    		<div className="fillout">
			    		<div className="email">
			      			<span>e-mail: </span>
			      			<input type="text" placeholder="example@domain.com" ref="emailquery"/>
			    		</div>
			    		<div className="userID">
			      			<span>user ID: </span>
			      			<input type="text" placeholder="example1" ref="userIDquery"/>
			    		</div>
			    		<div className="password">
			      			<span>Password: </span>
			      			<input type="text" placeholder="password" ref="passwordquery"/>
			    		</div>
			    		<div className="gender">
			      			<p>Gender: </p>
			    		</div>
		    		</div>
		    		<Link to={{ pathname: '/details/' + this.props.poke.id }}> <img src = {this.props.poke.sprites.front_default} />
						<button className="ui red button" role="button" value="submit" onClick={this.props.handler}>Submit</button> 
		    		</Link> 
		    		
	    		</div>
			</div>
     )
    }
}

export default Modal