import React, { Component } from 'react'
import { Button, Input, Icon,Dropdown,Card} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './Home.scss'

class Home extends Component {

	constructor(props){
		super(props);
		console.log("constructor");
		this.state={
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
    }
    
    componentWillUnmount(){
        console.log("componentWillUnmount");
    }

    startNew(event){

    }
	joinExist(event){
    	
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
                        <div className="menu item right" />
                        <Link to="/login">
        					<Button className="ui yellow button">
                                Login
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button className="ui yellow button">
                                Sign Up
                            </Button>
                        </Link>
                        <Button className="ui black button">
            				Help
        				</Button>	
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

export default Home
