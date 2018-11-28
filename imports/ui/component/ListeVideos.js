import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Checkbox, Form, Header, Divider, Label, Comment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { Comments } from '../../api/Reponses.js';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

class ListeVideos extends Component {
	
	constructor(props) {
		    super(props);
		 
		    this.state = {

		    };
		}



  render() {
    
	const opts = {
      height: '156',
      width: '256',
      }
   
		return (
			<div className="ListeMessages">
	  			
	  			<div className="MiniatureVideo">
			  			<YouTube
		        			videoId={this.props.message.IDvideo}
		        			opts={opts}
		        			
	      				/>
	      				
		  		</div>

			</div>

		);
  	}
}


export default ListeVideos =  withTracker(() => {


  return {
   
  };
})(ListeVideos);