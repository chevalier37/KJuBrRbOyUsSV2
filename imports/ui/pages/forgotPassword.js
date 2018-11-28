import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form,  Message, Segment, Header} from 'semantic-ui-react'
import { check } from 'meteor/check';
import { Route, Redirect } from 'react-router';
import Img from 'react-image'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-108632466-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class forgotPassword extends Component {
static contextTypes = {
    router: () => '', 
  }
    constructor(props) {
    super(props);
    this.state = {
      errorLogin:false,
      pseudo:false,
      mail:false,
      password:false,
      connection:false,
      errorPassword:false,
      success:false,     
    };   
  }

  

  Submit(event) {
      event.preventDefault();

      this.setState({mail: false, })

      const email = ReactDOM.findDOMNode(this.refs.email).value.trim();

      //On verifie que le mail n'est pas vide
      {!email ?
       this.setState({mail: true,}) :
       this.setState({mail: false,
      })}

      check(email, String);

     //on vérifie que le pseudo et le mail existe
      Meteor.apply('UserExiste', [{
          email:email,
          }], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
            if(response == true){
              this.setState({errorLogin: false})
              
              var token = "";
              var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
              for (var i = 0; i < 10; i++)
              token += possible.charAt(Math.floor(Math.random() * possible.length));
                if(token){
                  this.setState({success: true})
                  ReactDOM.findDOMNode(this.refs.email).value="";
                  Meteor.call(
                    'PasswordProvisoire',
                    email,
                    'Kurbys <kurbys@mail.kurbys.com>',
                    'Mot de passe provisoire ',
                    token,
                  )
                  Meteor.apply(
                  'ResetPassword',
                    [{email, token}],
                      {
                      onResultReceived: (error, response) => {
                        if (error) console.warn(error.reason);
                      },
                    })
                  }
            }else{
               this.setState({errorLogin: true })
            }         
          },
      });    
  }

  render() {

    const connection = this.state.connection;
  
    if (connection) {
      return <Redirect to="/home" />;
    }

    return (
      <div className="container">
        <header>
          <div className="containerSupHeader">
            
              <div className="retour mobile" onClick={this.context.router.history.goBack}>
                <Img className="arrow" src="/arrow.svg"/> 
              </div>

           
            <div className="HeaderForget ecran">
              Kurbys
            </div>
          </div>
        </header>

        <div className="containerSupIMG">
          <div className="containerIMG">
              <div className="ResetPassword">
                <Segment>
                <Header>
                Mot de passe oublié
                </Header>
                Recevoir un mot de passe provisoire : <p></p>

                    <Form error success onSubmit={this.Submit.bind(this)}>

                        <Form.Field required error={this.state.errorLogin}>
                          <input
                           ref="email"
                           type='email'
                           placeholder='Email'
                           />
                         <Message
                          error={this.state.errorLogin}
                          hidden={!this.state.errorLogin}
                          header='Erreur email'
                          content="L'adresse mail n'existe pas"
                         />
                        </Form.Field>

                        <Message
                          hidden={!this.state.success}
                          success={this.state.success}
                          header='Confirmation'
                          content='Tu as reçu un email avec un mot de passe provisoire pour te connecter'
                        />

                        <Button type='submit' color='green'>Valider</Button>

                    </Form>
                  </Segment>
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
})(forgotPassword);
