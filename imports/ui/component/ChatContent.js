import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Form, Header, Divider, TextArea } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Img from 'react-image'
import PropTypes from 'prop-types';

export default class ChatContent extends Component {
		constructor(props) {
		    super(props);
		    this.state = {
		      message:'',
		      date:'',
		      messageDate:'',
		      read:false,
		      gauche:'',
		      messageNuit:'',
		    };
		}
	
		componentWillMount(){
			const to_id = this.props.to_id;
			const myId = Meteor.userId();

			{
			myId===this.props.message.from_id ?
		 	this.setState({message: 'message_droite'}) :
		 	this.setState({message: 'message_gauche'})
			}


			{
			this.props.message.read ?
			this.setState({read: true}) :
			this.setState({read: false})
			}

			{
			myId===this.props.message.from_id ?
		 	this.setState({messageDate: 'message_droite_date'}) :
		 	this.setState({messageDate: 'message_gauche_date'})
	    	}

	    	{
			myId==this.props.message.to_id ?
			this.setState({gauche: 'none'}) :
		 	this.setState({gauche: 'message_droite_date'})
	    	}

		    const date = this.props.date;
		    let jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
		    let mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
		    let date_fr = new Date(date);
		    let affiche_date = date_fr.getDate() + " ";   // numero du jour
		    affiche_date += mois[date_fr.getMonth()] + " ";   // mois
		    affiche_date += date_fr.getFullYear();
		    let heure = date_fr.getHours();
		    let minutes = date_fr.getMinutes();
		    if(minutes < 10){
		        minutes = "0" + minutes;
		   	}

			let la_date = affiche_date +" " +heure + "h" + minutes;
			this.setState({date: la_date})

			Meteor.apply('ReadAllChat', [{
		        }], {
		        onResultReceived: (error, response) => {
		          if (error) console.warn(error.reason);
		          /*{response ?
		           this.setState({notifNonLu: response}) :
		           ""}*/
		        },
		     });
		}

		Supprimer(){
			Meteor.call(
				'supprimerChat',
		    	this.props.message._id,
		    );
		}

		componentDidMount() {
		    this.scrollToBottom();
		}

		componentDidUpdate() {
		    this.scrollToBottom();
		}

		scrollToBottom() {
		    this.el.scrollIntoView();
		}

		breaklines(){
			let message = this.props.message.message
			return message
		}
		
  render() {

  	ChatContent.propTypes = {
        message: PropTypes.object.isRequired,
        to_id: PropTypes.string.isRequired,
        date:  PropTypes.number.isRequired
    };
    
			

	    return (
	    	<div>
		    	<div className={"AffficheDiscussion" + " "+this.state.messageDate}>
		    		{this.state.date}
		    	</div>
		    	<div
		    	 className={"SupprimerChat" + " "+this.state.gauche}
		    	 onClick={this.Supprimer.bind(this)}
		    	 >
		    		supprimer
	    		</div>
		 
				<div className={
					this.props.nuit && this.state.message == "message_gauche" ?
					"AffficheDiscussion" + " "+ this.state.message + " " + "messageNuit" :
					"AffficheDiscussion" + " "+ this.state.message

				}>
					<div className="display-linebreak">
						    {this.breaklines()}
					</div>
					<div ref={el => { this.el = el; }} >
					</div>

		    	</div>
		    	<div className={"MessageLu" + " "+this.state.gauche}>
		    		<div className={this.props.message.read ? "visible" : "none"}>
		    			<Img className="iconread" src="/check.png"/> message lu
		    		</div>
		    		<div className={!this.props.message.read? "visible" : "none"}>
		    			<Img className="iconread" src="/unread.png"/> message non lu
		    		</div>
		    	</div>
	    	</div>
	    )
	  }
}
