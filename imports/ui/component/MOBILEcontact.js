import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {  Input, Label, Menu, Grid, Header, Image, Rail, Segment, Divider, Icon  } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import MOBILEContactChatContent from '../component/MOBILEContactChatContent.js';


import { ContactChat } from '../../api/ContactChat.js';

class contactChat extends Component {

	componentWillMount(){
		const to_id = this.props.to_id;
		const myId = Meteor.userId();
		Meteor.call('addContactChat',
		  	  to_id,
		  	  (err) => {
  
          	})
	}

	renderAllContactChat() {
          let AllChat = this.props.allContactChat;
          let nuit = this.props.nuit;

          return AllChat.map((message) => {
           let date = Date.parse(message.post_date);
             
            return (
              <MOBILEContactChatContent
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
			
		      	<div className={this.props.nuit ? "ChatContactLeftNuit" : "ChatContactLeft" }>
  					 <div>
                 <div className="espaceContact">
                 </div>
  				        {this.renderAllContactChat()}
  			      </div>
				    </div>
		);
  }
}

export default contactChat =  withTracker(() => {
  const from_id = Meteor.userId();
  const Handle = Meteor.subscribe('ContactChat', from_id);
  const loading = !Handle.ready();
  const allreponses = ContactChat.find({$or : [{from_id: from_id}, {to_id:from_id}]}, { sort: { date: -1 } });
  const reponseExists = !loading && !!allreponses;

  return {
    allContactChat: reponseExists ? allreponses.fetch() : [],

  };
})(contactChat);
