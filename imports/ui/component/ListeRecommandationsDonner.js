import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Header, Divider, Label, Comment, Rating } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class ListeRecommandationsDonner extends Component {
	
	constructor(props) {
		    super(props);
		 
		    this.state = {
		      	sexe: '',
			    disabled:false,
			    disabledVote:false,
		    };
		}


	 Supprimer(){
		Meteor.call('supprimerRecommandation',
	    this.props.message._id,
	     );
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
			  let message = this.props.message.commentaire
			  return message
			}

  	render() {
    
	const colorSexe = this.state.sexe;
	let nuit = this.props.nuit;
   
		return (
			<div className={ nuit ? "ListeMessagesNuit" : "ListeMessages"}>
	  				<div className={this.props.message.to_gender == "fille" ? "filleMessageBackground" : "garconMessageBackground"} >
			  			<div className={this.props.message.to_gender == "fille" ?
	        				  "titreMessageFille" : "titreMessageGarcon"
	        				}>
				  			<Link to={'/VisiteProfil/' + this.props.message.to_id}>
				  				{this.props.message.to_name} 
				  			</Link>
			  			</div>
		  			</div>

		  		<Segment
		  		 className={ nuit ? "SegmentNuit" : ""}
		  		 color={this.props.message.to_gender == "fille" ?
	        				  "pink" : "blue" }>
		  			<p className="ContentQuestion">
		  				{this.breaklines()}
		  			</p>
		  			
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

							<div className={this.props.message.note<1 ? "noteRecommandation" : "none"}>
									<Rating icon='heart'
				              			defaultRating={0}
				              			maxRating={4}
				              			disabled
		              	 			/>
		              	 		</div>

		              	 		<div className={this.props.message.note>=1 && this.props.message.note<2 ? "noteRecommandation" : "none"}>
									<Rating icon='heart'
				              			defaultRating={1}
				              			maxRating={5}
				              			disabled
		              	 			/>
		              	 		</div>
		              	 		<div className={this.props.message.note>=2 && this.props.message.note<3 ? "noteRecommandation" : "none"}>
									<Rating icon='heart'
				              			defaultRating={2}
				              			maxRating={5}
				              			disabled
		              	 			/>
		              	 		</div>
		              	 		<div className={this.props.message.note>=3 && this.props.message.note<4 ? "noteRecommandation" : "none"}>
									<Rating icon='heart'
				              			defaultRating={3}
				              			maxRating={5}
				              			disabled
		              	 			/>
		              	 		</div>
		              	 		<div className={this.props.message.note>=4 && this.props.message.note<5 ? "noteRecommandation" : "none"}>
									<Rating icon='heart'
				              			defaultRating={4}
				              			maxRating={5}
				              			disabled
		              	 			/>
		              	 		</div>
		              	 		<div className={this.props.message.note>=5 && this.props.message.note<6 ? "noteRecommandation" : "none"}>
									<Rating icon='heart'
				              			defaultRating={5}
				              			maxRating={5}
				              			disabled
		              	 			/>
		              	 		</div>
								<div className="blockReponse">
									<div className="repondreMesMessage" >
										<Button
										  size="tiny"
										  color='red'
										  onClick={this.Supprimer.bind(this)}>
											Supprimer
										</Button>
									</div>

									<div className="repondreMesMessage" >
										<Button size="tiny"  color='orange'>
												<Link to={'/ModifierRecommandation/' + this.props.message._id }>
												Modifier
												</Link>
										</Button>
									</div>
								</div>
	      				</Comment.Content>
	    			</Comment>
	  			</Segment>
			</div>
		);
  	}
}

ListeRecommandationsDonner.propTypes = {
        message: PropTypes.object.isRequired,
    };
    
export default ListeRecommandationsDonner =  withTracker(() => {
  return {
  };
})(ListeRecommandationsDonner);