import React, { Component } from 'react'
import { Button, Input, Icon, Dropdown, Card, Grid, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import axios from 'axios'
import styles from './Channel.scss'

export class SidebarCategory extends React.Component {

    constructor(props) {
    super(props);
    this.state = {

      play: false,
      pause: true,
      songList: []
      
    };

    this.clickSongListHandler = this.clickSongListHandler.bind(this);

  }

    clickSongListHandler(e) {


      console.log(e)
      this.props.onSongListClick(e);

        axios.delete('/channels/playlist/song?channelId=' + this.props.channelID + '&songId=' + e).then((res)=>{

            this.props.onSongListClick();
            console.log("deleted song");
        }).catch((err)=>{
            console.log(err);
        });   


    }


    render() {
              return (
                    
                    <Card.Group>
                    <Card className="songAppended">
                      <Card.Content>
                      {this.props.categories.map((category, key) =>(
                            <div key={key} style={{padding: 1 + 'em'} }>
                      <Card.Header>
                          <Button id="xx" onClick = { (e) => this.clickSongListHandler(category._id)}>X</Button>                        
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