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
import LastRecommandations from '../component/LastRecommandations.js';
import LastConseillers from '../component/LastConseillers.js';

class Home extends Component {

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

     /* handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
          let plus = this.state.moreAutre + 5
        this.setState({moreAutre: plus});
        } 
      }

    componentDidMount() {
      window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }*/



    handleButtonClick = () => this.setState({ visible: !this.state.visible })
    handleSidebarHide = () => this.setState({ visible: false })

    VoirAutre() {
    let plus = this.state.moreAutre + 5
        this.setState({moreAutre: plus});
        
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

    render() {
    const { visible } = this.state
    const { moreAutre } = this.state
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
            
            <MainContent more={moreAutre} nuit={nuit} />
            <LastConseillers nuit={nuit}/>
           {/* <Button
              fluid
                  color="green"
                  onClick={this.VoirAutre.bind(this)}>
                  Voir plus test
            </Button>*/}

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
