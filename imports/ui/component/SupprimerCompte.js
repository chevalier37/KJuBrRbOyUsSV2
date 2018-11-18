import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Divider, Modal, Form, Message } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router';
 
//Component
import HeaderPage from '../component/HeaderPage.js';

class NousContacter extends Component {

    state = { 
      visible: false,
      open:false,
      delete:false,
      errorPassword:false,
      Password:false,
      password:false,
      connection:false,
      errorPassword:false,
      visible:false, 
      success:false,
      disabled:true,
       }

    supprimer(){
      Meteor.call('supprimerCompte')
      this.setState({delete: true})
    }

    non(){
      this.setState({open: false})
    }

    open(){
      this.setState({open: true})
    }

    Submit(event) {
        event.preventDefault();

        const Password = ReactDOM.findDOMNode(this.refs.Password).value.trim();

        //On verifie que l'ancien mot de passe n'est pas vide
        {!Password ?
         this.setState({Password: true,}) :
         this.setState({Password: false,
        })}

        check(Password, String);

        const errorPassword = this.state.errorPassword;
        var digest = Package.sha.SHA256(Password);

        {
           errorPassword == false
          ?

          Meteor.apply(
          'CheckPassword',
          [{
            digest
            }],
            {
            onResultReceived: (error, response) => {
              if (error) console.warn(error.reason);
              {
                response ?  
               this.setState({disabled: false}) :
               this.setState({disabled: true})
             }
            },

          })
            : ""
        }

        if ( Password !== '' && !this.state.errorPassword) {
          ReactDOM.findDOMNode(this.refs.Password).value="";
         
        }
        
    }

    render() {
    const { visible } = this.state;
    let nuit = this.props.nuit;
    
    if (!Meteor.loggingIn() && !Meteor.userId()){
      return <Redirect to="/" />;
    } 
    if (this.state.delete==true){
      return <Redirect to="/" />;
    } 

    return (
      
        <div className="MainContentProfil">
          <div className={ nuit ? "headerNuit" : "headerJour"}>
          Supprimer mon compte
          </div>
          <Divider />
          <div className="ListeMesMessages">
          <div className={ nuit ? "CGUNuit" : "ListeMessages"}>
            <div className="register blanc">
                <div className="numero">
                  <div className="demandePassword">
                      Entre ton mot de passe pour supprimer ton compte :
                  </div>
                <Form error success onSubmit={this.Submit.bind(this)}>
                       <Form.Field required error={this.state.Password}>
                          <input
                           ref="Password"
                           type='password'
                           placeholder='Mot de passe'
                           />
                         <Message
                          error={this.state.Password}
                          hidden={!this.state.Password}
                          header='Erreur mot de passe'
                          content="Mot de passe est obligatoire"
                         />
                        </Form.Field>

                        <Button type='submit' color='green'>Valider</Button>
                    </Form>

                    <br />
                    <Modal trigger={<Button color='red' disabled={this.state.disabled} onClick={this.open.bind(this)}>
                          Supprimer mon compte
                          </Button>} basic size='small' open={this.state.open}>
                        <Header content='Supprimer mon compte' />
                        <Modal.Content>
                         <p className="deleteCount">Toutes vos données seront définitivement supprimées</p>
                          <p className="deleteCount">Confirmez-vous la suppression de votre compte ?</p>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button
                           basic 
                           color='red'
                           inverted
                           onClick={this.non.bind(this)}
                           >
                            Non
                          </Button>
                          <Button
                           color='green'
                           inverted
                           onClick={this.supprimer.bind(this)}
                           >
                            Oui
                          </Button>
                        </Modal.Actions>
                      </Modal>
                </div>
            </div>
            </div>
          </div>
        </div>
     );
  }
}
export default withTracker(() => {
  return {
  };
})(NousContacter);
