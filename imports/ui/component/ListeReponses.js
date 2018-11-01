import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Checkbox, Form, Header, Divider, Label, Comment, Confirm } from 'semantic-ui-react'
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
		    };
	}

	handleConfirm = () => this.setState({ open: false })
    handleCancel = () => this.setState({ open: false })

    componentWillMount(){
		//on regarde si l'utilisateur est l'auteur de la réponse
		let user = this.props.message.userId;

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

		const sexe = this.props.message.gender;
	    
	    {
	    sexe == 'fille' ? 
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

	signalerReponse() {
		let Id = this.props.message._id;
	    Meteor.apply('signalerReponse', [{
          Id,
          }], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
          },
      	});
       	this.setState({disabled: true});
       	this.setState({open: true});

       	const to_id = this.props.message.userId;
       	const message = this.props.message.comments;
       	Meteor.apply('SignalerNotif', [{
       		to_id,
       		message,
          }], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
             },
   		 })

       	Meteor.call(//notification par mail
              'SignalerMail',
              'Kurbys <kurbys@mail.kurbys.com>',
              'Ton message a été signalé ',
              to_id,
              message,
        )
	 }

	voteUP() {
	 	let Id = this.props.message._id;
	 	let UserId = this.props.message.userId;

		Meteor.apply('voteUP', [{
          Id, UserId
          }], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
          },
      	});
       	this.setState({desactiver: true});
        this.setState({color: false});

        const to_id = this.props.message.userId;
       	const message = this.props.message.comments;
       	const postId = this.props.message.postId;
       	Meteor.apply('voteUPnotif', [{
       		to_id,
       		message,
       		postId
          }], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
             },
   		 })
	}

	voteDOWN() {
	 	let Id = this.props.message._id;
	 	let UserId = this.props.message.userId;
	 	
		Meteor.apply('voteDOWN', [{
          Id, UserId
          }], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
          },
      	});
       	this.setState({desactiver: true});
        this.setState({color: false});
	}



	show(){
		confirmAlert({
	      title: 'Supprimer',
	      message: 'Confirmer la suppression du message ?',
	      buttons: [
	        {
	          label: 'Oui',
	          onClick: () => {
	          	this.Supprimer()
	          }
	        },
	        {
	          label: 'Non',
	        }
	      ]
	    })
	}

	Supprimer(){
		Meteor.call('supprimerReponse',
	    this.props.message._id,
	     );
	}

  render() {
    
	const colorSexe = this.state.sexe;
   	let now = new Date();
	let diff = now - this.props.message.naissance;
	let age = Math.round(diff / 31536000000);

		return (
			<div className="ListeMessages">
	  			<div className={colorSexe=="pink" ?
	        				  "filleMessageBackground" : "garconMessageBackground"
	        				}>
			  			<div className={colorSexe=="pink" ?
	        				  "titreMessageFille" : "titreMessageGarcon"
	        				}>
				  			<Link to={'/VisiteProfil/' + this.props.message.userId}>
				  			{this.props.message.post_author}
				  			</Link>
			  			</div>
			  			<div className="ageAuthorReponse">
	        				{age} ans
	        			</div>
		  		</div>


	  			<Segment color={colorSexe=="pink" ? "pink" : "blue" }>
		  			<p className={"ContentQuestion" + " " + "display-linebreak"}>
		  				{this.props.message.comments}
		  			</p>
		  			<Divider />
		  			<Comment>
	      				<div className="commentReponse">
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
									<div
									 className={!this.state.disabled ? "contacter" : "orange"}
									 onClick={this.signalerReponse.bind(this)}
									 >
										Signaler
									</div>
									<Confirm
							          open={this.state.open}
							          content="Merci d'avoir signalé ce message"
							          onCancel={this.handleCancel}
							          onConfirm={this.handleConfirm}
							          cancelButton='Quitter'
          							  confirmButton="Valider"
							        />
									<div className="contacter" >
										<Link to={'/MOBILEChat/' + this.props.message.userId }>
										Message privé
										</Link>
									</div>
								</div>
								<div className="voteMobile">
									<span className="vote">
										<Button
										 size="tiny"
										 disabled={this.state.desactiver}
										 color='green'
										 onClick={this.voteUP.bind(this)}
										 >
										 	<div className="NBRvote"> {this.props.message.votes}</div>
											Conseil utile
											<Img className="upVote" src="/up.svg"/>
									    </Button>
									</span>

									<span className="vote">
										<Button
										 size="tiny"
										 disabled={this.state.desactiver}
										 color='red'
										 onClick={this.voteDOWN.bind(this)}
										 >
										 	<div className="NBRvote"> {this.props.message.voteDOWN}</div>
										 	Conseil inutile
											<Img className="upVote" src="/down.svg"/>
											 
									    </Button>
									</span>

									<div className={this.state.IsModerateur ? "contacter ecran" : "none"}>
		          						<Button
		          						 size="mini"
		          						 color="red"
		          						 onClick={this.show.bind(this)}
		          						 >
		          							Supprimer
		          						</Button>
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