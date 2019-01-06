import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Menu } from 'semantic-ui-react'
import Img from 'react-image'
import { Route, Redirect } from 'react-router';
import { EditorState, convertFromRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

//Component
import HeaderPage from '../component/HeaderPage.js';
import HeaderMobile from '../component/HeaderMobile.js';
import FooterMobile from '../component/FooterMobile.js';
import LastRecommandations from '../component/LastRecommandations.js';
import LastConseillers from '../component/LastConseillers.js';
import ListeArticlesModeration from '../component/ListeArticlesModeration.js';
import ContentMenuMobile from '../component/ContentMenuMobile.js';

import { Articles } from '../../api/Articles.js';

class ArticlesModeration extends Component {

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


    renderAllreponses() {
          let Allreponses = this.props.allreponses;

          return Allreponses.map((message) => {
           let date = Date.parse(message.post_date);
           const rawContent = message.post_content;  
           const contentState = convertFromRaw(JSON.parse(rawContent));
           const editorState = EditorState.createWithContent(contentState);

            return (
              <ListeArticlesModeration
                key={message._id}
                message={message}
                //content={rawContent}
                content={editorState}
                date={date}         
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
                  <Segment>
                  <Header>
                    <div className="titreRecomandation"> Modération des articles </div>
                      
                  </Header>
                  </Segment>
                  
                   {this.renderAllreponses()}

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

export default ArticlesModeration =  withTracker(() => {
  const id = Meteor.userId();
  const Handle = Meteor.subscribe('AllArticles');
  const loading = !Handle.ready();
  const allreponses = Articles.find({valider:false, refuse:false});
  const reponseExists = !loading && !!allreponses;

  return {
    allreponses: reponseExists ? allreponses.fetch() : [],
  };
})(ArticlesModeration);
