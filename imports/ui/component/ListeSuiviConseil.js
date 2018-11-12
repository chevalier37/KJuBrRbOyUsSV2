import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Checkbox, Form, Header, Divider, Label, Comment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { Comments } from '../../api/Reponses.js';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class ListeSuiviConseil extends Component {
	
	constructor(props) {
		    super(props);
		 
		    this.state = {
		      	sexe: '',
				nbrSeconde : 0,
			 	nbrMinutes : 0,
				nbrHeures : 0,
				nbrJours : 0,
				nbrMois : 0,
				premierAmour:" ",
			    trahison:'',
			    Friendzone:'',
			    amourdistance:'',
			    separation:'',
			    timidite:'',
			    depression:'',
			    suicide:'',
			    deces:'',
			    mutilation:'',
			    premierfois:'',
			    Contraception:'',
			    mst:'',
			    viol:'',
			    avortement:'',
			    orientationSex:'',
			    Anorexie:'',
			    obesite:'',
			    drogue:'',
			    alcool:'',
			    complexe:'',
			    hopital:'',
			    handicap:'',
			    Accident:'',
			    echecEcole:'',
			    Harcelement:'',
			    Discrimination:'',
			    Violence:'',
			    autre:'',
			    disabled:false,
		    };
		}

	Supprimer(){
		Meteor.call('supprimerReponse',
	    this.props.message._id,
	     );
	}

	componentWillMount(){
		const sexe = this.props.message.Post_gender;
	    
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

		
		{
		Meteor.userId() && _.include(this.props.message.upvoters, Meteor.userId()) ?
       	this.setState({disabled: true}) :
       	this.setState({disabled: false})
   		}

		
	}

	reponse(){
		const reponse = this.props.nbrreponse;
	    if(reponse < 2){
	    	return 'réponse'
	    }else {
	    	return 'réponses'
	    }
	}

  render() {
    
	const colorSexe = this.state.sexe;
	let nuit = this.props.nuit;
   
		return (
			<div className={ nuit ? "ListeMessagesNuit" : "ListeMessages"}>
	  			
	  			<div className={colorSexe=="pink" ?
	        				  "filleMessageBackground" : "garconMessageBackground"
	        				}>
			  			<div className={colorSexe=="pink" ?
	        				  "titreMessageFille" : "titreMessageGarcon"
	        				}>
			  			{this.props.message.post_title}
			  			</div>
		  		</div>
	  			<Segment
	  			 className={ nuit ? "SegmentNuit" : ""}
	  			 color={colorSexe=="pink" ?
	        				  "pink" : "blue" }>
		  					  			
		  			<p className={"ContentQuestion" + " " + "display-linebreak"}>
		  				{this.props.message.comments}
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
	         				
	         				<div className="blockReponse">
		          				<div className="repondreMesMessage">
		          					<Link to={'/singleMessage/' + this.props.message.postId} >
		          						<Button  size="tiny" color="green">
		          							Voir le message
		          						</Button>
		          					</Link>
		          				</div>

								<div className="repondreMesMessage" >
									<Button
									  size="tiny"
									  color='red'
									  onClick={this.Supprimer.bind(this)}>
										Supprimer
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

ListeSuiviConseil.propTypes = {
        message: PropTypes.object.isRequired,
    };

export default ListeSuiviConseil =  withTracker(({ id }) => {

  return {
   
  };
})(ListeSuiviConseil);