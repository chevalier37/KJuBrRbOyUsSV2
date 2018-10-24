import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Divider, Form, Checkbox, Message } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router';


//Component
import HeaderPage from '../component/HeaderPage.js';

class Notifications extends Component {

    constructor(props) {
    super(props);
    this.state = {
      visible:false,
      MessagePrive: true,
      RecoitConseil: true,
      LaisserRecommandation: true,
      recommandation: true,
      messageSignalé: true,
      voteUp: true,
      conseiller: true,
      valider:false,
    };   
  }

   componentWillMount(){
      Meteor.apply('SearchchoixNotif', [{
            }], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
             {response ?
             this.setState({
              MessagePrive: response.MessagePrive,
              RecoitConseil: response.RecoitConseil,
              LaisserRecommandation: response.LaisserRecommandation,
              recommandation: response.recommandation,
              messageSignalé: response.messageSignalé,
              voteUp: response.voteUp,
              conseiller: response.conseiller,
            }) 
             :
             ''}
            },
      })


   }

    MessagePrive() {
    this.setState({
      MessagePrive: !this.state.MessagePrive,
    });
    }

    RecoitConseil() {
    this.setState({
      RecoitConseil: !this.state.RecoitConseil,
    });
    }

    LaisserRecommandation() {
    this.setState({
      LaisserRecommandation: !this.state.LaisserRecommandation,
    });
    }

    recommandation() {
    this.setState({
      recommandation: !this.state.recommandation,
    });
    }

    messageSignalé() {
    this.setState({
      messageSignalé: !this.state.messageSignalé,
    });
    }

    voteUp() {
    this.setState({
      voteUp: !this.state.voteUp,
    });
    }

    conseiller() {
    this.setState({
      conseiller: !this.state.conseiller,
    });
    }


    Submit(event) {
      event.preventDefault();

      let MessagePrive = this.state.MessagePrive;
      let RecoitConseil = this.state.RecoitConseil;
      let LaisserRecommandation = this.state.LaisserRecommandation;
      let recommandation = this.state.recommandation;
      let messageSignalé = this.state.messageSignalé;
      let voteUp = this.state.voteUp;
      let conseiller = this.state.conseiller;

      {!MessagePrive ? MessagePrive= false :""}
      {!RecoitConseil ? RecoitConseil= false :""}
      {!LaisserRecommandation ? LaisserRecommandation= false :""}
      {!recommandation ? recommandation= false :""}
      {!messageSignalé ? messageSignalé= false :""}
      {!voteUp ? voteUp= false :""}
      {!conseiller ? conseiller= false :""}

      Meteor.apply('choixNotif', [{
          MessagePrive,
          RecoitConseil,
          LaisserRecommandation,
          recommandation,
          messageSignalé,
          voteUp,
          conseiller
          }], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
          },
      });

    this.setState({
      valider: true,
    });

    }

    render() {
      const { visible } = this.state
      
      if (!Meteor.loggingIn() && !Meteor.userId()){
        return <Redirect to="/" />;
      }  

      return (
          <div className="MainContentProfil">
            <Header>
            Notifications
            </Header>
            <Divider />
            <div className="ListeMesMessages">
              <div className="register blanc">
                  <div className="moderateur">
                      <strong>Activer les notifications par mail quand :</strong><br /><br />

                      <Form onSubmit={this.Submit.bind(this)} success>
                        <Form.Field>
                          <Checkbox 
                          label='Je reçois un message privé'
                          checked={this.state.MessagePrive}
                          toggle
                          onClick={this.MessagePrive.bind(this)} 
                          />
                        </Form.Field>
                        <Form.Field>
                          <Checkbox
                           label='Je reçois un conseil'
                           toggle
                           onClick={this.RecoitConseil.bind(this)}
                           checked={this.state.RecoitConseil} 
                           />
                        </Form.Field>
                        <Form.Field>
                          <Checkbox
                           label='Je dois laisser une recommandation à un conseiller'
                           toggle
                           onClick={this.LaisserRecommandation.bind(this)}
                           checked={this.state.LaisserRecommandation} 
                           />
                        </Form.Field>
                        <Form.Field>
                          <Checkbox
                            label='Je reçois une recommandation'
                            toggle
                            onClick={this.recommandation.bind(this)}
                            checked={this.state.recommandation} 
                          />
                        </Form.Field>
                        <Form.Field>
                          <Checkbox
                           label='Mon message a été signalé'
                           toggle
                           onClick={this.messageSignalé.bind(this)}
                           checked={this.state.messageSignalé} 
                           />
                        </Form.Field>
                        <Form.Field>
                          <Checkbox
                           label='Quand on vote pour mes conseils (pouce vert)'
                           toggle
                           onClick={this.voteUp.bind(this)}
                           checked={this.state.voteUp} 
                           />
                        </Form.Field>
                        <Form.Field>
                          <Checkbox
                           label='Je peux devenir conseiller'
                           toggle
                           onClick={this.conseiller.bind(this)}
                           checked={this.state.conseiller} 
                          />
                        </Form.Field>

                        <Button color='green' type='submit'>Valider</Button>
                        <Message
                          success={this.state.valider}
                          hidden={!this.state.valider}
                          content="Modifications enregistrées"
                        />
                      </Form>

                      </div>
                  </div>
            </div>
          </div>
       );
  }
}

export default withTracker(() => {
  return {
  };
})(Notifications);
