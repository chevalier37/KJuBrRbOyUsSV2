import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Checkbox, Form,  Message } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router';
import Img from 'react-image'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-108632466-1');
ReactGA.pageview(window.location.pathname + window.location.search);

import MOBILEcontact from '../component/MOBILEcontact.js';
import HeaderPage from '../component/HeaderPage.js';
import HeaderMobile from '../component/HeaderMobile.js';
import FooterMobile from '../component/FooterMobile.js';
import MainContent from '../component/MainContent.js';
import ContentMenuMobile from '../component/ContentMenuMobile.js';

import { Chat } from '../../api/Chat.js';

class MOBILEcontactChat extends Component {

    constructor(props) {
        super(props);
     
        this.state = {
          username:'',
          naissance:'',
          update:false,
          gender:'',
          visibleLeft:false,
          visible: false,
        };
    }

    handleButtonClick = () => this.setState({ visible: !this.state.visible })
    handleSidebarHide = () => this.setState({ visible: false })

    toggleVisibility(){
      this.scrollToTop();
      this.setState({ visible: !this.state.visible  })
    } 

    VisibilityLeft(){
      this.scrollToTop();
      this.setState({ visibleLeft: !this.state.visibleLeft  })
    } 
    
    toggleHidden() {
      this.setState({ visible: false });
      this.setState({ visibleLeft: false });
    }

    componentWillReceiveProps(){
         this.setState({update: false})
    }

    componentDidMount() {
        this.scrollToTop();
    }

    scrollToTop() {
        this.el.scrollIntoView();
    }
      
    render() {
    
    const { visible } = this.state
    
    if (!Meteor.loggingIn() && !Meteor.userId()){
      return <Redirect to="/" />;
    } 

      const to_id = this.props.match.params.id;
       
      if(this.state.update==false && to_id != Meteor.userId()){

        //on cherche le username, l'age et on met tous les message en 'read'
        Meteor.apply('updateContact', [{
          to_id,
          }], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
            let now = new Date();
            let diff = now - response.profile.naissance;
            let age = Math.round(diff / 31536000000);
            
            {response ?
             this.setState({naissance: age})
            
             :
             ''}

             {response ?
             this.setState({update: true})
             
             :
             ''}
             
             {response ?
             this.setState({username: response.username}) 
             
             :
             ''}

              {response ?
             this.setState({gender: response.profile.gender}) 
             
             :
             ''}

            },
        });
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

              <div ref={el => { this.el = el; }} ></div>
                  <MOBILEcontact to_id = {this.props.match.params.id}  />
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


export default MOBILEcontactChat =  withTracker(({ }) => {
  
  return {
    
  };
})(MOBILEcontactChat);