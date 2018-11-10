import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Menu } from 'semantic-ui-react'
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
import ListeNotification from '../component/ListeNotification.js';
import Contentvideos from '../component/Contentvideos.js';
import LastRecommandations from '../component/LastRecommandations.js';
import LastConseillers from '../component/LastConseillers.js';

import { Notifications } from '../../api/Notifications.js';

class allNotifications extends Component {

    constructor(props) {
        super(props);
        this.state = {
          visible: false,
          username:'',
          gender:'',
          nuit:false,

        }
    }

    handleButtonClick = () => this.setState({ visible: !this.state.visible })
    handleSidebarHide = () => this.setState({ visible: false })

    componentDidMount() {
        this.scrollToTop();
    }

    componentDidUpdate() {
        this.scrollToTop();
    }

    scrollToTop() {
        this.el.scrollIntoView();
    }

    componentWillMount(){
      Meteor.apply('allRead', [{
        }], {
        onResultReceived: (error, response) => {
          if (error) console.warn(error.reason);
          /*{response ?
           this.setState({notifNonLu: response}) :
           ""}*/
        },
      });

      Meteor.apply('ModeNuit', [{}], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
            {response ?
             this.setState({nuit: response}) :
             ""}
          },
        });
    }

    deleteAllNotif() {
       Meteor.apply('deleteAllNotif', [{}], {
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

    renderAllreponses() {
          let Allreponses = this.props.allreponses;
          const nuit = this.state.nuit;

          return Allreponses.map((message) => {
           let date = Date.parse(message.date);
             
            return (
              <ListeNotification
                key={message._id}
                message={message}
                date={date}
                nuit={nuit}         
              />
            );
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
          <div className="lumiere" onClick={this.nuit.bind(this)}>
                <Img className={!this.state.nuit ? "iconHeader" : "none" } src="/jour.png"/>
                <Img className={this.state.nuit ? "iconHeader" : "none" } src="/nuit.png"/>
            </div>
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
             <LastRecommandations nuit={nuit}/>
             <div className="containerSite" onClick={this.toggleHidden}>
                      <div className="MainContent">
                      <div className={this.props.count==0 ? "none" : "deleteAllNotif"}>
                        <Button
                            size="mini"
                            color="red"
                            onClick={this.deleteAllNotif.bind(this)}>
                            Supprimer tous
                           </Button>
                        </div>
                      <div className="espaceNotif"></div>                      
                         {this.renderAllreponses()}
                      </div>    
              </div>
              <LastConseillers nuit={nuit}/>
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

export default allNotifications =  withTracker(() => {
  const Handle = Meteor.subscribe('Notifications');
  const loading = !Handle.ready();
  const count = Notifications.find().count();
  const allreponses = Notifications.find({'type': { $ne: 'chat' }}, { sort: {date: -1 }, limit:30 });
  const reponseExists = !loading && !!allreponses;
  const countExists = !loading && !!count;

  return {
    allreponses: reponseExists ? allreponses.fetch() : [],
    count: countExists ? count : '',
  };
})(allNotifications);
