import React, { Component } from 'react'
import { Button, Input, Icon, Dropdown, Card, Grid, Segment, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SongList from './SongList.jsx'
import SidebarCategory from './SidebarCategory.jsx';
import Music from './Music.jsx';
import Pusher from 'pusher-js';

// import styles from './Channel.scss'

class Channel extends React.Component {
    constructor(props){
        super(props);
        console.log("constructor");
        this.state = {
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
            isPlaying: false,
            autoplayOn: false,
            currSongKey: 0,
            value: "",
            results: []
        };

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.playNextSong = this.playNextSong.bind(this);
        this.autoPlayNextSong = this.autoPlayNextSong.bind(this);
        this.playPrevSong = this.playPrevSong.bind(this);
        this.addSong=this.addSong.bind(this);
        this.deleteSong=this.deleteSong.bind(this);
        this.stop=this.stop.bind(this);

        this.setAutoPlay = this.setAutoPlay.bind(this);

        this.autoplayStatus = false;
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

      playPrevSong(){

        this.state.audioList[this.state.currSongKey].currentTime = 0;

        this.state.audioList[this.state.currSongKey].pause();

        if(this.state.currSongKey == 0) currKey = this.state.audioList.length - 1;

        else {
            var currKey = this.state.currSongKey
            currKey -= 1
        }

        this.setState({
            currSongKey: currKey
        })

        this.state.audioList[currKey].play()

      }

      playNextSong(){


            this.state.audioList[this.state.currSongKey].currentTime = 0;

            this.state.audioList[this.state.currSongKey].pause();

            if(this.state.currSongKey == this.state.audioList.length - 1) currKey = 0;

                
            else {
                var currKey = this.state.currSongKey
                currKey += 1
            }

            this.setState({
                currSongKey: currKey
            })

            this.state.audioList[currKey].play()
            //{ this.play() }
      }
      
      autoPlayNextSong() {

            if(this.state.autoplayOn === false) { }

            else {
                this.state.audioList[this.state.currSongKey].currentTime = 0;

                this.state.audioList[this.state.currSongKey].pause();

                if(this.state.currSongKey == this.state.audioList.length - 1) currKey = 0;

                    
                else {
                    var currKey = this.state.currSongKey
                    currKey += 1
                }

                this.setState({
                    currSongKey: currKey
                })

                { this.play() }
            }


      }

      play(){

        this.setState({
          isPlaying: true,
          play: true,
          pause: false
        });

        this.state.audioList[this.state.currSongKey].play()

        var currKey = this.state.currSongKey;
        var currSong = this.state.audioList[this.state.currSongKey];
        var nextSong = this.state.audioList[this.state.currSongKey + 1]
    
        var currentAutoPlay = this.state.autoplayOn;

        var stopSong = function(){ this.stop() }
        var nextSong = function(){ this.playNextSong() }

        if(this.state.autoplayOn === true) {
            setTimeout(this.autoPlayNextSong, this.state.audioList[this.state.currSongKey].duration * 1010)
        }
      }
      

    stop() {
            
        this.state.audioList[this.state.currSongKey].currentTime = 0;

        //this.state.audioList[this.state.currSongKey].pause();
        { this.pause() }

    }

    pause(){

        this.setState({
          play: false,
          pause: true
        });

        this.state.audioList[this.state.currSongKey].pause();
      }


    setAutoPlay(e) {

        var fv = false;
        var tv = true;

        console.log(e.target.value)

        if(e.target.value == "on") {
            this.setState({
                autoplayOn : tv

            });

        } 

        if(e.target.value == "off") {
            this.setState({
                autoplayOn : fv
            });
        }

    }


    componentWillMount() {
        this.pusher = new Pusher('64fe71b3db1ab2a99821',{cluster: "us2", encrypted: true});
        this.channel = this.pusher.subscribe('mychannel');
        console.log('component will mount');
    }   

    componentDidMount() {
        this.channel.bind('created', this.updateEvents);
        this.channel.bind('modified', this.addSong);
        this.channel.bind('deleted', this.updateEvents);


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
        return (this.state != nextState);
    }

    componentDidUpdate(prevProps, prevState){
        console.log("component did update");

        this.autoplayStatus = this.state.autoplayOn;
        console.log('current auto play status', this.autoplayStatus);


    }

    componentWillUnmount(){
        this.channel.unbind();
        this.pusher.unsubscribe(this.channel);
    }

    updateEvents(data){
        //var new Array
    }

    search(event){
        this.setState({
            keyword: event.target.value
        });
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const FETCH_URL = BASE_URL + 'q=' + event.target.value + '&type=track&limit=30';
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
            console.log(this.state.audioList)
            }).catch((err)=>{
                console.log(err);
        });
    }

    render() {

        const mapToComponents = (data) => {
            if(this.state.keyword == '') return [];

            return data.map((eachData, index) => {
                return (  <SongList key={ index } track = { eachData } channelName={ this.state.channelName } onMusicClick={ this.addSong }/> );
            });
        };

        if (this.state.isLoggedIn){            
            return(
                <div className="home">
                    <div className="ui fixed inverted menu">
                        <div className="ui container">  
                            <div className="menu item default">
                                <i id="mic" className="fa fa-microphone" aria-hidden="true"> </i> DROP
                            </div>
                            <div className="menu item default">
                                Home
                            </div>
                            <div className="menu item default">
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
                                <Button onClick = { this.stop }>Stop</Button>
                                <Button onClick = {this.pause}>Pause</Button>
                                <Button onClick = {this.playNextSong}>Next</Button>

                    <form>
                        
                        <Input className="button" type="radio" value="on"
                         onChange={(e) => {this.setAutoPlay(e)}}
                         checked = { this.state.autoplayOn === true }/>
                        On

                        <Input className="button" type="radio" value="off"
                         onChange={(e) => {this.setAutoPlay(e)}}
                         checked = { this.state.autoplayOn === false }/>
                        Off

                    </form>

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