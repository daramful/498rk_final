import React, { Component } from 'react'
import { Button, Input, Icon,Dropdown,Card} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import styles from './Home.scss'
import Modal from './Modal.jsx'

class Home extends Component {

	constructor(props){
		super(props);
		console.log("constructor");
		this.state={
			showModal: false,
			loggedin: false
		};
	}

	componentWillMount(){
        console.log("componentWillMount");
       
    }
    
    componentDidMount(){
        console.log("componentDidMount");
        console.log(this.state.showModal);

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
        console.log(this.state.showModal);
    }
    
    componentWillUnmount(){
        console.log("componentWillUnmount");
    }

    startNew(event){

    }
	joinExist(event){
    	
    }
	popLogin(event) {
		this.setState({
			showModal: true
		});
	}
	modalHandler(event){
		this.setState({
			showModal: false,
			loggedin: true
		});
	}
	logOut(event){
		this.setState({
			loggedin: false
		});
	}

    render() {
    	if (this.state.loggedin==false){
        return(
            <div className="home">
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
                        <button className="ui orange button" role="button" value="new" onClick={(e)=>{this.popLogin(e)}}>
                            Start New Party!
                        </button>
                        <button className="ui orange button" role="button" value="join" onClick={(e)=>{this.popLogin(e)}}>
                            Join a Party!
                        </button>
                        <div className="menu item right" />
    					<button className="ui yellow button" role="button" value="login" onClick={(e)=>{this.popLogin(e)}}>
                            Login
                        </button>
                        <button className="ui black button">
            				Help
        				</button>	
    				</div>
            	</div>
            	<div className="modal">
                    {this.state.showModal ? 
                    	(<Modal handler={(e)=>{this.modalHandler(e)}}/>)
                    	:(null)
                    }
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
    	}
    	else {
    		return(
				<div className="home_loggedIn">
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
	                        <button className="ui orange button" role="button" value="new" onClick={(e)=>{this.startNew(e)}}>
                            	Start New Party!
	                        </button>
	                        <button className="ui orange button" role="button" value="join" onClick={(e)=>{this.joinExist(e)}}>
	                            Join a Party!
	                        </button>
	                        <div className="menu item right">
	                            userName
	                        </div>
	    					<button className="ui yellow button" role="button" value="logout" onClick={(e)=>{this.logOut(e)}}>
	            				Log Out
	        				</button>	
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
    	}
    }
}

export default Home
