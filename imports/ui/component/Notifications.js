import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Divider, Form, Checkbox } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router';


//Component
import HeaderPage from '../component/HeaderPage.js';

class Notifications extends Component {

    state = { visible: false }

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

                      <Form>
                        <Form.Field>
                          <Checkbox 
                          label='Je reçois un message privé'
                          checked={true}
                          toggle
                          />
                        </Form.Field>
                        <Form.Field>
                          <Checkbox
                           label='Je reçois un conseil'
                           toggle
                           />
                        </Form.Field>
                        <Form.Field>
                          <Checkbox
                           label='Je dois laisser une recommandation à un conseiller'
                           toggle
                           />
                        </Form.Field>
                        <Form.Field>
                          <Checkbox
                           label='Je reçois une recommandation'
                            toggle
                          />
                        </Form.Field>
                        <Form.Field>
                          <Checkbox
                           label='Mon message a été signalé'
                           toggle
                           />
                        </Form.Field>
                        <Form.Field>
                          <Checkbox
                           label='Quand on vote pour mes conseils (pouce vert)'
                           toggle
                           />
                        </Form.Field>
                        <Form.Field>
                          <Checkbox
                           label='Je peux devenir conseiller'
                           toggle
                          />
                        </Form.Field>

                        <Button color='green' type='submit'>Valider</Button>
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
