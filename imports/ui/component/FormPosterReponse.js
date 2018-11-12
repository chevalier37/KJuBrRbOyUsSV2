import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Checkbox, Form, Header, TextArea, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Posts } from '../../api/Messages.js';

class FormPosterReponse extends Component {

	constructor(props) {
	    super(props);
	 
	    this.state = {
	      visible: false,
	      placeholderMessage:'Ajouter une réponse',
	      messageVide:false,
	    };
	}

	focusMessage() {
	     this.setState({
	      placeholderMessage: '',
	    });
	}

	focusMessageOut() {
	     this.setState({
	      placeholderMessage:'Ajouter une réponse',
	    });
	}

	Submit(event) {
        event.preventDefault();

	  	
	  	const message = ReactDOM.findDOMNode(this.refs.message).value.trim();
	  	const user = Meteor.user();
	  	const from_name = user.username;
	  	const titre = this.props.titreMessage;
	  	let id = this.props.id;

	    {
	    message == '' ?
	  	this.setState({messageVide: true}):
	  	this.setState({messageVide: false})
	    }

	  	{ //on verifie qu'il n'y à pas d'erreur avant d'envoyer le formulaire
		message !== ''
		?
     	Meteor.apply('addReponse', [{
          message, id
          }], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
            ReactDOM.findDOMNode(this.refs.message).value = '';
          },
      	})

       : ''
	    }
	    const authorId = this.props.authorId;
      	{
  		!this.props.isOnline && this.state.messageVide == false  ?
          Meteor.call(
          'NouvelleReponse',
          'Kurbys <kurbys@mail.kurbys.com>',
          'Nouvelle réponse au message : ',
          from_name,
          message,
          titre,
          authorId,
          )  
          : ''
      	}

	    Meteor.call(
	      'ReponseNotif',
	       	message,
		  	this.props.id,
	    )
	    
	    //push notification
	    Meteor.call('serverNotification',titre ,message, this.props.authorId)
	}

  render() {
  		const { visible } = this.state
  		const { placeholderMessage } = this.state
  		let nuit = this.props.nuit;
		
		return (
			<div className={ nuit ? "ListeMessagesNuit" : "ListeMessages"}>
				<Segment className={ nuit ? "SegmentNuit" : ""}>
				    <Form error onSubmit={this.Submit.bind(this)}>
				    	<Header
				    	 as='h2' className={ nuit ? "textNuit" : ""}>
				    	 Ajouter une réponse
				    	 </Header>
					    <Form.Field>
					      <TextArea
					       ref="message"
					       onFocus={this.focusMessage.bind(this)}
					       onBlur={this.focusMessageOut.bind(this)}
					       placeholder={placeholderMessage}
					       className={nuit ? "areaNuit" : ""}
					       rows={6}
					       />
					       <Message
				            hidden={!this.state.messageVide}
				            error={this.state.messageVide}
				            content='Le message est vide'
				          />
					    </Form.Field>
					    <Button type='submit' color="green">Valider</Button>
			  		</Form>
	  			</Segment>
			</div>
		);
  	}
}

export default FormPosterReponse =  withTracker(({ authorId }) => {

  const Handle = Meteor.subscribe('username', authorId);
  const loading = !Handle.ready();
  const user = Meteor.users.findOne({'_id':authorId}, {
    fields: {
      'status.online':1,
    }
  });
  const reponseExists = !loading && !!user;

  return {
  isOnline:reponseExists ? user.status.online : '',
  };
})(FormPosterReponse);
