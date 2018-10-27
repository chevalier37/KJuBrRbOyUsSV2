import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Checkbox, Form, Header, TextArea, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

class FormAjouterModerateur extends Component {

	constructor(props) {
	    super(props);
	 
	    this.state = {
	      visible: false,

	    };
	}


	Submit(event) {
        event.preventDefault();

	  	const id = ReactDOM.findDOMNode(this.refs.ID).value.trim();

        Meteor.apply('addModerateur',
         [{id}], {
          onResultReceived: (error, response) => {
            if (error) console.warn(error.reason);
            ReactDOM.findDOMNode(this.refs.ID).value = '';
          },
      	});
  	}

  	render() {

  		const { visible } = this.state
	
		return (
			<div >
				<Segment>
				    <Form error onSubmit={this.Submit.bind(this)}>

					    <Form.Field>
					      <label>ID modérateur</label>
					      <input
					       ref="ID"
					       />
					       <Message
				            hidden={!this.state.titreVide}
				            error={this.state.titreVide}
				            content='Le titre est obligatoire'
				          />
					    </Form.Field>
					    <Button type='submit' color="green">Valider</Button>
			
			  		</Form>
	  			</Segment>
	  			<div className="blockVide">
	  			</div>
			</div>
		);
  	}
}

export default withTracker(() => {
  return { 
  };
})(FormAjouterModerateur);
