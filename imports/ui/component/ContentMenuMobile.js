import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Dropdown, Menu, Icon, Header, List, Button, Checkbox, Form, Select, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { Route, Redirect } from 'react-router';
import Img from 'react-image'

export default class ContentMenuRight extends Component {

  	constructor(props) {
	    super(props);
	    this.state = {
		    body: '',
		    logout:false,
		    username:'d',
		    chat:'',
		    activeItem: 'account',
		    logout:false,
		    nuit:false,
        profil:false,
	    };
  	}

    logout(){
	  	this.setState({logout: true});
	  	Meteor.logout()
  	}

  	componentDidMount() {
        this.scrollToTop();
        this.el.scrollIntoView();
        Meteor.apply('ModeNuit', [{}], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
            {response ?
             this.setState({nuit: response}) :
             ""}
          },
        });
    }

     scrollToTop() {
        this.el.scrollIntoView();
    }

  	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  	nuit() {
       this.setState({
        nuit: !this.state.nuit,
      });
      let nuit = !this.state.nuit;
      Meteor.apply(
        'nuit',
        [{nuit}],
        {
          onResultReceived: (error, response) => {
             if (error) console.warn(error.reason);
             
        },
      }); 

      this.setState({
                profil: true,
              });   
    }
  
  	render() {
  	const { activeItem } = this.state;
		const logout = this.state.logout;
		const { nuit } = this.state;
    const { profil } = this.state
      
  		
		if (logout) {
    	return <Redirect to="/" />;
  	}

    if (profil) {
      return <Redirect to={'/profil/' + Meteor.userId()} />;
    }

		return (
			<div className="ListeSideBar">
			 <div ref={el => { this.el = el; }} ></div>
          <Link to={'/Articles/' + Meteor.userId()}>
              <div className="ListItem">
                        <div className="star">   
                              <Img className="colorIconblue" src="/articleMobile.png"/>
                        </div>
                    <p className="menuIcon"> Articles</p>
              </div>
          </Link>
          <Divider />
          <Link to={'/profil/' + Meteor.userId()}>
              <div className="ListItem">
                        <div className="star">   
                              <Img className="colorIconblue" src="/man-user.png"/>
                        </div>
                    <p className="menuIcon"> Profil</p>
              </div>
          </Link>
          <Divider />
					<Link to={'/DevenirConseiller/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<Img className="colorIconblue" src="/support.png"/>
                    		</div>
    				        <p className="menuIcon"> Devenir conseiller</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/MOBILEmessagePoste/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<Img className="colorIconblue" src="/mail.png"/>
                    		</div>
    				        <p className="menuIcon"> Messages postés</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/MOBILEmesConseils/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<Img className="colorIconblue" src="/sent.png"/>
                    		</div>
    				        <p className="menuIcon"> Mes conseils</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/MOBILErecommandationsRecus/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<Img className="colorIconblue" src="/mail2.png"/>
                    		</div>
    				        <p className="menuIcon"> Recommandations reçues</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/MOBILErecommandationsDonne/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<Img className="colorIconblue" src="/file.png"/>
                    		</div>
    				        <p className="menuIcon"> Recommandations données</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/MOBILEnotifications/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<Img className="colorIconblue" src="/notification.png"/>
                    		</div>
    				        <p className="menuIcon"> Notifications</p>
					    </div>
					</Link>
					{/*<Divider />
					<Link to={'/MOBILEmoderateur/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<Img className="colorIconblue" src="/policeman.png"/>
                    		</div>
    				        <p className="menuIcon"> Devenir modérateur</p>
					    </div>
					</Link>*/}
					<Divider />
					<Link to={'/MOBILEnumerosUtiles/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<Img className="colorIconblue" src="/phone.png"/>
                    		</div>
    				        <p className="menuIcon"> Numéros utiles</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/MOBILEsignalerBug/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<Img className="colorIconblue" src="/danger.png"/>
                    		</div>
    				        <p className="menuIcon"> Signaler bug</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/MOBILEpassword/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<Img className="colorIconblue" src="/lock.png"/>
                    		</div>
    				        <p className="menuIcon"> Mot de passe</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/MOBILEcommandements/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<Img className="colorIconblue" src="/bible.png"/>
                    		</div>
    				        <p className="menuIcon"> 5 Commandements</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/MOBILEcgu/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<Img className="colorIconblue" src="/icon.png"/>
                    		</div>
    				        <p className="menuIcon"> C.G.U</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/MOBILEcontact/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<Img className="colorIconblue" src="/card.png"/>
                    		</div>
    				        <p className="menuIcon"> Nous contacter</p>
					    </div>
					</Link>
					<Divider />
					    <div className="ListItem" onClick={this.nuit.bind(this)}>
                     		<div className="star">   
                          		<Img className="colorIconblue" src="/jour.png"/>
                    		</div>
    				        <p className="menuIcon"> 
    				        {!this.state.nuit ? "Mode jour" : "Mode nuit"}
    				        </p>
					    </div>
					<Divider />
					<Link to={'/MOBILEsupprimer/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<Img className="colorIconblue" src="/delete.png"/>
                    		</div>
    				        <p className="menuIcon"> Supprimer compte</p>
					    </div>
					</Link>
					<Divider />
					    <div className="ListItem" onClick={this.logout.bind(this)}>
                     		<div className="star">   
                          		<Img className="colorIconblue" src="/logout.png"/>
                    		</div>
    				        <p className="menuIcon"> Déconnexion</p>
					    </div>
					<Divider />

					

				
			</div>

		);
  	}
}
