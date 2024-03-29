import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Checkbox, Form,  Message, Confirm } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-108632466-1');
ReactGA.pageview(window.location.pathname + window.location.search);

//Component
import FooterMobile from '../component/FooterMobile.js';
import ChatContent from '../component/ChatContent.js';
import FormChat from '../component/FormChat.js';

import { Chat } from '../../api/Chat.js';
import { BloquerChat } from '../../api/BloquerChat.js';


class MOBILEChat extends Component {

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
          mail:"",
          redirect:false,
          visible:'',
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
      let mail = this.state.mail;
      Meteor.call(//notification par mail
              'obtenirRecommandationMail',
              mail,
              'Kurbys <kurbys@mail.kurbys.com>',
              'Laisse une recommandation à ',
              to_name,
              ) 

      this.setState({ open: false })
      this.setState({ redirect: true })
    }

    handleCancel = () => this.setState({ open: false })

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

    componentWillMount(){
       const id = this.props.match.params.id;
       const to_id = this.props.match.params.id;

       Meteor.call(
        'addContactChat',
        to_id,
        (err) => {
                if(err){
                 } else {     
                }
       })

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
                to_id = {this.props.match.params.id} 
                nuit={nuit}
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
      
    render() {
    
    const { visible } = this.state;
    const { redirect } = this.state;
    const { nuit } = this.state;

    if (!Meteor.loggingIn() && !Meteor.userId()){
      return <Redirect to="/" />;
    } 
    if (redirect){
      return <Redirect to={"/MOBILEcontactChat/" + Meteor.userId()} />;
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
              let age = Math.floor(diff / 31536000000);
              
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

              {response ?
             this.setState({mail: response.profile.mail}) 
             
             :
             ''}

            },
        });
      }

    return (
      <div className="container">
      <div ref={el => { this.el = el; }} ></div>
        <div className="containerSiteChat" onClick={this.toggleHidden}>
          <div className="containerChat">
            <div className="containerDiscussion">
              <div className="MainContentChat">
                 <div className={ nuit ? "headerChatNuit" : "headerChat"}>
                  <div className={"ChatUsername" + " " + this.state.gender}>
                      <Link to={'/VisiteProfil/' + this.props.match.params.id}>
                      {this.state.username}
                      </Link>
                  </div>
                  <div className="ChatAge">  
                      {this.state.naissance} ans
                  </div>
                  <div>
                      <div className={!this.state.IsConseiller ? "none" : "recommmander"}>
                          <Link to={'/MOBILERecommander/' + this.props.match.params.id}>    
                            <Button
                             basic
                             color='green'
                             size='tiny'
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
                      <div className={this.state.bloquer ? "bloquerRed" :"none"}>
                        Utilisateur bloqué !
                      </div>
                  </div>
                </div>
                <div className={ this.state.nuit ? "ContentDiscussionNuit" : "ContentDiscussion"}>
                   {this.renderAllChat()}
                  <FormChat to_id = {this.props.match.params.id} username={this.state.username} gender={this.state.gender} nuit={nuit}/>
                </div>
              </div>
            </div>
          </div> 
        </div>
        <div className="FooterMobile mobile">
              <FooterMobile />
        </div>
      </div>
    );
  }
}


export default MOBILEChat =  withTracker(({ match }) => {
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
})(MOBILEChat);