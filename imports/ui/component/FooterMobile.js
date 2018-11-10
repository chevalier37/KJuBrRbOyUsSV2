import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Img from 'react-image'
import { Dropdown, Menu, Button, Sidebar, Header, Form, Input, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Notifications } from '../../api/Notifications.js';

class FooterMobile extends Component {
	static contextTypes = {
	      router: PropTypes.object // replace with PropTypes.object if you use them
	    }

	state = { visible: false, notifNonLu:"0", none:"visibleNotif" }

	componentWillMount(){
		let first = $(location).attr('pathname');
	    first.indexOf(1);
	    first.toLowerCase();
	    let pathname = first.split("/")[1];

		Meteor.apply('notifNonLu', [{
	          }], {
	          onResultReceived: (error, response) => {
	            if (error) console.warn(error.reason);
	            {response ?
	             this.setState({notifNonLu: response}) :
	             ""}
	          },
	      	});

		if(pathname == "MOBILEChat"){
          this.setState({
          none: "none",
        	});
	    }else{
          this.setState({
          none: "visibleNotif",
        });
	    }
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
							 <Img className="iconHeader" src="/homeMobile.png"/>
						</Link>
					</div>

					<div className="ButtonFooterMobile">
						<Link to={'/profil/' + Meteor.userId()}>
							 <Img className="iconHeader" src="/userMobile.png"/>
						</Link>
					</div>

					<div className="ButtonFooterMobile">
						<Link to={'/MOBILEcontactChat/' + Meteor.userId() }>
							 <Img className="iconHeader" src="/chatMobile.png"/>
						</Link>
						<div className={this.state.none}>
							<div className={this.props.NBRchatUnread > 0 ? "totalNotifMobile" : "none"}>
							    {this.props.NBRchatUnread}
							</div>
						</div>
					</div>

					<div className="ButtonFooterMobile">
						<Link to="/Notifications" >
							 <Img className="iconHeader" src="/bellMobile.png"/>
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
	const Handle = Meteor.subscribe('NotifiMessageConnecte');
  	const loading = !Handle.ready();
  	const allreponses = Notifications.find({'type':'chat', 'read':false}).count();
  	const reponseExists = !loading && !!allreponses;
  return {
  	NBRchatUnread: reponseExists ? allreponses : '',
  };
})(FooterMobile);
