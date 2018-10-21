import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Checkbox, Form,  Message, Tab } from 'semantic-ui-react'
import Img from 'react-image'
import { Route, Redirect } from 'react-router';
 
//Component
import HeaderPage from '../component/HeaderPage.js';
import FooterMobile from '../component/FooterMobile.js';
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

const panes = [
  { menuItem: 'Profil', render: () => <Tab.Pane><ProfilContent /></Tab.Pane> },
  { menuItem: 'Messages postés', render: () => <Tab.Pane><ContentMessagePostes  />  </Tab.Pane> },
  { menuItem: 'Mes conseils', render: () => <Tab.Pane><ContentSuiviConseil  />  </Tab.Pane> },
  { menuItem: 'Recommandations reçues', render: () => <Tab.Pane><ContentRecommandations  /></Tab.Pane> },
  { menuItem: 'Recommandations données', render: () => <Tab.Pane><ContentRecommandationsDonner  /></Tab.Pane> },
  { menuItem: 'Notifications', render: () => <Tab.Pane><Notifications  /></Tab.Pane> },
  { menuItem: 'Devenir modérateur', render: () => <Tab.Pane><DevenirModerateur  /></Tab.Pane> },
  { menuItem: 'Numéros utiles', render: () => <Tab.Pane><NumerosUtiles  /></Tab.Pane> },
  { menuItem: 'Signaler bug', render: () => <Tab.Pane><SignalerBug  /></Tab.Pane> },
  { menuItem: 'Mot de passe', render: () => <Tab.Pane><PasswordProfil  /></Tab.Pane> },
  { menuItem: 'Le secret de Cendrillon', render: () => <Tab.Pane><Livre  /></Tab.Pane> },
  { menuItem: '5 Commandements', render: () => <Tab.Pane><Commandements  /></Tab.Pane> },
  { menuItem: 'C.G.U', render: () => <Tab.Pane><CGUProfil  /></Tab.Pane> },
  { menuItem: 'Nous contacter', render: () => <Tab.Pane><NousContacter  /></Tab.Pane> },
  { menuItem: 'Supprimer compte', render: () => <Tab.Pane><SupprimerCompte  /></Tab.Pane> },
  { menuItem: 'Déconnexion', render: () => <Tab.Pane ><Deconnexion  /></Tab.Pane> },

]


class Home extends Component {

    state = { visible: false }

    handleButtonClick = () => this.setState({ visible: !this.state.visible })
    handleSidebarHide = () => this.setState({ visible: false })

    /*componentWillMount(){
    }*/

    render() {
    const { visible } = this.state
    if (!Meteor.loggingIn() && !Meteor.userId()){
      return <Redirect to="/" />;
    }
    
    return (
      <div className="container">
        <header> 
          {/* Header site*/}
          <div className="containerHeader ecran">
            <div className="headerPage">
              <HeaderPage />
            </div>
          </div>

          {/* Header mobile*/}
          <div className="HeaderMobile mobile">
            <div className="headerTitre">
              <div className="">
                <div className="ButtonHeaderMobile">
                     <Img className="iconHeader" src="/menu.svg" onClick={this.handleButtonClick} />
                </div>
                <div className="ButtonPseudoHeader">
                  Pseudo
                </div>
                <div className="ButtonHeaderRight">
                  <Link to="/PosterMessage" >
                     <Img className="iconHeader" src="/edit.svg"/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div>
          <Sidebar.Pushable >
            <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              inverted
              onHide={this.handleSidebarHide}
              vertical
              visible={visible}
              width='thin'
            >
              <ContentMenuMobile />
            </Sidebar>

            <Sidebar.Pusher>
              <div className="containerSite" onClick={this.toggleHidden}>
                  <div className="MainContent">
                  <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />             
                  </div> 
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
})(Home);
