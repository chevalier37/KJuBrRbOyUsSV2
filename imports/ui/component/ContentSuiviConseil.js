import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Checkbox, Form, Header, TextArea, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import FormPosterMessage from './FormPosterMessage.js';
import ListeSuiviConseil from './ListeSuiviConseil.js';

import { Posts } from '../../api/Messages.js';
import { Comments } from '../../api/Reponses.js';

class ContentMessagePostes extends Component {

	constructor(props) {
		    super(props);
		 
		    this.state = {
		      	allMessages: 'visible',
		    };
	}

	renderAllMessages() {
	    let AllMessages = this.props.allMessages;

	    return AllMessages.map((message) => {
	     let date = Date.parse(message.submitted);
	     let nuit = this.props.nuit;
         
	      return (
	        <ListeSuiviConseil
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}
	          nuit={nuit}          
	        />
	      );
	    });
	}
			   
  render() {
  	let nuit = this.props.nuit;
		return (
			<div className="MainContentProfil">
					<div className={ nuit ? "headerNuit" : "headerJour"}>
						Les conseils que j'ai donné
					</div>
					<Divider />
	  			<div className="ListeMesMessages">
	  				{this.renderAllMessages()}
	  			</div>
			</div>

		);
  	}
}

ContentMessagePostes.propTypes = {
        allMessages: PropTypes.array.isRequired,
    };

export default withTracker(() => {
	
	const myId = Meteor.userId();
  	const Handle = Meteor.subscribe('MyReponses', myId);
  	const loading = !Handle.ready();
  	const allposts = Comments.find({userId:myId}, { sort: { submitted: -1 }});
  	const postExists = !loading && !!allposts;
  
  return {
    allMessages: postExists ? allposts.fetch() : []
  };
})(ContentMessagePostes);