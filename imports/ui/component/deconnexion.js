import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Divider, Modal } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router';
 
//Component
import HeaderPage from '../component/HeaderPage.js';

class deconnexion extends Component {
    state = { 
      visible: false,
      logout:false,
    }

    logout(){
      this.setState({logout: true});
      const id = Meteor.userId();
        Meteor.apply('logoutConseiller',
         [{
          id
            }], {
            onResultReceived: (error, response) => {
              if (error) console.warn(error.reason);
              },
        });
      Meteor.logout();
    }

    render() {
      const { visible } = this.state
      const logout = this.state.logout;
      
      if (!Meteor.loggingIn() && !Meteor.userId()){
        return <Redirect to="/" />;
      } 
      
      if (logout) {
        return <Redirect to="/" />;
      }

      return (
          <div className="MainContentProfil">
            <Header>
              Se déconnecter
            </Header>
            <Divider />
            <div className="ListeMesMessages">
              <div className="register blanc">
                  <div className="numero">
                      <Button color='red' onClick={this.logout.bind(this)}>
                            Déconnexion
                      </Button>   
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
})(deconnexion);
