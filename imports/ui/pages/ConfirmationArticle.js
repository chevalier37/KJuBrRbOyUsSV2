import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Icon, Header, Divider, Menu } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router';
import Img from 'react-image'
 
//Component
import HeaderPage from '../component/HeaderPage.js';
import HeaderMobile from '../component/HeaderMobile.js';
import FooterMobile from '../component/FooterMobile.js';
import ContentMenuMobile from '../component/ContentMenuMobile.js';
import LastRecommandations from '../component/LastRecommandations.js';
import LastConseillers from '../component/LastConseillers.js';



class ConfirmationVirement extends Component {

    constructor(props) {
          super(props);
          this.state = {
          visible:false,
          moreAutre:5,
          nuit:false,
          ChargeNuit:true,
          };
          /*this.handleScroll = this.handleScroll.bind(this);*/
      }

    componentDidMount() {
        this.el.scrollIntoView();
       
        Meteor.apply('ModeNuit', [{}], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
            {response ?
             this.setState({nuit: response, ChargeNuit: false}) :
             this.setState({ChargeNuit: false})}
          },
        });
    }

    handleButtonClick = () => this.setState({ visible: !this.state.visible })
    handleSidebarHide = () => this.setState({ visible: false })

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


    render() {
    const { visible } = this.state
    const { nuit } = this.state

    if (!Meteor.loggingIn() && !Meteor.userId()){
      return <Redirect to="/" />;
    }  

    return (
      <div className={ this.state.nuit  ? "containerNuit" : "container"}>
      <div ref={el => { this.el = el; }} ></div>
        <header> 
          {/* Header site*/}
          <div className="containerHeader ecran">
            <div className="headerPage">
            <div className="lumiere" onClick={this.nuit.bind(this)}>
                <Img className={!this.state.nuit ? "iconHeader" : "none" } src="/jour.png"/>
                <Img className={this.state.nuit ? "iconHeader" : "none" } src="/nuit.png"/>
            </div>
              <HeaderPage nuit={nuit}/>
            </div>
          </div>

          {/* Header mobile*/}
          <div className="HeaderMobile mobile">
            <div className="headerTitre">
            <div className="ButtonHeaderMobile">
                <Img className="iconHeader" src="/menu.png" onClick={this.handleButtonClick} />
            </div>
                <HeaderMobile nuit={nuit}/>
            </div>
          </div>
        </header>

       
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
                  <div className="containerIMG">
                    <div className="MainContent">
                      <Segment className="MainContent">
                        <Header>
                          Article en cours de modération
                        </Header>
                      
                        <Divider />

                        <p className="consigne">
                        Ton article a bien été envoyé.<br />
                        Il sera posté après modération. 
                        </p>

                      </Segment>
                    </div>
                  </div> 
                </div>
              <LastConseillers nuit={nuit}/>
              </Sidebar.Pusher>
        </Sidebar.Pushable>
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
})(ConfirmationVirement);
