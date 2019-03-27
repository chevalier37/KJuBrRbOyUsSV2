import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Img from 'react-image'
import { Dropdown, Menu, Button, Modal, Header, Form, Input, Message, Checkbox, Segment, TextArea } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Route, Redirect } from 'react-router';
import {Helmet} from "react-helmet";
import PropTypes from 'prop-types';

import SearchUsers from '../component/searchUsers.js';

import { Notifications } from '../../api/Notifications.js';

class HeaderPage extends Component {
	static contextTypes = {
      router: PropTypes.object // replace with PropTypes.object if you use them
    }

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
	      Famille:false,
	      autre:false,
	      titreVide:false,
	      messageVide:false,
	      CatObligatoire:false,
	      TropCat:false,
	      poster:false,
	      open:false,
	      username:"",
	      redirectBloquer:false,
	      IsConseiller:false,
	      notifNonLu:"0",
	      SuperModerateur:false,
	      none:"visibleNotif",
	      LastContactId:"",
	      user:"",
	      length:0,
	      placeholder:"Chercher un pseudo",
	      ArticleModeration:0,
	      IsModerateur:false,

	    };
	}

	componentWillMount(){
		let id = Meteor.userId();
		let first = $(location).attr('pathname');
	    first.indexOf(1);
	    first.toLowerCase();
	    let pathname = first.split("/")[1];

	    if(pathname == "Chat"){
          this.setState({
          none: "none",
        	});
	    }else{
          this.setState({
          none: "visibleNotif",
        });
	    }

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
    	});

      	Meteor.apply('LastContact', [{
            }], {
            onResultReceived: (error, response) => {
              if (error) console.warn(error.reason);
                {response ?  
               this.setState({LastContactId: response}) : ""}
              },
        })

      	Meteor.apply('notifNonLu', [{
          }], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
            {response ?
             this.setState({notifNonLu: response}) :
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
    	});

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

		Meteor.apply(
	   		'SuperModerateur',
	   		[{}],
	   		{
	        onResultReceived: (error, response) => {
	           if (error) console.warn(error.reason);
	           {
	            response ?  
	             this.setState({SuperModerateur:true}) :
	             ""
		       }
		    },
		});

	     Meteor.apply('ArticleModeration', [{
          }], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
            
            {
            response ?
             this.setState({ArticleModeration: response})
             :
             ""
          	}

            },
    });
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
	  	const Famille = this.state.Famille;
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
	    				this.state.Famille + 
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

			titre.length !== 0 &&
			message.length !== 0 &&
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
		      Famille,
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
			        ReactDOM.findDOMNode(this.refs.titre).value = '';
			        ReactDOM.findDOMNode(this.refs.message).value = '';
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

  	Famille(value) {
	    this.setState({
	      Famille: !this.state.Famille,
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

  	loginConseiller(){
  		const id = Meteor.userId();
  		Meteor.apply('loginConseiller',
  		 [{
  		 	id
          }], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
            },
    	});
  	}

  	user() {
  		 const user = ReactDOM.findDOMNode(this.refs.oldPassword).value.trim();
  		 const length = user.length;
  		 if (length ==0){
  		 	this.setState({length: 0});
  		 }else{
  		 	this.setState({length: length});
  		 }
  		 this.setState({user: user});
  	}

  	focus() {
  		this.setState({placeholder: ""});
  	}

  	focusOut() {
  		this.setState({placeholder: "Chercher un pseudo"});
  	}

  
  	render() {
		const { user } = this.state;
  		const { visible } = this.state;
  		const { categorie } = this.state;
  		const { placeholderTitre } = this.state;
  		const { placeholderMessage } = this.state;
  		const { username } = this.state;
  		const { redirectBloquer } = this.state;
  		const { notifNonLu } = this.state;
  		const { LastContactId } = this.state;
  		const totalNotif = this.state.notifNonLu;
  		const NotifHead = totalNotif.toString();
  		let nuit = this.props.nuit;
  		
  		if(totalNotif == "0"){
  			const NotifHead = '0';
  		}else{
  			const NotifHead = totalNotif.toString()
  		}
  		  		
  		if (redirectBloquer){
      	return <Redirect to="/compteBloquer" />;
    	}

    	if(Meteor.userId()){
    		this.loginConseiller()
    	}

    	if(!Meteor.userId()){
    		this.logoutonseiller()
    	}

	return (
			<div className="headerTitre">
			<Helmet>
	              <meta charSet="utf-8" />
	              <title>({NotifHead}) Kurbys</title>
	         </Helmet>
				<div className="BlocHead">
					<div className="ButtonHeader">
						<Link to="/home" >
							 <Img className="iconHeader" src="/icone_kurbys.png"/>
						</Link>
					</div>
					<div className="ButtonHeader">
						<Link to="/Notifications" >
							<Img className="iconHeader" src="/bellMobile.png"/>
						</Link>
						<div className={this.state.notifNonLu > 0 ? "totalNotif" : "none"}>
						    {notifNonLu}
						</div>
					</div>
					<div className="ButtonHeader">
						<Link to={'/Chat/' + LastContactId }>
							 <Img className="iconHeader" src="/mail_blanc.png"/>
						</Link>
						<div className={this.state.none}>
							<div className={this.props.NBRchatUnread > 0 ? "totalNotif" : "none"}>
							    {this.props.NBRchatUnread}
							</div>
						</div>
					</div>
					<div className="ButtonHeader">
						<Link to="/Articles" >
							 <Img className="iconHeader" src="/article.png"/>
						</Link>
					</div>


					<div className="ButtonHeader">
						<Link to="/ConseillerConnecter" >
							 <Img className="iconHeader" src="/help.png"/>
						</Link>
					</div>
					<div className={this.state.IsConseiller ? "none" : "ButtonHeader"}>
						<Link to="/DevenirConseiller" >
							 <Img className="iconHeader" src="/new-user.png"/>
						</Link>
					</div>

					<div className="InputSearchUser">
						<Form>
						 <Form.Field required error={this.state.oldPassword}>
	                          <input
	                           ref="oldPassword"
	                           type='text'
	                           placeholder={this.state.placeholder}
	                           onChange={this.user.bind(this)}
	                           onFocus={this.focus.bind(this)}
	                           onBlur={this.focusOut.bind(this)}
	                           className="inputUsers"
	                           />
	                    </Form.Field>
	                    </Form>
	                    <div className={this.state.length==0 ? "none" : "ListeUser"}>
					 		<SearchUsers user={user} nuit={nuit}/>
						</div>
	                </div>

					
                  
					{/*<div className={!this.state.SuperModerateur ? "none" : "ButtonHeader"}>
						<Link to="/ajouterModerateur" >
							 <Img className="iconHeader" src="/new.svg"/>
						</Link>
					</div>*/}
					<div className="ButtonAide">
						<Modal 
						trigger={<Button color='red' onClick={this.open.bind(this)}>Demander de l'aide</Button>}
						centered={false} open={this.state.open ? true : false} className={ nuit ? "SegmentNuit" : ""}
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
								       maxlength="60"
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
										       label='Famille'
										       className="Checkbox"
										       onClick={(e, { value }) => this.Famille(value)}
										       value='Famille'
										       />
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
					<div className={this.state.ArticleModeration > 0 ? " " : "none"}>
						<div className={this.state.IsModerateur ? "ButtonHeader" : "none"}>
							<Link to="/ArticlesModeration" >
								 <Img className="iconHeader" src="/contract.png"/>
							</Link>
							<div className="ArticleModeration">{this.state.ArticleModeration}</div>
						</div>
					</div>

				</div>
			</div>
	);
  }
}

export default HeaderPage =  withTracker(() => {
  const Handle = Meteor.subscribe('NotifiMessageConnecte');
  const loading = !Handle.ready();
  const allreponses = Notifications.find({'type':'chat', 'read':false}).count();
  const reponseExists = !loading && !!allreponses;

  return {
    NBRchatUnread: reponseExists ? allreponses : '',
  };
})(HeaderPage);
