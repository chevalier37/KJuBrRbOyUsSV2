import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Checkbox, Form, Header, TextArea } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import FormPosterMessage from './FormPosterMessage.js';
import ListeModifierMessage from './ListeModifierMessage.js';

import { Posts } from '../../api/Messages.js';

class ContentModifierMessage extends Component {

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
	        <ListeModifierMessage
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}         
	        />
	      );
	    });
	}
			   
  render() {
		return (
			<div className="MainContent">
				<Segment>
					<Header>
						Modifier mon message
					</Header>
				</Segment>
	  			<div className="ListeMesMessages">
	  				{this.renderAllMessages()}
	  			</div>
			</div>
		);
  	}
}

export default withTracker(({post_id}) => {
	
	const myId = Meteor.userId();
  	const Handle = Meteor.subscribe('MyMessages', myId);
  	const loading = !Handle.ready();
  	const allposts = Posts.find({_id:post_id});
  	const postExists = !loading && !!allposts;
  
  return {
    allMessages: postExists ? allposts.fetch() : []
  };
})(ContentModifierMessage);