import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form,  Message, Segment, Header} from 'semantic-ui-react'
import { check } from 'meteor/check';
import { Route, Redirect } from 'react-router';
import ReactGA from 'react-ga';
import Img from 'react-image'
ReactGA.initialize('UA-108632466-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class CGU extends Component {
static contextTypes = {
    router: () => '', 
  }
  componentDidMount() {
        this.scrollToTop();
    }

    componentDidUpdate() {
        this.scrollToTop();
    }

    scrollToTop() {
        this.el.scrollIntoView();
    }

   
  render() {
   
    return (
      <div className="container">
      <div ref={el => { this.el = el; }} ></div>
        <header>
          <div className="containerSupHeader">
            
              <div className="retour mobile" onClick={this.context.router.history.goBack}>
                <Img className="arrow" src="/arrow.svg"/> 
              </div>

           
            <div className="HeaderForget ecran">
              Kurbys
            </div>
          </div>
        </header>

        <div className="commandements">
          <div className="containerIMG">
              <div className="textCommandement">
            
                  <div className="TitreCommandements">
                  Les 5 commandements de Kurbys 
                  </div><br />

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

                  <div className="RegleCommandements">Les utilisateurs qui ne respectent pas ces 5 commandements seront bannis du site.</div><br />

                </div>
            </div> 
          </div>

                    
          <div className="containerFooter">    
          </div>
                  
      </div>
    );
  }
}


export default withTracker(() => {
   //Meteor.subscribe('all');
  return {
    
   
  };
})(CGU);
