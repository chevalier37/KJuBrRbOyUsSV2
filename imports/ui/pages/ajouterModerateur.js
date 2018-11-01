import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Menu } from 'semantic-ui-react'
import Img from 'react-image'
import { Route, Redirect } from 'react-router';


//Component
import HeaderPage from '../component/HeaderPage.js';
import FooterMobile from '../component/FooterMobile.js';
import FormAjouterModerateur from '../component/FormAjouterModerateur.js';
import ContentMenuMobile from '../component/ContentMenuMobile.js';

class ajouterModerateur extends Component {

    constructor(props) {
        super(props);
        this.state = {
          visible: false,
          username:'',
          gender:'',
        }
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })
    toggleHidden = () => this.setState({ visible: false })

    componentWillMount(){
      this.el.scrollIntoView();
      let id = this.props.match.params.id
      }


    render() {
   
    const { visible } = this.state  

    if (!Meteor.loggingIn() && !Meteor.userId()){
      return <Redirect to="/" />;
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
              <div className="">
                <div className="ButtonHeaderMobile">
                     <Img className="iconHeader" src="/menu.png" onClick={this.handleButtonClick} />
                </div>
                <div className="ButtonPseudoHeader">
                  Pseudo
                </div>
                <div className="ButtonHeaderRight">
                  <Link to="/PosterMessage" >
                     <Img className="iconHeader" src="/edit.svg"/>
                  </Link>
                </div>
              </div>
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
              <Segment>
                      <Header>
                        <div className="titreRecomandation"> Ajouter un modérateur </div>
                      </Header>
              </Segment>
              <FormAjouterModerateur />
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      
      </div>
    );
  }
}

export default ajouterModerateur =  withTracker(() => {
  

  return {
    
  };
})(ajouterModerateur);
