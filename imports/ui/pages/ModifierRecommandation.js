import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Menu} from 'semantic-ui-react'
import Img from 'react-image'
import { Route, Redirect } from 'react-router';
 
//Component
import HeaderPage from '../component/HeaderPage.js';
import FooterMobile from '../component/FooterMobile.js';
import HeaderMobile from '../component/HeaderMobile.js';
import ContentMenuMobile from '../component/ContentMenuMobile.js';
import ContentModifierRecommandations from '../component/ContentModifierRecommandations.js';

class ModifierRecommandation extends Component {

    state = { visible: false }

    handleButtonClick = () => this.setState({ visible: !this.state.visible })
    handleSidebarHide = () => this.setState({ visible: false })


    render() {
    const { visible } = this.state  
    if (!Meteor.loggingIn() && !Meteor.userId()){
      return <Redirect to="/" />;
    }
    
    return (
      <div className="container">
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
                <Img className="iconHeader" src="/menu.svg" onClick={this.handleButtonClick} />
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
                <ContentModifierRecommandations post_id={this.props.match.params.id} />  
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
})(ModifierRecommandation);
