import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Checkbox, Form, Header, TextArea, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ListeVideos from './ListeVideos.js';

import { Videos } from '../../api/Videos.js';

class Contentvideos extends Component {

	constructor(props) {
	    super(props);
	 
	    this.state = {
	      	allMessages: 'visible',
	    };
	}

	renderAllMessages() {
	    let AllMessages = this.props.allMessages;

	    return AllMessages.map((message) => {
	    	let date = Date.parse(message.post_date);
         
	    return (
	        <ListeVideos
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}
	          content={message.post_content}          
	        />
	      );
	    });
	}
			   
  render() {
		return (
			<div className="MainContentProfil">
	  			<div className="ListeMesMessages">
	  				{this.renderAllMessages()}
	  			</div>
			</div>

		);
  	}
}



export default withTracker(() => {
  const Handle = Meteor.subscribe('AllVideos');
  const loading = !Handle.ready();
  const allposts = Videos.find({}, { sort: { date: -1 }, limit:10});
  const postExists = !loading && !!allposts;
  
  return {
    allMessages: postExists ? allposts.fetch() : []
  };
})(Contentvideos);