import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Checkbox, Form,  Message, Confirm } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router';
import ReactGA from 'react-ga';
import Img from 'react-image'
ReactGA.initialize('UA-108632466-1');
ReactGA.pageview(window.location.pathname + window.location.search);

//Component
import HeaderPage from '../component/HeaderPage.js';
import ContactChat from '../component/ContactChat.js';
import ChatContent from '../component/ChatContent.js';
import FormChat from '../component/FormChat.js';

import { Chat } from '../../api/Chat.js';
import { BloquerChat } from '../../api/BloquerChat.js';


class chat extends Component {

    constructor(props) {
        super(props);
     
        this.state = {
          username:'',
          naissance:'',
          update:false,
          gender:'',
          bloquer:false,
          IsConseiller:false,
          MyConseiller:false,
          open:false,
          nuit:false,
        };
    }

    handleButtonClick = () => this.setState({ visible: !this.state.visible })
    handleSidebarHide = () => this.setState({ visible: false })

    handleConfirm = () =>{
      const to_id = this.props.match.params.id;
      //Notification.js
      Meteor.apply('obtenirRecommandation', [{
            to_id
            }], {
            onResultReceived: (error, response) => {
              if (error) console.warn(error.reason);
              },
        })
      let to_name = this.state.username;

      Meteor.call(//notification par mail
              'obtenirRecommandationMail',
              'Kurbys <kurbys@mail.kurbys.com>',
              'Laisse une recommandation à ',
              to_name,
              to_id
              ) 

      this.setState({ open: false })
    }

    handleCancel = () => this.setState({ open: false })

    componentWillMount(){
       const id = this.props.match.params.id;

        Meteor.apply('isContactBloquer', [{
            id
            }], {
            onResultReceived: (error, response) => {
              if (error) console.warn(error.reason);
              {response ?  
               this.setState({bloquer: true}) :
               this.setState({bloquer: false})}
              },
        })

         Meteor.apply('ModeNuit', [{}], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
            {response ?
             this.setState({nuit: response}) :
             ""}
          },
        });

         Meteor.apply('ReadAllChat', [{
        }], {
        onResultReceived: (error, response) => {
          if (error) console.warn(error.reason);
          /*{response ?
           this.setState({notifNonLu: response}) :
           ""}*/
        },
      });
    }

    renderAllChat() {
          let AllChat = this.props.allChat;
          let name = this.props.username;
          let nuit = this.state.nuit;
          return AllChat.map((message) => {
           let date = Date.parse(message.post_date);
            return (
              <ChatContent
                key={message._id}
                message={message}
                date={date}
                nuit={nuit}
                to_id = {this.props.match.params.id} 
              />
            );
          });
    }

    cloreDiscussion(){
      this.setState({open: true});
    }

    componentWillReceiveProps(){
         this.setState({update: false})
         let id = this.props.match.params.id
          Meteor.apply('isContactBloquer', [{
            id
            }], {
            onResultReceived: (error, response) => {
              if (error) console.warn(error.reason);
              {response ?  
               this.setState({bloquer: true}) :
               this.setState({bloquer: false})}
              },
        }),

        Meteor.apply(
            'IsConseiller',
            [{id}],
            {
              onResultReceived: (error, response) => {
                if (error) console.warn(error.reason);
                {
                response ?  
                 this.setState({IsConseiller:true}) :
                 this.setState({IsConseiller:false})}
           },
          })

        // Suis-je un conseiller ?
        Meteor.apply(
            'MyConseiller',
            [{}],
            {
              onResultReceived: (error, response) => {
                if (error) console.warn(error.reason);
                {
                response ?  
                 this.setState({MyConseiller:true}) :
                 this.setState({MyConseiller:false})}
           },
          })
    }

    bloquer(){
       const to_id = this.props.match.params.id
       this.setState({bloquer: !this.state.bloquer})
       
       if(this.state.bloquer == false){
       Meteor.call('bloquerChat',
          to_id,
          (err) => {
              if(err){
               } else {
                {}     
              }
            })
        }

        if(this.state.bloquer == true){
       Meteor.call('supprimerBloquer',
          to_id,
          (err) => {
              if(err){
               } else {
                {}     
              }
            })
        }

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
    const { nuit } = this.state
    
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
            if(response.profile.naissance){
              let userAge = response.profile.naissance;
              let diff = now - userAge;
              let age = Math.round(diff / 31536000000);
              
              {response ?
               this.setState({naissance: age})
              
               :
               ''}
            }

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
        </header>

        <div className="containerSiteChat" onClick={this.toggleHidden}>
          <div className="containerChat">
            <div className="containerContactChat"  >
              <ContactChat to_id = {this.props.match.params.id}  nuit={nuit}/>
            </div>
            <div className="containerDiscussion">
              <div className="MainContentChat">
                <div className={ nuit ? "headerChatNuit" : "headerChat"}>
                  <div className={"ChatUsername" + " " + this.state.gender}>
                      <Link to={'/VisiteProfil/' + this.props.match.params.id}>
                      {this.state.username}
                      </Link>
                  </div>
                  <div className={ this.state.naissance ? "ChatAge" : "none"}>  
                      {this.state.naissance} ans
                  </div>
                  <div className={!this.state.IsConseiller ? "none" : "recommmander"}>
                      <Link to={'/Recommander/' + this.props.match.params.id}
                       className={this.props.match.params.id == Meteor.userId() ? "none" : ""}
                       >    
                        <Button
                         basic
                         color='green'
                         size='tiny'
                         disabled={this.props.match.params.id == Meteor.userId() ? true : false}
                           > 
                           Recommander
                        </Button>
                      </Link>
                  </div>
                  <div className={this.state.MyConseiller ? "recommmander" : "none"}>
                        <Button
                         basic
                         color='purple'
                         size='tiny'
                         onClick={this.cloreDiscussion.bind(this)}
                           > 
                           Clore la discussion
                        </Button>
                        <Confirm
                        open={this.state.open}
                        content="Si tu estimes avoir terminé d'aider cet utilisateur, tu peux clore la discussion afin d'obtenir une recommandation de sa part."
                        onCancel={this.handleCancel}
                        onConfirm={this.handleConfirm}
                        cancelButton='Annuler'
                        confirmButton="Clore la discussion"
                      />

                  </div>
                  <div className={this.state.bloquer ? "bloquerRed" :"none"}>
                    Utilisateur bloqué !
                  </div>
                  <div className="FaireDon">
                        <Button 
                          basic
                          size='tiny'
                          color={this.state.bloquer ? 'green' : 'red'}
                          onClick={this.bloquer.bind(this)}
                          >
                          {this.state.bloquer ? "Débloquer" : "Bloquer"}
                        </Button>
                  </div>
                </div>
                <div className={ this.state.nuit ? "ContentDiscussionNuit" : "ContentDiscussion"}>
                   {this.renderAllChat()}
                  <FormChat to_id = {this.props.match.params.id} username={this.state.username} gender={this.state.gender} nuit={this.state.nuit}/>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
    );
  }
}


export default chat =  withTracker(({ match }) => {
  const to_id = match.params.id;
  const from_id = Meteor.userId();
  const Handle = Meteor.subscribe('Chat', to_id, from_id);
  const loading = !Handle.ready();
  const allreponses = Chat.find({$or : [{from_id: from_id, to_id:to_id}, {from_id: to_id, to_id:from_id}]}, { sort: { post_date: 1 }});
  const reponseExists = !loading && !!allreponses;
  let username = '';

  return {
    allChat: reponseExists ? allreponses.fetch() : [],
  };
})(chat);