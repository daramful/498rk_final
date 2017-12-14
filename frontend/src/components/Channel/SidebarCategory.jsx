import React, { Component } from 'react'
import { Button, Input, Icon, Dropdown, Card, Grid, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export class SidebarCategory extends React.Component {

    constructor(props) {
    super(props);
    this.state = {

      play: false,
      pause: true,
      songList: []
      
    };

    this.clickSongListHandler = this.clickSongListHandler.bind(this);
    this.sendIndex = this.sendIndex.bind(this);

  }

    clickSongListHandler(e, f) {

        axios.delete('/channels/playlist/song?channelId=' + this.props.channelID + '&songId=' + e).then((res)=>{

            this.props.onSongListClick(e, f);
            alert('id', e)
            alert('key', f)
            console.log("deleted song");
        }).catch((err)=>{
            console.log(err);
        });   

    }

    sendIndex(e) {

      console.log(e)
      this.props.receiveSongIndex(e);

    }

    render() {
              return (
                    
                    <Card.Group>
                    <Card className="songAppended">
                      <Card.Content>
                      {this.props.categories.map((category, key) =>(
                            <div key={key} style={{padding: 1 + 'em'} }>
                      <Card.Header>
                          <Button id="xx" onClick = {  (e) => this.sendIndex(key) }><i className="fa fa-play" aria-hidden="true"></i></Button>  
                          <Button id="xx" onClick = { (e, f) => this.clickSongListHandler(category._id, key)}><i className="fa fa-window-close-o" aria-hidden="true"></i></Button>                        
                      </Card.Header>
                        <Card.Description>
                        <span>{category.songName}</span> - By <span>{category.artist}</span>
                        <div className="ui divider"></div>
                        </Card.Description>
                        </div>                            
                        ))}                        
                      </Card.Content>
                    </Card>
                    <div className="ui divider"></div>
                    </Card.Group>         
                    
        );


    }
}

export default SidebarCategory;
