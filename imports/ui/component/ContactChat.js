import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {  Input, Label, Menu, Grid, Header, Image, Rail, Segment, Sticky, Icon  } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import ContactChatContent from '../component/ContactChatContent.js';
import AdSense from 'react-adsense';
import PropTypes from 'prop-types';
import { ContactChat } from '../../api/ContactChat.js';

class contactChat extends Component {

	componentWillMount(){
		const to_id = this.props.to_id;
		const myId = Meteor.userId();
		
    Meteor.call(
      'addContactChat',
		  to_id,
		  (err) => {
            	if(err){
           		 } else {     
            	}
    })
	}

	renderAllContactChat() {
      let AllChat = this.props.allContactChat;
      let nuit = this.props.nuit;

      return AllChat.map((message) => {
       let date = Date.parse(message.post_date);
         
        return (
          <ContactChatContent
            key={message._id}
            contact={message}
            date={date}
            to_id={this.props.to_id}
            nuit={nuit}    
          />
        );
      });
  }
  
  render() {
		return (
		      	<div className="ChatContactLeft">
  					  <Menu vertical>
              <div className={ this.props.nuit ? "HeaderLastConseillerNuit" : "HeaderLastConseiller"}>
      					 Mes contacts
      					 </div>
                 <div className="espaceContact">
                 </div>
  				        {this.renderAllContactChat()}
  			      </Menu>
				    </div>
		);
  }
}

  contactChat.propTypes = {
      allContactChat: PropTypes.array.isRequired,
      to_id: PropTypes.string.isRequired,
  };

export default contactChat =  withTracker(() => {
  const Handle = Meteor.subscribe('ContactChat');
  const loading = !Handle.ready();
  const allreponses = ContactChat.find({}, { sort: { date: -1 } });
  const reponseExists = !loading && !!allreponses;

  return {
    allContactChat: reponseExists ? allreponses.fetch() : [],

  };
})(contactChat);
