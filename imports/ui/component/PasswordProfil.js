import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Divider, Form, Message } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router';
import { Accounts } from 'meteor/accounts-base'

//Component
import HeaderPage from '../component/HeaderPage.js';

class PasswordProfil extends Component {

    constructor(props) {
    super(props);
    this.state = {
      erroroldPassword:false,
      oldPassword:false,
      password:false,
      connection:false,
      errorPassword:false,
      visible:false, 
      success:false,
 
    };   
  }

    Submit(event) {
      event.preventDefault();

      const oldPassword = ReactDOM.findDOMNode(this.refs.oldPassword).value.trim();
      const password = ReactDOM.findDOMNode(this.refs.password2).value.trim();


      //On verifie que l'ancien mot de passe n'est pas vide
      {!oldPassword ?
       this.setState({oldPassword: true,}) :
       this.setState({oldPassword: false,
      })}

       //Les password ne doivent pas être vide
      {
       password == '' ?
       this.setState({errorPassword: true,}) :
       ''
      }

      check(oldPassword, String);
      check(password, String);

      const errorPassword = this.state.errorPassword;
      const erroroldPassword = this.state.erroroldPassword;
      

      {
        errorPassword == false && erroroldPassword == false
        ?
         Accounts.changePassword(oldPassword, password,
          function(Error){
              if(Error){
                  console.log(Error)
              }
            }
        )

          : ""
      }

      if ( oldPassword !=='' && password !== '' && !this.state.errorPassword) {
        ReactDOM.findDOMNode(this.refs.oldPassword).value="";
        ReactDOM.findDOMNode(this.refs.password2).value="";
        this.setState({success: true})
      }
      
  }

    render() {
    const { visible } = this.state
    if (!Meteor.loggingIn() && !Meteor.userId()){
      return <Redirect to="/" />;
    }  

    return (
      
        <div className="MainContentProfil">
          <Header>
          Changer mon mot de passe
          </Header>
          <Divider />
          <div className="ListeMesMessages">
            <div className="register blanc">
                <div className="numero">
                   <Form error success onSubmit={this.Submit.bind(this)}>


                        <Form.Field required error={this.state.oldPassword}>
                          <input
                           ref="oldPassword"
                           type='password'
                           placeholder='Ancien mot de passe'
                           />
                         <Message
                          error={this.state.oldPassword}
                          hidden={!this.state.oldPassword}
                          header='Erreur mot de passe'
                          content="L'ancien mot de passe est obligatoire"
                         />
                        </Form.Field>

                        
                        <Form.Field required error={this.state.password}>
                          <input
                           ref="password2"
                           type='password'
                           placeholder='Nouveau mot de passe'
                          />
                         <Message
                          error={this.state.errorPassword}
                          hidden={!this.state.errorPassword}
                          header='Erreur mot de passe'
                          content="Mot de passe obligatoire"
                        />
                        </Form.Field>

                        <Message
                          hidden={!this.state.success}
                          success={this.state.success}
                          header='Confirmation'
                          content='Ton mot de passe a bien été changé'
                        />

                        <Button type='submit' color='green'>Valider</Button>

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
})(PasswordProfil);
