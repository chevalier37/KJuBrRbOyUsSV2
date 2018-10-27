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

import { Posts } from '../../api/Messages.js';

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
					more:5,
					moreNonLu:5,
					moreAutre:5,
					moreAmour:5,
					moreConfiance:5,
					moreSexo:5,
					moreSante:5,
					moreEcole:5,
					poster:false,
					posterConseil:false,
					idSondage:"",
					titreSondage:"",
			    };
			}

	renderAllMessages() {
	    let AllMessages = this.props.allMessages;
	    let more = this.state.more;
	    return AllMessages.slice(0, more).map((message) => {
	     let date = Date.parse(message.post_date);
         
	      return (
	        <ListeMessages
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}         
	        />
	      );
	    });
	}

	renderNonLu() {
	    let nonLu = this.props.postNonLu;
	    let more = this.state.moreNonLu;
	    return nonLu.slice(0, more).map((message) => {
	     let date = Date.parse(message.post_date);
         
	      return (
	        <ListeMessages
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}         
	        />
	      );
	    });
	}

	renderAutre() {
	    let autre = this.props.postAutre;
	    let more = this.state.moreAutre;
	    return autre.slice(0, more).map((message) => {
	     let date = Date.parse(message.post_date);
         
	      return (
	        <ListeMessages
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}         
	        />
	      );
	    });
	}

	renderAmour() {
	    let MessageAmour = this.props.postsAmour;
	    let more = this.state.moreAmour;
	    return MessageAmour.slice(0, more).map((message) => {
	     let date = Date.parse(message.post_date);
         
	      return (
	        <ListeMessages
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}           
	        />
	      );
	    });
	}

	renderSexo() {
	    let MessageSexo = this.props.postsSexo;
	    let more = this.state.moreSexo;
	    return MessageSexo.slice(0, more).map((message) => {
	     let date = Date.parse(message.post_date);
         
	      return (
	        <ListeMessages
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}           
	        />
	      );
	    });
	}

	renderConfiance() {
	    let MessageConfiance = this.props.postsConfiance;
	    let more = this.state.moreConfiance;
	    return MessageConfiance.slice(0, more).map((message) => {
	     let date = Date.parse(message.post_date);
         
	      return (
	        <ListeMessages
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}           
	        />
	      );
	    });
	}

	renderSante() {
	    let MessageSante = this.props.postsSante;
	    let more = this.state.moreSante;
	    return MessageSante.slice(0, more).map((message) => {
	     let date = Date.parse(message.post_date);
         
	      return (
	        <ListeMessages
	          key={message._id}
	          message={message}
	          date={date} 
	          id={message._id}          
	        />
	      );
	    });
	}

	renderEcole() {
	    let MessageEcole = this.props.postsEcole;
	    let more = this.state.moreEcole;
	    return MessageEcole.slice(0, more).map((message) => {
	     let date = Date.parse(message.post_date);
         
	      return (
	        <ListeMessages
	          key={message._id}
	          message={message}
	          date={date} 
	          id={message._id}          
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

	 poster() {
	    this.setState({
	      poster: !this.state.poster,
	    });
  	}

  	posterConseil() {
	    this.setState({
	      posterConseil: !this.state.posterConseil,
	    });
  	}
			   
  render() {
  	if(this.props.more>5){
  		this.el.scrollIntoView();
  	}

		return (
			<div className="MainContent">
				<div className="centerpub">
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

				<div className='inlinePoster'>
					  	 <div 
							className='DemanderConseil'
					    	onClick={this.poster.bind(this)}
					    	 >
					    	 <div className="textPoster">
					    	 <Img className="iconPoster" src="/sort.svg"/>
					    	 Trier les messages
					    	 </div>
					    </div>
				</div>
				<div className={this.state.poster ? 'categories' : "none"}>
				<Segment>
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
				    </Segment>
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

export default withTracker(({more}) => {
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

   const postExists = !loading && !!allposts;
   const postAmourExists = !loading && !!amour;
   const postConfianceExists = !loading && !!confiance;
   const postSexoExists = !loading && !!sexo;
   const postSanteExists = !loading && !!sante;
   const postEcoleExists = !loading && !!ecole;
   const postNonLuExists = !loading && !!nonLu;
   const postautreExists = !loading && !!autre;


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

    loading:loading,

  };
})(MainContent);