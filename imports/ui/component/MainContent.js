import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Checkbox, Form, Header, TextArea, Dimmer, Loader, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Img from 'react-image'
import AdSense from 'react-adsense';
import PropTypes from 'prop-types';
import FormPosterMessage from './FormPosterMessage.js';
import ListeMessages from './ListeMessages.js';
import Countdown from 'react-countdown-now';

import { Posts } from '../../api/Messages.js';

const Jours = [
  { key: '1', text: '01', value: '1' },
  { key: '2', text: '02', value: '2' },
  { key: '3', text: '03', value: '3' },
  { key: '4', text: '04', value: '4' },
  { key: '5', text: '05', value: '5' },
  { key: '6', text: '06', value: '6' },
  { key: '7', text: '07', value: '7' },
  { key: '8', text: '08', value: '8' },
  { key: '9', text: '09', value: '9' },
  { key: '10', text: '10', value: '10' },
  { key: '11', text: '11', value: '11' },
  { key: '12', text: '12', value: '12' },
  { key: '13', text: '13', value: '13' },
  { key: '14', text: '14', value: '14' },
  { key: '15', text: '15', value: '15' },
  { key: '16', text: '16', value: '16' },
  { key: '17', text: '17', value: '17' },
  { key: '18', text: '18', value: '18' },
  { key: '19', text: '19', value: '19' },
  { key: '20', text: '20', value: '20' },
  { key: '21', text: '21', value: '21' },
  { key: '22', text: '22', value: '22' },
  { key: '23', text: '23', value: '23' },
  { key: '24', text: '24', value: '24' },
  { key: '25', text: '25', value: '25' },
  { key: '26', text: '26', value: '26' },
  { key: '27', text: '27', value: '27' },
  { key: '28', text: '28', value: '28' },
  { key: '29', text: '29', value: '29' },
  { key: '30', text: '30', value: '30' },
  { key: '31', text: '31', value: '31' },
]

const Année = [
  { key: '2019', text: '2019', value: '2019' },
  { key: '2020', text: '2020', value: '2020' },
  
]

const Mois = [
  { key: '1', text: 'Janvier', value: 'january' },
  { key: '2', text: 'Février', value: 'february' },
  { key: '3', text: 'Mars', value: 'march' },
  { key: '4', text: 'Avril', value: 'april' },
  { key: '5', text: 'Mai', value: 'may' },
  { key: '6', text: 'Juin', value: 'june' },
  { key: '7', text: 'Juillet', value: 'july' },
  { key: '8', text: 'Août', value: 'august' },
  { key: '9', text: 'Septembre', value: 'september' },
  { key: '10', text: 'Octobre', value: 'october' },
  { key: '11', text: 'Novembre', value: 'november' },
  { key: '12', text: 'Décembre', value: 'december' },
  
]

const Heures = [
  { key: '1', text: '9h00', value: '9' },
  { key: '2', text: '10h00', value: '10' },
  { key: '3', text: '11h00', value: '11' },
  { key: '4', text: '12h00', value: '12' },
  { key: '5', text: '13h00', value: '13' },
  { key: '6', text: '14h00', value: '14' },
  { key: '7', text: '15h00', value: '15' },
  { key: '8', text: '16h00', value: '16' },
  { key: '9', text: '17h00', value: '17' },
  { key: '10', text: '18h00', value: '18' },
  { key: '11', text: '19h00', value: '19' },
  { key: '12', text: '20h00', value: '20' },
  { key: '13', text: '21h00', value: '21' },
  { key: '14', text: '22h00', value: '22' },
  
]

class MainContent extends Component {

	constructor(props) {
			    super(props);
			 
			    this.state = {
			      	allMessages: 'visibleMessage',
					MessageAmour :'cacher',
					MessageSexo:'cacher',
					MessageEcole:'cacher',
					MessageSante:'cacher',
					MessageConfiance:'cacher',
					MessageNonLu:'cacher',
					MessageAutre:'cacher',
					MessageVideos:'cacher',
					more:5,
					moreNonLu:5,
					moreAutre:5,
					moreAmour:5,
					moreConfiance:5,
					moreSexo:5,
					moreSante:5,
					moreEcole:5,
					moreVideos:5,
					poster:false,
					posterConseil:false,
					idSondage:"",
					titreSondage:"",
					AnnonceLive:false,
					jours: '',
			    	mois:'',
			    	année: '',
			    	heures:'',
			    	count:'',
			    };

			    this.jours = this.jours.bind(this);
			    this.mois = this.mois.bind(this);
			    this.année = this.année.bind(this);
			    this.heures = this.heures.bind(this);
			}


	renderAllMessages() {
	    let AllMessages = this.props.allMessages;
	    let nuit = this.props.nuit;
	    let more = this.state.more;
	    return AllMessages.slice(0, more).map((message) => {
	     let date = Date.parse(message.post_date);
         
	      return (
	        <ListeMessages
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}
	          nuit={nuit}         
	        />
	      );
	    });
	}

	renderNonLu() {
	    let nonLu = this.props.postNonLu;
	    let more = this.state.moreNonLu;
	    let nuit = this.props.nuit;
	    return nonLu.slice(0, more).map((message) => {
	     let date = Date.parse(message.post_date);
         
	      return (
	        <ListeMessages
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}
	          nuit={nuit}          
	        />
	      );
	    });
	}

	renderAutre() {
	    let autre = this.props.postAutre;
	    let more = this.state.moreAutre;
	    let nuit = this.props.nuit;
	    return autre.slice(0, more).map((message) => {
	     let date = Date.parse(message.post_date);
         
	      return (
	        <ListeMessages
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}
	          nuit={nuit}          
	        />
	      );
	    });
	}

	renderAmour() {
	    let MessageAmour = this.props.postsAmour;
	    let more = this.state.moreAmour;
	    let nuit = this.props.nuit;
	    return MessageAmour.slice(0, more).map((message) => {
	     let date = Date.parse(message.post_date);
         
	      return (
	        <ListeMessages
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}
	          nuit={nuit}            
	        />
	      );
	    });
	}

	renderSexo() {
	    let MessageSexo = this.props.postsSexo;
	    let more = this.state.moreSexo;
	    let nuit = this.props.nuit;
	    return MessageSexo.slice(0, more).map((message) => {
	     let date = Date.parse(message.post_date);
         
	      return (
	        <ListeMessages
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}
	          nuit={nuit}            
	        />
	      );
	    });
	}

	renderConfiance() {
	    let MessageConfiance = this.props.postsConfiance;
	    let more = this.state.moreConfiance;
	    let nuit = this.props.nuit;
	    return MessageConfiance.slice(0, more).map((message) => {
	     let date = Date.parse(message.post_date);
         
	      return (
	        <ListeMessages
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}
	          nuit={nuit}            
	        />
	      );
	    });
	}

	renderSante() {
	    let MessageSante = this.props.postsSante;
	    let more = this.state.moreSante;
	    let nuit = this.props.nuit;
	    return MessageSante.slice(0, more).map((message) => {
	     let date = Date.parse(message.post_date);
         
	      return (
	        <ListeMessages
	          key={message._id}
	          message={message}
	          date={date} 
	          id={message._id}
	          nuit={nuit}           
	        />
	      );
	    });
	}

	renderEcole() {
	    let MessageEcole = this.props.postsEcole;
	    let more = this.state.moreEcole;
	    let nuit = this.props.nuit;
	    return MessageEcole.slice(0, more).map((message) => {
	     let date = Date.parse(message.post_date);
         
	      return (
	        <ListeMessages
	          key={message._id}
	          message={message}
	          date={date} 
	          id={message._id}
	          nuit={nuit}           
	        />
	      );
	    });
	}

	renderVideos() {
	    let MessageVideos = this.props.postsVideos;
	    let more = this.state.moreVideos;
	    let nuit = this.props.nuit;
	    return MessageVideos.slice(0, more).map((message) => {
	     let date = Date.parse(message.post_date);
         
	      return (
	        <ListeMessages
	          key={message._id}
	          message={message}
	          date={date} 
	          id={message._id}
	          nuit={nuit}           
	        />
	      );
	    });
	}

	showAll() {
       	this.setState({allMessages: 'visibleMessage'});
       	this.setState({MessageEcole: 'cacher'});
       	this.setState({MessageSante: 'cacher'});
       	this.setState({MessageConfiance: 'cacher'});
       	this.setState({MessageSexo: 'cacher'});
       	this.setState({MessageAmour: 'cacher'});
       	this.setState({MessageNonLu: 'cacher'});
       	this.setState({MessageAutre: 'cacher'});
       	this.setState({MessageVideos: 'cacher'});
       	this.setState({poster: false});
	 }

	 nonLu() {
       	this.setState({allMessages: 'cacher'});
       	this.setState({MessageEcole: 'cacher'});
       	this.setState({MessageSante: 'cacher'});
       	this.setState({MessageConfiance: 'cacher'});
       	this.setState({MessageSexo: 'cacher'});
       	this.setState({MessageAmour: 'cacher'});
       	this.setState({MessageNonLu: 'visibleMessage'});
       	this.setState({MessageAutre: 'cacher'});
       	this.setState({MessageVideos: 'cacher'});
       	this.setState({poster: false});
	 }

	 ShowAutre() {
       	this.setState({allMessages: 'cacher'});
       	this.setState({MessageEcole: 'cacher'});
       	this.setState({MessageSante: 'cacher'});
       	this.setState({MessageConfiance: 'cacher'});
       	this.setState({MessageSexo: 'cacher'});
       	this.setState({MessageAmour: 'cacher'});
       	this.setState({MessageNonLu: 'cacher'});
       	this.setState({MessageAutre: 'visibleMessage'});
       	this.setState({MessageVideos: 'cacher'});
       	this.setState({poster: false});
	 }

	 shawAmour() {
       	this.setState({allMessages: 'cacher'});
       	this.setState({MessageEcole: 'cacher'});
       	this.setState({MessageSante: 'cacher'});
       	this.setState({MessageConfiance: 'cacher'});
       	this.setState({MessageSexo: 'cacher'});
       	this.setState({MessageAmour: 'visibleMessage'});
       	this.setState({MessageNonLu: 'cacher'});
       	this.setState({MessageAutre: 'cacher'});
       	this.setState({MessageVideos: 'cacher'});
       	this.setState({poster: false});

	 }

	 showConfiance() {
       	this.setState({allMessages: 'cacher'});
       	this.setState({MessageEcole: 'cacher'});
       	this.setState({MessageSante: 'cacher'});
       	this.setState({MessageConfiance: 'visibleMessage'});
       	this.setState({MessageSexo: 'cacher'});
       	this.setState({MessageAmour: 'cacher'});
       	this.setState({MessageNonLu: 'cacher'});
       	this.setState({MessageAutre: 'cacher'});
       	this.setState({MessageVideos: 'cacher'});
       	this.setState({poster: false});
	 }

	 showSexo() {
       	this.setState({allMessages: 'cacher'});
       	this.setState({MessageEcole: 'cacher'});
       	this.setState({MessageSante: 'cacher'});
       	this.setState({MessageConfiance: 'cacher'});
       	this.setState({MessageSexo: 'visibleMessage'});
       	this.setState({MessageAmour: 'cacher'});
       	this.setState({MessageNonLu: 'cacher'});
       	this.setState({MessageAutre: 'cacher'});
       	this.setState({MessageVideos: 'cacher'});
       	this.setState({poster: false});
	 }

	 showEcole() {
       	this.setState({allMessages: 'cacher'});
       	this.setState({MessageEcole: 'visibleMessage'});
       	this.setState({MessageSante: 'cacher'});
       	this.setState({MessageConfiance: 'cacher'});
       	this.setState({MessageSexo: 'cacher'});
       	this.setState({MessageAmour: 'cacher'});
       	this.setState({MessageNonLu: 'cacher'});
       	this.setState({MessageAutre: 'cacher'});
       	this.setState({MessageVideos: 'cacher'});
       	this.setState({poster: false});
	 }

	 showSante() {
       	this.setState({allMessages: 'cacher'});
       	this.setState({MessageEcole: 'cacher'});
       	this.setState({MessageSante: 'visibleMessage'});
       	this.setState({MessageConfiance: 'cacher'});
       	this.setState({MessageSexo: 'cacher'});
       	this.setState({MessageAmour: 'cacher'});
       	this.setState({MessageNonLu: 'cacher'});
       	this.setState({MessageAutre: 'cacher'});
       	this.setState({MessageVideos: 'cacher'});
       	this.setState({poster: false});
	 }

	 showVideos() {
       	this.setState({allMessages: 'cacher'});
       	this.setState({MessageEcole: 'cacher'});
       	this.setState({MessageSante: 'cacher'});
       	this.setState({MessageConfiance: 'cacher'});
       	this.setState({MessageSexo: 'cacher'});
       	this.setState({MessageAmour: 'cacher'});
       	this.setState({MessageNonLu: 'cacher'});
       	this.setState({MessageAutre: 'cacher'});
       	this.setState({MessageVideos: 'visibleMessage'});
       	this.setState({poster: false});
	 }

	 VoirPlus() {
	 	let plus = this.state.more + 5
       	this.setState({more: plus});
	 }

	 VoirNonLu() {
	 	let plus = this.state.moreNonLu + 5
       	this.setState({moreNonLu: plus});
	 }

	 VoirAutre() {
	 	let plus = this.state.moreAutre + 5
       	this.setState({moreAutre: plus});
	 }

	  VoirPlusConfiance() {
	 	let plus = this.state.moreConfiance + 5
       	this.setState({moreConfiance: plus});
	 }

	  VoirPlusAmour() {
	 	let plus = this.state.moreAmour + 5
       	this.setState({moreAmour: plus});
	 }

	  VoirPlusSexo() {
	 	let plus = this.state.moreSexo + 5
       	this.setState({moreSexo: plus});
	 }

	  VoirPlusSante() {
	 	let plus = this.state.moreSante + 5
       	this.setState({moreSante: plus});
	 }

	  VoirPlusEcole() {
	 	let plus = this.state.moreEcole + 5
       	this.setState({moreEcole: plus});
	 }

	   VoirplusVideos() {
	 	let plus = this.state.moreVideos + 5
       	this.setState({moreVideos: plus});
	 }

	poster() {
	    this.setState({
	      poster: !this.state.poster,
	    });
  	}

  	AnnonceLive() {
	    this.setState({
	      AnnonceLive: true,
	    });
  	}

  	DeleteAnnonceLive() {
	    this.setState({
	      AnnonceLive: false,
	    });
  	}

  	posterConseil() {
	    this.setState({
	      posterConseil: !this.state.posterConseil,
	    });
  	}

  	jours(value) {
    this.setState({
      jours: value,
    });
  	}

  	mois(value, key) {
    this.setState({
      mois: value,
    });
  	}

  	année(value) {
    this.setState({
      année: value,
    });
    
  	}

  	heures(value) {
    this.setState({
      heures: value,
    });
  	}
/*
  	SubmitAnonceLive() {
	    let jours= parseInt(this.state.jours);
    	let mois = this.state.mois;
    	let année = parseInt(this.state.année);
    	let heure = this.state.heures;

    	const live = new Date(''+mois +jours+','+année+'');
    	let hours = live.setHours(live.getHours() + heure)
		
		let today = new Date();
		
    	let count = (live - today)
console.log(live)

    	this.setState({
      count: count,
    });
  	}
*/	   
  render() {
  	if(this.props.more>5){
  		this.el.scrollIntoView();
  	}

  	let nuit = this.props.nuit;
  	let count = this.state.count;

		return (
			<div className="MainContent">
				<div className="centerpub ecran">
					<div className="space" />
					<div className="pubHome">
					        <AdSense.Google
					          client='ca-pub-6112176939320267'
					          slot='4083773640'
					           style={{display:'inline-block', width:728, height:90}}
					          format=''
					        />
					</div>

				{/*<Message warning>
				    <Message.Header>NOUVEAUTE : Vidéos</Message.Header>
				    <p>Vous pouvez maintenant regarder toutes les vidéos de Ambre sur Kurbys !<br />
				       N'hésitez pas rechercher une vidéo selon le conseil que vous avez besoin.
				    </p>
				</Message>*/}
				
				</div>

				{/* PUB mobile*/}
				{/*<div className="pubMobile mobile">
					<div className="space" />
					<div className="pubHome">
					        <AdSense.Google
					          client='ca-pub-6112176939320267'
					          slot='8072163696'
					           style={{display:'inline-block', width:320, height:50}}
					          format=''
					        />
					</div>
				</div>*/}
				{/*
					<Button
				        //size="mini"
				        //basic
				        color="blue"
				        onClick={this.AnnonceLive.bind(this)}>
				        Annoncer un live
				    </Button>

				    <Button
				        //size="mini"
				        //basic
				        color="red"
				        onClick={this.DeleteAnnonceLive.bind(this)}>
				        Supprimer annonce
				    </Button>

					<div className="space" />

<Form error onSubmit={this.SubmitAnonceLive.bind(this)}>
					<label>Date de naissance</label>
    			    <Form.Group widths='equal' error>
    				    <Form.Select
    				     fluid
    				     options={Jours}
    				     placeholder='Jour'
    				     onChange={(e, { value }) => this.jours(value)}
    				     />

    				    <Form.Select
    				     fluid
    				     options={Mois}
    				     placeholder='Mois'
    				     onChange={(e, { value }) => this.mois(value)}
    				      />

    				    <Form.Select
    				     fluid
    				     options={Année}
    				     placeholder='Année'
    				     onChange={(e, { value }) => this.année(value)}
    				      />

    				      <Form.Select
    				     fluid
    				     options={Heures}
    				     placeholder='Heure'
    				     onChange={(e, { value }) => this.heures(value)}
    				      />
    			    </Form.Group>
 <Button type='submit' color='green'>Créer annonce</Button>
</Form>

                   <Message
                    warning
                    className={ this.state.AnnonceLive ? "AnnonceLive" : "none"}
                    >
					    <Message.Header>Live</Message.Header>
					    <p>Live dans <br />
					       Mélissa répond à vos messages
					       <p className="CountdownLive">
					       <Countdown 
					       date={Date.now() + count} />
					    	</p>
					    	</p>
					</Message>


*/}


				<div className='inlinePoster'>
					  	 <div 
							className='DemanderConseil'
					    	onClick={this.poster.bind(this)}
					    	 >
					    	 <div className="textPoster">
					    	 <Img className="iconPoster" src="/sort.png"/>
					    	 Trier les messages
					    	 </div>
					    </div>
				</div>
				<div className={this.state.poster ? 'categories' : "none"}>
			{/*affichage sur ecran*/}
				<div className={ nuit ? "SegmentNuit ecran" : "ecran"}>
				       <Button
				        size="mini"
				        basic
				        color="blue"
				        onClick={this.nonLu.bind(this)}>
				        Non répondus
				       </Button>

				       <Button
				        size="mini"
				        basic
				        color="red"
				        onClick={this.showAll.bind(this)}>
				        Tous
				       </Button>

				       <Button
				        size="mini"
				        basic
				        color="red"
				        onClick={this.showVideos.bind(this)}>
				         Vidéos
				       </Button>

				      <Button
				        size="mini"
				        basic
				        color="red"
				        onClick={this.shawAmour.bind(this)}>
				         Amour
				       </Button>

				      <Button
				        size="mini"
				        basic
				        color="red"
				        onClick={this.showConfiance.bind(this)}>
				        Confiance en soi
				       </Button>

				      <Button
				        size="mini"
				        basic
				        color="red"
				        onClick={this.showSexo.bind(this)}>
				        Sexo
				       </Button>

				      <Button
				        size="mini"
				        basic
				        color="red"
				        onClick={this.showSante.bind(this)}>
				        Santé
				       </Button>

				      <Button
				        size="mini"
				        basic
				        color="red"
				        onClick={this.showEcole.bind(this)}>
				        Scolaire
				       </Button>

				       <Button
				        size="mini"
				        basic
				        color="red"
				        onClick={this.ShowAutre.bind(this)}>
				        Autre
				       </Button>
				</div>
				

			{/*affichage sur mobile*/}
				<div className={ nuit ? "SegmentNuit mobile" : "mobile"}>
				       <Button
				        size="medium"
				        basic
				        fluid
				        className="choixMobile"
				        color="blue"
				        onClick={this.nonLu.bind(this)}>
				        Non répondus
				       </Button>

				       <Button
				        size="medium"
				        basic
				        fluid
				        className="choixMobile"
				        color="red"
				        onClick={this.showAll.bind(this)}>
				        Tous
				       </Button>

				       <Button
				        size="medium"
				        basic
				        fluid
				        className="choixMobile"
				        color="red"
				        onClick={this.showVideos.bind(this)}>
				         Vidéos
				       </Button>

				      <Button
				        size="medium"
				        basic
				        fluid
				        className="choixMobile"
				        color="red"
				        onClick={this.shawAmour.bind(this)}>
				         Amour
				       </Button>

				      <Button
				        size="medium"
				        basic
				        fluid
				        className="choixMobile"
				        color="red"
				        onClick={this.showConfiance.bind(this)}>
				        Confiance en soi
				       </Button>

				      <Button
				        size="medium"
				        basic
				        fluid
				        className="choixMobile"
				        color="red"
				        onClick={this.showSexo.bind(this)}>
				        Sexo
				       </Button>

				      <Button
				        size="medium"
				        basic
				        fluid
				        className="choixMobile"
				        color="red"
				        onClick={this.showSante.bind(this)}>
				        Santé
				       </Button>

				      <Button
				        size="medium"
				        basic
				        fluid
				        className="choixMobile"
				        color="red"
				        onClick={this.showEcole.bind(this)}>
				        Scolaire
				       </Button>

				       <Button
				        size="medium"
				        basic
				        fluid
				        className="choixMobile"
				        color="red"
				        onClick={this.ShowAutre.bind(this)}>
				        Autre
				       </Button>
				    </div>
				</div>

	  			{/*loader au chargement de la page*/}
	  				<div className={this.props.loading ? "visibleLoader" : "none"}>
				        	<Loader active>Chargement des messages</Loader>
	  				</div>
	  			<div className="space" />
	  			<div className={this.state.allMessages}>
					
	  				{this.renderAllMessages()}
	  				
	  				<div className={this.state.more > this.props.countAllMessages ? "none" : "voirPlus" }>
						<Button
							fluid
					        color="green"
					        onClick={this.VoirPlus.bind(this)}>
					        Voir plus
						</Button>
					</div>
	  			</div>

	  			<div className={this.state.MessageNonLu}>
	  				{this.renderNonLu()}
	  				<div className={this.state.moreNonLu > this.props.countNonLu ? "none" : "voirPlus" }>
						<Button
							fluid
					        color="green"
					        onClick={this.VoirNonLu.bind(this)}>
					        Voir plus
						</Button>
					</div>
	  			</div>

				<div className={this.state.MessageAmour}>
					{this.renderAmour()}
					<div className={this.state.moreAmour > this.props.countPostsAmour ? "none" : "voirPlus" }>
						<Button
							fluid
					        color="green"
					        onClick={this.VoirPlusAmour.bind(this)}>
					        Voir plus
						</Button>
					</div>
				</div>

				<div className={this.state.MessageSexo}>
					{this.renderSexo()}
					<div className={this.state.moreSexo > this.props.countpostsSexo ? "none" : "voirPlus" }>
						<Button
							fluid
					        color="green"
					        onClick={this.VoirPlusSexo.bind(this)}>
					        Voir plus
						</Button>
					</div>
				</div>

				<div className={this.state.MessageConfiance}>
					{this.renderConfiance()}
					<div className={this.state.moreConfiance > this.props.countPostsConfiance ? "none" : "voirPlus" }>
						<Button
							fluid
					        color="green"
					        onClick={this.VoirPlusConfiance.bind(this)}>
					        Voir plus
						</Button>
					</div>
				</div>

				<div className={this.state.MessageSante}>
					{this.renderSante()}
					<div className={this.state.moreSante > this.props.countpostsSante ? "none" : "voirPlus" }>
						<Button
							fluid
					        color="green"
					        onClick={this.VoirPlusSante.bind(this)}>
					        Voir plus
						</Button>
					</div>
				</div>

				<div className={this.state.MessageEcole}>
					{this.renderEcole()}
					<div className={this.state.moreEcole > this.props.countpostsEcole ? "none" : "voirPlus" }>
						<Button
							fluid
					        color="green"
					        onClick={this.VoirPlusEcole.bind(this)}>
					        Voir plus
						</Button>
					</div>
				</div>

				<div className={this.state.MessageVideos}>
					{this.renderVideos()}
					<div className={this.state.moreVideos > this.props.countpostsVideos ? "none" : "voirPlus" }>
						<Button
							fluid
					        color="green"
					        onClick={this.VoirplusVideos.bind(this)}>
					        Voir plus
						</Button>
					</div>
				</div>

				<div className={this.state.MessageAutre}>
					{this.renderAutre()}
					<div className={this.state.moreAutre > this.props.countAutre ? "none" : "voirPlus" }>
						<Button
							fluid
					        color="green"
					        onClick={this.VoirAutre.bind(this)}>
					        Voir plus
						</Button>
					</div>
				</div>

			</div>

		);
  	}
}

MainContent.propTypes = {
    allMessages: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const Handle = Meteor.subscribe('AllMessages');
  const loading = !Handle.ready();

  const allposts = Posts.find({}, { sort: { post_date: -1 }, limit:30});

  const amour = Posts.find({$or:
  	[{premierAmour:true},
  	{trahison:true},
    {Friendzone:true},
    {amourdistance:true},
    {separation:true}]},
    { sort: { post_date: -1 }, limit:30 });

  const autre = Posts.find({autre:true},
    { sort: { post_date: -1 }, limit:30 });

  const nonLu = Posts.find({nbrReponse:0},
    { sort: { post_date: -1 }, limit:30 });

  const confiance = Posts.find({$or:
  	[{timidite:true},
  	{depression:true},
    {suicide:true},
    {deces:true},
    {mutilation:true}]},
    { sort: { post_date: -1 }, limit:30 });

  const sexo = Posts.find({$or:
  	[{premierfois:true},
  	{Contraception:true},
    {mst:true},
    {viol:true},
    {avortement:true},
    {orientationSex:true}]},
    { sort: { post_date: -1 }, limit:30 });

  const sante = Posts.find({$or:
  	[{Anorexie:true},
  	{obesite:true},
    {drogue:true},
    {alcool:true},
    {complexe:true},
    {hopital:true},
    {handicap:true},
    {Accident:true}]},
    { sort: { post_date: -1 }, limit:30 });

  const ecole = Posts.find({$or:
  	[{echecEcole:true},
  	{Harcelement:true},
    {Discrimination:true},
    {Violence:true}]},
    { sort: { post_date: -1 }, limit:30 });

  const vidéos = Posts.find({video:true},
    { sort: { post_date: -1 }, limit:30 });


   const postExists = !loading && !!allposts;
   const postAmourExists = !loading && !!amour;
   const postConfianceExists = !loading && !!confiance;
   const postSexoExists = !loading && !!sexo;
   const postSanteExists = !loading && !!sante;
   const postEcoleExists = !loading && !!ecole;
   const postNonLuExists = !loading && !!nonLu;
   const postautreExists = !loading && !!autre;
   const postvideosExists = !loading && !!autre;


  return {
    allMessages: postExists ? allposts.fetch() : [],
    countAllMessages: postExists ? allposts.count() : '',

    postNonLu: postExists ? nonLu.fetch() : [],
    countNonLu: postExists ? nonLu.count() : "",

    postAutre: postExists ? autre.fetch() : [],
    countAutre: postExists ? autre.count() : "",
    
    postsAmour: postExists ? amour.fetch() : [],
    countPostsAmour: postExists ? amour.count() : "",
    
    postsConfiance: postExists ? confiance.fetch() : [],
    countPostsConfiance: postExists ? confiance.count() : "",

    postsSexo: postExists ? sexo.fetch() : [],
    countpostsSexo: postExists ? sexo.count() : "",
   
    postsSante: postExists ? sante.fetch() : [],
    countpostsSante: postExists ? sante.count() : "",
    
    postsEcole: postExists ? ecole.fetch() : [],
    countpostsEcole: postExists ? ecole.count() : "",

    postsVideos: postExists ? vidéos.fetch() : [],
    countpostsVideos: postExists ? vidéos.count() : "",

    loading:loading,

  };
})(MainContent);