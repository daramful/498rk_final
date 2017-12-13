import React, { Component } from 'react'
import { Button, Input, Icon, Dropdown, Card, Grid, Segment, Image, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SongList from './SongList.jsx'
import RecSongList from './RecSongList.jsx'
import SidebarCategory from './SidebarCategory.jsx';
import Authenticate from '../Authenticate/Authenticate.jsx'

import Pusher from 'pusher-js';

import style from './Channel.scss'


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
            channelID: "",
            keyword: "",
            categories: [],
            track: [],
            audioList: [],
            isPlaying: false,
            autoplayOn: false,
            currSongKey: 0,
            currSongName: "",

            recTrackID: "",
            recArtistID: "",
            recommendations: []
        };
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.playNextSong = this.playNextSong.bind(this);
        this.autoPlayNextSong = this.autoPlayNextSong.bind(this);
        this.playPrevSong = this.playPrevSong.bind(this);

        this.addSong=this.addSong.bind(this);
        this.addRecSong = this.addRecSong.bind(this);

        this.deleteSong=this.deleteSong.bind(this);
        this.stop=this.stop.bind(this);

        this.setAutoPlay = this.setAutoPlay.bind(this);
        this.getSongIndex = this.getSongIndex.bind(this);
        this.getRecommendation = this.getRecommendation.bind(this);

        this.autoplayStatus = false;
    }

    getRecommendation() {


            console.log('recTrackID ' + this.state.recTrackID)
            console.log('recArtistID ' + this.state.recArtistID)

            const BASE_URL = 'https://api.spotify.com/v1/recommendations?min_energy=0.4&market=US&min_popularity=30';
            
            const BASE_TRACK_URL = '&seed_tracks=';
            const BASE_ARTIST_URL = '&seed_artists=';
            const BASE_GENRE_URL = '&seed_genres='

            let url = BASE_URL + BASE_TRACK_URL + this.state.recTrackID + BASE_ARTIST_URL + this.state.recArtistID;


            axios.get(url, 
                { headers: { 'Authorization': 'Bearer ' + this.state.accessToken } })
                .then((res)=>{
                    console.log('rec res')
                    console.log(res)
                    this.setState({
                        recommendations: res.data.tracks
                    });

                }).catch((err)=>{
                    console.log(err);
                });


        }
         getSongIndex(e) {

            { this.stop() } 

            //alert('index ' + e)
            this.setState({
                recTrackID: this.state.categories[e].trackID,
                recArtistID: this.state.categories[e].artistID,
                currSongName: this.state.categories[e].songName + " by " + this.state.categories[e].artist,
                currSongKey: e
            })


            this.state.audioList[e].play()


        }

        deleteSong(e, f) {

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

        if(this.state.audioList.length === 0) {

            alert('The song list is blank! Add songs to play.')

        } else {

            this.state.audioList[this.state.currSongKey].currentTime = 0;

            this.state.audioList[this.state.currSongKey].pause();

            if(this.state.currSongKey == 0) currKey = this.state.audioList.length - 1;

            else {
                var currKey = this.state.currSongKey
                currKey -= 1
            }

            this.setState({
                recTrackID: this.state.categories[currKey].trackID,
                recArtistID: this.state.categories[currKey].artistID,
                currSongName: this.state.categories[currKey].songName + " by " + this.state.categories[currKey].artist,
                currSongKey: currKey
            })

            this.state.audioList[currKey].play()

        }

      }

     playNextSong(){

            if(this.state.audioList.length === 0) {

                alert('The song list is blank! Add songs to play.')

            } else {


                this.state.audioList[this.state.currSongKey].currentTime = 0;

                this.state.audioList[this.state.currSongKey].pause();

                if(this.state.currSongKey == this.state.audioList.length - 1) currKey = 0;

                    
                else {
                    var currKey = this.state.currSongKey
                    currKey += 1
                }

                this.setState({
                    recTrackID: this.state.categories[currKey].trackID,
                    recArtistID: this.state.categories[currKey].artistID,
                    currSongName: this.state.categories[currKey].songName + " by " + this.state.categories[currKey].artist,
                    currSongKey: currKey
                })

                this.state.audioList[currKey].play()
                //{ this.play() }
            }

      }
      autoPlayNextSong() {

        if(this.state.audioList.length === 0) {

            alert('The song list is blank! Add songs to play.')

        } else {

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
                        recTrackID: this.state.categories[currKey].trackID,
                        recArtistID: this.state.categories[currKey].artistID,
                        currSongName: this.state.categories[currKey].songName + " by " + this.state.categories[currKey].artist,
                        currSongKey: currKey
                    })

                    { this.play() }
                }

        }

      }
      play(){

        if(this.state.audioList.length === 0) {

            alert('The song list is blank! Add songs to play.')

        } else {

            this.setState({
                recTrackID: this.state.categories[this.state.currSongKey].trackID,
                recArtistID: this.state.categories[this.state.currSongKey].artistID,
              currSongName: this.state.categories[this.state.currSongKey].songName + " by " + this.state.categories[this.state.currSongKey].artist,
              isPlaying: true,
              play: true,
              pause: false
            });

            console.log('ttt ' + this.state.categories[this.state.currSongKey].trackID);

            this.state.audioList[this.state.currSongKey].play();

            var currKey = this.state.currSongKey;
            var currSong = this.state.audioList[this.state.currSongKey];
            var nextSong = this.state.audioList[this.state.currSongKey + 1]
        
            var currentAutoPlay = this.state.autoplayOn;

            var stopSong = function(){ this.stop() }
            var nextSong = function(){ this.playNextSong() }

            if(this.state.autoplayOn === true) {
                setTimeout(this.autoPlayNextSong, this.state.audioList[this.state.currSongKey].duration * 1010);
            }
        }

        
      }

      stop() {

        
        for(var i = 0; i < this.state.audioList.length; i++) {


            
        this.state.audioList[i].currentTime = 0;
        this.state.audioList[i].pause();

        //this.state.audioList[this.state.currSongKey].pause();
        //{ this.pause() }
        }

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

    componentWillMount(){
        this.pusher = new Pusher('64fe71b3db1ab2a99821',{cluster: "us2", encrypted: true});
        this.channel = this.pusher.subscribe('mychannel');
        console.log('component will mount');
    }

   componentDidMount() {
        // this.channel.bind('modified', this.updateEvents);
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
        return (this.state != nextState);
    }

    componentDidUpdate(prevProps, prevState){
        console.log("component did update");
        this.autoplayStatus = this.state.autoplayOn;

    }

    componentWillUnmount(){
        this.channel.unbind();
        this.pusher.unsubscribe(this.channel);
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
    addRecSong(){

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
            console.log('cate')
            console.log(this.state.categories)
            }).catch((err)=>{
                console.log(err);
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
            console.log('cate')
            console.log(this.state.categories)
            }).catch((err)=>{
                console.log(err);
        });

    }



    render() {
        const mapToComponents = (data) => {
            if(this.state.keyword == '') return [];

            return data.map((eachData, index) => {
                return (  <SongList key={ index } track = { eachData } channelName={ this.state.channelName } onMusicClick={ this.addSong } /> );
            });
        };

        const mapRecSongToComponents = (data) => {

            return data.map((eachData, index) => {
                return (  <RecSongList key={ index } recs = { eachData } channelName={ this.state.channelName } onRecMusicClick = { this.addRecSong }/> );
            });
        };

        if (this.state.isLoggedIn){
            return(
                <div className="home">
                    
                         <div className="ui main text" style={{marginLeft: 10+'%', marginRight: 10+'%', marginBottom: 5+'%'}}>
                            <h1 className="ui header container">
                                Welcome to Channel "<span className="ui header red">{this.state.channelName}</span>"
                            </h1> 
                            <h2>
                                 {  }
                            </h2>
                        <Grid celled='internally'>
                        <Grid.Row>

                        <Grid.Column tablet={16} computer={4}> 
                            <div className="lookUpSongs">
                                <Input className="lookUpSongsInput" type="text" placeholder="search for a song" ref="query" onChange={(e) => {this.search(e)}}/>
                                <div className="recommendedLists">
                                    { mapToComponents(this.state.track) }
                                </div>  
                            </div>
                        </Grid.Column>
                        <Grid.Column tablet={16} computer={12}> 
                            <div>
                                <h2>
                                 { this.state.currSongName }
                                </h2>
                                    <Button className="ui inverted" onClick = {this.playPrevSong}><i className="fa fa-arrow-circle-left" aria-hidden="true"></i></Button>
                                    <Button className="ui inverted" onClick = { this.play }><i className="fa fa-play-circle" aria-hidden="true"></i></Button>
                                    <Button className="ui inverted" onClick = { this.stop }><i className="fa fa-stop-circle" aria-hidden="true"></i></Button>
                                    <Button className="ui inverted" onClick = {this.pause}><i className="fa fa-pause-circle" aria-hidden="true"></i></Button>
                                    <Button className="ui inverted" onClick = {this.playNextSong}><i className="fa fa-arrow-circle-right" aria-hidden="true"></i></Button>
                                    <Button className="ui inverted" onClick = {this.getRecommendation}><i className="fa fa-magic" aria-hidden="true">Recommendation</i></Button>
                                    <div style = {{ marginTop: 5}}>
                                    <span>
                                      { mapRecSongToComponents(this.state.recommendations) }  
                                    </span>
                                </div>

                    <form>

                    <Button as='div' labelPosition='right'>
                        <Button icon>
                            <Input className="button autoplayOption" type="radio" value="on"
                                onChange={(e) => {this.setAutoPlay(e)}}
                                checked = { this.state.autoplayOn === true }/>
                            <Icon name='repeat' />
                        </Button>
                        <Label as='a' basic pointing='left'>Autoplay</Label>                        
                    </Button>


                    <Button as='div' labelPosition='right'>
                        <Button icon>
                            <Input className="button autoplayOption" type="radio" value="off"
                            onChange={(e) => {this.setAutoPlay(e)}}
                            checked = { this.state.autoplayOn === false }/>                    
                            <Icon name='unlinkify' />
                        </Button>
                        <Label as='a' basic pointing='left'>Stop Autoplay</Label>
                    </Button>

                    </form>

                            <SidebarCategory categories={this.state.categories} receiveSongIndex = {(f) => this.getSongIndex(f)} onSongListClick = {(e, f) => this.deleteSong(e, f)} channelID={ this.state.channelID } currentIndex = {this.state.currSongKey} />
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
        }
        else{

            return(
                <Authenticate />
            )
        }

    }
}


export default Channel
