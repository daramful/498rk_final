import React, { Component } from 'react'
import { Button, Input, Icon,Dropdown,Card} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import styles from './Home.scss'
import Modal from './Modal.jsx'
import MakeChannelModal from './MakeChannelModal.jsx'
import Music from './Music.jsx'

class Home extends Component {

	constructor(props){
		super(props);
		console.log("constructor");
		this.state={
			showModal: false,
            showMakeChannel: false,
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
		const FETCH_URL = BASE_URL + 'q=' + event.target.value + '&type=track&limit=3';
		var accessToken = 'BQCln2xXqrpj6TgJO5Tm7zc-VLTrfvZBQ7GdpwET6Jq3wlnELXr1i_kYf3OmQ2mot7wvJG1Li2xXgkyLu4uMrBpTOxMHBPwnYA72CaYER9FO4f-aEldilhCXJsYKplFOOUfTkM4jAn88YxK9FhVxUpxcUY0qEnOPu0JRqoCiZeHappn1uA&refresh_token=AQAiPRg-cBM4Np6CHcxffxjSca8_t4HoZe_o9S-1QbIx2NoB1sy6CS9IRN7CQ2VqiUj34cXJgCtIcVqScucCwiaEYMsknTkwf-42Dvwz_pSNqO44VHGBcm13UeLTRuDdMt8'
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
                console.log(data.tracks.items[0]);
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
