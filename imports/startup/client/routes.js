import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import Connexion from '../../../imports/ui/pages/connexion.js';
import Home from '../../../imports/ui/pages/Home.js';
{/*
import ResultatsConseiller from '../../../imports/ui/pages/ResultatsConseiller.js';
import Profil from '../../../imports/ui/pages/Profil.js';*/}
import DevenirConseiller from '../../../imports/ui/pages/DevenirConseiller.js';
import Chat from '../../../imports/ui/pages/Chat.js';
import MOBILEcontactChat from '../../../imports/ui/pages/MOBILEcontactChat.js';
import forgotPassword from '../../../imports/ui/pages/forgotPassword.js';
import CGU from '../../../imports/ui/pages/CGU.js';
import Commandements from '../../../imports/ui/pages/Commandements.js';
import PosterMessage from '../../../imports/ui/pages/PosterMessage.js';
import MOBILEmessagePoste from '../../../imports/ui/pages/MOBILEmessagePoste.js';
import Notifications from '../../../imports/ui/pages/Notifications.js';
import ConseillerConnecter from '../../../imports/ui/pages/ConseillerConnecter.js';
import ModifierMessage from '../../../imports/ui/pages/ModifierMessage.js';
import singleMessage from '../../../imports/ui/pages/SingleMessage.js';
import Profil from '../../../imports/ui/pages/Profil.js';
import VisiteProfil from '../../../imports/ui/pages/VisiteProfil.js';
import ModifierConseiller from '../../../imports/ui/pages/ModifierConseiller.js';
import Recommander from '../../../imports/ui/pages/Recommander.js';
import ValiderRecommandation from '../../../imports/ui/pages/ValiderRecommandation.js';
import compteBloquer from '../../../imports/ui/pages/compteBloquer.js';
import ModifierRecommandation from '../../../imports/ui/pages/ModifierRecommandation.js';
import ajouterModerateur from '../../../imports/ui/pages/ajouterModerateur.js';
import MOBILEmesConseils from '../../../imports/ui/pages/MOBILEmesConseils.js';
import MOBILErecommandationsRecus from '../../../imports/ui/pages/MOBILErecommandationsRecus.js';
import MOBILErecommandationsDonne from '../../../imports/ui/pages/MOBILErecommandationsDonne.js';
import MOBILEnotifications from '../../../imports/ui/pages/MOBILEnotifications.js';
import MOBILEmoderateur from '../../../imports/ui/pages/MOBILEmoderateur.js';
import MOBILEnumerosUtiles from '../../../imports/ui/pages/MOBILEnumerosUtiles.js';
import MOBILEsignalerBug from '../../../imports/ui/pages/MOBILEsignalerBug.js';
import MOBILEpassword from '../../../imports/ui/pages/MOBILEpassword.js';
import MOBILELivre from '../../../imports/ui/pages/MOBILELivre.js';
import MOBILEcommandements from '../../../imports/ui/pages/MOBILEcommandements.js';
import MOBILEcgu from '../../../imports/ui/pages/MOBILEcgu.js';
import MOBILEcontact from '../../../imports/ui/pages/MOBILEcontact.js';
import MOBILEsupprimer from '../../../imports/ui/pages/MOBILEsupprimer.js';
import MOBILEChat from '../../../imports/ui/pages/MOBILEChat.js';
import MOBILLEModifierConseiller from '../../../imports/ui/pages/MOBILLEModifierConseiller.js';
import MOBILERecommander from '../../../imports/ui/pages/MOBILERecommander.js';
import ajouterVideo from '../../../imports/ui/pages/ajouterVideo.js';

const requireAuth = (nextState, replace) => {

  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};


const browserHistory = createBrowserHistory();
export const renderRoutes = () => (
  <Router history={browserHistory}>
    <div>
      <Route exact path="/" component={Connexion}/>
      <Route path="/home" component={Home} onEnter={requireAuth} />
      <Route path="/DevenirConseiller" component={DevenirConseiller}/>
      <Route path="/Chat/:id" component={Chat}/>
      <Route path="/MOBILEcontactChat/:id" component={MOBILEcontactChat}/>
      <Route path="/forgotPassword" component={forgotPassword}/>
      <Route path="/CGU" component={CGU}/>
      <Route path="/Commandements" component={Commandements}/>
      <Route path="/PosterMessage" component={PosterMessage}/>
      <Route path="/Notifications/" component={Notifications}/>
      <Route path="/ConseillerConnecter/" component={ConseillerConnecter}/>
      <Route path="/ModifierMessage/:id" component={ModifierMessage}/>
      <Route path="/singleMessage/:id" component={singleMessage}/>
      <Route path="/Profil/:id" component={Profil}/>
      <Route path="/VisiteProfil/:id" component={VisiteProfil}/>
      <Route path="/ModifierConseiller/" component={ModifierConseiller}/>
      <Route path="/Recommander/:id" component={Recommander}/>
      <Route path="/ValiderRecommandation/" component={ValiderRecommandation}/>
      <Route path="/compteBloquer/" component={compteBloquer}/>
      <Route path="/ModifierRecommandation/:id" component={ModifierRecommandation}/>
      <Route path="/ajouterModerateur/" component={ajouterModerateur}/>
      <Route path="/MOBILEmessagePoste/" component={MOBILEmessagePoste}/>
      <Route path="/MOBILEmesConseils/" component={MOBILEmesConseils}/>
      <Route path="/MOBILErecommandationsRecus/" component={MOBILErecommandationsRecus}/>
      <Route path="/MOBILErecommandationsDonne/" component={MOBILErecommandationsDonne}/>
      <Route path="/MOBILEnotifications/" component={MOBILEnotifications}/>
      <Route path="/MOBILEmoderateur/" component={MOBILEmoderateur}/>
      <Route path="/MOBILEnumerosUtiles/" component={MOBILEnumerosUtiles}/>
      <Route path="/MOBILEsignalerBug/" component={MOBILEsignalerBug}/>
      <Route path="/MOBILEpassword/" component={MOBILEpassword}/>
      <Route path="/MOBILELivre/" component={MOBILELivre}/>
      <Route path="/MOBILEcommandements/" component={MOBILEcommandements}/>
      <Route path="/MOBILEcgu/" component={MOBILEcgu}/>
      <Route path="/MOBILEcontact/" component={MOBILEcontact}/>
      <Route path="/MOBILEsupprimer/" component={MOBILEsupprimer}/>
      <Route path="/MOBILEChat/:id" component={MOBILEChat}/>
      <Route path="/MOBILLEModifierConseiller/" component={MOBILLEModifierConseiller}/>
      <Route path="/MOBILERecommander/:id" component={MOBILERecommander}/>
      <Route path="/ajouterVideo/" component={ajouterVideo}/>
    

    </div>
  </Router>
);
