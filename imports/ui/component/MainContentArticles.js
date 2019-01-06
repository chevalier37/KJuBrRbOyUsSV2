import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Checkbox, Form, Header, TextArea, Dimmer, Loader, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Img from 'react-image'

import ListeArticles from './ListeArticles.js';

import { Articles } from '../../api/Articles.js';

class MainContent extends Component {

	constructor(props) {
			    super(props);
			 
			    this.state = {
			      	allMessages: 'visibleArticle',
					MessageAmour :'cacher',
					MessageSexo:'cacher',
					MessageEcole:'cacher',
					MessageSante:'cacher',
					MessageConfiance:'cacher',
					MessageAutre:'cacher',
					more:5,
					moreAutre:5,
					moreAmour:5,
					moreConfiance:5,
					moreSexo:5,
					moreSante:5,
					moreEcole:5,
					IsConseiller:false,
					poster:false,
			    };
			}

	componentWillMount(){
		let id = Meteor.userId();
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
	}

	renderAllMessages() {
	    let AllMessages = this.props.allMessages;
	    let more = this.state.more;
	    return AllMessages.slice(0, more).map((message) => {
	     let date = Date.parse(message.post_date);
         
	      return (
	        <ListeArticles
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}
	          content={message.post_content}         
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
	        <ListeArticles
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}
	          content={message.post_content}         
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
	        <ListeArticles
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}
	          content={message.post_content}         
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
	        <ListeArticles
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}
	          content={message.post_content}         
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
	        <ListeArticles
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}
	          content={message.post_content}         
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
	        <ListeArticles
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}
	          content={message.post_content}         
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
	        <ListeArticles
	          key={message._id}
	          message={message}
	          date={date}
	          id={message._id}
	          content={message.post_content}         
	        />
	      );
	    });
	}

	showAll() {
       	this.setState({allMessages: 'visibleArticle'});
       	this.setState({MessageEcole: 'cacher'});
       	this.setState({MessageSante: 'cacher'});
       	this.setState({MessageConfiance: 'cacher'});
       	this.setState({MessageSexo: 'cacher'});
       	this.setState({MessageAmour: 'cacher'});
       	this.setState({MessageAutre: 'cacher'});
	 }

	 ShowAutre() {
       	this.setState({allMessages: 'cacher'});
       	this.setState({MessageEcole: 'cacher'});
       	this.setState({MessageSante: 'cacher'});
       	this.setState({MessageConfiance: 'cacher'});
       	this.setState({MessageSexo: 'cacher'});
       	this.setState({MessageAmour: 'cacher'});
       	this.setState({MessageAutre: 'visibleArticle'});
	 }

	 shawAmour() {
       	this.setState({allMessages: 'cacher'});
       	this.setState({MessageEcole: 'cacher'});
       	this.setState({MessageSante: 'cacher'});
       	this.setState({MessageConfiance: 'cacher'});
       	this.setState({MessageSexo: 'cacher'});
       	this.setState({MessageAmour: 'visibleArticle'});
       	this.setState({MessageAutre: 'cacher'});

	 }

	 showConfiance() {
       	this.setState({allMessages: 'cacher'});
       	this.setState({MessageEcole: 'cacher'});
       	this.setState({MessageSante: 'cacher'});
       	this.setState({MessageConfiance: 'visibleArticle'});
       	this.setState({MessageSexo: 'cacher'});
       	this.setState({MessageAmour: 'cacher'});
       	this.setState({MessageAutre: 'cacher'});
	 }

	 showSexo() {
       	this.setState({allMessages: 'cacher'});
       	this.setState({MessageEcole: 'cacher'});
       	this.setState({MessageSante: 'cacher'});
       	this.setState({MessageConfiance: 'cacher'});
       	this.setState({MessageSexo: 'visibleArticle'});
       	this.setState({MessageAmour: 'cacher'});
       	this.setState({MessageAutre: 'cacher'});
	 }

	 showEcole() {
       	this.setState({allMessages: 'cacher'});
       	this.setState({MessageEcole: 'visibleArticle'});
       	this.setState({MessageSante: 'cacher'});
       	this.setState({MessageConfiance: 'cacher'});
       	this.setState({MessageSexo: 'cacher'});
       	this.setState({MessageAmour: 'cacher'});
       	this.setState({MessageAutre: 'cacher'});
	 }

	 showSante() {
       	this.setState({allMessages: 'cacher'});
       	this.setState({MessageEcole: 'cacher'});
       	this.setState({MessageSante: 'visibleArticle'});
       	this.setState({MessageConfiance: 'cacher'});
       	this.setState({MessageSexo: 'cacher'});
       	this.setState({MessageAmour: 'cacher'});
       	this.setState({MessageAutre: 'cacher'});
	 }

	 VoirPlus() {
	 	let plus = this.state.more + 5
       	this.setState({more: plus});
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


  	posterConseil() {
	    this.setState({
	      posterConseil: !this.state.posterConseil,
	    });
  	}

  	poster() {
	    this.setState({
	      poster: !this.state.poster,
	    });
  	}
			   
  render() {
  	const { IsConseiller } = this.state;
  	let nuit = this.props.nuit;
		return (
			<div className="MainContent">	    
                    <Popup
                       	trigger={<div className="ecranArticle">
                      	<Button
                      	size="small"
				        color="green"
				        disabled={!IsConseiller}
				         >
				         <Link to={'/RedigerArticles/'}>
                          Rédiger un article
                          </Link>
                        </Button>
                    
                      </div>
                    } content='Seuls les conseillers peuvent rédiger un article' />

				<div >

				<div className='inlinePoster'>
					  	 <div 
							className='DemanderConseil'
					    	onClick={this.poster.bind(this)}
					    	 >
					    	 <div className="textPoster">
					    	 Catégories
					    	 </div>
					    </div>
				</div>
				<div className={this.state.poster ? 'categories' : "none"}>
				
				{/*affichage sur ecran*/}
				<div className={ nuit ? "SegmentNuit ecran" : "ecran"}>
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
				</div>
				

			{/*affichage sur mobile*/}
				<div className={ nuit ? "SegmentNuit mobile marginRight" : "mobile marginRight"}>
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
			</div>
	  			{/*loader au chargement de la page*/}
	  				<div className={this.props.loading ? "visibleLoader" : "none"}>
				        	<Loader active>Chargement des articles</Loader>
	  				</div>
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

export default withTracker(() => {
  
  const Handle = Meteor.subscribe('AllArticles');
  const loading = !Handle.ready();

  const allposts = Articles.find({valider:true, refuse:false}, { sort: { post_date: -1 }});
  const amour = Articles.find({valider:true, refuse:false, $or:
    [{premierAmour:true},
  	{trahison:true},
    {Friendzone:true},
    {amourdistance:true},
    {separation:true}]},
    { sort: { post_date: -1 }, limit:30 });

  const autre = Articles.find({valider:true, refuse:false, autre:true},
    { sort: { post_date: -1 }, limit:30 });


  const confiance = Articles.find({valider:true, refuse:false, $or:
  	[{timidite:true},
  	{depression:true},
    {suicide:true},
    {deces:true},
    {mutilation:true}]},
    { sort: { post_date: -1 }, limit:30 });

  const sexo = Articles.find({valider:true, refuse:false, $or:
  	[{premierfois:true},
  	{Contraception:true},
    {mst:true},
    {viol:true},
    {avortement:true},
    {orientationSex:true}]},
    { sort: { post_date: -1 }, limit:30 });

  const sante = Articles.find({valider:true, refuse:false, $or:
  	[{Anorexie:true},
  	{obesite:true},
    {drogue:true},
    {alcool:true},
    {complexe:true},
    {hopital:true},
    {handicap:true},
    {Accident:true}]},
    { sort: { post_date: -1 }, limit:30 });

  const ecole = Articles.find({valider:true, refuse:false, $or:
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
   const postautreExists = !loading && !!autre;

  return {
    allMessages: postExists ? allposts.fetch() : [],
    countAllMessages: postExists ? allposts.count() : '',

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