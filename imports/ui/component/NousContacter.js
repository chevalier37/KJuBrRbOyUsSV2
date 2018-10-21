import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Divider } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router';
 
//Component
import HeaderPage from '../component/HeaderPage.js';

class NousContacter extends Component {

    state = { visible: false }


    render() {
    const { visible } = this.state
    if (!Meteor.loggingIn() && !Meteor.userId()){
      return <Redirect to="/" />;
    }  

    return (
      
        <div className="MainContentProfil">
          <Header>
          Nous contacter
          </Header>
          <Divider />
          <div className="ListeMesMessages">
            <div className="register blanc">
                <div className="numero">
                    <strong>Qui sommes-nous ?</strong><br /><br />
                    KURBYS est une association qui a pour but d'aider ceux qui en ont besoin.<br />
                    Tout le monde peut participer et donner ses conseils. Ceux qui ont besoin d'aide sont les bienvenues<br /><br />
                    On construit une société sur des rapports humains, pas sur l'argent et le pouvoir.<br /><br />
                    Si vous souhaitez nous aider à faire grandir la communauté KURBYS, nous seront heureux de vous accueillir dans l'association.<br />
                    Il vous suffit de remplir le <a className="ahref" href = "/Bulletin_adhesion_kurbys.pdf" target = "_blank"> bulletin d'inscription</a> et nous le retourner.<br /><br />

                    Pour nous contacter : association.kurbys@gmail.com
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
