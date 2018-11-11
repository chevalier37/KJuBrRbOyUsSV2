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
      const { visible } = this.state;
      let nuit = this.props.nuit;
      
      if (!Meteor.loggingIn() && !Meteor.userId()){
        return <Redirect to="/" />;
      }  

      return (
          <div className="MainContentProfil">
             <div className="ecran">
               <div className={ nuit ? "headerNuit" : "headerJour"}>
                Notifications
               </div>
                <Divider />
            </div>
            <div className="ListeMesMessages">
              <div className="register blanc">
                  <div className="moderateur">
                      <div className="ecran"><strong>Activer les notifications par mail quand :</strong></div>
                      <div className="mobile"><strong>Activer les notifications quand :<br /></strong></div><br />
                      <Form onSubmit={this.Submit.bind(this)} success>
                        <Form.Field>
                          <Checkbox 
                          label='Je reçois un message privé'
                          checked={this.state.MessagePrive}
                          toggle
                          onClick={this.MessagePrive.bind(this)} 
                          /> <div className={ nuit ? "checkNuit" : "none"}>Je reçois un message privé</div>
                        </Form.Field>
                        <Form.Field>
                          <Checkbox
                           label={ nuit ? '' : "Je reçois un conseil"}
                           toggle
                           onClick={this.RecoitConseil.bind(this)}
                           checked={this.state.RecoitConseil} 
                           /><div className={ nuit ? "checkNuit" : "none"}>Je reçois un conseil</div>
                        </Form.Field>
                        <Form.Field>
                          <Checkbox
                           label={ nuit ? '' : 'Je dois laisser une recommandation à un conseiller'}
                           toggle
                           onClick={this.LaisserRecommandation.bind(this)}
                           checked={this.state.LaisserRecommandation} 
                           /><div className={ nuit ? "checkNuit" : "none"}>Je dois laisser une recommandation à un conseiller</div>
                        </Form.Field>
                        <Form.Field>
                          <Checkbox
                            label={ nuit ? '' : 'Je reçois une recommandation'}
                            toggle
                            onClick={this.recommandation.bind(this)}
                            checked={this.state.recommandation} 
                          /><div className={ nuit ? "checkNuit" : "none"}>Je reçois une recommandation</div>
                        </Form.Field>
                        <Form.Field>
                          <Checkbox
                           label={ nuit ? '' : 'Mon message a été signalé'}
                           toggle
                           onClick={this.messageSignalé.bind(this)}
                           checked={this.state.messageSignalé} 
                           /><div className={ nuit ? "checkNuit" : "none"}>Mon message a été signalé</div>
                        </Form.Field>
                        <Form.Field>
                          <Checkbox
                           label={ nuit ? '' : 'Quand on vote pour mes conseils (pouce vert)'}
                           toggle
                           onClick={this.voteUp.bind(this)}
                           checked={this.state.voteUp} 
                           /><div className={ nuit ? "checkNuit" : "none"}>Quand on vote pour mes conseils (pouce vert)</div>
                        </Form.Field>
                        <Form.Field>
                          <Checkbox
                           label={ nuit ? '' : 'Je peux devenir conseiller'}
                           toggle
                           onClick={this.conseiller.bind(this)}
                           checked={this.state.conseiller} 
                          /><div className={ nuit ? "checkNuit" : "none"}>Je peux devenir conseiller</div>
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
