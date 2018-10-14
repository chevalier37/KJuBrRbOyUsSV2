import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Checkbox, Form,  Message } from 'semantic-ui-react'
import Img from 'react-image'
import { Route, Redirect } from 'react-router';
 
//Component
import HeaderPage from '../component/HeaderPage.js';
import FooterMobile from '../component/FooterMobile.js';
import MainContent from '../component/MainContent.js';
import ContentMenuMobile from '../component/ContentMenuMobile.js';
import DevenirConseillerContent from '../component/DevenirConseillerContent.js';

class DevenirConseiller extends Component {

    state = { visible: false }

    handleButtonClick = () => this.setState({ visible: !this.state.visible })

    handleSidebarHide = () => this.setState({ visible: false })

    /*componentWillMount(){
    }*/

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
             <DevenirConseillerContent /> 
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
})(DevenirConseiller);
