import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Divider, Form, Message } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router';
 
//Component
import HeaderPage from '../component/HeaderPage.js';

class PasswordProfil extends Component {

    constructor(props) {
    super(props);
    this.state = {
      errorLogin:false,
      errorPseudo:false,
      pseudo:false,
      mail:false,
      password:false,
      connection:false,
      errorPassword:false,
      visible:false, 
      success:false,
      username:"",    
    };   
  }

  componentWillMount(){
    let id = Meteor.userId();
    Meteor.apply('Username', [{
          id,
          }], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
            {response ?
             this.setState({username: response}) :
             ""}
          },
        });
  }

    Submit(event) {
      event.preventDefault();

      const pseudo = ReactDOM.findDOMNode(this.refs.pseudo).value.trim();
      const email = ReactDOM.findDOMNode(this.refs.email).value.trim();
      const password = ReactDOM.findDOMNode(this.refs.password2).value.trim();

      //On verifie que le pseudo n'est pas vide
      {!pseudo ?
       this.setState({pseudo: true,}) :
       this.setState({pseudo: false,
      })}

      //On verifie que le mail n'est pas vide
      {!email ?
       this.setState({mail: true,}) :
       this.setState({mail: false,
      })}

       //Les password ne doivent pas être vide
      {
       password == '' ?
       this.setState({errorPassword: true,}) :
       ''
      }

      check(pseudo, String);
      check(email, String);
      check(password, String);

     //on vérifie que le pseudo et le mail existe
      Meteor.apply('UserExiste', [{
          pseudo:pseudo,
          email:email,
          }], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
            {response ?
             this.setState({errorLogin: false, }) :
             this.setState({errorLogin: true, })}
          },
      });

      const errorLogin = this.state.errorLogin;
      const errorPassword = this.state.errorPassword;
      const errorPseudo = this.state.errorPseudo;
      

      {
        errorLogin == false && errorPassword == false && errorPseudo == false
        ?
        Meteor.apply('ResetPassword', [{
        pseudo:pseudo,
        password:password,
        }], {
        onResultReceived: (error, response) => {
          if (error) console.warn(error.reason);
          /*{response ?
          this.setState({errorLogin: false,})
           :
           this.setState({errorLogin: true,})}*/
          }
        }) : ""
      }

      if (pseudo == this.state.username && pseudo && email && password !== '') {
        ReactDOM.findDOMNode(this.refs.pseudo).value ="";
        ReactDOM.findDOMNode(this.refs.email).value="";
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

                        <Message
                          hidden={!this.state.errorLogin}
                          error={this.state.errorLogin}
                          header='Erreur'
                          content='Erreur identifiant'
                        />
                         <Message
                          hidden={!this.state.errorPseudo}
                          error={this.state.errorPseudo}
                          header='Erreur'
                          content='Erreur identifiant'
                        />
                        <Form.Field required error={this.state.pseudo}>
                          <input
                           ref="pseudo"
                           placeholder='Pseudo'
                           />
                          
                        <Message
                          hidden={!this.state.pseudo}
                          error={this.state.pseudo}
                          header='Erreur pseudo'
                          content="Le pseudo n'est pas le bon"
                        />
                        </Form.Field>


                        <Form.Field required error={this.state.mail}>
                          <input
                           ref="email"
                           type='email'
                           placeholder='Email'
                           />
                         <Message
                          error={this.state.mail}
                          hidden={!this.state.mail}
                          header='Erreur email'
                          content="L'adresse mail est obligatoire"
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
