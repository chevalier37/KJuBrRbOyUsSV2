import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Checkbox, Form,  Message, Tab } from 'semantic-ui-react'
import Img from 'react-image'
import { Route, Redirect } from 'react-router';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-108632466-1');
ReactGA.pageview(window.location.pathname + window.location.search);
 
//Component
import HeaderPage from '../component/HeaderPage.js';
import FooterMobile from '../component/FooterMobile.js';
import HeaderMobile from '../component/HeaderMobile.js';
import MainContent from '../component/MainContent.js';
import ContentMenuMobile from '../component/ContentMenuMobile.js';
import ProfilContent from '../component/ProfilContent.js';
import ContentMessagePostes from '../component/ContentMessagePostes.js';
import ContentSuiviConseil from '../component/ContentSuiviConseil.js';
import ContentRecommandations from '../component/ContentRecommandations.js';
import ContentRecommandationsDonner from '../component/ContentRecommandationsDonner.js';
import NumerosUtiles from '../component/NumerosUtiles.js';
import NousContacter from '../component/NousContacter.js';
import SignalerBug from '../component/SignalerBug.js';
import DevenirModerateur from '../component/DevenirModerateur.js';
import Commandements from '../component/Commandements.js';
import CGUProfil from '../component/CGUProfil.js';
import PasswordProfil from '../component/PasswordProfil.js';
import SupprimerCompte from '../component/SupprimerCompte.js';
import Deconnexion from '../component/deconnexion.js';
import Notifications from '../component/Notifications.js';
import Livre from '../component/Livre.js';
import Contentvideos from '../component/Contentvideos.js';
import LastRecommandations from '../component/LastRecommandations.js';
import LastConseillers from '../component/LastConseillers.js';
import MesArticles from '../component/MesArticles.js';

class Profil extends Component {

      constructor(props) {
        super(props);
     
        this.state = {
          visible: false,
          nuit:false,
          visibleProfile:true,
          visibleMessage:false,
          visibleConseil:false,
          visiblerecu:false,
          visibledonne:false,
          visiblenotif:false,
          visiblemoderateur:false,
          visiblenumeros:false,
          visibleSignaler:false,
          visiblePassword:false,
          visibleLivre:false,
          visibleCommandement:false,
          visibleCGU:false,
          visiblecontact:false,
          visibleSuprimer:false,
          visibleLogout:false,
          logout:false,
          visibleArticles:false,
        };
      }

    handleButtonClick = () => this.setState({ visible: !this.state.visible })
    handleSidebarHide = () => this.setState({ visible: false })

    componentDidMount() {
        this.el.scrollIntoView();
        Meteor.apply('ModeNuit', [{}], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
            {response ?
             this.setState({nuit: response}) :
             ""}
          },
        });
    }

    nuit() {
       this.setState({
        nuit: !this.state.nuit,
      });
      let nuit = !this.state.nuit;
      Meteor.apply(
        'nuit',
        [{nuit}],
        {
          onResultReceived: (error, response) => {
             if (error) console.warn(error.reason);
        },
      });
    }

    profil() {
       this.setState({
          visibleProfile:true,
          visibleMessage:false,
          visibleConseil:false,
          visiblerecu:false,
          visibledonne:false,
          visiblenotif:false,
          visiblemoderateur:false,
          visiblenumeros:false,
          visibleSignaler:false,
          visiblePassword:false,
          visibleLivre:false,
          visibleCommandement:false,
          visibleCGU:false,
          visiblecontact:false,
          visibleSuprimer:false,
          visibleLogout:false,
          visibleArticles:false,
      });
    }

    message() {
       this.setState({
          visibleProfile:false,
          visibleMessage:true,
          visibleConseil:false,
          visiblerecu:false,
          visibledonne:false,
          visiblenotif:false,
          visiblemoderateur:false,
          visiblenumeros:false,
          visibleSignaler:false,
          visiblePassword:false,
          visibleLivre:false,
          visibleCommandement:false,
          visibleCGU:false,
          visiblecontact:false,
          visibleSuprimer:false,
          visibleLogout:false,
          visibleArticles:false,
      });
    }

    conseil() {
       this.setState({
          visibleProfile:false,
          visibleMessage:false,
          visibleConseil:true,
          visiblerecu:false,
          visibledonne:false,
          visiblenotif:false,
          visiblemoderateur:false,
          visiblenumeros:false,
          visibleSignaler:false,
          visiblePassword:false,
          visibleLivre:false,
          visibleCommandement:false,
          visibleCGU:false,
          visiblecontact:false,
          visibleSuprimer:false,
          visibleLogout:false,
          visibleArticles:false,
      });
    }

    recu() {
       this.setState({
          visibleProfile:false,
          visibleMessage:false,
          visibleConseil:false,
          visiblerecu:true,
          visibledonne:false,
          visiblenotif:false,
          visiblemoderateur:false,
          visiblenumeros:false,
          visibleSignaler:false,
          visiblePassword:false,
          visibleLivre:false,
          visibleCommandement:false,
          visibleCGU:false,
          visiblecontact:false,
          visibleSuprimer:false,
          visibleLogout:false,
          visibleArticles:false,
      });
    }

    donnes() {
       this.setState({
          visibleProfile:false,
          visibleMessage:false,
          visibleConseil:false,
          visiblerecu:false,
          visibledonne:true,
          visiblenotif:false,
          visiblemoderateur:false,
          visiblenumeros:false,
          visibleSignaler:false,
          visiblePassword:false,
          visibleLivre:false,
          visibleCommandement:false,
          visibleCGU:false,
          visiblecontact:false,
          visibleSuprimer:false,
          visibleLogout:false,
          visibleArticles:false,
      });
    }

    notifications() {
       this.setState({
          visibleProfile:false,
          visibleMessage:false,
          visibleConseil:false,
          visiblerecu:false,
          visibledonne:false,
          visiblenotif:true,
          visiblemoderateur:false,
          visiblenumeros:false,
          visibleSignaler:false,
          visiblePassword:false,
          visibleLivre:false,
          visibleCommandement:false,
          visibleCGU:false,
          visiblecontact:false,
          visibleSuprimer:false,
          visibleLogout:false,
          visibleArticles:false,
      });
    }

    moderateur() {
       this.setState({
          visibleProfile:false,
          visibleMessage:false,
          visibleConseil:false,
          visiblerecu:false,
          visibledonne:false,
          visiblenotif:false,
          visiblemoderateur:true,
          visiblenumeros:false,
          visibleSignaler:false,
          visiblePassword:false,
          visibleLivre:false,
          visibleCommandement:false,
          visibleCGU:false,
          visiblecontact:false,
          visibleSuprimer:false,
          visibleLogout:false,
          visibleArticles:false,
      });
    }

    numeros() {
       this.setState({
          visibleProfile:false,
          visibleMessage:false,
          visibleConseil:false,
          visiblerecu:false,
          visibledonne:false,
          visiblenotif:false,
          visiblemoderateur:false,
          visiblenumeros:true,
          visibleSignaler:false,
          visiblePassword:false,
          visibleLivre:false,
          visibleCommandement:false,
          visibleCGU:false,
          visiblecontact:false,
          visibleSuprimer:false,
          visibleLogout:false,
          visibleArticles:false,
      });
    }

    signaler() {
       this.setState({
          visibleProfile:false,
          visibleMessage:false,
          visibleConseil:false,
          visiblerecu:false,
          visibledonne:false,
          visiblenotif:false,
          visiblemoderateur:false,
          visiblenumeros:false,
          visibleSignaler:true,
          visiblePassword:false,
          visibleLivre:false,
          visibleCommandement:false,
          visibleCGU:false,
          visiblecontact:false,
          visibleSuprimer:false,
          visibleLogout:false,
          visibleArticles:false,
      });
    }

    password() {
       this.setState({
          visibleProfile:false,
          visibleMessage:false,
          visibleConseil:false,
          visiblerecu:false,
          visibledonne:false,
          visiblenotif:false,
          visiblemoderateur:false,
          visiblenumeros:false,
          visibleSignaler:false,
          visiblePassword:true,
          visibleLivre:false,
          visibleCommandement:false,
          visibleCGU:false,
          visiblecontact:false,
          visibleSuprimer:false,
          visibleLogout:false,
          visibleArticles:false,
      });
    }

    livre() {
       this.setState({
          visibleProfile:false,
          visibleMessage:false,
          visibleConseil:false,
          visiblerecu:false,
          visibledonne:false,
          visiblenotif:false,
          visiblemoderateur:false,
          visiblenumeros:false,
          visibleSignaler:false,
          visiblePassword:false,
          visibleLivre:true,
          visibleCommandement:false,
          visibleCGU:false,
          visiblecontact:false,
          visibleSuprimer:false,
          visibleLogout:false,
          visibleArticles:false,
      });
    }

    commandements() {
       this.setState({
          visibleProfile:false,
          visibleMessage:false,
          visibleConseil:false,
          visiblerecu:false,
          visibledonne:false,
          visiblenotif:false,
          visiblemoderateur:false,
          visiblenumeros:false,
          visibleSignaler:false,
          visiblePassword:false,
          visibleLivre:false,
          visibleCommandement:true,
          visibleCGU:false,
          visiblecontact:false,
          visibleSuprimer:false,
          visibleLogout:false,
          visibleArticles:false,
      });
    }

    CGU() {
       this.setState({
          visibleProfile:false,
          visibleMessage:false,
          visibleConseil:false,
          visiblerecu:false,
          visibledonne:false,
          visiblenotif:false,
          visiblemoderateur:false,
          visiblenumeros:false,
          visibleSignaler:false,
          visiblePassword:false,
          visibleLivre:false,
          visibleCommandement:false,
          visibleCGU:true,
          visiblecontact:false,
          visibleSuprimer:false,
          visibleLogout:false,
          visibleArticles:false,
      });
    }

    contact() {
       this.setState({
          visibleProfile:false,
          visibleMessage:false,
          visibleConseil:false,
          visiblerecu:false,
          visibledonne:false,
          visiblenotif:false,
          visiblemoderateur:false,
          visiblenumeros:false,
          visibleSignaler:false,
          visiblePassword:false,
          visibleLivre:false,
          visibleCommandement:false,
          visibleCGU:false,
          visiblecontact:true,
          visibleSuprimer:false,
          visibleLogout:false,
          visibleArticles:false,
      });
    }

    articles() {
       this.setState({
          visibleProfile:false,
          visibleMessage:false,
          visibleConseil:false,
          visiblerecu:false,
          visibledonne:false,
          visiblenotif:false,
          visiblemoderateur:false,
          visiblenumeros:false,
          visibleSignaler:false,
          visiblePassword:false,
          visibleLivre:false,
          visibleCommandement:false,
          visibleCGU:false,
          visiblecontact:false,
          visibleSuprimer:false,
          visibleLogout:false,
          visibleArticles:true,
      });
    }

    supprimer() {
       this.setState({
          visibleProfile:false,
          visibleMessage:false,
          visibleConseil:false,
          visiblerecu:false,
          visibledonne:false,
          visiblenotif:false,
          visiblemoderateur:false,
          visiblenumeros:false,
          visibleSignaler:false,
          visiblePassword:false,
          visibleLivre:false,
          visibleCommandement:false,
          visibleCGU:false,
          visiblecontact:false,
          visibleSuprimer:true,
          visibleLogout:false,
          visibleArticles:false,
      });
    }

    logout() {
       this.setState({logout: true});
       Meteor.logout()
    }

    render() {
    const { visible } = this.state
    const { nuit } = this.state
    const logout = this.state.logout;

    if (!Meteor.loggingIn() && !Meteor.userId()){
      return <Redirect to="/" />;
    }

    if (logout) {
      return <Redirect to="/" />;
    }
    
    return (
      <div className={ this.state.nuit ? "containerNuit" : "container"}>
      <div ref={el => { this.el = el; }} ></div>
        <header> 
          {/* Header site*/}
          <div className="containerHeader ecran">
            <div className="headerPage">
            <div className="lumiere" onClick={this.nuit.bind(this)}>
                <Img className={!this.state.nuit ? "iconHeader" : "none" } src="/jour.png"/>
                <Img className={this.state.nuit ? "iconHeader" : "none" } src="/nuit.png"/>
            </div>
              <HeaderPage />
            </div>
          </div>

         {/* Header mobile*/}
          <div className="HeaderMobile mobile">
            <div className="headerTitre">
            <div className="ButtonHeaderMobile">
                <Img className="iconHeader" src="/menu.png" onClick={this.handleButtonClick} />
            </div>
                <HeaderMobile />
            </div>
          </div>
        </header>

        <div>
          <Sidebar.Pushable >
            <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              onHide={this.handleSidebarHide}
              vertical
              visible={visible}
              width='thin'
            >
              <ContentMenuMobile />
            </Sidebar>

            <Sidebar.Pusher>
            <LastRecommandations nuit={nuit}/>
              <div className="containerSite" onClick={this.toggleHidden}>
                  <div className="MainContent">

                      {/*TAB*/}
                    <div className="contentTAB">
                      <div className={ nuit ? "menuProfilNuit" : "menuProfil"}>
                          <div className={ nuit ? "tabProfilNuit" : "tabProfil"} onClick={this.profil.bind(this)}>
                            Profil
                          </div>
                          <div className={ nuit ? "tabProfilNuit" : "tabProfil"} onClick={this.articles.bind(this)}>
                            Mes articles
                          </div>
                          <div className={ nuit ? "tabProfilNuit" : "tabProfil"} onClick={this.message.bind(this)}>
                            Messages postés
                          </div>
                          <div className={ nuit ? "tabProfilNuit" : "tabProfil"} onClick={this.conseil.bind(this)}>
                            Mes conseils
                          </div>
                          <div className={ nuit ? "tabProfilNuit" : "tabProfil"} onClick={this.recu.bind(this)}>
                            Recom. reçues
                          </div>
                          <div className={ nuit ? "tabProfilNuit" : "tabProfil"} onClick={this.donnes.bind(this)}>
                            Recom. données
                          </div>
                          <div className={ nuit ? "tabProfilNuit" : "tabProfil"} onClick={this.notifications.bind(this)}>
                            Notifications
                          </div>
                            {/*<div className={ nuit ? "tabProfilNuit" : "tabProfil"} onClick={this.moderateur.bind(this)}>
                            Devenir modérateur
                          </div>*/}
                          <div className={ nuit ? "tabProfilNuit" : "tabProfil"} onClick={this.numeros.bind(this)}>
                            Numéros utiles
                          </div>
                          <div className={ nuit ? "tabProfilNuit" : "tabProfil"} onClick={this.signaler.bind(this)}>
                            Signaler bug
                          </div>
                          <div className={ nuit ? "tabProfilNuit" : "tabProfil"} onClick={this.password.bind(this)}>
                            Mot de passe
                          </div>
                          {/*<div className={ nuit ? "tabProfilNuit" : "tabProfil"} onClick={this.livre.bind(this)}>
                            Le secret de Cendrillon
                          </div>*/}
                          <div className={ nuit ? "tabProfilNuit" : "tabProfil"} onClick={this.commandements.bind(this)}>
                            5 Commandements
                          </div>
                          <div className={ nuit ? "tabProfilNuit" : "tabProfil"} onClick={this.CGU.bind(this)}>
                            C.G.U
                          </div>
                          <div className={ nuit ? "tabProfilNuit" : "tabProfil"} onClick={this.contact.bind(this)}>
                            Nous contacter
                          </div>
                          <div className={ nuit ? "tabProfilNuit" : "tabProfil"} onClick={this.supprimer.bind(this)}>
                            Supprimer compte
                          </div>
                          <div className={ nuit ? "tabProfilNuit" : "tabProfil"} onClick={this.logout.bind(this)}>
                            Déconnexion
                          </div>
                        </div>
                      </div>

                     {/*CONTENT*/}
                      <div className={ nuit ? "contentProfilNuit" : "contentProfil"}>
                        <div className={this.state.visibleProfile ? "show" : "none"}>
                            <div className="ecran">
                                <ProfilContent nuit={nuit}/>
                            </div>
                        </div>
                        <div className={this.state.visibleArticles ? "show" : "none"}>
                            <div className="ecran">
                                <MesArticles nuit={nuit}/>
                            </div>
                        </div>
                        <div className={this.state.visibleMessage ? "show" : "none"}>
                            <div className="ecran">
                                <ContentMessagePostes nuit={nuit}/>
                            </div>
                        </div>
                        <div className={this.state.visibleConseil ? "show" : "none"}>
                            <div className="ecran">
                                <ContentSuiviConseil nuit={nuit}/>
                            </div>
                        </div>
                        <div className={this.state.visiblerecu ? "show" : "none"}>
                            <div className="ecran">
                                <ContentRecommandations nuit={nuit}/>
                            </div>
                        </div>
                        <div className={this.state.visibledonne ? "show" : "none"}>
                            <div className="ecran">
                                <ContentRecommandationsDonner nuit={nuit}/>
                            </div>
                        </div>
                        <div className={this.state.visiblenotif ? "show" : "none"}>
                            <div className="ecran">
                                <Notifications nuit={nuit}/>
                            </div>
                        </div>
                        <div className={this.state.visiblemoderateur ? "show" : "none"}>
                            <div className="ecran">
                                <DevenirModerateur nuit={nuit}/>
                            </div>
                        </div>
                        <div className={this.state.visiblenumeros ? "show" : "none"}>
                            <div className="ecran">
                                <NumerosUtiles nuit={nuit}/>
                            </div>
                        </div>
                        <div className={this.state.visibleSignaler ? "show" : "none"}>
                            <div className="ecran">
                                <SignalerBug nuit={nuit}/>
                            </div>
                        </div>
                        <div className={this.state.visiblePassword ? "show" : "none"}>
                            <div className="ecran">
                                <PasswordProfil nuit={nuit}/>
                            </div>
                        </div>
                        <div className={this.state.visibleLivre ? "show" : "none"}>
                            <div className="ecran">
                                <Livre nuit={nuit}/>
                            </div>
                        </div>
                        <div className={this.state.visibleCommandement ? "show" : "none"}>
                            <div className="ecran">
                                <Commandements nuit={nuit}/>
                            </div>
                        </div>
                        <div className={this.state.visibleCGU ? "show" : "none"}>
                            <div className="ecran">
                                <CGUProfil nuit={nuit}/>
                            </div>
                        </div>
                        <div className={this.state.visiblecontact ? "show" : "none"}>
                            <div className="ecran">
                                <NousContacter nuit={nuit}/>
                            </div>
                        </div>
                        <div className={this.state.visibleSuprimer ? "show" : "none"}>
                            <div className="ecran">
                                <SupprimerCompte nuit={nuit}/>
                            </div>
                        </div>
                        <div className={this.state.visibleLogout ? "show" : "none"}>
                            <div className="ecran">
                                <Deconnexion nuit={nuit}/>
                            </div>
                        </div>
                      </div>  
                  </div> 
              </div> 
              <LastConseillers nuit={nuit}/> 
              <div className="mobile">
                  <ProfilContent nuit={nuit}/>
              </div>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>

        <div className="FooterMobile mobile">
              <FooterMobile />
        </div>
      </div>
    );
  }
}

export default withTracker(() => {

  return {

  };
})(Profil);
