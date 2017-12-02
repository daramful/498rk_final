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
			loggedin: false,
			query: "",
			track: "",
			artists: []
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

	search(event){
		// console.log('this.state',this.state);
		const BASE_URL = 'https://api.spotify.com/v1/search?';
		const FETCH_URL = BASE_URL + 'q=' + event.target.value + '&type=track&limit=3';
		var accessToken = 'BQBr5WkRWWtkw8cA8xcel7mtawDVzmv91_025S8BlzK7yZUYZ2G1AyghfSP9DqtbNVb9mPHl5l_8K7GV3RujR0ulMP9BWFJs991o-fz15u2Ev0yL61aexwTzQdsRfj3UXFqrXfhuYLSlNIhUxTYNRfN__56Jjg4h3orkC0T1RNVLVrLHJQ&refresh_token=AQAD6ukQeSNpSCqEdTXUrFT_-0x6HjdFs2VslwdKGctd7mRwk8Yc39PLLBGPvEmaEEacJp8bykx3XSsUnD0VddJ-aRQDBYruC0cnnKd0-sp7Qkmv4vvEDmdU7VGtirbzt0I';
		var myOptions = {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + accessToken
			},
			mode: 'cors',
			cache: 'default'
		};

		fetch(FETCH_URL, myOptions)
			.then((response) => response.json())
			.then((data) =>{
				this.setState({ 
					track : data.tracks.items[0].name,
					artists : data.tracks.items[0].artists
				});
			}).catch(function(error){
				console.log(error);
			})
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
                	<input type="text" placeholder="search for an artist" ref="query" onChange={(e) => {this.search(e)}}/>
                	<div className="search result"> 
                		<p>Searched Song: {this.state.track}</p>
                		<p>by: {this.state.artists.map((i)=>{return (<div>{i.name}</div>)})}</p>
                	</div>
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
