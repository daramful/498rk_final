import React, { Component } from 'react'
import { Button, Input, Icon,Dropdown,Card,Image,Search} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// import styles from './Channel.scss'

class Channel extends Component {

	constructor(props){
		super(props);
		console.log("constructor");
		this.state={
			isLoggedIn: false,
            userInfo: [],
            accessToken: "",
            refreshToken: "",
			query: "",
			songName: "",
			artists: [],
            channelName: ""
		};
	}

	componentWillMount(){
        console.log("componentWillMount");
       
    }
    
    componentDidMount() {
        axios.get('/profile').then( (res) => {
            this.setState({
                isLoggedIn: true,
                userInfo: res.data.user.profile,
                accessToken: res.data.user.accessToken,
                refreshToken: res.data.user.refreshToken,
                channelName: this.props.match.params.id
            })
        }).catch( (err) => {
            this.setState({
                isLoggedIn: false
            })
        });

    }
    
    componentWillReceiveProps(nextProps){
        console.log("componentwillreceiveprops");;
    }
    
    shouldComponentUpdate(nextProps, nextState){
        console.log("shouldcomponentupdate");
        return true;
    }

    componentDidUpdate(prevProps, prevState){
        console.log(this.state.songName);
        console.log(this.state.artists[0]);
    }
    
    componentWillUnmount(){
    }

    search(event){
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const FETCH_URL = BASE_URL + 'q=' + event.target.value + '&type=track&limit=3';
        axios.get(FETCH_URL, 
            { headers: { 'Authorization': 'Bearer ' + this.state.accessToken } })
            .then((res)=>{
                this.setState({
                    songName: res.data.tracks.items[0].name,
                    artists: res.data.tracks.items[0].artists
                });
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            });
    }

    addToPlaylist(event){
        var a = "AAA";
        axios.put('/channels/'+this.state.channelName,{playList:a})
            .then((res)=>{
            console.log("added song");
        }).catch((err)=>{
            console.log(err);
        });   
    }
    addToPlaylist2(event){
        var b = "BBB";
        axios.put('/channels/'+this.state.channelName,{playList:b})
            .then((res)=>{
            console.log("added song");
        }).catch((err)=>{
            console.log(err);
        });   
    }
    addToPlaylist3(event){
        var c = "CCC";
        axios.put('/channels/'+this.state.channelName,{playList:c})
            .then((res)=>{
            console.log("added song");
        }).catch((err)=>{
            console.log(err);
        });   
    }
//         fetch(FETCH_URL, myOptions)
//             .then((response) => response.json())
//             .then((data) =>{
//                 console.log(data.tracks.items[0]);
//                 this.setState({ 
//                     track : data.tracks.items[0].name,
//                     artists : data.tracks.items[0].artists
//                 });
//             }).catch(function(error){
//                 console.log(error);
//             })
// <Search className="ui search" onSearchChange={(e)=>this.search(e)} results={this.state.artists} id={i}>
//                             <div className="da">
//                                 <Input className="prompt" type="text" ref="query" placeholder="search for a song..."/>
//                                 <Icon className="search icon"></Icon>
//                             </div>
//                             <div className="results"></div>
//                         </Search>


    viewProfile(event){
        axios.get('https://api.spotify.com/v1/me', 
            { headers: { 'Authorization': 'Bearer ' + this.state.accessToken } })
            .then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            });
        console.log(this.state.userInfo);

    }
	logOut(event){
		this.setState({
			loggedin: false
		});
	}
    render() {
    	if (this.state.isLoggedIn){
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
                            <div className="profileImage">
                                <Image className="ui small circular image" src={this.state.userInfo.photos[0]} onClick={(e)=>this.viewProfile(e)}/>
                            </div>
                            <div className="menu item" onClick={(e)=>this.viewProfile(e)}>{this.state.userInfo.displayName}</div>
                            <Link to="/" onClick={this.logOut}>
                                <Button className="ui yellow button">
                                    Log Out
                                </Button>   
                            </Link>
                	   </div>
                   </div>
                    <div className="ui main text container">
                    	<h1 className="ui header">
                    		Welcome to Channel "<span className="ui header red">{this.state.channelName}</span>"
                		</h1> 

                        <div>
                            <input type="text" placeholder="search for a song to add to your playlist" ref="query" onChange={(e) => {this.search(e)}}/>
                                <div className="search result"> 
                                    <p>Searched Song: {this.state.track}</p>
                                    <p>by: {this.state.artists.map((i)=>{return (<div>{i.name}</div>)})}</p>
                                </div>
                        </div>
                        <Button onClick={(e)=>this.addToPlaylist(e)}>add song AAA</Button>
                        <Button onClick={(e)=>this.addToPlaylist2(e)}>add song BBB</Button>
                        <Button onClick={(e)=>this.addToPlaylist3(e)}>add song CCC</Button>
                        

                            
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
        }else{
            return(
                <div className="unauthorized">
                    <Card className="olive card">
                        <div className="unauthorized_text">
                            <h1>You must log in before you can see this page</h1>
                            <Link to="/login">
                                <Button className="ui olive button">
                                    LOGIN
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            )
        }

    }
}

export default Channel
