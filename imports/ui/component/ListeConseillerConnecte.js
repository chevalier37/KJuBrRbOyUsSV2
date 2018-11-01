import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Header, Divider, Label, Comment, Rating } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Img from 'react-image'
import PropTypes from 'prop-types';

class ListeConseillerConnecte extends Component {
	
	constructor(props) {
		    super(props);
		 
		    this.state = {
		      	sexe: '',
			    disabled:false,
			    disabledVote:false,
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
		    };
		}

	signalerReponse() {
	    Meteor.call('signalerReponse', this.props.message._id);
       	this.setState({disabled: true});
	 }

	 vote() {
	    Meteor.call('vote', this.props.message._id);
       	this.setState({disabledVote: true});
	 }


	componentWillMount(){
		const sexe = this.props.gender;
	    {sexe == 'fille' ? 
	         this.setState({sexe: 'pink'}):
		  	 this.setState({sexe: 'blue'})
		}

		const id = this.props.message.user_id;
		Meteor.apply('UserOnline', [{
		    	id,
	          }], {
	          onResultReceived: (error, response) => {
	            if (error) console.warn(error.reason);
	        },
	      	})

		//On affiche les catégories
		const premierAmour = this.props.message.premierAmour;
		{ premierAmour ? 
		  this.setState({premierAmour:'Premier amour' }) : ''
		}

		const trahison = this.props.message.trahison;
		{ trahison ? 
		  this.setState({trahison: '  Trahison '}) : ''
		}

		const Friendzone = this.props.message.Friendzone;
		{ Friendzone ? 
		  this.setState({Friendzone: 'Friendzone '}) : ''
		}

		const amourdistance = this.props.message.amourdistance;
		{ amourdistance ? 
		  this.setState({amourdistance: 'Amour à distance '}) : ''
		}

		const separation = this.props.message.separation;
		{ separation ? 
		  this.setState({separation: 'Séparation '}) : ''
		}

		const timidite = this.props.message.timidite;
		{ timidite ? 
		  this.setState({timidite: 'Timidité '}) : ''
		}

		const depression = this.props.message.depression;
		{ depression ? 
		  this.setState({depression: 'Dépression '}) : ''
		}

		const suicide = this.props.message.suicide;
		{ suicide ? 
		  this.setState({suicide: 'Suicide '}) : ''
		}

		const deces = this.props.message.deces;
		{ deces ? 
		  this.setState({deces: 'Décès '}) : ''
		}

		const mutilation = this.props.message.mutilation;
		{ mutilation ? 
		  this.setState({mutilation: 'Mutilation '}) : ''
		}

		const premierfois = this.props.message.premierfois;
		{ premierfois ? 
		  this.setState({premierfois: 'Premiere fois '}) : ''
		}

		const Contraception = this.props.message.Contraception;
		{ Contraception ? 
		  this.setState({Contraception: 'Contraception '}) : ''
		}

		const mst = this.props.message.mst;
		{ mst ? 
		  this.setState({mst: 'Maladie, MST '}) : ''
		}

		const viol = this.props.message.viol;
		{ viol ? 
		  this.setState({viol: 'Viol '}) : ''
		}

		const avortement = this.props.message.avortement;
		{ avortement ? 
		  this.setState({avortement: 'Avortement '}) : ''
		}

		const orientationSex = this.props.message.orientationSex;
		{ orientationSex ? 
		  this.setState({orientationSex: 'Orientation sexuelle '}) : ''
		}

		const Anorexie = this.props.message.Anorexie;
		{ Anorexie ? 
		  this.setState({Anorexie: 'Anorexie '}) : ''
		}

		const obesite = this.props.message.obesite;
		{ obesite ? 
		  this.setState({obesite: 'Obésite '}) : ''
		}

		const drogue = this.props.message.drogue;
		{ drogue ? 
		  this.setState({drogue: 'Drogue '}) : ''
		}

		const alcool = this.props.message.alcool;
		{ alcool ? 
		  this.setState({alcool: 'Alcool '}) : ''
		}

		const complexe = this.props.message.complexe;
		{ complexe ? 
		  this.setState({complexe: 'Complexe '}) : ''
		}

		const hopital = this.props.message.hopital;
		{ hopital ? 
		  this.setState({hopital: 'Hospitalisation '}) : ''
		}

		const handicap = this.props.message.handicap;
		{ handicap ? 
		  this.setState({handicap: 'Handicap '}) : ''
		}

		const Accident = this.props.message.Accident;
		{ Accident ? 
		  this.setState({Accident: 'Accident '}) : ''
		}

		const echecEcole = this.props.message.echecEcole;
		{ echecEcole ? 
		  this.setState({echecEcole: 'Echec scolaire '}) : ''
		}

		const Harcelement = this.props.message.Harcelement;
		{ Harcelement ? 
		  this.setState({Harcelement: 'Harcèlement '}) : ''
		}

		const Discrimination = this.props.message.Discrimination;
		{ Discrimination ? 
		  this.setState({Discrimination: 'Discrimination '}) : ''
		}

		const Violence = this.props.message.Violence;
		{ Violence ? 
		  this.setState({Violence: 'Violence '}) : ''
		}

		if(this.state.premierAmour){
			this.setState({Amour: true})
		}
	}

	breaklines(){
			  let message = this.props.message.presentation
			  return message
			}

  	render() {
    
	const colorSexe = this.state.sexe;
	let now = new Date();
	let diff = now - this.props.date;
	let age = Math.round(diff / 31536000000);

		return (
			<div className="ListeMessages">
		  		<Segment color={this.props.gender == "fille" ?
	        				  "pink" : "blue" }>
		  			<div className="ContentQuestion">
		  				<div className={this.props.gender == "fille" ?
	        				  "titreMessageFille" : "titreMessageGarcon"
	        				}>
	        				<div className="PointOnlineConseiller">
								<Img className="online" src="/circle.svg"/>
							</div>
				  				{this.props.message.username} 
			  			</div>

			  			<div className={this.props.message.note<1 ? "coeur" : "none"}>
							<Rating icon='heart'
		              			defaultRating={0}
		              			maxRating={5}
		              			disabled
              	 			/>
              	 		</div>

              	 		<div className={this.props.message.note>=1 && this.props.message.note<2 ? "coeur" : "none"}>
							<Rating icon='heart'
		              			defaultRating={1}
		              			maxRating={5}
		              			disabled
              	 			/>
              	 		</div>
              	 		<div className={this.props.message.note>=2 && this.props.message.note<3 ? "coeur" : "none"}>
							<Rating icon='heart'
		              			defaultRating={2}
		              			maxRating={5}
		              			disabled
              	 			/>
              	 		</div>
              	 		<div className={this.props.message.note>=3 && this.props.message.note<4 ? "coeur" : "none"}>
							<Rating icon='heart'
		              			defaultRating={3}
		              			maxRating={5}
		              			disabled
              	 			/>
              	 		</div>
              	 		<div className={this.props.message.note>=4 && this.props.message.note<5 ? "coeur" : "none"}>
							<Rating icon='heart'
		              			defaultRating={4}
		              			maxRating={5}
		              			disabled
              	 			/>
              	 		</div>
              	 		<div className={this.props.message.note>=5 && this.props.message.note<6 ? "coeur" : "none"}>
							<Rating icon='heart'
		              			defaultRating={5}
		              			maxRating={5}
		              			disabled
              	 			/>
              	 		</div>

			  			<div className={"presentationConseiller" + " " + "display-linebreak"}>
			  			{this.props.message.presentation} 
			  			</div>

			  			<div className="categorieConseiller">
							
							{ this.state.premierAmour ? 
							<span className="espace">{this.state.premierAmour} </span>
							 : "" }
							
							{ this.state.trahison ? 
							<span className="espace">{this.state.trahison} </span>
							 : "" } 

							{ this.state.Friendzone ? 
							<span className="espace">{this.state.Friendzone} </span>
							 : "" }

							{ this.state.amourdistance ? 
							<span className="espace">{this.state.amourdistance} </span>
							 : "" }

							{ this.state.separation ? 
							<span className="espace">{this.state.separation} </span>
							 : "" }

							{ this.state.timidite ? 
							<span className="espace">{this.state.timidite} </span>
							 : "" }

							{ this.state.depression ? 
							<span className="espace">{this.state.depression} </span>
							 : "" }

							{ this.state.suicide ? 
							<span className="espace">{this.state.suicide} </span>
							 : "" }

							{ this.state.deces ? 
							<span className="espace">{this.state.deces} </span>
							 : "" }

							{ this.state.mutilation ? 
							<span className="espace">{this.state.mutilation} </span>
							 : "" }

							{ this.state.premierAmour ? 
							<span className="espace">{this.state.premierfois} </span>
							 : "" }

							{ this.state.Contraception ? 
							<span className="espace">{this.state.Contraception} </span>
							 : "" }

							{ this.state.mst ? 
							<span className="espace">{this.state.mst} </span>
							 : "" }

							{ this.state.viol ? 
							<span className="espace">{this.state.viol} </span>
							 : "" }

							{ this.state.premierAmour ? 
							<span className="espace">{this.state.avortement}</span>
							 : "" }

							{ this.state.orientationSex ? 
							<span className="espace">{this.state.orientationSex} </span>
							 : "" }

							{ this.state.Anorexie ? 
							<span className="espace">{this.state.Anorexie} </span>
							 : "" }

							{ this.state.obesite ? 
							<span className="espace">{this.state.obesite} </span>
							 : "" }

							{ this.state.drogue ? 
							<span className="espace">{this.state.drogue} </span>
							 : "" }

							{ this.state.alcool ? 
							<span className="espace">{this.state.alcool} </span>
							 : "" }

							{ this.state.complexe ? 
							<span className="espace">{this.state.complexe} </span>
							 : "" }

							{ this.state.hopital ? 
							<span className="espace">{this.state.hopital} </span>
							 : "" }

							{ this.state.handicap ? 
							<span className="espace">{this.state.handicap}</span>
							 : "" }

							{ this.state.Accident ? 
							<span className="espace">{this.state.Accident}</span>
							 : "" }

							{ this.state.echecEcole ? 
							<span className="espace">{this.state.echecEcole} </span>
							 : "" }

							{ this.state.Harcelement ? 
							<span className="espace">{this.state.Harcelement} </span>
							 : "" }

							{ this.state.Discrimination ? 
							<span className="espace">{this.state.Discrimination} </span>
							 : "" }

							{ this.state.Violence ? 
							<span className="espace">{this.state.Violence} </span>
							 : "" }

							{ this.state.autre ? 
							<span className="espace">{this.state.autre} </span>
 							: "" }				
						</div>


						<div className="buttonMobile">
				  			<div className="ageAuthorReponse">
		        				<div className="ageConseiller">{age} ans</div>
		        				<Button size="tiny"  color='blue'>
											<Link to={'/VisiteProfil/' + this.props.message.user_id }>
											Profil
											</Link>
								</Button>
		        				<Button size="tiny"  color='green'>
											<Link to={'/MobileChat/' + this.props.message.user_id }>
											Contacter
											</Link>
								</Button>
		        			</div>
		        		</div>
		  			</div>
	  			</Segment>
			</div>
		);
  	}
}

ListeConseillerConnecte.propTypes = {
        message: PropTypes.object.isRequired,
    };

export default ListeConseillerConnecte =  withTracker(() => {

  return {

  };
})(ListeConseillerConnecte);