import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Menu} from 'semantic-ui-react'
import { Route, Redirect } from 'react-router';
import Img from 'react-image'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-108632466-1');
ReactGA.pageview(window.location.pathname + window.location.search);
 
//Component
import HeaderPage from '../component/HeaderPage.js';
import FooterMobile from '../component/FooterMobile.js';
import HeaderMobile from '../component/HeaderMobile.js';
import MainContent from '../component/MainContent.js';
import ContentMenuMobile from '../component/ContentMenuMobile.js';
import ModifierConseillerContent from '../component/ModifierConseillerContent.js';


class MOBILLEModifierConseiller extends Component {

    state = { visible: false, nuit:false, }

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

    render() {
    const { visible } = this.state
    const { nuit } = this.state
    
    if (!Meteor.loggingIn() && !Meteor.userId()){
      return <Redirect to="/" />;
    }  

    return (
      <div className={ this.state.nuit ? "containerNuit" : "container"}>
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
              <div className="containerSite" onClick={this.toggleHidden}>              
                    <ModifierConseillerContent nuit={nuit}/> 
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
})(MOBILLEModifierConseiller);
