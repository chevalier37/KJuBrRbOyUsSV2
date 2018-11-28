import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Checkbox, Form, Header, TextArea, Dimmer, Loader, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Img from 'react-image'
import AdSense from 'react-adsense';
import PropTypes from 'prop-types';
import ResultSearchUser from './ResultSearchUser.js';


class SearchUsers extends Component {

	constructor(props) {
			    super(props);
			 
			    this.state = {
			      	allMessages: 'visibleMessage',			
			    };
			}

	renderAllMessages() {
	    let AllMessages = this.props.resultSearch;
	    let nuit = this.props.nuit;
	    return AllMessages.map((user) => {
	    	/*let username = user.username;
         let searc = username.substring(0,1);
         console.log(searc)*/
	      return (
	        <ResultSearchUser
	          key={user._id}
	          user={user}
	          id={user._id}
	          nuit={nuit}         
	        />
	      );
	    });
	}
			   
  render() {
  	let nuit = this.props.nuit;

		return (
			<div className="">
	  			<div className="">
	  				{this.renderAllMessages()}
	  			</div>

			</div>
		);
  	}
}

SearchUsers.propTypes = {
    allMessages: PropTypes.array.isRequired,
};

export default withTracker(({user}) => {
  const Handle = Meteor.subscribe('SearchUsers', user);
  const loading = !Handle.ready();

  var pattern = new RegExp(".*" + user + ".");
  const allposts = Meteor.users.find({"username": {$regex: pattern, $options:"i"}}, { sort: { username: -1 }, limit:5, fields: {
      'username':1,
      'profile.gender':1,
      '_id':1,
    }} );

   const postExists = !loading && !!allposts;

  return {
    resultSearch: postExists ? allposts.fetch() : [],
  };
})(SearchUsers);