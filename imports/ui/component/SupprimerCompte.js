import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Divider, Modal } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router';
 
//Component
import HeaderPage from '../component/HeaderPage.js';

class NousContacter extends Component {

    state = { 
      visible: false,
      open:false,
      delete:false,
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

    render() {
    const { visible } = this.state
    if (!Meteor.loggingIn() && !Meteor.userId()){
      return <Redirect to="/" />;
    } 
    if (this.state.delete==true){
      return <Redirect to="/" />;
    } 

    return (
      
        <div className="MainContentProfil">
          <Header>
          Supprimer mon compte
          </Header>
          <Divider />
          <div className="ListeMesMessages">
            <div className="register blanc">
                <div className="numero">
                    <Modal trigger={<Button color='red' onClick={this.open.bind(this)}>
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
     );
  }
}
export default withTracker(() => {
  return {
  };
})(NousContacter);
