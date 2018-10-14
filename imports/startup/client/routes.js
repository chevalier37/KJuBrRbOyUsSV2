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
import forgotPassword from '../../../imports/ui/pages/forgotPassword.js';
import CGU from '../../../imports/ui/pages/CGU.js';
import Commandements from '../../../imports/ui/pages/Commandements.js';
import PosterMessage from '../../../imports/ui/pages/PosterMessage.js';
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
{/*import contact from '../../../imports/ui/pages/contact.js';
import singleMessage from '../../../imports/ui/pages/SingleMessage.js';
import Recommander from '../../../imports/ui/pages/Recommander.js';
import ValiderRecommandation from '../../../imports/ui/pages/ValiderRecommandation.js';
import ModifierConseiller from '../../../imports/ui/pages/ModifierConseiller.js';
import Recommandations from '../../../imports/ui/pages/Recommandations.js';
import Favoris from '../../../imports/ui/pages/Favoris.js';
import MessagesPostes from '../../../imports/ui/pages/MessagesPostes.js';
import Livre from '../../../imports/ui/pages/Livre.js';
import AmeliorerSite from '../../../imports/ui/pages/AmeliorerSite.js';
import SignalerBug from '../../../imports/ui/pages/SignalerBug.js';
import NumerosUtiles from '../../../imports/ui/pages/NumerosUtiles.js';
import SupprimerCompte from '../../../imports/ui/pages/SupprimerCompte.js';
import ContactConnecte from '../../../imports/ui/pages/ContactConnecte.js';
import Dons from '../../../imports/ui/pages/Dons1.js';
import ValidationDon from '../../../imports/ui/pages/ValidationDon.js';
import ListeDons from '../../../imports/ui/pages/ListeDons.js';
import ConfirmationVirement from '../../../imports/ui/pages/ConfirmationVirement.js';
import CommandeLivre from '../../../imports/ui/pages/CommandeLivre.js';
import ValidationCommande from '../../../imports/ui/pages/ValidationCommande.js';
import NotFound from '../../../imports/ui/pages/NotFound.js';
import MiseAjourNaissance from '../../../imports/ui/pages/MiseAjourNaissance.js';
import SuiviConseil from '../../../imports/ui/pages/SuiviConseil.js';
import ModifierMessage from '../../../imports/ui/pages/ModifierMessage.js';
import RecommandationsDonner from '../../../imports/ui/pages/RecommandationsDonner.js';
import ModifierRecommandation from '../../../imports/ui/pages/ModifierRecommandation.js';
import ChangerMotDePasse from '../../../imports/ui/pages/ChangerMotDePasse.js';
import ValiderNouveauPassword from '../../../imports/ui/pages/ValiderNouveauPassword.js';
import ConseillerConnecter from '../../../imports/ui/pages/ConseillerConnecter.js';
import RechercherConseillerConnecte from '../../../imports/ui/pages/RechercherConseillerConnecte.js';
import DerniereRecommandations from '../../../imports/ui/pages/DerniereRecommandations.js';
import NouveauxConseillers from '../../../imports/ui/pages/NouveauxConseillers.js';
import RecherchePseudo from '../../../imports/ui/pages/RecherchePseudo.js';
import NousRejoindre from '../../../imports/ui/pages/NousRejoindre.js';
import RedigerArticles from '../../../imports/ui/pages/RedigerArticles.js';
import ConfirmationArticle from '../../../imports/ui/pages/ConfirmationArticle.js';
import Articles from '../../../imports/ui/pages/Articles.js';
import ArticlesModeration from '../../../imports/ui/pages/ArticlesModeration.js';
import SingleArticle from '../../../imports/ui/pages/SingleArticle.js';
import MesArticles from '../../../imports/ui/pages/MesArticles.js';
import ajouterVideo from '../../../imports/ui/pages/ajouterVideo.js';
import Videos from '../../../imports/ui/pages/Videos.js';
import singleVideo from '../../../imports/ui/pages/singleVideo.js';
import ajouterSondage from '../../../imports/ui/pages/ajouterSondage.js';
import SingleSondage from '../../../imports/ui/pages/SingleSondage.js';
import TousSondage from '../../../imports/ui/pages/TousSondage.js';
import ajouterModerateur from '../../../imports/ui/pages/ajouterModerateur.js';
import ValiderMessage from '../../../imports/ui/pages/ValiderMessage.js';*/}


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
      {/*<Route path="/DevenirConseiller" component={DevenirConseiller}/>
      <Route path="/ResultatsConseiller/:theme" component={ResultatsConseiller}/>
      <Route path="/Profil/:id" component={Profil}/>*/}
      <Route path="/Chat/:id" component={Chat}/>
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
      {/*<Route path="/contact" component={contact}/>
      <Route path="/singleMessage/:id" component={singleMessage}/>
      <Route path="/Recommander/:id" component={Recommander}/>
      <Route path="/ValiderRecommandation/" component={ValiderRecommandation}/>
      <Route path="/ModifierConseiller/" component={ModifierConseiller}/>
      <Route path="/Recommandations/:id" component={Recommandations}/>
      <Route path="/Favoris/" component={Favoris}/>
      <Route path="/MessagesPostes/" component={MessagesPostes}/>
      <Route path="/Livre/" component={Livre}/>
      <Route path="/AmeliorerSite/" component={AmeliorerSite}/>
      <Route path="/SignalerBug/" component={SignalerBug}/>
      <Route path="/NumerosUtiles/" component={NumerosUtiles}/>
      <Route path="/SupprimerCompte/" component={SupprimerCompte}/>
      <Route path="/ContactConnecte/" component={ContactConnecte}/>
      <Route path="/Dons/:id" component={Dons}/>
      <Route path="/ValidationDon/" component={ValidationDon}/>
      <Route path="/ListeDons/:id" component={ListeDons}/>
      <Route path="/ConfirmationVirement/" component={ConfirmationVirement}/>
      <Route path="/CommandeLivre/" component={CommandeLivre}/>
      <Route path="/ValidationCommande/" component={ValidationCommande}/>
      <Route path="/MiseAjourNaissance/" component={MiseAjourNaissance}/>
      <Route path="/SuiviConseil/" component={SuiviConseil}/>
      <Route path="/ModifierMessage/:id" component={ModifierMessage}/>
      <Route path="/RecommandationsDonner/:id" component={RecommandationsDonner}/>
      <Route path="/ModifierRecommandation/:id" component={ModifierRecommandation}/>
      <Route path="/ChangerMotDePasse/" component={ChangerMotDePasse}/>
      <Route path="/ValiderNouveauPassword/" component={ValiderNouveauPassword}/>
      <Route path="/ConseillerConnecter/" component={ConseillerConnecter}/>
      <Route path="/RechercherConseillerConnecte/:theme" component={RechercherConseillerConnecte}/>
      <Route path="/DerniereRecommandations/" component={DerniereRecommandations}/>
      <Route path="/NouveauxConseillers/" component={NouveauxConseillers}/>
      <Route path="/RecherchePseudo/" component={RecherchePseudo}/>
      <Route path="/NousRejoindre/" component={NousRejoindre}/>
      <Route path="/RedigerArticles/" component={RedigerArticles}/>
      <Route path="/ConfirmationArticle/" component={ConfirmationArticle}/>
      <Route path="/Articles/" component={Articles}/>
      <Route path="/ArticlesModeration/" component={ArticlesModeration}/>
      <Route path="/SingleArticle/:id" component={SingleArticle}/>
      <Route path="/MesArticles/" component={MesArticles}/>
      <Route path="/ajouterVideo/" component={ajouterVideo}/>
      <Route path="/Videos/" component={Videos}/>
      <Route path="/singleVideo/:id" component={singleVideo}/>
      <Route path="/ajouterSondage/" component={ajouterSondage}/>
      <Route path="/SingleSondage/:id" component={SingleSondage}/>
      <Route path="/TousSondage/" component={TousSondage}/>
      <Route path="/ajouterModerateur/" component={ajouterModerateur}/>
      <Route path="/ValiderMessage/" component={ValiderMessage}/>*/}

    </div>
  </Router>
);
