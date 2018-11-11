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
import ListeRecommandationsDonner from '../component/ListeRecommandationsDonner.js';

import { Recommandations } from '../../api/Recommandations.js';

class RecommandationsDonné extends Component {

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
                 ''
                }
              },
        })
    }

    renderAllreponses() {
          let Allreponses = this.props.allreponses;
          let nuit = this.props.nuit;
          return Allreponses.map((message) => {
           let date = Date.parse(message.date);
             
            return (
              <ListeRecommandationsDonner
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
        <div className="MainContentProfil">
            <div className={ nuit ? "headerNuit" : "headerJour"}>
              Mes recommandations données
            </div>
            <Divider />
            <div className="ListeMesMessages">
              {this.renderAllreponses()}
            </div>
        </div>
      );
  }
}

RecommandationsDonné.propTypes = {
        allreponses: PropTypes.array.isRequired,
    };

export default RecommandationsDonné =  withTracker(() => {
  
  const id = Meteor.userId();
  const Handle = Meteor.subscribe('RecommandationsDonnées', id);
  const loading = !Handle.ready();
  const allreponses = Recommandations.find({'from_id':id}, { sort: {date: -1 } });
  const reponseExists = !loading && !!allreponses;

  return {
    allreponses: reponseExists ? allreponses.fetch() : [],
  };
})(RecommandationsDonné);
