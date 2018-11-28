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
import ListeLastRecommandations from '../component/ListeLastRecommandations.js';

import { Recommandations } from '../../api/Recommandations.js';

class LastRecommandations extends Component {

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
          let nuit = this.props.nuit;
          return Allreponses.map((message) => {
            let date = Date.parse(message.date);
             
            return (
              <ListeLastRecommandations
                key={message._id}
                message={message}
                date={date}
                nuit={nuit}             
              />
            );
          });
      }

    render() {
        const { visible } = this.state;
        let nuit = this.props.nuit;  

        if (!Meteor.loggingIn() && !Meteor.userId()){
          return <Redirect to="/" />;
        }
        
        return (
          <div className="lastReco">
              <div className={ nuit ? "titreLastNuit" : "titreLast"}>
                Dernières recommandations
              </div>
              <div className="ListeMesMessages">
                {this.renderAllreponses()}
              </div>
          </div>
    );
  }
}

LastRecommandations.propTypes = {
        allreponses: PropTypes.array.isRequired,
    };

export default LastRecommandations =  withTracker(() => {
  
  const id = Meteor.userId();
  const Handle = Meteor.subscribe('lastRecommandations');
  const loading = !Handle.ready();
  const allreponses = Recommandations.find({}, { sort: {date: -1 }, limit:5 });
  const reponseExists = !loading && !!allreponses;

  return {
    allreponses: reponseExists ? allreponses.fetch() : [],
  };
})(LastRecommandations);
