import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Img from 'react-image'
import { Dropdown, Menu, Button, Sidebar, Header, Form, Input, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

class FooterMobile extends Component {

	state = { visible: false, notifNonLu:"0", }

	componentWillMount(){
		Meteor.apply('notifNonLu', [{
	          }], {
	          onResultReceived: (error, response) => {
	            if (error) console.warn(error.reason);
	            {response ?
	             this.setState({notifNonLu: response}) :
	             ""}
	          },
	      	});
	}

  	handleButtonClick = () => this.setState({ visible: !this.state.visible })
  	handleSidebarHide = () => this.setState({ visible: false })

  	render() {
  		const { visible } = this.state
  		const { notifNonLu } = this.state

	return (
		<div className="headerTitre">
				<div className="">
					<div className="ButtonFooterMobile">
						<Link to="/home" >
							 <Img className="iconHeader" src="/homeMobile.svg"/>
						</Link>
					</div>

					<div className="ButtonFooterMobile">
						<Link to={'/profil/' + Meteor.userId()}>
							 <Img className="iconHeader" src="/userMobile.svg"/>
						</Link>
					</div>

					<div className="ButtonFooterMobile">
						<Link to={'/MOBILEcontactChat/' + Meteor.userId() }>
							 <Img className="iconHeader" src="/chatMobile.svg"/>
						</Link>
					</div>

					<div className="ButtonFooterMobile">
						<Link to="/Notifications" >
							 <Img className="iconHeader" src="/bellMobile.svg"/>
						</Link>
						<div className={this.state.notifNonLu > 0 ? "totalNotifMobile" : "none"}>
						    {notifNonLu}
						</div>
					</div>
				</div>
		</div>
	);
  }
}

export default FooterMobile =  withTracker(() => {

  return {

  };
})(FooterMobile);
