import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Checkbox, Form, Header, TextArea, Dimmer, Loader, Popup, Divider } from 'semantic-ui-react'
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

	 VoirPlus() {
	 	let plus = this.state.more + 5
       	this.setState({more: plus});
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
			<div className="MainContentProfil">
			<div className={ nuit ? "headerNuit" : "headerJour"}>
						Mes articles
					</div>
					<Divider />
				<div className="ListeMesMessages">	    
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

				

			</div>

			</div>

		);
  	}
}

export default withTracker(() => {
  
  const Handle = Meteor.subscribe('MesArticles');
  const loading = !Handle.ready();

  const allposts = Articles.find({valider:true, refuse:false}, { sort: { post_date: -1 }});
  const postExists = !loading && !!allposts;


  return {
    allMessages: postExists ? allposts.fetch() : [],
    countAllMessages: postExists ? allposts.count() : '',
   
    loading:loading,

  };
})(MainContent);