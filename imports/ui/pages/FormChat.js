import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Checkbox, Form, Header, TextArea, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Img from 'react-image'
import { Chat } from '../../api/Chat.js';
import { Writing } from '../../api/Writing.js';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-108632466-1');
ReactGA.pageview(window.location.pathname + window.location.search);

//Icons
import Send from 'react-icons/lib/fa/paper-plane-o';

class FormChat extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      placeholderMessage:'Message',
	      bloquer:false,
	      writing:false,
	    };
	}

	focusMessage() {
	     this.setState({
	      placeholderMessage: '',
	    });
	     this.setState({
	      writing:true,
	    });
	     Meteor.call('writing',
	    	this.props.to_id,
          (err) => {
              if(err){
               } else {
                {}     
              }
            })
	}

	focusMessageOut() {
	     this.setState({
	      placeholderMessage:'Message',
	    });
	      this.setState({
	      writing:false,
	    });
	      Meteor.call('NOTwriting',
	    	this.props.to_id,
          (err) => {
              if(err){
               } else {
                {}     
              }
            })
	}

	writing() {
	     this.setState({
	      writing:true,
	    });
	    Meteor.call('writing',
	    	this.props.to_id,
          (err) => {
              if(err){
               } else {
                {}     
              }
            })
	}

	componentWillMount(){
       const from_id = this.props.to_id
        Meteor.apply('MyIdBloquerChat', [{
            from_id
            }], {
            onResultReceived: (error, response) => {
              if (error) console.warn(error.reason);
              {response ?  
               this.setState({bloquer: true}) :
               this.setState({bloquer: false})}
              },

        })
    }

    componentWillReceiveProps(){
         const from_id = this.props.to_id
          Meteor.apply('MyIdBloquerChat', [{
            from_id
            }], {
            onResultReceived: (error, response) => {
              if (error) console.warn(error.reason);
              {response ?  
               this.setState({bloquer: true}) :
               this.setState({bloquer: false})}
              },

        })
    }

	Submit() {
	  	
	  	const message = ReactDOM.findDOMNode(this.refs.message).value.trim();
	  	const to_id = this.props.to_id;
	  	const to_name = this.props.username;
	  	const user = Meteor.user();
	  	const from_name = user.username;
	  	const mail = this.props.mail;
		  	Meteor.call('addMessageChat',
		  	  message,
		  	  to_id,
		  	  (err) => {
            	if(err){
              
           		 } else {
              	{
	               
			        ReactDOM.findDOMNode(this.refs.message).value = '';
	              	}     
            	}
          	})

          	Meteor.call('NOTwriting',
	    	this.props.to_id,
          (err) => {
              if(err){
               } else {
                {}     
              }
            })

          	  Meteor.call('updateContactOnline',
		    		this.props.to_id,
			  	  (err) => {
	            	if(err){
	              
	           		 } else {
	              	{
				        //this.setState({ redirect: true})
		              	}     
	            	}
	          	})

          	{
          		!this.props.isOnline ?

		          Meteor.call(
		          'NouveauMessage',
		          mail,
		          'Kurbys <kurbys@mail.kurbys.com>',
		          'Nouveau message de ',
		          from_name,
		          message,
		          )
		          : ''
          	}

          	{
          		!this.props.isOnline ?

		          Meteor.call(
		          'ChatNotif',
		           message,
		  	  	   to_id,
		          )
		          : ''
          	}

          	{
          		!this.props.isOnline ?

		          Meteor.call('serverNotification','Nouveau message','Tu as reçu un message de ' + from_name, to_id)
		          : ''
          	}



          	

	}

  render() {
 		
  		const { placeholderMessage } = this.state
		
		return (
			<div className={this.state.bloquer ? "none" :"valideChatForm"}>
			    <div className={this.props.IsWriting >0 ? "visible" :"none"}>
				    <div className={"NameWriting" + " " + this.props.gender}>
				    	<Img className="iconWriting" src="/edit.svg"/> {this.props.username} 
				    </div>
				    <div className="TextWriting">
				    est en train d'écrire
				    </div>
			    </div>
			<Form onSubmit={this.Submit.bind(this)}>
		    	<div className="ButtonChatForm1">
			     	<Button color="green" fluid size="tiny">
				    	Envoyer 
				  	</Button>
		    	</div>

			    
				    <div className="valideChatArea1">
				      <TextArea
				       ref="message"
				       onFocus={this.focusMessage.bind(this)}
				       onBlur={this.focusMessageOut.bind(this)}
				       placeholder={placeholderMessage}
				       rows={8}
				       onChange={this.writing.bind(this)}
				       />
					</div>
		  		</Form>
			</div>
		);
  	}
}


export default FormChat =  withTracker(({ to_id }) => {
  const Handle = Meteor.subscribe('user', to_id);
  const loading = !Handle.ready();
  const user = Meteor.users.findOne({'_id':to_id});
  const reponseExists = !loading && !!user;

  const Handle1 = Meteor.subscribe('isWriting', to_id);
  const loading1 = !Handle1.ready();
  const search = Writing.find({to_id:Meteor.userId(), from_id:to_id, writing:true})
  const reponseExists1 = !loading1 && !!search;

  return {
  isOnline:reponseExists ? user.status.online : '',
  mail:reponseExists ? user.profile.mail : '',
  IsWriting: reponseExists1 ? search.count():'',
  };
})(FormChat);
