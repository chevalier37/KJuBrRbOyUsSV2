import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Checkbox, Form, Header, Divider, Label, Comment, Confirm } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { Comments } from '../../api/Reponses.js';
import { withTracker } from 'meteor/react-meteor-data';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types';

class ResultSearchUser extends Component {
	
	constructor(props) {
		    super(props);
		 
		    this.state = {
		      	sexe: '',
		      	_id:''
		    };
		}

	componentWillMount(){
		const sexe = this.props.user.profile.gender;

	    {
	    	sexe == 'fille' ? 
	        this.setState({sexe: 'pink'}):
		  	this.setState({sexe: 'blue'})
		}
	}

  render() {
    
	const colorSexe = this.state.sexe;

	let nuit = this.props.nuit;

		return (
			<div className={ nuit ? "ResultNuit" : "Result"}>
				<Link to={'/VisiteProfil/' + this.props.user._id}>
					<div className={colorSexe=="pink" ?  "resultfille" : "resultGarcon"}>
				  			{this.props.user.username}
			  		</div>
			  	</Link>
			</div>
		);
  	}
}

ResultSearchUser.propTypes = {
        user: PropTypes.object.isRequired,
    };

export default ResultSearchUser =  withTracker(() => {

  return {

  };
})(ResultSearchUser);
