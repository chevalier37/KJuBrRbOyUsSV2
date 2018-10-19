import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes.js';
import 'semantic-ui-css/semantic.min.css';
import './main.html';

 
 

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
	$(window).bind('beforeunload', function() {
	  		const id = Meteor.userId();
	  		Meteor.apply('logoutConseiller',
	  		 [{
	  		 	id
	          }], {
	          onResultReceived: (error, response) => {
	            if (error) console.warn(error.reason);
	            },
	    	});
	        return undefined;
	    });
});



