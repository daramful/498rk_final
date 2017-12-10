import React, { Component } from 'react'
import { Button, Input, Icon,Dropdown,Card,Image,Search} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SongList from './SongList.jsx'
import SidebarCategory from './SidebarCategory.jsx';
import Music from './Music.jsx';
// import styles from './Channel.scss'

class Channel extends Component {

    constructor(props){
        super(props);
        console.log("constructor");
        this.state={
            play: false,
            pause: true,
            updated: false,
            isLoggedIn: false,
            userInfo: [],
            accessToken: "",
            refreshToken: "",
            query: "",
            songName: "",
            artists: [],
            channelName: "",
            keyword: "",
            categories: [],
            track: [],
            audioList: [],
            currSongKey: 0

        };

        //this.playlists = [];

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.playNextSong = this.playNextSong.bind(this);
        this.playPrevSong = this.playPrevSong.bind(this);
    }

      playPrevSong(){

        //this.setState({
        //  songList: arr
        //});

        var currKey = this.state.currSongKey
        currKey -= 1

        this.setState({
            currSongKey: currKey
        })

        console.log("current key " + this.state.currSongKey)

        //this.songArr[1].play();
      }

      playNextSong(){

        //this.setState({
        //  songList: arr
        //});

        var currKey = this.state.currSongKey
        currKey += 1

        this.setState({
            currSongKey: currKey
        })

        console.log("current key " + this.state.currSongKey)

        //this.songArr[1].play();
      }
      

      play(){

        alert("play song " + this.state.currSongKey)
        //console.log("playyyyyy")

        this.setState({
          play: true,
          pause: false
        });

        this.state.audioList[this.state.currSongKey].play()
      }
      
      pause(){
        //alert("pause song " + this.state.audioList)
        //this.setState({ play: false, pause: true });
        //this.state.audioList[this.state.currSongKey].currentTime = 0;
        this.setState({
          play: false,
          pause: true
        });

        this.state.audioList[this.state.currSongKey].pause();
        //alert("pause song " + this.state.audioList)
      }

    componentWillMount() {

        console.log('Component WILL MOUNT!')

        axios.get('/channels').then( (res) => {
            //console.log(res.data.data.playList);
            let playlists = [];
            res.data.data.playList.map((value, key) => playlists.push(new Audio(value.url)));

            this.setState((prevState) => {
                return { audioList: playlists, categories: res.data.data.playList }
            }, () => console.log(this.state.audioList));

        }).catch( (err) => {
            console.log(err);
        });

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
        return (this.state != nextState);
    }

    componentDidUpdate(prevProps, prevState){
/*

        console.log("did update")

        axios.get('/channels').then( (res) => {
            //console.log(res.data.data.playList);
            let playlists = [];
            res.data.data.playList.map((value, key) => playlists.push(new Audio(value.url)));

            this.setState((prevState) => {
                return { audioList: playlists, categories: res.data.data.playList }
            }, () => console.log(this.state.audioList));

        }).catch( (err) => {
            console.log(err);
        });
*/
    }

    componentWillUnmount(){
    }

    search(event){
        this.setState({
            keyword: event.target.value
        })
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const FETCH_URL = BASE_URL + 'q=' + event.target.value + '&type=track&limit=30';
        axios.get(FETCH_URL, 
            { headers: { 'Authorization': 'Bearer ' + this.state.accessToken } })
            .then((res)=>{
                this.setState({
                    //songName: res.data.tracks.items[0].name,
                    //artists: res.data.tracks.items[0].artists
                    track: res.data.tracks.items
                });
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            });
    }


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

        const mapToComponents = (data) => {
        
            if(this.state.keyword == '') return [];

            return data.map((eachData, index) => {
                return (  <SongList track = { eachData } key={ index }/>  );
            });
        };

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
                            <Input type="text" placeholder="search for a song to add to your playlist" ref="query" onChange={(e) => {this.search(e)}}/>
                             <div className="recommendedLists">
                                { mapToComponents(this.state.track) }
                            </div>  
                        </div>



                        <SidebarCategory categories={this.state.categories} />

                        <Button onClick = {this.playPrevSong}>Prev</Button>
                        <Button onClick = { this.play }>Play</Button>
                        <Button onClick = {this.pause}>Pause</Button>
                        <Button onClick = {this.playNextSong}>Next</Button>
                   
          
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
