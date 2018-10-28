import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Divider } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router';
 
//Component
import HeaderPage from '../component/HeaderPage.js';

class Commandements extends Component {

    state = { visible: false }


    render() {
    const { visible } = this.state
    if (!Meteor.loggingIn() && !Meteor.userId()){
      return <Redirect to="/" />;
    }  

    return (
      
        <div className="MainContentProfil">
          <Header>
          Les 5 commandements de Kurbys
          </Header>
          <Divider />
          <div className="ListeMesMessages">
            <div className="register blanc">
                <div className="numero">
           
                  <div className="SousTitreCommandements">Tu ne jugeras points</div>
                  Kurbys est un site d’échange de conseils.<br />
                  Tu peux donc apporter ton aide mais tu ne dois pas juger les personnes que tu aides.<br /><br />

                  <div className="SousTitreCommandements">Tu respecteras les utilisateurs</div>
                  Afin d’aider au mieux ceux qui ont besoin d’aide, tu resteras polie et bienveillant.<br /><br />

                  <div className="SousTitreCommandements">Tu garderas un langage correct</div>
                  Même si tu ne partages pas les mêmes avis que les autres utilisateurs, tu devras toujours garder un langage correct (pas de mots vulgaires ou grossiers)<br /><br />
                  
                  <div className="SousTitreCommandements">Tu respecteras les thématiques du site</div>
                  Kurbys te permets d’obtenir des conseils dans les domaines suivants : Amour, Confiance en soi, sexo, santé et scolarité. Merci de rester dans ces thématiques<br /><br />

                  <div className="SousTitreCommandements">Tu signaleras toutes dérives</div>
                  Si un utilisateur à un comportement inapproprié (vulgaire, fake message, harcèlement...) tu dois le signaler. Après validation par notre équipe, son compte sera bloqué.<br /><br />

                  <div className="RegleCommandements">Les utilisateurs qui ne respectent pas ces commandements seront bannis de kurbys.</div><br />

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
})(Commandements);
