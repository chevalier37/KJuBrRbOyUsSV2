import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Checkbox, Form,  Message, Label, Divider } from 'semantic-ui-react'
import Img from 'react-image'
import { Route, Redirect } from 'react-router';
import { Articles } from '../../api/Articles.js';
import { CommentArticle } from '../../api/CommentArticle.js';

//Component
import FormPosterReponseArticle from '../component/FormPosterReponseArticle.js';
import SingleArticlePost from '../component/SingleArticlePost.js';
import ListeCommentArticle from '../component/ListeCommentArticle.js';
import HeaderPage from '../component/HeaderPage.js';
import HeaderMobile from '../component/HeaderMobile.js';
import FooterMobile from '../component/FooterMobile.js';
import ContentMenuMobile from '../component/ContentMenuMobile.js';
import LastRecommandations from '../component/LastRecommandations.js';
import LastConseillers from '../component/LastConseillers.js';


class SingleArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
          visible: false,
          visibleForm:false,
          nuit:false,
          ChargeNuit:true,
        }
    }

    visible(){
      this.setState({
        visibleForm: !this.state.visibleForm,
      });
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

    componentWillMount(){
      Meteor.call('addVisite',
      this.props.match.params.id);
    }

    handleButtonClick = () => this.setState({ visible: !this.state.visible })
    handleSidebarHide = () => this.setState({ visible: false })

    renderAllMessages() {
      let AllMessages = this.props.message;

      return AllMessages.map((message) => {
       let date = Date.parse(message.post_date);
       const rawContent = message.post_content;  
         
        return (
          <SingleArticlePost
            key={message._id}
            message={message}
            date={date}
            id={this.props.match.params.id}
            content={rawContent}        
          />
        );
      });
  }

  renderAllcomment() {
      let Allreponses = this.props.allreponses;

      return Allreponses.map((message) => {
       let date = Date.parse(message.submitted);
         
        return (
          <ListeCommentArticle
            key={message._id}
            message={message}
            date={date}         
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
                    <div >
                     {this.renderAllMessages()}
                    </div>
                    <div className="visibleForm">
                       <FormPosterReponseArticle
                        id={this.props.match.params.id}
                        authorId={this.props.authorId}
                        titreMessage={this.props.titreMessage}
                        />
                  </div>
                   <Divider />
                   {this.renderAllcomment()}
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

export default SingleArticle =  withTracker(({ match }) => {
  const id = match.params.id;

  const Handle = Meteor.subscribe('reponsesSingleArticle',id );
  const loading = !Handle.ready();
  const allreponses = CommentArticle.find({postId:id}, { sort: {submitted: -1 } });
  const reponseExists = !loading && !!allreponses;

  const Handle1 = Meteor.subscribe('SingleArticle', id);
  const loading1 = !Handle1.ready();
  const allposts = Articles.find({_id:id});
  const postExists = !loading1 && !!allposts;

  return {
  allreponses: reponseExists ? allreponses.fetch() : [],
  authorId:postExists ? allposts.post_author_id : '',
  titreMessage:postExists ? allposts.post_title : '',
  message: postExists ? allposts.fetch() : [],

  };
})(SingleArticle);
