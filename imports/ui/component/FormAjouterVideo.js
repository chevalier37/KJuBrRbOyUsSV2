import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Checkbox, Form, Header, TextArea, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Videos } from '../../api/Videos.js';

const Catégorie = [
  { key: '1', text: 'Premier amour', value: 'premierAmour' },
  { key: '2', text: 'Trahison', value: 'trahison' },
  { key: '3', text: 'Friendzone', value: 'Friendzone' },
  { key: '4', text: 'Amour à distance', value: 'amourdistance' },
  { key: '5', text: 'Séparation', value: 'separation' },
  { key: '6', text: 'Timidité', value: 'timidite' },
  { key: '7', text: 'Dépression', value: 'depression' },
  { key: '8', text: 'Suicide', value: 'suicide' },
  { key: '9', text: 'Décès', value: 'deces' },
  { key: '10', text: 'Mutilation', value: 'mutilation' },
  { key: '11', text: 'Sexo', value: 'sexo' },
  { key: '12', text: 'Contraception', value: 'contraception' },
  { key: '13', text: 'Maladie, MST', value: 'mst' },
  { key: '14', text: 'Viol', value: 'viol' },
  { key: '15', text: 'Avortement', value: 'avortement' },
  { key: '16', text: 'Orientation sexuelle', value: 'orientationSex' },
  { key: '17', text: 'Anorexie', value: 'Anorexie' },
  { key: '18', text: 'Obésite', value: 'obesite' },
  { key: '19', text: 'Drogue', value: 'drogue' },
  { key: '20', text: 'Alcool', value: 'alcool' },
  { key: '21', text: 'Complexe', value: 'complexe' },
  { key: '22', text: 'Hospitalisation', value: 'hopital' },
  { key: '23', text: 'Handicap', value: 'handicap' },
  { key: '24', text: 'Accident', value: 'accident' },
  { key: '25', text: 'Echec scolaire', value: 'echecEcole' },
  { key: '26', text: 'Harcèlement', value: 'Harcelement' },
  { key: '27', text: 'Discrimination', value: 'discrimination' },
  { key: '28', text: 'Violence', value: 'Violence' },
  { key: '29', text: 'Autre', value: 'autre' },
]

class FormAjouterVideo extends Component {

	constructor(props) {
	    super(props);
	 
	    this.state = {
	      visible: false,
	      Catégorie:""

	    };
	}


	Submit(event) {
        event.preventDefault();

	  	const titre = ReactDOM.findDOMNode(this.refs.titre).value.trim();
	  	const ID = ReactDOM.findDOMNode(this.refs.ID).value.trim();
	  	const commentaire = ReactDOM.findDOMNode(this.refs.message).value.trim();
	  	const categorie = this.state.Catégorie
console.log(ID)
		  	Meteor.call('addVideo',
		  	  titre,
		  	  commentaire,
		  	  ID,
		  	  categorie,
		  	 
		  	  (err) => {
            	if(err){
              
           		 } else {
              	{
			    
				  	// Clear form
			        ReactDOM.findDOMNode(this.refs.titre).value = '';
			        ReactDOM.findDOMNode(this.refs.message).value = '';
			        ReactDOM.findDOMNode(this.refs.ID).value = '';
	              	}     
            	}
          	})


	}

  	Catégorie(value) {
    this.setState({
      Catégorie: value,
    });

  	}

  	render() {

  		const { visible } = this.state
  		const { categorie } = this.state
  		const { placeholderTitre } = this.state
  		const { placeholderMessage } = this.state
		
		return (
			<div >
				<Segment>
				    <Form error onSubmit={this.Submit.bind(this)}>
					    <Form.Field>
					      <label>Titre de la vidéo</label>
					      <input
					       ref="titre"
					       />
					       <Message
				            hidden={!this.state.titreVide}
				            error={this.state.titreVide}
				            content='Le titre est obligatoire'
				          />
					    </Form.Field>

					    <Form.Field>
					      <label>ID de la vidéo</label>
					      <input
					       ref="ID"
					       />
					       <Message
				            hidden={!this.state.titreVide}
				            error={this.state.titreVide}
				            content='Le titre est obligatoire'
				          />
					    </Form.Field>
					    
					    <Form.Field>
					      <label>Commentaire de la vidéo</label>
					      <TextArea
					       ref="message"
					       rows={6}
					       />
					       <Message
				            hidden={!this.state.messageVide}
				            error={this.state.messageVide}
				            content='Le message est vide'
				          />
				          <Message
				            hidden={!this.state.CatObligatoire}
				            error={this.state.CatObligatoire}
				            content='Choissisez une catégorie'
				          />
				          <Message
				            hidden={!this.state.TropCat}
				            error={this.state.TropCat}
				            content='2 catégories maximum'
				          />
					    </Form.Field>

					    <label>Catégorie</label>
					     <Form.Select
						     fluid
						     options={Catégorie}
						     placeholder='Catégorie'
						     onChange={(e, { value }) => this.Catégorie(value)}
				    	 />


					    <Button type='submit' color="green">Valider</Button>
			
			  		</Form>
	  			</Segment>
	  			<div className="blockVide">
	  			</div>
			</div>
		);
  	}
}

export default withTracker(() => {
  return { 
  };
})(FormAjouterVideo);
