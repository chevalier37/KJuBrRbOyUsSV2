import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Img from 'react-image'
import { Dropdown, Menu, Button, Modal, Header, Form, Input, Message, Checkbox, Segment, TextArea } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Route, Redirect } from 'react-router';
import {Helmet} from "react-helmet";
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';

import SearchUsers from '../component/searchUsers.js';

class HeaderMobile extends Component {
	static contextTypes = {
	    router: PropTypes.object // replace with PropTypes.object if you use them
	  }

	constructor(props) {
	    super(props);
	 
	    this.state = {
	      visible: false,
	      username:"",
	      redirectBloquer:false,
	      IsConseiller:false,
	      pathname:" ",
      	  home:true,
      	  user:"",
	      length:0,
	      placeholder:"Chercher un pseudo",

	    };
	}

	componentWillMount(){
		let id = Meteor.userId();
		let first = $(location).attr('pathname');
	    first.indexOf(1);
	    first.toLowerCase();
	    let pathname = first.split("/")[1];

	    if(pathname == "home" || pathname == "home"){
		      this.setState({
		      home: true,
		    });
		      
		    }else{
		      this.setState({
		      home: false,
		    });
	    }

	    if(pathname == "MOBILEmessagePoste"){
	      this.setState({
	      pathname: "Mes messages",
	    });
	    }

	     if(pathname == "ModifierMessage"){
	      this.setState({
	      pathname: "Modifier message",
	    });
	    }

	    if(pathname == "MOBILEmesConseils"){
	      this.setState({
	      pathname: "Mes conseils",
	    });
	    }

	    if(pathname == "MOBILErecommandationsRecus"){
	      this.setState({
	      pathname: "Recommandations reçues",
	    });
	    }

	    if(pathname == "MOBILErecommandationsDonne"){
	      this.setState({
	      pathname: "Recommandations données",
	    });
	    }

	    if(pathname == "MOBILEnotifications"){
	      this.setState({
	      pathname: "Choix notifications",
	    });
	    }

	    if(pathname == "MOBILEmoderateur"){
	      this.setState({
	      pathname: "Devenir modérateur",
	    });
	    }

	    if(pathname == "MOBILEmoderateur"){
	      this.setState({
	      pathname: "Devenir modérateur",
	    });
   		}

   		if(pathname == "MOBILEnumerosUtiles"){
	      this.setState({
	      pathname: "Numéros utiles",
	    });
	    }

	    if(pathname == "MOBILEsignalerBug"){
	      this.setState({
	      pathname: "Signaler un bug",
	    });
	    }

	    if(pathname == "MOBILEsignalerBug"){
	      this.setState({
	      pathname: "Signaler un bug",
	    });
	    }

	    if(pathname == "ModifierConseiller"){
	      this.setState({
	      pathname: "Expériences",
	    });
	    }

	    if(pathname == "MOBILELivre"){
	      this.setState({
	      pathname: "Le livre",
	    });
	    }

	    if(pathname == "MOBILEcommandements"){
	      this.setState({
	      pathname: "5 commandements",
	    });
	    }

	    if(pathname == "singleMessage"){
	      this.setState({
	      pathname: "Message",
	    });
	    }

	     if(pathname == "MOBILEcgu"){
	      this.setState({
	      pathname: "G.C.U",
	    });
	    }

	    if(pathname == "MOBILEcontact"){
	      this.setState({
	      pathname: "Nous contacter",
	    });
	      this.setState({
	      visible: 'none',
	    });
	    }

	    if(pathname == "MOBILEsupprimer"){
	      this.setState({
	      pathname: "Suppimer compte",
	    });
	    }

	    if(pathname == "DevenirConseiller"){
	      this.setState({
	      pathname: "Devenir conseiller",
	    });
	    }

	    if(pathname == "ConseillerConnecter"){
	      this.setState({
	      pathname: "Conseillers",
	    });
	    }

	    if(pathname == "PosterMessage"){
	      this.setState({
	      pathname: "Demande d'aide",
	    });
	    }

	    if(pathname == "profil"){
	      this.setState({
	      pathname: "Profil",
	    });
	    }

	    if(pathname == "MOBILEcontactChat"){
	      this.setState({
	      pathname: "Contact",
	    });
	    }

	    if(pathname == "Notifications"){
	      this.setState({
	      pathname: "Notifications",
	    });
	    }

	    if(pathname == "VisiteProfil"){
	      this.setState({
	      pathname: "Profil",
	    });
	    }

	    if(pathname == "MOBILLEModifierConseiller"){
	      this.setState({
	      pathname: "Expériences",
	    });
	    }

	    if(pathname == "MOBILERecommander"){
	      this.setState({
	      pathname: "Recommander",
	    });
	    }

	    if(pathname == "ValiderRecommandation"){
	      this.setState({
	      pathname: "Validation",
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
  	}

  	open(){
  		this.setState({
	      open: !this.state.open,
	    });
  	}

  	focus() {
  		this.setState({placeholder: ""});
  	}

  	focusOut() {
  		this.setState({placeholder: "Chercher un pseudo"});
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



  	render() {

  		const { visible } = this.state
  		const { username } = this.state
  		const { redirectBloquer } = this.state
  		const { user } = this.state;
  		let nuit = this.props.nuit;

  		  		
  		if (redirectBloquer){
      	return <Redirect to="/compteBloquer" />;
    	}


	return (
			<div className="headerTitre">
				<div>
                {/*<div className={this.state.home ? "ButtonPseudoHeader" : "none"}>
                  {username}
                </div>*/}
                <div className={this.state.home ? "InputSearchUserMobile" : "none"}>
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
            	</div>
            	<div className={this.state.length==0 ? "none" : "ListeUser"}>
					 	<SearchUsers user={user} nuit={nuit}/>
				</div>
                <div className={!this.state.home ? "ButtonPseudoHeader" : "none"}>
                  <div className="name">
	              		{this.state.pathname}
	              	</div>
                  <div className="goBack" onClick={this.context.router.history.goBack}>
	                  <Img className="iconHeader" src="/arrow.png"/>
	              </div>
                </div>

                <div className="ButtonHeaderRight">
                  <Link to="/PosterMessage" >
                     <Img className="iconHeader" src="/editMobile.png"/>
                  </Link>
                </div>
                
				</div>

			</div>
	);
  }
}

export default HeaderMobile =  withTracker(() => {

  return {

  };
})(HeaderMobile);
