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
import FooterMobile from '../component/FooterMobile.js';
import MainContent from '../component/MainContent.js';
import ContentMenuMobile from '../component/ContentMenuMobile.js';
import FormPosterMessage from '../component/FormPosterMessage.js';
import HeaderMobile from '../component/HeaderMobile.js';

class PosterMessage extends Component {

    state = { visible: false }

    handleButtonClick = () => this.setState({ visible: !this.state.visible })

    handleSidebarHide = () => this.setState({ visible: false })

    componentDidMount() {
        this.scrollToTop();
    }

     scrollToTop() {
        this.el.scrollIntoView();
    }

    render() {
    const { visible } = this.state
    /*if (!Meteor.loggingIn() && !Meteor.userId()){
      return <Redirect to="/" />;
    }
    const naissance = this.props.naissance;
    const typeNaissance = typeof naissance;
     if (typeNaissance == 'string'){
     }else if (typeNaissance !== 'object'){
      return <Redirect to="/MiseAjourNaissance" />;
    }*/
    
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
            <div ref={el => { this.el = el; }} ></div>
              <ContentMenuMobile />
            </Sidebar>

            <Sidebar.Pusher>
                <FormPosterMessage />
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
  /*const id = Meteor.userId();
  const Handle = Meteor.subscribe('user', id);
  const loading = !Handle.ready();
  const allreponses = Meteor.users.find({_id:id});
  const reponseExists = !loading && !!allreponses;*/

  return {
    /*naissance: reponseExists ? allreponses.fetch() : '',*/
  };
})(PosterMessage);
