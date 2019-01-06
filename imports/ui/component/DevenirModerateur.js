import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Divider } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router';


//Component
import HeaderPage from '../component/HeaderPage.js';

class DevenirModerateur extends Component {

    state = { visible: false }


    render() {
      const { visible } = this.state;
      let nuit = this.props.nuit;
      
      if (!Meteor.loggingIn() && !Meteor.userId()){
        return <Redirect to="/" />;
      }  

      return (
          <div className="MainContentProfil">
            <div className={ nuit ? "headerNuit" : "headerJour"}>
            Devenir modérateur
            </div>
            <Divider />
            <div className="ListeMesMessages">
            <div className={ nuit ? "CGUNuit" : "ListeMessages"}>
              <div className="register blanc">
                  <div className="moderateur">
                      <strong>Vous souhaitez nous aider à la modération du site ?</strong><br />

                      En rejoignant l'association KURBYS vous ferez partie intégrante de notre équipe :<br />
                      - Vous participerez à la modération<br />
                      - Vous serez tenus informés des évolutions du site et de l'application mobile<br />
                      - Vous pourrez donner votre avis sur les futures améliorations à apporter<br />
                      - Vous participerez à l'assemblée générale qui a lieu une fois par an avec tous les membres de l'association<br />
                      <br />
                      <strong> Comment devenir adhérent ? </strong><br />
                      Il suffit de remplir le <a className="ahref ecranInline" href = "/Bulletin_adhesion_kurbys.pdf" target = "_blank"> bulletin d'inscription</a> 
                      <a className="ahref mobileInline" > bulletin d'inscription sur le site www.kurbys.com</a>
                      et nous le retourner avec le montant de la cotisation. <br /><br />
                      Après validation de votre adhésion, votre compte sera activé pour être modérateur.<br />
                      <br />
                      Pour plus de renseignements, n'hésitez pas à nous contacter à cette adresse mail : association.kurbys@gmail.com 

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
})(DevenirModerateur);
