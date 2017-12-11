import React, { Component } from 'react'
import { Button, Input, Icon, Dropdown, Card, Image, Search, Segment, Grid} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SongList from './SongList.jsx'
import SidebarCategory from './SidebarCategory.jsx';
import Music from './Music.jsx';
import Pusher from 'pusher-js';


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
            currSongKey: 0,
            value: "",
            results: [],
            channelID: ""

        };

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.playNextSong = this.playNextSong.bind(this);
        this.playPrevSong = this.playPrevSong.bind(this);
        this.addSong=this.addSong.bind(this);
        this.deleteSong = this.deleteSong.bind(this);
    }

      playPrevSong(){

        var currKey = this.state.currSongKey
        currKey -= 1

        this.setState({
            currSongKey: currKey
        })

        console.log("current key " + this.state.currSongKey)
      }

      playNextSong(){

        var currKey = this.state.currSongKey
        currKey += 1

        this.setState({
            currSongKey: currKey
        })

        console.log("current key " + this.state.currSongKey)

      }
      

      play(){

        alert("play song " + this.state.currSongKey)

        this.setState({
          play: true,
          pause: false
        });

        this.state.audioList[this.state.currSongKey].play()
      }
      
      pause(){
        this.setState({
          play: false,
          pause: true
        });

        this.state.audioList[this.state.currSongKey].pause();
      }

    componentWillMount(){
        this.pusher = new Pusher('64fe71b3db1ab2a99821',{cluster: "us2", encrypted: true});
        this.channel = this.pusher.subscribe('mychannel');
        console.log('component will mount');
    }

   componentDidMount() {

        this.channel.bind('modified', this.updateEvents);
        this.channel.bind('modified', this.addSong);
        this.channel.bind('modified', this.deleteSong);
        axios.get('/profile').then( (res) => {
            this.setState({
                isLoggedIn: true,
                userInfo: res.data.user.profile,
                accessToken: res.data.user.accessToken,
                refreshToken: res.data.user.refreshToken
            })
        }).catch( (err) => {
            this.setState({
                isLoggedIn: false
            })
        });

        axios.get('/channels/'+this.props.match.params.id)
            .then((res)=>{
            
            let playlists = [];
            res.data.data.playList.map((value, key) => playlists.push(new Audio(value.url)));
            //console.log("channel id " + res.data.data._id)
            this.setState({
                channelID: res.data.data._id,
                audioList: playlists,
                categories: res.data.data.playList,
                channelName: this.props.match.params.id
            });
        }).catch((err)=>{
            console.log(err);
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
        console.log("component did update");
        console.log(this.state.track);
        console.log(this.props);
    }

    componentWillUnmount(){
        this.channel.unbind();
        this.pusher.unsubscribe(this.channel);
    }
    updateEvents(data){
        // var newArray
    }

    search(e){
        this.setState({
            keyword: e.target.value
        });
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const FETCH_URL = BASE_URL + 'q=' + e.target.value + '&type=track&limit=3';
        axios.get(FETCH_URL, 
            { headers: { 'Authorization': 'Bearer ' + this.state.accessToken } })
            .then((res)=>{
                this.setState({
                    track: res.data.tracks.items
                });
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
    addSong(){

        axios.get('/channels/'+this.state.channelName)
            .then((res)=>{
            console.log(res);
            var newSong = res.data.data.playList[res.data.data.playList.length-1];
            var playlists = this.state.audioList;
            playlists.push(new Audio(newSong.url));
            this.setState({
                audioList: playlists,
                categories: res.data.data.playList
            });
            }).catch((err)=>{
                console.log(err);
        });
    }



        deleteSong(e) {

            //alert("Song deleted " + e);

            var i = 'notchanged';

            axios.get('/channels/'+this.state.channelName)
                .then((res)=>{
                console.log(res);
                var newSongs = res.data.data.playList;
                console.log("current songs on db")
                console.log(newSongs)
                console.log("original long list")
                console.log(this.state.categories)

                for (i = 0; i < this.state.categories.length; i++) { 
                    //console.log( i + "  " + this.state.categories[i]._id + "  "  + newSongs[i]._id)
                    if(newSongs[i] === undefined) { 
                        break;

                    } else {
        
                        if(this.state.categories[i]._id !== newSongs[i]._id) { 

                            break;
                        }
                    }
                }

                console.log("deleted index " + i)

                var playlists = this.state.audioList;
                playlists.splice(i, 1);

                this.setState({
                    audioList: playlists,
                    categories: res.data.data.playList
                });
                console.log(this.state.audioList)
                }).catch((err)=>{
                    console.log(err);
            });


        }

    render() {

        const mapToComponents = (data) => {
            if(this.state.keyword == '') return [];

            return data.map((eachData, index) => {
                return (  <SongList key={ index } track = { eachData } channelName={this.state.channelName} onMusicClick={this.addSong} /> );
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
                        <div className="ui main text" style={{marginLeft: 10+'%', marginRight: 10+'%', marginBottom: 5+'%'}}>
                            <h1 className="ui header container">
                                Welcome to Channel "<span className="ui header red">{this.state.channelName}</span>"
                            </h1> 
                        <Grid celled='internally'>
                        <Grid.Row>

                        <Grid.Column width={4}> 
                            <div>
                                <Input type="text" placeholder="search for a song to add to your playlist" ref="query" onChange={(e) => {this.search(e)}}/>
                                <div className="recommendedLists">
                                    { mapToComponents(this.state.track) }
                                </div>  
                            </div>
                        </Grid.Column>
                        <Grid.Column width={12}> 
                            <div>
                                <Button onClick = {this.playPrevSong}>Prev</Button>
                                <Button onClick = { this.play }>Play</Button>
                                <Button onClick = {this.pause}>Pause</Button>
                                <Button onClick = {this.playNextSong}>Next</Button>

                                <SidebarCategory categories={this.state.categories} onSongListClick = {(e) => this.deleteSong(e)} channelID={ this.state.channelID } />
                            </div>
                        </Grid.Column>
                        </Grid.Row>
                        </Grid>
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
