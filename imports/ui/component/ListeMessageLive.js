import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Checkbox, Form, Header, Divider, Label, Comment, Confirm, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { hot } from 'react-hot-loader'
import Img from 'react-image'
import PropTypes from 'prop-types';

class ListeReponses extends Component {
	
	constructor(props) {
		    super(props);
		    this.state = {
		      	sexe: '',
			    disabled:false,
			    color:true,
			    IsModerateur:false,
			    open:false,
			    desactiver:false,
			    IsConseiller:false,
		    };
	}

	handleConfirm = () => this.setState({ open: false })
    handleCancel = () => this.setState({ open: false })

    componentWillMount(){
		//on regarde si l'utilisateur est l'auteur de la réponse
		let user = this.props.message.userId;
		let id = this.props.message.userId;

		Meteor.apply('IsModerateur', [{
          }], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
            
            {
            response ?
             this.setState({IsModerateur: response})
             :
             ""
            }

            },
    	})

    	Meteor.apply(
	   		'IsConseiller',
	   		[{id}],
	   		{
	        onResultReceived: (error, response) => {
	           if (error) console.warn(error.reason);
	           {
	            response ?  
	             this.setState({IsConseiller:true}) :
	             ""
		       }
		    },
		});

		const sexe = this.props.message.gender;
		const author_id = this.props.message.userId;
	    
	    {
	    sexe == 'fille' ? 
	    this.setState({sexe: 'pink'}):
		this.setState({sexe: 'blue'})
		}

		{author_id == Meteor.userId() ? 
	         this.setState({author_id: true}):
		  	 this.setState({author_id: false})
		}

		//on calcul la date du post
		const today = new Date();
		const diffToday = Date.parse(today);
		const post_date = this.props.date;
		const nbrSeconde = ((diffToday-post_date)/1000) + 2;
		this.setState({nbrSeconde: nbrSeconde})

		const nbrMinutes = Math.round(nbrSeconde/60);
		this.setState({nbrMinutes: nbrMinutes})
		
		const nbrHeures = Math.round(nbrMinutes/60);
		this.setState({nbrHeures: nbrHeures})

		const nbrJours = Math.round(nbrHeures/24);
		this.setState({nbrJours: nbrJours})

		const nbrMois = Math.round(nbrJours/30);
		this.setState({nbrMois: nbrMois})


		if(_.include(this.props.message.upvoters, Meteor.userId()) || user == Meteor.userId()){
       	this.setState({desactiver: true}); this.setState({color: false})}else{
       	this.setState({desactiver: false})
   		}

   		{
		Meteor.userId() && _.include(this.props.message.signalerTab, Meteor.userId()) ?
       	this.setState({disabled: true}) :
       	this.setState({disabled: false})
   		}


	}


  render() {
    
	const colorSexe = this.state.sexe;
	const IsConseiller = this.state.IsConseiller;
   	let now = new Date();
	let diff = now - this.props.message.naissance;
	let age = Math.round(diff / 31536000000);
	let nuit = this.props.nuit;

		return (
			<div className={ nuit ? "ListeMessagesNuit" : "ListeMessages"}>
	  			<div className={colorSexe=="pink" ?
	        				  "filleMessageBackground" : "garconMessageBackground"
	        				}>
			  			<div className={colorSexe=="pink" ?
	        				  "titreMessageFille" : "titreMessageGarcon"
	        				}>
						<Popup trigger={
	        				<div className={IsConseiller ? "visibleLogoConseiler" : "none"}>
	        					<Img className="iconConseiller" src="/sheriff.png"/>
	        				</div>
						} content='Conseiller' />
						
				  			<Link to={'/VisiteProfil/' + this.props.message.userId}>
				  				{this.props.message.post_author}
				  			</Link>
				  			
			  			</div>
			  			<div className={ nuit ? "ageAuthorReponseNuit" : "ageAuthorReponse"}>
	        				{age} ans
	        			</div>
		  		</div>


	  			<Segment className={ nuit ? "SegmentNuit" : ""} color={colorSexe=="pink" ? "pink" : "blue" }>
		  			<p className={"ContentQuestion" + " " + "display-linebreak"}>
		  				{this.props.message.comments}
		  			</p>
		  			<Divider />
		  			<Comment>
	      				<div className="commentLive">
	         				<div className="dateMessage ecran">
		         			{	this.state.nbrSeconde<60 ? "Il y a 30 secondes": 
		         				this.state.nbrMinutes<2 ? "Il y a " + this.state.nbrMinutes +" minute": 
		         				this.state.nbrMinutes<60 ? "Il y a " + this.state.nbrMinutes +" minutes":
		         				this.state.nbrHeures<2 ? "Il y a " + this.state.nbrHeures  +" heure": 
								this.state.nbrHeures<24 ? "Il y a " + this.state.nbrHeures  +" heures": 
								this.state.nbrJours<2 ? "Il y a " + this.state.nbrJours  +" jour":
								this.state.nbrJours<30 ? "Il y a " + this.state.nbrJours  +" jours":  
								"Il y a " + this.state.nbrMois +" mois" 
	         				}
	         				</div>
							<div className="repondreMessage" >
								<div className="choixMessage">
									<div className="contactermobile" >
										<Link to={'/MOBILEChat/' + this.props.message.userId }>
										Message privé
										</Link>
									</div> 
									<div className="contacterecran" >
										<Link to={'/Chat/' + this.props.message.userId }>
										Message privé
										</Link>
									</div>
								</div>
							</div>
	      				</div>
	    			</Comment>
	  			</Segment>
			</div>
		);
  	}
}

ListeReponses.propTypes = {
        message: PropTypes.object.isRequired,
    };

export default ListeReponses =  withTracker(({ message }) => {
	
  return {
  	
  };
})(ListeReponses);