import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form,  Message, Segment, Header} from 'semantic-ui-react'
import { check } from 'meteor/check';
import { Route, Redirect } from 'react-router';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-108632466-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class compteBloquer extends Component {

  componentDidMount() {
        this.scrollToTop();
    }

    componentDidUpdate() {
        this.scrollToTop();
    }

    scrollToTop() {
        this.el.scrollIntoView();
    }

   
  render() {
   
    return (
      <div className="container">
      <div ref={el => { this.el = el; }} ></div>
        <header>
        </header>

        <div className="containerSupIMG">
          <div className="containerIMG">
              <div className="CGU">
            
                  <h1>
                  Compte bloqué
                  </h1>
                  Ton compte a été bloqué.<br />
                  Merci de nous contacter pour plus de renseignements<br />
                  Email : association.kurbys@gmail.com 
              </div>
            </div> 
          </div>

                    
          <div className="containerFooter">    
          </div>
                  
      </div>
    );
  }
}


export default withTracker(() => {

  return {
    
   
  };
})(compteBloquer);
