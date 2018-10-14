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
  	 this.setState({
      logout: true,
    });
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
				<List relaxed>
					 <Link to={'/Articles/' }>
					    <List.Item className="ListItem">
						    <List.Header>
                     		<div className="star">   
                          		<p className="colorIconblue"> </p>
                    		</div>
    				        <p className="menuIcon"> Les articles</p>
						    </List.Header>
					    </List.Item>
					</Link>

					<Divider />

					<Link to={'/TousSondage/' }>
					    <List.Item className="ListItem">
						    <List.Header>
                     		<div className="star">   
                          		<p className="colorIconVert"> </p>
                    		</div>
    				        <p className="menuIcon"> Sondages</p>
						    </List.Header>
					    </List.Item>
					</Link>

					<Divider />

				    <Link to={'/Favoris/' }>
					    <List.Item className="ListItem">
						    <List.Header>
                     		 <div className="star">   
                          		<p className="colorIconJaune"> </p>
                    		</div>
    				        <p className="menuIcon"> Favoris</p>
						    </List.Header>
					    </List.Item>
					</Link>

					<Divider />

					 <Link to={'/MesArticles/' }>
					    <List.Item className="ListItem">
						    <List.Header>
                     		 <div className="star">   
                        		  <p className="colorIconOrange"> </p>
                  			 </div>
    				        <p className="menuIcon"> Mes articles</p>
						    </List.Header>
					    </List.Item>
					</Link>

				    <Divider />

				    <Link to={'/MessagesPostes/' }>
					    <List.Item className="ListItem">
					    	<List.Content>
                   			 <div className="star">   
                         		 <p className="colorIconVert"> </p>
                   			 </div>
    				         <p className="menuIcon"> Messages postés</p>
					      </List.Content>
					    </List.Item>
				    </Link> 

				    <Divider />

				    <Link to={'/SuiviConseil/' }>
					    <List.Item className="ListItem">
					    	<List.Content>
                   			 <div className="star">   
                          		<p className="colorIconblue"> </p>
                    		</div>
    				         <p className="menuIcon"> Suivis des conseils</p>
					      </List.Content>
					    </List.Item>
				    </Link> 

				    <Divider />

				   {/* <Link to={'/RecommandationsDonner/' + Meteor.userId()}>
					    <List.Item className="ListItem">
					    	<List.Content>
                   			 <div className="star">   
                          		<p className="colorIconVert"><Gift /></p>
                   			 </div>
    				         <p className="menuIcon">  Recommandations données</p>
					      </List.Content>
					    </List.Item>
				    </Link> 

				    <Divider />*/}

				     <Link to={'/Recommandations/' + Meteor.userId() }>
					    <List.Item className="ListItem">
					    	<List.Content>
                   			 <div className="star">   
                          		<p className="colorIconRed"> </p>
                   			 </div>
    				         <p className="menuIcon">  Recommandations reçues</p>
					      </List.Content>
					    </List.Item>
				    </Link>

  					 <Divider />

  					 <Link to={'/ListeDons/' + Meteor.userId() }>
					    <List.Item className="ListItem">
					    	<List.Content>
                    		<div className="star">   
                        	  <p className="colorIconJaune"> </p>
                    		</div>
    				        <p className="menuIcon"> Dons</p>
					      </List.Content>
					    </List.Item>
				    </Link> 
				    
  					 <Divider />

  					  <Link to={'/Livre/'}>  
					    <List.Item className="ListItem">
					    	<List.Content>
					        	<div className="star">   
                         			 <p className="colorIconVert"> </p>
                   				 </div>
    			         		<p className="menuIcon">Livre</p>
					      </List.Content>
					    </List.Item>
				    </Link> 

				    <Divider />

				      <Link to={'/NouveauxConseillers/'}>  
					    <List.Item className="ListItem">
					    	<List.Content>
					        	<div className="star">   
                         			 <p className="colorIconblue"> </p>
                   				 </div>
    			         		<p className="menuIcon">Nouveaux conseillers</p>
					      </List.Content>
					    </List.Item>
				    </Link> 

				    <Divider />

				      <Link to={'/DerniereRecommandations/'}>  
					    <List.Item className="ListItem">
					    	<List.Content>
					        	<div className="star">   
                         			 <p className="colorIconJaune"> </p>
                   				 </div>
    			         		<p className="menuIcon">Dernières recommandations</p>
					      </List.Content>
					    </List.Item>
				    </Link> 


				    
  					 <Divider />
  					 <Divider />

				     <Link to={'/AmeliorerSite/'}> 
					    <List.Item className="ListItem">
					    	<List.Content>
					        	<p className="colorIconVert"> </p>
    				        	<p className="menuIcon"> Améliorer le site </p>
					      </List.Content>
					    </List.Item>
				    </Link> 

				    <Divider />

				    <Link to={'/SignalerBug/'}> 
					    <List.Item className="ListItem">
					    	<List.Content>
					        	<p className="colorIcon"> </p>
    				       		<p className="menuIcon"> Signaler un bug </p>
					      </List.Content>
					    </List.Item>
				    </Link>

				      <Divider />

				     
				    <Link to={'/ContactConnecte/'}>
					    <List.Item className="ListItem">
					    	<List.Content>
					        	<p className="colorIconBlack"> </p>
    				        	<p className="menuIcon"> Contact</p>
					      </List.Content>
					    </List.Item>
				    </Link>

				      <Divider />
				    
				    <Link to={'/NumerosUtiles/'}> 
					    <List.Item className="ListItem">
					    	<List.Content>
					        <p className="colorIconVert"> </p>
    				        <p className="menuIcon"> Numéros utiles</p>
					      </List.Content>
					    </List.Item>
				    </Link>

				      <Divider />
				      <Divider />

				    <Link to={'/NousRejoindre/'}>  
					    <List.Item className="ListItem">
					    	<List.Content>
					        	<div className="star">   
                         			 <p className="colorIconVert"> </p>
                   				 </div>
    			         		<p className="menuIcon">Nous rejoindre</p>
					      </List.Content>
					    </List.Item>
				    </Link> 

				    <Divider />

				    <Link to={'/SupprimerCompte/'}> 
					    <List.Item className="ListItem">
					    	<List.Content>
					        	<p className="colorIcon"> </p>
    				        	<p className="menuIcon"> Supprimer mon compte</p>
					      </List.Content>
					    </List.Item>
				    </Link>

				      <Divider />
				      <Divider />
				   
				   
					    <List.Item className="ListItem" onClick={this.logout.bind(this)}>
					    	<List.Content>
					        	<p className="colorIconBlack"> </p>
    			        		<p className="menuIcon"> Se déconnecter</p>
					      </List.Content>
					    </List.Item>
				   
				      <Divider />

				</List>
			 </div>

		);
  	}
}
