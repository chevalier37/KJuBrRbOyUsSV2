import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Checkbox, Form,  Message } from 'semantic-ui-react'
import Img from 'react-image'
import { Route, Redirect } from 'react-router';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-108632466-1');
ReactGA.pageview(window.location.pathname + window.location.search);
 
//Component
import HeaderPage from '../component/HeaderPage.js';
import HeaderMobile from '../component/HeaderMobile.js';
import FooterMobile from '../component/FooterMobile.js';
import MainContent from '../component/MainContent.js';
import ContentMenuMobile from '../component/ContentMenuMobile.js';
import SupprimerCompte from '../component/SupprimerCompte.js';

class MOBILEsupprimer extends Component {

    state = { visible: false }

    handleButtonClick = () => this.setState({ visible: !this.state.visible })
    handleSidebarHide = () => this.setState({ visible: false })

    componentDidMount() {
        this.el.scrollIntoView();
    }
    render() {
    const { visible } = this.state
    if (!Meteor.loggingIn() && !Meteor.userId()){
      return <Redirect to="/" />;
    }
    
    return (
      <div className="container">
      <div ref={el => { this.el = el; }} ></div>
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
             <SupprimerCompte /> 
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
})(MOBILEsupprimer);
