import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Divider} from 'semantic-ui-react'
import Img from 'react-image'
import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';

//Component
import HeaderPage from '../component/HeaderPage.js';
import ListeRecommandations from '../component/ListeRecommandations.js';

import { Recommandations } from '../../api/Recommandations.js';

class ContentRecommandationsVisite extends Component {

    constructor(props) {
        super(props);
        this.state = {
          visible: false,
          username:'',
          gender:'',
        }
    }

    componentWillMount(){
      let id = Meteor.userId()
      
      Meteor.apply('usernameRecommander', [{
              id,
              }], {
              onResultReceived: (error, response) => {
                if (error) console.warn(error.reason);
                                 
                {
                response ?
                this.setState({username: response.username}) 
                 :
                 ''
                }

                {
                response ?
                this.setState({gender: response.profile.gender}) 
                 :
                 ''}
                },
        })
    }

    renderAllreponses() {
          let Allreponses = this.props.allreponses;

          return Allreponses.map((message) => {
            let date = Date.parse(message.date);
             
            return (
              <ListeRecommandations
                key={message._id}
                message={message}
                date={date}         
              />
            );
          });
      }

    render() {
        const { visible } = this.state; 
        const nuit = this.props.nuit;  

        if (!Meteor.loggingIn() && !Meteor.userId()){
          return <Redirect to="/" />;
        }
        
        return (
          <div className="MainContentProfil">
           <Divider />
              <Header className={ nuit ? "TitreNuit" : "Titrerecommander"}>
                Ses recommandations
              </Header>
            <Divider />
              <div className="ListeMesMessages">
                {this.renderAllreponses()}
              </div>
          </div>
    );
  }
}

ContentRecommandationsVisite.propTypes = {
        allreponses: PropTypes.array.isRequired,
    };

export default ContentRecommandationsVisite =  withTracker(({id}) => {
  
  const Handle = Meteor.subscribe('Recommandations', id);
  const loading = !Handle.ready();
  const allreponses = Recommandations.find({'to_id':id}, { sort: {date: -1 } });
  const reponseExists = !loading && !!allreponses;

  return {
    allreponses: reponseExists ? allreponses.fetch() : [],
  };
})(ContentRecommandationsVisite);
