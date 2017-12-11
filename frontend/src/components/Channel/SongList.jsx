import React, { Component } from 'react'
import { Button, Input, Icon,Dropdown,Card} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import axios from 'axios'

class SongList extends Component {  

    constructor(props) {
        super(props);
        this.state={
            channelName: this.props.channelName
        };
        this.previewMusic = this.previewMusic.bind(this);
        this.clickMusicHandler = this.clickMusicHandler.bind(this);
    }


    clickMusicHandler() {

        axios.put('/channels/'+ this.props.channelName, {

            playList: {
                songName: this.props.track.name,
                artist: this.props.track.artists[0].name,
                url: this.props.track.preview_url
            }
        }).then((res)=>{
            this.props.onMusicClick(this.props.track);
            console.log("added song");
        }).catch((err)=>{
            console.log(err);
        });   
    
    }

    previewMusic(event) {

        console.log(event.target.value);

    }

    render() {

        let noTracks = (Object.keys(this.props.track).length === 0);

        if(noTracks) {

            return (
                    <Card className="RecSongList">
                        <h3>No Tracks Recommended Yet!</h3>
                    </Card>
                )

        } else {
            return (

                    <Card className = "RecSongList"
                    onClick = { this.clickMusicHandler }
                    value = { this.props.track.preview_url} >
                        <Card.Content>
                            <Card.Header className="RecSongList_header">
                                { this.props.track.name }
                            </Card.Header>
                            <Card.Meta>
                                by {this.props.track.artists[0].name}
                            </Card.Meta>
                        </Card.Content>
                    </Card>
            );
        }



  }
}

export default SongList
