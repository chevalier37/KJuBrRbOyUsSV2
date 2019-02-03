import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Checkbox, Form,  Message, Label, Divider } from 'semantic-ui-react'
import Img from 'react-image'
import { Route, Redirect } from 'react-router';
import AdSense from 'react-adsense';
import ReactGA from 'react-ga';
import YouTube from 'react-youtube';

ReactGA.initialize('UA-108632466-1');
ReactGA.pageview(window.location.pathname + window.location.search);

//Component
import HeaderPage from '../component/HeaderPage.js';
import FooterMobile from '../component/FooterMobile.js';
import MainContent from '../component/MainContent.js';
import ContentMenuMobile from '../component/ContentMenuMobile.js';
import FormMessageLive from '../component/FormMessageLive.js';
import SingleMessagePost from '../component/SingleMessagePost.js';
import ListeMessageLive from '../component/ListeMessageLive.js';
import HeaderMobile from '../component/HeaderMobile.js';
import LastRecommandations from '../component/LastRecommandations.js';
import LastConseillers from '../component/LastConseillers.js';

import { Live } from '../../api/Live.js';

class LiveVideo extends Component {

    constructor(props) {
        super(props);
        this.state = {
          visible: false,
          visibleForm:false,
          nuit:false,
          IDvideo:"",
          IsModerateurVidéos:false,
          video:false,
        }
    }

    visible(){
      this.setState({
        visibleForm: !this.state.visibleForm,
      });
    }

    supprimerLive(){
      this.setState({IDvideo: ""});
      Meteor.apply('supprimerLive',
            [{}],
            {
             onResultReceived: (error, response) => {
                if (error) console.warn(error.reason);
                  },
          })
    }

    componentDidMount() {
        this.scrollToTop();
        Meteor.apply('ModeNuit', [{}], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
            {response ?
             this.setState({nuit: response}) :
             ""}
          },
        });

        const idMessage= this.props.match.params.id
         Meteor.apply('searchLive',
            [{}],
            {
             onResultReceived: (error, response) => {
                if (error) console.warn(error.reason);
                this.setState({
                  IDvideo: response,
                });
                this.setState({
                  video: true,
                });
                  },
          });

         Meteor.apply('IsModerateurVidéos', [{
          }], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
            
            {
            response ?
             this.setState({IsModerateurVidéos: response})
             :
             ""
            }

            },
       })
    }


    scrollToTop() {
        this.el.scrollIntoView();
    }

    handleButtonClick = () => this.setState({ visible: !this.state.visible })
    handleSidebarHide = () => this.setState({ visible: false })


    renderAllreponses() {
          let Allreponses = this.props.allreponses;
          let nuit = this.state.nuit;
          const message_id=this.props.match.params.id;
          return Allreponses.map((message) => {
           let date = Date.parse(message.submitted);
             
            return (
              <ListeMessageLive
                key={message._id}
                message={message}
                date={date}
                nuit={nuit}
                message_id={message_id}         
              />
            );
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

      Submit(event) {
        event.preventDefault();
        const idVideo = ReactDOM.findDOMNode(this.refs.idVideo).value.trim();
        const idMessage= this.props.match.params.id;
        Meteor.apply('addLive',
            [{idVideo}],
            {
             onResultReceived: (error, response) => {
                if (error) console.warn(error.reason);
                ReactDOM.findDOMNode(this.refs.idVideo).value = '';
                  },
          })
        this.setState({IDvideo: idVideo});
      }


    render() {
    const { visible } = this.state
    const { nuit } = this.state
    const opts = {
      height: '445',
      width: '728',
      }

    const opts1 = {
      height: '245',
      width: '350',
      }


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
            <div className="lumiere" onClick={this.nuit.bind(this)}>
                <Img className={!this.state.nuit ? "iconHeader" : "none" } src="/jour.png"/>
                <Img className={this.state.nuit ? "iconHeader" : "none" } src="/nuit.png"/>
            </div>
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
                    <div className="SingeMessagView">
                    
                        <Form
                        className={this.state.IsModerateurVidéos ? "visible" : "none"}
                         error
                         onSubmit={this.Submit.bind(this)
                         }>
                            <Form.Field>
                              <label>Ajouter un Live</label>
                              <input
                               ref="idVideo"
                               />
                            </Form.Field>
                           <Button type='submit' color="green" className="MobileSubmit">Valider</Button>
                        </Form>

                        <Button
                         color="red"
                         onClick={this.supprimerLive.bind(this)}
                         className="MobileSubmit">Supprimer Live
                         </Button>

                  <div className="centerpub ecran">
                    <div className="space" />
                    <div className="pubHome">
                            <AdSense.Google
                              client='ca-pub-6112176939320267'
                              slot='4083773640'
                               style={{display:'inline-block', width:728, height:90}}
                              format=''
                            />
                    </div>  
                    <div className="containeurVideos">
                          <div className={this.state.IDvideo ? "visible" : "none"}>
                              <YouTube
                                videoId={this.state.IDvideo}
                                opts={opts}
                              />
                          </div>
                    </div>              
                  </div>

                  <div className="centerpub400 mobile">
                    <div className="space" />
                    <div className="containeurVideos">
                          <div className={this.state.IDvideo ? "visible" : "none"}>
                              <YouTube
                                videoId={this.state.IDvideo}
                                opts={opts1}
                              />
                          </div>
                    </div>              
                  </div>

                </div>
                  <div className="visibleForm">
                     <FormMessageLive
                      id={this.props.match.params.id}
                      nuit={nuit}
                      />
                  </div>
                  <Divider />


                 

                  {/* PUB mobile*/}
                  {/*<div className="pubMobile mobile">
                    <div className="space" />
                    <div className="pubHome">
                            <AdSense.Google
                              client='ca-pub-6112176939320267'
                              slot='8072163696'
                               style={{display:'inline-block', width:320, height:50}}
                              format=''
                            />
                    </div>
                  </div>*/}
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

export default LiveVideo =  withTracker(({}) => {
  const Handle = Meteor.subscribe('AllMessagesLive');
  const loading = !Handle.ready();
  const allreponses = Live.find({'message':true}, { sort: {post_date: -1 } });
  const reponseExists = !loading && !!allreponses;

 
  return {
    allreponses: reponseExists ? allreponses.fetch() : [],
  };
})(LiveVideo);
