import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Checkbox, Form, Header, Divider, Label, Comment, Input, Rating } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { Comments } from '../../api/Reponses.js';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Route, Redirect } from 'react-router';

class ListeModifierRecommandation extends Component {
	
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
			    redirect:false,
			    rating:0,
		    };
		}

	handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating })

	Supprimer(){
		Meteor.call('supprimerRecommandation',
	    this.props.message._id,
		  	  (err) => {
            	if(err){
              
           		 } else {
              	{
			        this.setState({ redirect: true})
	              	}     
            	}
          	})
	}

	Modifier_Message(){
			const text = ReactDOM.findDOMNode(this.refs.presentation).value.trim();
			const idMessage = this.props.message._id;
			let note = this.state.rating;
			
          	Meteor.apply('ModifierRecommandation', [{
		          idMessage,
			  	  text,
			  	  note,
		          }], {
		          onResultReceived: (error, response) => {
		            if (error){
		            	console.warn(error.reason);
		        	}else{
		        		this.setState({ redirect: true})
		        	}		             
		            },
		    });
	}

	componentWillMount(){
		const sexe = this.props.message.to_gender;
	    
	    {sexe == 'fille' ? 
	         this.setState({sexe: 'pink'}):
		  	 this.setState({sexe: 'blue'})
		}

		//on calcul la date du post
		const today = new Date();
		const diffToday = Date.parse(today);
		const post_date = this.props.message.date;
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


  render() {
    
	const colorSexe = this.state.sexe;
   	if (this.state.redirect){
      return <Redirect to={"/profil/" + Meteor.userId()} />;
    }
		return (
			<div className="ListeMessages">
	  			
	  			<div className={colorSexe=="pink" ?
	        				  "filleMessageBackground" : "garconMessageBackground"
	        				}>
			  			<div className={colorSexe=="pink" ?
	        				  "titreMessageFille" : "titreMessageGarcon"
	        				}>
			  			{this.props.message.to_name}
			  			</div>
		  		</div>
	  			<Segment color={colorSexe=="pink" ?
	        				  "pink" : "blue" }>
		  					  			
		  			<div className={"ContentQuestion" + " " + "display-linebreak"}>
		  				<Form >
							    <Form.Field >
										<Input as='TextArea' ref="presentation">
											{this.props.message.commentaire}
										</Input>
							    </Form.Field>
						</Form>
		  			</div>

		  			<div className="ModifierNote">
					<strong> Note : </strong>
						<Rating maxRating={5} icon='heart' onRate={this.handleRate} />
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
	         				
	          				<div className="repondreMessage">
	          						<Button  size="tiny" color="green" onClick={this.Modifier_Message.bind(this)}>
	          							Valider
	          						</Button>
	          				</div>
							
							<div className="repondreMessage" >
								<Button
								  size="tiny"
								  color='red'
								  onClick={this.Supprimer.bind(this)}>
									Supprimer
								</Button>
							</div>
							
	      				</Comment.Content>
	    			</Comment>

	  			</Segment>

			</div>

		);
  	}
}

export default ListeModifierMessage =  withTracker(() => {

  return {
   
  };
})(ListeModifierRecommandation);