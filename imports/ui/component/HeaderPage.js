import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Img from 'react-image'
import { Dropdown, Menu, Button, Modal, Header, Form, Input, Message, Checkbox, Segment, TextArea } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Route, Redirect } from 'react-router';

class HeaderPage extends Component {

	constructor(props) {
	    super(props);
	 
	    this.state = {
	      visible: false,
	      categorie:'cacherCategorie',
	      placeholderTitre:'Titre de votre message',
	      placeholderMessage:'Comment peux-t-on vous aider ?',
	      CheckPremierAmour:false,
	      trahison:false,
	      Friendzone:false,
	      amourdistance:false,
	      separation:false,
	      timidite:false,
	      depression:false,
	      suicide:false,
	      deces:false,
	      mutilation:false,
	      premierfois:false,
	      Contraception:false,
	      mst:false,
	      viol:false,
	      avortement:false,
	      orientationSex:false,
	      Anorexie:false,
	      obesite:false,
	      drogue:false,
	      alcool:false,
	      complexe:false,
	      hopital:false,
	      handicap:false,
	      Accident:false,
	      echecEcole:false,
	      Harcelement:false,
	      Discrimination:false,
	      Violence:false,
	      autre:false,
	      titreVide:false,
	      messageVide:false,
	      CatObligatoire:false,
	      TropCat:false,
	      poster:false,
	      open:false,
	      username:"",
	      redirectBloquer:false

	    };
	}

	componentWillMount(){
		let id = Meteor.userId();
  		Meteor.apply('Username', [{
          id,
          }], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
            {response ?
             this.setState({username: response}) :
             ""}
          },
      	});

      	Meteor.apply('NBRsignalerUser', [{
          }], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);

            {
            response > 2 ?
             this.setState({redirectBloquer: true})
             :
             ""
            }
            },
    	})

  	}

	 categorie(event) {
	 	event.preventDefault();
	    this.setState({
	      categorie: 'visibleCategorie'
	    });

	}

	focusTitre() {
	     this.setState({
	      placeholderTitre: '',
	    });
	}

	focusTitreOut() {
	     this.setState({
	      placeholderTitre:'Titre de votre message',
	    });
	}

	focusMessage() {
	     this.setState({
	      placeholderMessage: '',
	    });
	}

	focusMessageOut() {
	     this.setState({
	      placeholderMessage:'Comment peux-t-on vous aider ?',
	    });
	}

	Submit(event) {
        event.preventDefault();
        
	  	const titre = ReactDOM.findDOMNode(this.refs.titre).value.trim();
	  	const message = ReactDOM.findDOMNode(this.refs.message).value.trim();
	  	const premierAmour = this.state.CheckPremierAmour;
	  	const trahison = this.state.trahison;
	  	const Friendzone = this.state.Friendzone;
	  	const amourdistance = this.state.amourdistance;
	  	const separation = this.state.separation;
	  	const timidite = this.state.timidite;
	  	const depression = this.state.depression;
	  	const suicide = this.state.suicide;
	  	const deces = this.state.deces;
	  	const mutilation = this.state.mutilation;
	  	const premierfois = this.state.premierfois;
	  	const Contraception = this.state.Contraception;
	  	const mst = this.state.mst;
	  	const viol = this.state.viol;
	  	const avortement = this.state.avortement;
	  	const orientationSex = this.state.orientationSex;
	  	const Anorexie = this.state.Anorexie;
	  	const obesite = this.state.obesite;
	  	const drogue = this.state.drogue;
	  	const alcool = this.state.alcool;
	  	const complexe = this.state.complexe;
	  	const hopital = this.state.hopital;
	  	const handicap = this.state.handicap;
	  	const Accident = this.state.Accident;
	  	const echecEcole = this.state.echecEcole;
	  	const Harcelement = this.state.Harcelement;
	  	const Discrimination = this.state.Discrimination;
	  	const Violence = this.state.Violence;
	  	const autre = this.state.autre;

	  	{!titre ?
	  	 this.setState({titreVide: true}):
	  	 this.setState({titreVide: false})
	    }

	    {!message ?
	  	 this.setState({messageVide: true}):
	  	 this.setState({messageVide: false})
	    }


	    //nombre total de categorie
	    let NBRcategorie = 	this.state.CheckPremierAmour + 
	    				this.state.trahison +
	    				this.state.Friendzone +
	    				this.state.amourdistance +
	    				this.state.separation + 
	    				this.state.timidite + 
	    				this.state.depression + 
	    				this.state.suicide +
	    				this.state.deces+ 
	    				this.state.mutilation + 
	    				this.state.premierfois +
	    				this.state.Contraception +
	    				this.state.mst +
	    				this.state.viol +
	    				this.state.avortement + 
	    				this.state.orientationSex + 
	    				this.state.Anorexie + 
	    				this.state.obesite +
	    				this.state.drogue + 
	    				this.state.alcool + 
	    				this.state.complexe + 
	    				this.state.hopital + 
	    				this.state.handicap +
	    				this.state.Accident + 
	    				this.state.echecEcole +
	    				this.state.Harcelement + 
	    				this.state.Discrimination + 
	    				this.state.Violence + 
	    				this.state.autre       

	    {NBRcategorie == 0 ?
	     this.setState({CatObligatoire: true}):
	  	 this.setState({CatObligatoire: false})
	    }

	    {NBRcategorie > 2 ?
	     this.setState({TropCat: true}):
	  	 this.setState({TropCat: false})
	    }				
	  

	  	{ //on verifie qu'il n'y à pas d'erreur avant d'envoyer le formulaire

			this.state.titreVide == false &&
			this.state.messageVide == false &&
			NBRcategorie > 0 &&
			NBRcategorie < 3
		


			?

		  	Meteor.call('addMessage',
		  	  {titre,
		  	  message,
		  	  premierAmour,
		  	  trahison,
		      Friendzone,
		      amourdistance,
		      separation,
		      timidite,
		      depression,
		      suicide,
		      deces,
		      mutilation,
		      premierfois,
		      Contraception,
		      mst,
		      viol,
		      avortement,
		      orientationSex,
		      Anorexie,
		      obesite,
		      drogue,
		      alcool,
		      complexe,
		      hopital,
		      handicap,
		      Accident,
		      echecEcole,
		      Harcelement,
		      Discrimination,
		      Violence,
		      autre},
		  	 
		  	  (err) => {
            	if(err){
              
           		 } else {
              	{
	                  // on cache les options après validation
			        this.setState({
				      categorie: 'cacherCategorie'
				    })

			        // on ferme le modal 
				    this.setState({
				      open: false
				    })

				    this.setState({
				      poster: !this.state.poster,
				    });
			    
				  	// Clear form
			        /*ReactDOM.findDOMNode(this.refs.titre).value = '';
			        ReactDOM.findDOMNode(this.refs.message).value = '';*/
	              	}     
            	}
          	})

	        : ''
	    }

	}

	premierAmour(value) {
	    this.setState({
	      CheckPremierAmour: !this.state.CheckPremierAmour,
	    });
  	}

  	trahison(value) {
	    this.setState({
	      trahison: !this.state.trahison,
	    });
  	}

  	Friendzone(value) {
	    this.setState({
	      Friendzone: !this.state.Friendzone,
	    });
  	}

  	amourdistance(value) {
	    this.setState({
	      amourdistance: !this.state.amourdistance,
	    });
  	}

  	separation(value) {
	    this.setState({
	      separation: !this.state.separation,
	    });
  	}

  	timidite(value) {
	    this.setState({
	      timidite: !this.state.timidite,
	    });
  	}

  	depression(value) {
	    this.setState({
	      depression: !this.state.depression,
	    });
  	}

  	suicide(value) {
	    this.setState({
	      suicide: !this.state.suicide,
	    });
  	}

  	deces(value) {
	    this.setState({
	      deces: !this.state.deces,
	    });
  	}

  	mutilation(value) {
	    this.setState({
	      mutilation: !this.state.mutilation,
	    });
  	}

  	premierfois(value) {
	    this.setState({
	      premierfois: !this.state.premierfois,
	    });
  	}

  	Contraception(value) {
	    this.setState({
	      Contraception: !this.state.Contraception,
	    });
  	}

  	mst(value) {
	    this.setState({
	      mst: !this.state.mst,
	    });
  	}

  	viol(value) {
	    this.setState({
	      viol: !this.state.viol,
	    });
  	}

  	avortement(value) {
	    this.setState({
	      avortement: !this.state.avortement,
	    });
  	}

  	orientationSex(value) {
	    this.setState({
	      orientationSex: !this.state.orientationSex,
	    });
  	}

  	Anorexie(value) {
	    this.setState({
	      Anorexie: !this.state.Anorexie,
	    });
  	}

  	obesite(value) {
	    this.setState({
	      obesite: !this.state.obesite,
	    });
  	}

  	drogue(value) {
	    this.setState({
	      drogue: !this.state.drogue,
	    });
  	}

  	alcool(value) {
	    this.setState({
	      alcool: !this.state.alcool,
	    });
  	}

  	complexe(value) {
	    this.setState({
	      complexe: !this.state.complexe,
	    });
  	}

  	Hospitalisation(value) {
	    this.setState({
	      hopital: !this.state.hopital,
	    });
  	}
  	handicap(value) {
	    this.setState({
	      handicap: !this.state.handicap,
	    });
  	}

  	Accident(value) {
	    this.setState({
	      Accident: !this.state.Accident,
	    });
  	}

  	echecEcole(value) {
	    this.setState({
	      echecEcole: !this.state.echecEcole,
	    });
  	}

  	Harcelement(value) {
	    this.setState({
	      Harcelement: !this.state.Harcelement,
	    });
  	}

  	Discrimination(value) {
	    this.setState({
	      Discrimination: !this.state.Discrimination,
	    });
  	}

  	Violence(value) {
	    this.setState({
	      Violence: !this.state.Violence,
	    });
  	}

  	autre(value) {
	    this.setState({
	      autre: !this.state.autre,
	    });
  	}

  	poster() {
	    this.setState({
	      poster: !this.state.poster,
	    });
  	}

  	open(){
  		this.setState({
	      open: !this.state.open,
	    });
  	}

  	render() {

  		const { visible } = this.state
  		const { categorie } = this.state
  		const { placeholderTitre } = this.state
  		const { placeholderMessage } = this.state
  		const { username } = this.state
  		const { redirectBloquer } = this.state
  		
  		if (redirectBloquer){
      	return <Redirect to="/compteBloquer" />;
    	}

	return (
			<div className="headerTitre">
				<div className="BlocHead">
					<div className="ButtonHeader">
						<Link to="/home" >
							 <Img className="iconHeader" src="/home.svg"/>
						</Link>
					</div>
					<div className="ButtonHeader">
						<Link to="/Notifications" >
							<Img className="iconHeader" src="/bell.svg"/>
						</Link>
					</div>
					<div className="ButtonHeader">
						<Link to={'/Chat/' + Meteor.userId() }>
							 <Img className="iconHeader" src="/mail.svg"/>
						</Link>
					</div>
					<div className="ButtonHeader">
						<Link to="/ConseillerConnecter" >
							 <Img className="iconHeader" src="/advisor.svg"/>
						</Link>
					</div>
					<div className="ButtonHeader">
						<Link to="/DevenirConseiller" >
							 <Img className="iconHeader" src="/new.svg"/>
						</Link>
					</div>
					<div className="ButtonAide">
						<Modal
						trigger={<Button color='red' onClick={this.open.bind(this)}>Demander de l'aide</Button>}
						centered={false} open={this.state.open ? true : false} 
						>
						    <Modal.Header>
						    Poster un message
						    <Img className="closeModal" src="/close.svg" onClick={this.open.bind(this)}/>
						    </Modal.Header>
						    <Modal.Content >
						      <Modal.Description>
								<Form error onSubmit={this.Submit.bind(this)}>
							     <div className="consigneMessage">Attention : Pas de faute d'orthographe sinon ton message sera supprimé !</div>
								    <Form.Field>
								      <label>Titre du message</label>
								      <input
								       ref="titre"
								       placeholder={placeholderTitre}
								       onFocus={this.focusTitre.bind(this)}
								       onBlur={this.focusTitreOut.bind(this)}
								       />
								       <Message
							            hidden={!this.state.titreVide}
							            error={this.state.titreVide}
							            content='Le titre est obligatoire'
							          />
								    </Form.Field>
								    
								    <Form.Field>
								      <label>Message</label>
								      <TextArea
								       ref="message"
								       onFocus={this.focusMessage.bind(this)}
								       onBlur={this.focusMessageOut.bind(this)}
								       placeholder={placeholderMessage}
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
								    
								    <Button onClick={this.categorie.bind(this)} color="teal">
							    	 Catégories
							    	</Button>

									<div className={categorie}>
									    	 <Header
									    	 as='h5'
									    	 >
									    	 Amour
									    	 </Header>
									    
										    <Form.Field >
										      <Checkbox
										       label='Premier amour'
										       className="Checkbox"
										       onClick={(e, { value }) => this.premierAmour(value)}
										       value='premierAmour'
										       />

										      <Checkbox
										       label='Trahison' 
										       className="Checkbox"
										       onClick={(e, { value }) => this.trahison(value)}
										       value='trahison'
										       />

										      <Checkbox
										       label='Friendzone'
										       className="Checkbox"
										       onClick={(e, { value }) => this.Friendzone(value)}
										       value='Friendzone'
										        />

										      <Checkbox
										       label='Amour à distance'
										       className="Checkbox"
										       onClick={(e, { value }) => this.amourdistance(value)}
										       value='amourdistance'
										       />

										      <Checkbox
										       label='Séparation'
										       className="Checkbox"
										       onClick={(e, { value }) => this.separation(value)}
										       value='separation'
										       />

										       <Checkbox
										       label='Autre'
										       className="Checkbox"
										       onClick={(e, { value }) => this.autre(value)}
										       value='autre'
										       />
										    </Form.Field>

										    <Header
									    	 as='h5'
									    	 color="orange">
									    	 Confiance en soi
									    	 </Header>

										    <Form.Field>
										      <Checkbox
										       label='Timidité'
										       className="Checkbox"
										       onClick={(e, { value }) => this.timidite(value)}
										       value='timidite'
										       />

										      <Checkbox
										       label='Dépression'
										       className="Checkbox"
										       onClick={(e, { value }) => this.depression(value)}
										       value='depression'
										       />

										      <Checkbox
										       label='Suicide'
										       className="Checkbox"
										       onClick={(e, { value }) => this.suicide(value)}
										       value='suicide'
										       />

										      <Checkbox
										       label='Décès'
										       className="Checkbox"
										       onClick={(e, { value }) => this.deces(value)}
										       value='deces'
										       />

										      <Checkbox
										       label='Mutilation'
										       className="Checkbox"
										       onClick={(e, { value }) => this.mutilation(value)}
										       value='mutilation'
										       />

										       <Checkbox
										       label='Autre'
										       className="Checkbox"
										       onClick={(e, { value }) => this.autre(value)}
										       value='autre'
										       />
										    </Form.Field>

										    <Header
									    	 as='h5'
									    	 color="teal">
									    	 Sexo
									    	 </Header>

										    <Form.Field>
										      <Checkbox
										       label='Première'
										       className="Checkbox"
										       onClick={(e, { value }) => this.premierfois(value)}
										       value='premierfois'
										       />

										      <Checkbox
										       label='Contraception'
										       className="Checkbox"
										       onClick={(e, { value }) => this.Contraception(value)}
										       value='Contraception'
										       />

										      <Checkbox 
										      label='Maladie, MST'
										      className="Checkbox"
										      onClick={(e, { value }) => this.mst(value)}
										      value='mst'
										      />

										      <Checkbox
										       label='Viol'
										       className="Checkbox"
										       onClick={(e, { value }) => this.viol(value)}
										       value='viol'
										       />

										      <Checkbox
										        label='Avortement'
										        className="Checkbox"
										        onClick={(e, { value }) => this.avortement(value)}
										        value='avortement'
										        />
										      <Checkbox
										       label='Orientation sexuelle'
										       className="Checkbox"
										       onClick={(e, { value }) => this.orientationSex(value)}
										       value='orientationSex'
										       />

										       <Checkbox
										       label='Autre'
										       className="Checkbox"
										       onClick={(e, { value }) => this.autre(value)}
										       value='autre'
										       />
										    </Form.Field>

										    <Header
									    	 as='h5'
									    	 color="violet">
									    	 Santé / Addiction
									    	 </Header>

										    <Form.Field>
										      <Checkbox
										       label='Anorexie'
										       className="Checkbox"
										       onClick={(e, { value }) => this.Anorexie(value)}
										       value='Anorexie'
										       />

										      <Checkbox 
										       label='Obésité'
										       className="Checkbox"
										       onClick={(e, { value }) => this.obesite(value)}
										       value='obesite'
										       />

										      <Checkbox
										       label='Drogue'
										       className="Checkbox"
										       onClick={(e, { value }) => this.drogue(value)}
										       value='drogue'
										       />

										      <Checkbox 
										       label='Alcool'
										       className="Checkbox"
										       onClick={(e, { value }) => this.alcool(value)}
										       value='alcool'
										       />

										      <Checkbox
										       label='Complexe'
										       className="Checkbox"
										       onClick={(e, { value }) => this.complexe(value)}
										       value='complexe'
										       />

										      <Checkbox
										       label='Hospitalisation'
										       className="Checkbox"
										       onClick={(e, { value }) => this.Hospitalisation(value)}
										       value='hopital'
										       />

										      <Checkbox 
										       label='Handicap'
										       className="Checkbox"
										       onClick={(e, { value }) => this.handicap(value)}
										       value='handicap'
										       />

										      <Checkbox
										       label='Accident'
										       className="Checkbox"
										       onClick={(e, { value }) => this.Accident(value)}
										       value='Accident'
										       />

										       <Checkbox
										       label='Autre'
										       className="Checkbox"
										       onClick={(e, { value }) => this.autre(value)}
										       value='autre'
										       />
										    </Form.Field>

										    <Header
									    	 as='h5'
									    	 color="brown">
									    	 Milieu scolaire
									    	 </Header>

										    <Form.Field>
										      <Checkbox
										       label='Echec scolaire'
										       className="Checkbox"
										       onClick={(e, { value }) => this.echecEcole(value)}
										       value='echecEcole'
										       />

										      <Checkbox
										       label='Harcèlement'
										       className="Checkbox"
										       onClick={(e, { value }) => this.Harcelement(value)}
										       value='Harcelement'
										       />

										      <Checkbox 
										       label='Discrimination'
										       className="Checkbox"
										       onClick={(e, { value }) => this.Discrimination(value)}
										       value='Discrimination'
										       />

										      <Checkbox
										       label='Violence'
										       className="Checkbox"
										       onClick={(e, { value }) => this.Violence(value)}
										       value='premierAmour'
										       />

										       <Checkbox
										       label='Autre'
										       className="Checkbox"
										       onClick={(e, { value }) => this.autre(value)}
										       value='autre'
										       />
										    </Form.Field>
										    <Header
									    	 as='h3'>
									    	</Header>
									</div>
								    <Button type='submit' color="green">Valider</Button>
						  		</Form>
						      </Modal.Description>
						    </Modal.Content>
  						</Modal>
					</div>
					<div className="ButtonPseudo">
						<Link to={'/profil/' + Meteor.userId()}>
							 {username}
						</Link>
					</div>
				</div>
			</div>
	);
  }
}

export default HeaderPage =  withTracker(() => {
  /*const userId = Meteor.userId()
  const Handle = Meteor.subscribe('IsConseiller', userId);
  const loading = !Handle.ready();
  const allreponses = Conseilleres.find({'user_id':userId});
  const reponseExists = !loading && !!allreponses;*/

  return {
    /*user: reponseExists ? allreponses.count() : [],*/
  };
})(HeaderPage);