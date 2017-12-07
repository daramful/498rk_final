import React, { Component } from 'react'
import { Button, Input, Icon,Dropdown,Card, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import styles from './Home.scss'
import Modal from './Modal.jsx'
import MakeChannelModal from './MakeChannelModal.jsx'
import RecSongList from './RecSongList.jsx'

class Channel extends Component {

	constructor(props){
		super(props);
		console.log("constructor");
		this.state = {
			showModal: false,
            showMakeChannel: false,
			loggedin: false,
			query: "",
			track: [],
			artists: [],
			channelName: this.props.match.params.id

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

    popMakeChannel(event) {
        this.setState({
            showMakeChannel: true
        });
    }

	modalHandler(event){
		this.setState({
			showModal: false,
			loggedin: true
		});
	}

    makeChannelModalHandler(event){
        this.setState({
            showMakeChannel: false,
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
		const FETCH_URL = BASE_URL + 'q=' + event.target.value + '&type=track&limit=20';
        var accessToken = 'BQD0UuD5a_wqJY8wNrnhq-rxJ6chgu2RHFkBdKdINxNX6wtZHk-s8vzm7Z288zGlQ27xJdTu67KqXV3D2HrCQGViUXyj3OPnyfmT8FRvyD3wb5Op9jYz1aoJr6gncurd0J5EtBMeakrhhng1dbtepYYNwn_GN7OkLYpXWUBfFS2d6ib1_Q&refresh_token=AQBipFpBpOdcJ5DtmqWgxnTdCj9Aar6BzNwRbcfgQBmf9EkW3vFb4-sf1tdrWNkwGSINKzAZ54W4z_y92opqGaEpK4L53FHsDo4uYEZ-9yt8p3yEoTdbhlJcKQ9MpaJW_JA'
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
                console.log('dd', data.tracks.items	);
				this.setState({ 
					track : data.tracks.items,
				});
				console.log(this.state.track)
			}).catch(function(error){
				console.log(error);
			})
	}

    render() {

        const mapToComponents = (data) => {
        

	        return data.map((eachData, index) => {
	            return (  <RecSongList track = { eachData } key={ index }/>  );
	        });
        };

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
                        <Button className="ui orange button" role="button" value="new" onClick={(e)=>{this.popLogin(e)}}>
                            Start New Party!
                        </Button>
                        <Button className="ui orange button" role="button" value="join" onClick={(e)=>{this.popLogin(e)}}>
                            Join a Party!
                        </Button>
                        <Button className="ui orange button" role="button" value="join" onClick={(e)=>{this.popMakeChannel(e)}}>
                            Make Channel Test
                        </Button>
                        <div className="menu item right" />
    					<Button className="ui yellow button" role="button" value="login" onClick={(e)=>{this.popLogin(e)}}>
                            Login
                        </Button>
                        <Button className="ui black button">
            				Help
        				</Button>	
    				</div>
            	</div>
            	<div className="modal">
                    {this.state.showModal ? 
                    	(<Modal handler={(e)=>{this.modalHandler(e)}}/>)
                    	:(null)
                    }
                </div>
                <div className="makeChannelModal">
                    {this.state.showMakeChannel ? 
                        (<MakeChannelModal handler={(e)=>{this.makeChannelModal(e)}}/>)
                        :(null)
                    }
                </div>
                <div className="ui main text container">
                	<input type="text" placeholder="search for an artist" ref="query" onChange={(e) => {this.search(e)}}/>
                	<div className="search result"> 

	            	<div className="ui main text container">
	            		<h1 className="ui header">
                			
							channelName : { this.state.channelName }
							
	            		</h1> 

		            	<div className="recommendedLists">
	                        { mapToComponents(this.state.track) }
	                    </div>	

	            	</div>
                	</div>
                	<h1 className="ui header">
                		Welcome to MIC DROP
            		</h1> 

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

export default Channel
