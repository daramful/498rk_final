import React, { Component } from 'react'
import { Button, Input, Icon, Dropdown, Card, Grid, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export class RecSongList extends React.Component {

    constructor(props) {
    super(props);
    this.state = {

      play: false,
      pause: true,
      songList: []
      
    };

    this.onClickRecHandler = this.onClickRecHandler.bind(this);
  }


    onClickRecHandler() {


        axios.put('/channels/'+ this.props.channelName, {

            playList: {
                songName: this.props.recs.name,
                artist: this.props.recs.artists[0].name,
                url: this.props.recs.preview_url,
                trackID: this.props.recs.id,
                artistID: this.props.recs.artists[0].id
            }
        }).then((res)=>{

            console.log('iddd ' + this.props.recs.id)

            this.props.onRecMusicClick(this.props.recs);

            console.log("added rec song");
        }).catch((err)=>{
            console.log(err);
        });   

    }

    render() {


            return (

                    <span>
                      <button className="ui violet basic button"
                        onClick = { this.onClickRecHandler }
                      > {this.props.recs.name} </button>

                    </span>
            );
        
  }
}

export default RecSongList;