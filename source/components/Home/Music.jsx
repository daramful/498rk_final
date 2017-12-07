import React, { Component } from 'react'
import { Button, Input, Icon,Dropdown,Card} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import styles from './Home.scss'
import Modal from './Modal.jsx'
import MakeChannelModal from './MakeChannelModal.jsx'

class Music extends React.Component {
    constructor(props) {
    super(props);
    this.state = {

      play: false,
      pause: true,
      songList: []
      
    };

    this.url = "https://p.scdn.co/mp3-preview/cd82ebdf5fe37789010ea735e70a7b3e60f93072?cid=02e2fc9b73024917b5f197f8dadca195";
    this.audio = new Audio();
    //this.audio.onLoad = this.load; if you want an event listener
    this.audio.src = this.url;

    this.audio2 = new Audio();
    this.audio2.src = 'https://p.scdn.co/mp3-preview/9f71f6fefb36daa75dd32dcf66c00e8ad299c503?cid=02e2fc9b73024917b5f197f8dadca195';
    this.audio3 = new Audio();
    this.audio3.src = 'https://p.scdn.co/mp3-preview/45128668160f243a31a01361730fd5859f4c3b82?cid=02e2fc9b73024917b5f197f8dadca195';

    this.songArr = []

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.addSong = this.addSong.bind(this);
    this.playNextSong = this.playNextSong.bind(this);

  }

  addSong(){

    this.songArr.push(this.audio);
    this.songArr.push(this.audio2);
    this.songArr.push(this.audio3);


    //this.setState({
    //  songList: arr
    //});

    console.log(this.audio);
    console.log(this.songArr[0]);
    //this.songArr[0].play();
  }
  
  playNextSong(){

    //this.setState({
    //  songList: arr
    //});
    this.songArr[0].currentTime = 0;
    this.songArr[0].pause();
    this.songArr[1].play();   
    console.log(this.state.songList);
    //this.songArr[1].play();
  }
  

  play(){
    this.setState({
      play: true,
      pause: false
    });

    console.log(this.audio.ended)
    this.audio.play();
  }
  
  pause(){
  this.setState({ play: false, pause: true });
    this.audio.pause();
  }
  
  render() {
    
  return (
    <div>

      <Button onClick = { this.addSong }>Add Song</Button>
      <Button onClick = { this.play }>Play</Button>
      <Button onClick = {this.pause}>Pause</Button>
      <Button onClick = {this.playNextSong}>Next</Button>
    </div>
    );
  }
}


export default Music
