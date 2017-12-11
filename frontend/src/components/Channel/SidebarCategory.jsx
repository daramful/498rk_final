import React, { Component } from 'react'
import { Button, Input, Icon, Dropdown, Card, Grid, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

export class SidebarCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            play: false,
            pause: true,
            songList: []
        };
    }


    render() {
        return (
            <div className="ui icon message">
            <div className="item">
                <div className="content" >
                <a className="header">
                {this.props.categories.map((category, key) =>(
                    <div key={key} className="ui divider" style={{padding: 1 + 'em'} }>
                        <i className="large spotify middle aligned icon"></i>
                        <span>{category.songName}</span>- <span>{category.artist}</span>
                    </div>                            
                    ))}
                </a>
                <div className="ui divider"></div>
                </div>
            </div>
            </div>    
        );
    }
}

export default SidebarCategory;