import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Checkbox, Form, Header, Divider, Label, Comment, Rating } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Img from 'react-image'
import PropTypes from 'prop-types';

class ListeNotifications extends Component {
	
	constructor(props) {
		    super(props);
		 
		    this.state = {
		      	sexe: '',
			    disabled:false,
			    disabledVote:false,
		    };
		}

	componentWillMount(){
		const sexe = this.props.message.gender;
	    
	    {sexe == 'fille' ? 
	         this.setState({sexe: 'pink'}):
		  	 this.setState({sexe: 'blue'})
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

	}

	breaklines(){
			  let message = this.props.message.message
			  return message
			}

	Supprimer(){
		Meteor.call('supprimerNotification',
	    this.props.message._id,
	     );
	}

  render() {
    
	const colorSexe = this.state.sexe;
	const myId = Meteor.userId();
	let nuit = this.props.nuit;
   
		return (
			<div className={ nuit ? "ListeMessagesNuit" : "ListeMessages"}>
	  			<div className={this.props.message.gender=="fille" ?
	        				    "filleMessageBackground" : "garconMessageBackground"
	        				}>

			  			<span className={this.props.message.type=='chat' ?
	        				  "visibleTitre" : "none"
	        				}>
				  			<Link to={'/VisiteProfil/' + this.props.message.from_id}>
				  			Nouveau message de {this.props.message.from_name} 
				  			</Link>
				  			<div className="iconNotif">
				  				<Img className="imgNotif" src="/chatNotif.png"/>
				  			</div>
			  			</span>

			  			<span className={this.props.message.type=='reponse' ?
	        				  "visibleTitre" : "none"
	        				}>
				  			<Link to={'/singleMessage/' + this.props.message.postId}>
				  			Nouvelle réponse au message : {this.props.message.post_title} 
				  			</Link>
				  			<div className="iconNotif">
				  				<Img className="imgNotif" src="/email.png"/>
				  			</div>
			  			</span>

			  			<span className={this.props.message.type=='recommandaton' ?
	        				  "visibleTitre" : "none"
	        				}>
				  			<Link to={'/VisiteProfil/' + this.props.message.from_id}>
				  			Nouvelle recommandation de {this.props.message.from_name} 
				  			</Link>
				  			<div className="iconNotif">
				  				<Img className="imgNotif" src="/medal.png"/>
				  			</div>
			  			</span>

			  			<span className={this.props.message.type=='signaler' ?
	        				  "visibleTitreSignalé" : "none"
	        				}>
				  			Message signalé !
				  			<div className="iconNotif">
				  				<Img className="imgNotif" src="/warning.png"/>
				  			</div>
			  			</span>

			  			<span className={this.props.message.type=='voteUp' ?
	        				  "visibleTitre" : "none"
	        				}>
				  			Conseil approuvé
				  			<div className="iconNotif">
				  				<Img className="imgNotif" src="/like.png"/>
				  			</div>
			  			</span>

			  			<span className={this.props.message.type=='conseiller' ?
	        				  "visibleTitre" : "none"
	        				}>
				  			Tu peux devenir conseiller !
				  			<div className="iconNotif">
				  				<Img className="imgNotif" src="/newAdvisor.png"/>
				  			</div>
			  			</span>

			  			<span className={this.props.message.type=='obtenirRecommandation' ?
	        				  "visibleTitre" : "none"
	        				}>
				  			Tu peux laisser une recommandation
				  			<div className="iconNotif">
				  				<Img className="imgNotif" src="/heart.png"/>
				  			</div>
			  			</span>
		  		</div>
	  			
	  			<Segment
	  			 className={ nuit ? "SegmentNuit" : ""}
	  			 color={this.props.message.gender=="fille" ?
	        				  "pink" : "blue" }>			
		  			<div className="ContentQuestion">
			  			 <div className={this.props.message.type=='signaler' ? "visibleNotif" : "none"}>
			  			 	Ton message a été signalé par un utilisateur.<br />
			  			 	A partir de <strong>3 avertissemens</strong> ton compte sera bloqué.<br /><br />
			  			 	<strong>Messages : </strong> <br />
			  			 </div>

			  			  <div className={this.props.message.type=='voteUp' ? "visibleNotif" : "none"}>
			  			 	Félicitation ! Ton conseil a été approuvé par un utilisateur.<br />
			  			 	Merci d'apporter ton aide.<br /><br />
			  			 	<strong>Ton conseil : </strong> <br />
			  			 </div>

			  			 <div className={this.props.message.type=='conseiller' ? "visibleNotif" : "none"}>
			  			 	Grâce à tes précieux conseils, tu peux maintenant devenir conseiller.<br />
			  			 	Tu vas pouvoir aider davantage de personnes.<br />
			  			 	Tu recevras aussi des recommandations de la part des gens que tu aides.<br /><br />
			  			 	Bienvenue dans l'équipe des conseillers !<br /><br />
			  			 	<Link to={'/DevenirConseiller/'}>
										<Button
				         					size="medium"
											color='green'
										 >
											Devenir conseiller 
										</Button>
							</Link>
			  			 </div>

			  			 <div className={this.props.message.type=='obtenirRecommandation' ? "visibleNotif" : "none"}>
			  			 	Les conseils de <strong>{this.props.message.nameConseiller}</strong> ont-ils été utilises ?<br />
			  			 	N'hésite pas à lui laisser une recommandation pour donner ton avis.<br /><br />
			  			 	
			  			 	<Link to={'/Recommander/' + this.props.message.conseillerID}>
										<Button
				         					size="medium"
											color='green'
										 >
											Laisser une recommandation
										</Button>
							</Link>
			  			 </div>
			  			 
			  			 <div className="messageNOTIF">
			  				{this.breaklines()}
			  			 </div>

		  			</div>
		  			
		  			<Divider />
		  	
		  			<Comment>
	      				<Comment.Content>
	         				<div className="dateMessage">
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

	         				<div className={this.props.message.type=='recommandaton' ? "visibleNote" : "none"}>
							  	<div className={this.props.message.note>=1 && this.props.message.note<2 ? "visiblenote" : "none"}>
									<Rating icon='heart'
				              			defaultRating={1}
				              			maxRating={4}
				              			disabled
		              	 			/>
		              	 		</div>
		              	 		<div className={this.props.message.note>=2 && this.props.message.note<3 ? "visiblenote" : "none"}>
									<Rating icon='heart'
				              			defaultRating={2}
				              			maxRating={4}
				              			disabled
		              	 			/>
		              	 		</div>
		              	 		<div className={this.props.message.note>=3 && this.props.message.note<4 ? "visiblenote" : "none"}>
									<Rating icon='heart'
				              			defaultRating={3}
				              			maxRating={4}
				              			disabled
		              	 			/>
		              	 		</div>
		              	 		<div className={this.props.message.note>=4 && this.props.message.note<5 ? "visiblenote" : "none"}>
									<Rating icon='heart'
				              			defaultRating={4}
				              			maxRating={4}
				              			disabled
		              	 			/>
		              	 		</div>
							</div>

	         				<div className="supprimerFavoris">
		         				<div className={this.props.message.type !=='signaler' ? "supprimerNotif" : "none"}>
			         				<Button
			         					size="mini"
										color='red'
										onClick={this.Supprimer.bind(this)}
									 >
										Supprimer 	 
									</Button>
								</div>
								<div className="mobileInline">
									<div className={this.props.message.type=='chat' ? "visiblebutton" : "none"}>
										<Link to={'/MOBILEChat/' + this.props.message.from_id}>
											<Button
					         					size="mini"
												color='green'
											 >
												Voir 	 
											</Button>
										</Link>
									</div>
								</div>
								<div className="ecranInline">
									<div className={this.props.message.type=='chat' ? "visiblebutton" : "none"}>
										<Link to={'/Chat/' + this.props.message.from_id}>
											<Button
					         					size="mini"
												color='green'
											 >
												Voir 	 
											</Button>
										</Link>
									</div>
								</div>

								<div className={this.props.message.type=='reponse' ? "visiblebutton" : "none"}>
									<Link to={'/singleMessage/' + this.props.message.postId}>
										<Button
				         					size="mini"
											color='green'
										 >
											Voir 	 
										</Button>
									</Link>
								</div>

								<div className={this.props.message.type=='recommandaton' ? "visiblebutton" : "none"}>
									<Link to={'/profil/' + myId}>
										<Button
				         					size="mini"
											color='green'
										 >
											Voir 	 
										</Button>
									</Link>
								</div>

								<div className={this.props.message.type=='voteUp' ? "visiblebutton" : "none"}>
									<Link to={'/singleMessage/' + this.props.message.postId}>
										<Button
				         					size="mini"
											color='green'
										 >
											Voir 	 
										</Button>
									</Link>
								</div>
							</div>
	      				</Comment.Content>
	    			</Comment>
	  			</Segment>
			</div>
		);
  	}
}

ListeNotifications.propTypes = {
        message: PropTypes.object.isRequired,
    };

export default ListeNotifications =  withTracker(({ id }) => {
  return {
  };
})(ListeNotifications);