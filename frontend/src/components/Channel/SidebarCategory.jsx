import React, { Component } from 'react'
import { Button, Input, Icon,Dropdown,Card} from 'semantic-ui-react'
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
/*
    componentDidUpdate(prevProps, prevState){
        //console.log(this.state.songName);
        //console.log(this.state.artists[0]);


        console.log("music did update")
        
        this.songArr = this.props.categories.url;
        console.log(songArr);
    }
  */  


    render() {
        return (

                <div className="row">
                      <div className="col-sm-10">
                          {this.props.categories.map((category, key) =>(
                            <div key={key}><span>{category.songName}</span>
                             - <span>{category.artist}</span></div>
                          ))}
                      </div>
                </div>
       

            
        );
    }
}

export default SidebarCategory;