import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Checkbox, Form, Header, TextArea } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import FormPosterMessage from './FormPosterMessage.js';
import ListeModifierReponse from './ListeModifierReponse.js';

import { Comments } from '../../api/Reponses.js';

class ContentModifierMessage extends Component {

	constructor(props) {
	    super(props);
	 
	    this.state = {
	      	allMessages: 'visible',
		 	
	    };
	}

	renderAllMessages() {
	    let AllMessages = this.props.allMessages;
	    const nuit = this.props.nuit;
	    const post_id=this.props.post_id;
	    return AllMessages.map((message) => {
	    	let date = Date.parse(message.submitted);
         
	    return (
	        <ListeModifierReponse
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}
	          nuit={nuit}
	          post_id={post_id}         
	        />
	      );
	    });
	}
			   
  render() {
  	const nuit = this.props.nuit;
		return (
			<div className="MainContent">
				 <div className={ nuit ? "titreConseillerNuit" : "titreConseiller"}>
						Modifier ma réponse
				</div>
	  			<div className="ListeMesMessages">
	  				{this.renderAllMessages()}
	  			</div>
			</div>
		);
  	}
}

ContentModifierMessage.propTypes = {
        allMessages: PropTypes.array.isRequired,
    };

export default withTracker(({post_id}) => {
	
	const myId = Meteor.userId();
  	const Handle = Meteor.subscribe('ModifierMyReponse', post_id);
  	const loading = !Handle.ready();
  	const allposts = Comments.find({'_id':post_id});
  	const postExists = !loading && !!allposts;
  
  return {
    allMessages: postExists ? allposts.fetch() : []
  };
})(ContentModifierMessage);