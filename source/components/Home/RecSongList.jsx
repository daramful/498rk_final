import React, { Component } from 'react'
import { Button, Input, Icon,Dropdown,Card} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import styles from './Home.scss'
import Modal from './Modal.jsx'

class RecSongList extends Component {  

    constructor() {
        super();

        this.previewMusic = this.previewMusic.bind(this);
    }

    previewMusic(event) {

        console.log(event.target.value);

    }

    render() {

        let noTrakcs = (Object.keys(this.props.track).length === 0);

        if(noTrakcs) {

            return (
                    <Card className="RecSongList">
                        <h3>No Tracks Recommended Yet!</h3>
                    </Card>
                )

        } else {
            return (

                <a href= {this.props.track.preview_url} >

                    <Card className = "RecSongList"
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

                </a> 



            );
        }



  }
}

export default RecSongList
