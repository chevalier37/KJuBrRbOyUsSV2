import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Divider } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router';
 
//Component
import HeaderPage from '../component/HeaderPage.js';

class SignalerBug extends Component {

    state = { visible: false }


    render() {
    const { visible } = this.state
    if (!Meteor.loggingIn() && !Meteor.userId()){
      return <Redirect to="/" />;
    }  

    return (
      
        <div className="MainContentProfil">
          <Header>
          Signaler un bug
          </Header>
          <Divider />
          <div className="ListeMesMessages">
            <div className="register blanc">
                <div className="numero">
                    Tu as remarqué un bug ?<br />
                    Merci de contacter <Link to={'/Chat/oANNC3P9SpQ5Fw8Qg'} >Caroline </Link> pour le signaler.
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
})(SignalerBug);
