import React, { Component } from 'react'
import { Button, Input, Icon,Dropdown,Card} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import styles from './Home.scss'
import Modal from './Modal.jsx'
import RecSongList from './RecSongList.jsx'

class RecTest extends Component {

	constructor(props){
		super(props);
		console.log("constructor");
		this.state={
			showModal: false,
			loggedin: false,
			query: "",
			track: "",
            track_id: "",
            genre: "",
			artist: "",
            artist_id: "",
            value: "",
            recommendations: []
		}

        this.BASE_URL = 'https://api.spotify.com/v1/recommendations?min_energy=0.4&market=US&min_popularity=30';
        this.BASE_TRACK_URL = '&seed_tracks=';
        this.BASE_ARTIST_URL = '&seed_artists=';
        this.BASE_GENRE_URL = '&seed_genres='
        this.inputGenreChangeHandler = this.inputGenreChangeHandler.bind(this);
        this.inputArtistChangeHandler = this.inputArtistChangeHandler.bind(this);
        this.inputTrackChangeHandler = this.inputTrackChangeHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.clickArtistHandler = this.clickArtistHandler.bind(this);
        this.clickTrackHandler = this.clickTrackHandler.bind(this);
	}

    clickHandler() {
        let url = this.BASE_URL + this.BASE_TRACK_URL + this.state.track_id + this.BASE_ARTIST_URL + this.state.artist_id + this.BASE_GENRE_URL + this.state.genre;

        var accessToken = 'BQDjGzyHjMyOjlmPGVEYln6bcRgqfMFI0dNHQOj2vs3Mw7LcnGrFGcW7cycTk9vPPefkJ__zmNJXvoTT4dHEr6aq3hyULkjJ7BclxzI9EW3VkClxEW37FhQDq6Blx2ODayMY_AkpprxDzlZcHXv3gGEk_UpCS-tOEGp6UVha1oERFgwYDw&refresh_token=AQA0bXNjdUYso0hzgnK38StZpbaO2_QuLK8LqyZWWdsckmS4391LR6Sb7x92VlpNTM6lJG-8O2kMGDGGxzLt2BDeh59_-wNPFwxIHxXR_RBXGWqDAJiFyxXqISA2WjcU-5o'
        var myOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            mode: 'cors',
            cache: 'default'
        };

        fetch(url, myOptions)
            .then((response) => response.json())
            .then((data) =>{

                this.setState({ 
                    recommendations : data.tracks
                });
                console.log(this.state.recommendations);
            }).catch(function(error){
                console.log(error);
            })
    }

    clickArtistHandler() {
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const FETCH_URL = BASE_URL + 'q=' + this.state.artist + '&type=track&limit=3';
        var accessToken = 'BQDjGzyHjMyOjlmPGVEYln6bcRgqfMFI0dNHQOj2vs3Mw7LcnGrFGcW7cycTk9vPPefkJ__zmNJXvoTT4dHEr6aq3hyULkjJ7BclxzI9EW3VkClxEW37FhQDq6Blx2ODayMY_AkpprxDzlZcHXv3gGEk_UpCS-tOEGp6UVha1oERFgwYDw&refresh_token=AQA0bXNjdUYso0hzgnK38StZpbaO2_QuLK8LqyZWWdsckmS4391LR6Sb7x92VlpNTM6lJG-8O2kMGDGGxzLt2BDeh59_-wNPFwxIHxXR_RBXGWqDAJiFyxXqISA2WjcU-5o'
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
                artist_id: data.tracks.items[0].artists[0].id
            })
            console.log("artist id " + data.tracks.items[0].artists[0].id);
            }).catch(function(error){
                console.log(error);
            })
    }

    clickTrackHandler() {
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const FETCH_URL = BASE_URL + 'q=' + this.state.track + '&type=track&limit=3';
        var accessToken = 'BQDjGzyHjMyOjlmPGVEYln6bcRgqfMFI0dNHQOj2vs3Mw7LcnGrFGcW7cycTk9vPPefkJ__zmNJXvoTT4dHEr6aq3hyULkjJ7BclxzI9EW3VkClxEW37FhQDq6Blx2ODayMY_AkpprxDzlZcHXv3gGEk_UpCS-tOEGp6UVha1oERFgwYDw&refresh_token=AQA0bXNjdUYso0hzgnK38StZpbaO2_QuLK8LqyZWWdsckmS4391LR6Sb7x92VlpNTM6lJG-8O2kMGDGGxzLt2BDeh59_-wNPFwxIHxXR_RBXGWqDAJiFyxXqISA2WjcU-5o'
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
                track_id: data.tracks.items[0].id
            })
            console.log("track id " + data.tracks.items[0].id);
            }).catch(function(error){
                console.log(error);
            })
    }

    inputGenreChangeHandler(event) {

        this.setState({
            genre: event.target.value
        })

    }

    inputArtistChangeHandler(event) {

        this.setState({
            artist: event.target.value
        })
    }

    inputTrackChangeHandler(event) {

        this.setState({
            track: event.target.value
        })
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

                    <div>
                        <span>
                            <Input
                            onChange = {this.inputGenreChangeHandler}
                            placeholder="Type your Favorite Genre"
                            label = "Genre"
                            value = {this.state.genre} />
                        </span>
                    
                    </div>
                    <div>
                        <span>
                            <Input
                                onChange = {this.inputArtistChangeHandler}
                                placeholder="Type your Favorite Artist"
                                label = "Artist"
                                value = {this.state.artist} />
                            <Button onClick = { this.clickArtistHandler }>
                                GET Artist
                            </Button>
                        </span>
                        
                    </div>
                    <div>
                        <span>
                            <Input
                            onChange = {this.inputTrackChangeHandler}
                            placeholder="Type your Favorite Track"
                            label = "Track"
                            value = {this.state.track}
                            />
                            <Button onClick = { this.clickTrackHandler }>
                                GET Track
                            </Button>
                        </span>

                    </div>

                    <Button onClick = { this.clickHandler }>
                        GET
                    </Button>


                    <div className="recommendedLists">
                        { mapToComponents(this.state.recommendations) }
                    </div>

                	<div className="search result"> 

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
                		Welcome to MIC DROP Rec Test
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

export default RecTest
