import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form,  Message, Modal } from 'semantic-ui-react'
import Img from 'react-image'
import { Route, Redirect } from 'react-router';

import FormSubscribe from '../component/FormSubscribe.js';
import FormLogin from '../component/FormLogin.js';



class Connexion extends Component {


  render() {

    return (
      <div className="">
        <div className="container-left">
          <div className="container-explication">
            <h1>KURBYS</h1>
            <div className="slogan-acceuil">Vous ne marcherez jamais seul</div>
            <div className="explication">
            	<div className="iconMain">
              		<Img className="iconConnexion" src="/question.svg"/>
              	 </div>Demander un conseil <br /><br /><br />
              	<div className="iconMain">
              		<Img className="iconConnexion" src="/charity.svg"/>
              	</div> Obtenir de l'aide <br /><br /><br />
              	<div className="iconMain">
              		<Img className="iconConnexion" src="/support.svg"/>
              	</div> Devenir conseiller <br /><br /><br />
              	<div className="iconMain">
              		<Img className="iconConnexion" src="/network.svg"/>
              	</div> Partager son experience<br /><br /><br />
              	<div className="iconMain">
              		<Img className="iconConnexion" src="/cross.svg"/>
              	</div> Aucun sujet tabou<br /><br /><br />
              <div className="pub-application">
                <a href={"https://play.google.com/store/apps/details?id=com.idb9qf011pqj13l1a3vqwl&hl=fr"}><Img className="application" src="/android.png"/></a>
                <a href={"https://itunes.apple.com/us/app/kurbys/id1295881140?mt=8"}><Img className="application" src="/apple.png"/></a>
              </div>
            </div>
          </div>
        </div>
        <div className="container-right">
          <div className="container-connexion">
            <FormLogin /><br /><br />
            <FormSubscribe />
          </div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
  };
})(Connexion);
