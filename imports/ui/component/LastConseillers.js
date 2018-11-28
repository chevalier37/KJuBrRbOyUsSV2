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
import ListeLastConseiller from '../component/ListeLastConseiller.js';

import { Conseilleres } from '../../api/Conseilleres.js';

class LastConseillers extends Component {

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
              <ListeLastConseiller
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
          <div className="lastConseillers">
              <div className={ nuit ? "titreLastNuit" : "titreLast"}>
                Ils sont devenus conseillers
              </div>
              <div className="ListeMesMessages">
                {this.renderAllreponses()}
              </div>
          </div>
    );
  }
}

LastConseillers.propTypes = {
        allreponses: PropTypes.array.isRequired,
    };

export default LastConseillers =  withTracker(() => {
  
   const Handle = Meteor.subscribe('lastConseillers');
  const loading = !Handle.ready();
  const allreponses = Conseilleres.find({}, { sort: {date: -1 }, limit:5 });
  const reponseExists = !loading && !!allreponses;

  return {
    allreponses: reponseExists ? allreponses.fetch() : [],
  };
})(LastConseillers);
