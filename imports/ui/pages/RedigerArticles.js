import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Message, Embed, Menu  } from 'semantic-ui-react'
import Img from 'react-image'
import { Route, Redirect } from 'react-router';

//Component
import HeaderPage from '../component/HeaderPage.js';
import HeaderMobile from '../component/HeaderMobile.js';
import FooterMobile from '../component/FooterMobile.js';
import MainContent from '../component/MainContent.js';
import ContentMenuMobile from '../component/ContentMenuMobile.js';
import LastRecommandations from '../component/LastRecommandations.js';
import LastConseillers from '../component/LastConseillers.js';
import FormPosterArticle from '../component/FormPosterArticle.js';

class RedigerArticles extends Component {

    constructor(props) {
        super(props);
        this.state = {
          visible: false,
          username:'',
          gender:'',
          nuit:false,
          ChargeNuit:true,
        }
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

    handleButtonClick = () => this.setState({ visible: !this.state.visible })
    handleSidebarHide = () => this.setState({ visible: false })


    render() {
    const { nuit } = this.state
    const { visible } = this.state 

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

                <div className="containerSite" >
                  <div className="containerIMG">
                    <div className="MainContent">
                      <Segment>
                        <Header>
                          <div className="titreRecomandation"> Rédiger un article </div>
                        </Header>
                      </Segment>
                      <Message
                        info
                        header='Conseils pour rédiger un article :'
                        list={[
                          'Rédige un article pour donner un conseil ou partager ton expérience',
                          'Tout le monde peut voir tes articles et les commenter',
                          "Pas de fautes d'orthographe",
                          "Ton article sera posté après validation par notre équipe",
                        ]}
                      />

                      <FormPosterArticle />
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

export default RedigerArticles =  withTracker(() => {
  
  return {
    
  };
})(RedigerArticles);
