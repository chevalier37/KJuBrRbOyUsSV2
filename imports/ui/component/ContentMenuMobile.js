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
		    activeItem: 'account'
	    };
  	}

    logout(){
	  	this.setState({logout: true});
	  	Meteor.logout()
  	}

  	handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  	render() {
  		const { activeItem } = this.state
		const logout = this.state.logout;
  		
  		if (logout) {
      	return <Redirect to="/" />;
    	}

		return (
			<div className="ListeSideBar">
					<Link to={'/Articles/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<Img className="colorIconblue" src="/bell.svg"/>
                    		</div>
    				        <p className="menuIcon"> Devenir conseiller</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/Articles/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<p className="colorIconblue"> </p>
                    		</div>
    				        <p className="menuIcon"> Messages postés</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/Articles/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<p className="colorIconblue"> </p>
                    		</div>
    				        <p className="menuIcon"> Mes conseils</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/Articles/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<p className="colorIconblue"> </p>
                    		</div>
    				        <p className="menuIcon"> Recommandations reçues</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/Articles/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<p className="colorIconblue"> </p>
                    		</div>
    				        <p className="menuIcon"> Recommandations données</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/Articles/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<p className="colorIconblue"> </p>
                    		</div>
    				        <p className="menuIcon"> Notifications</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/Articles/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<p className="colorIconblue"> </p>
                    		</div>
    				        <p className="menuIcon"> Devenir modérateur</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/Articles/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<p className="colorIconblue"> </p>
                    		</div>
    				        <p className="menuIcon"> Numéros utiles</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/Articles/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<p className="colorIconblue"> </p>
                    		</div>
    				        <p className="menuIcon"> Signaler bug</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/Articles/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<p className="colorIconblue"> </p>
                    		</div>
    				        <p className="menuIcon"> Mot de passe</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/Articles/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<p className="colorIconblue"> </p>
                    		</div>
    				        <p className="menuIcon"> Le secret de Cendrillon</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/Articles/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<p className="colorIconblue"> </p>
                    		</div>
    				        <p className="menuIcon"> 5 Commandements</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/Articles/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<p className="colorIconblue"> </p>
                    		</div>
    				        <p className="menuIcon"> C.G.U</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/Articles/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<p className="colorIconblue"> </p>
                    		</div>
    				        <p className="menuIcon"> Nous contacter</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/Articles/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<p className="colorIconblue"> </p>
                    		</div>
    				        <p className="menuIcon"> Supprimer compte</p>
					    </div>
					</Link>
					<Divider />
					<Link to={'/Articles/' }>
					    <div className="ListItem">
                     		<div className="star">   
                          		<p className="colorIconblue"> </p>
                    		</div>
    				        <p className="menuIcon"> Déconnexion</p>
					    </div>
					</Link>
					<Divider />

					

				
			</div>

		);
  	}
}
