import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Button, Checkbox, Input, Form, Header, Divider, Label, Comment, TextArea } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { EditorState,convertFromRaw, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import renderHTML from 'react-render-html';

class ListeArticlesModeration extends Component {
	
	constructor(props) {
		    super(props);
		 
		    this.state = {
		      	sexe: '',
			    disabled:false,
			    disabledVote:false,
			    editorState:"",
			    post_title:"",
			    poster:false,
		    };
		}

	componentWillMount(){
		const sexe = this.props.message.gender;
        
        this.setState({editorState: this.props.content})
        this.setState({post_title: this.props.message.post_title})
	    
	    {sexe == 'fille' ? 
	         this.setState({sexe: 'pink'}):
		  	 this.setState({sexe: 'blue'})
		}

		//on calcul la date du post
		const today = new Date();
		const diffToday = Date.parse(today);
		const post_date = this.props.date;
		const nbrSeconde = ((diffToday-post_date)/1000) + 2;
		this.setState({nbrSeconde: nbrSeconde})

		const nbrMinutes = Math.round(nbrSeconde/60);
		this.setState({nbrMinutes: nbrMinutes})
		
		const nbrHeures = Math.round(nbrMinutes/60);
		this.setState({nbrHeures: nbrHeures})

		const nbrJours = Math.round(nbrHeures/24);
		this.setState({nbrJours: nbrJours})

		const nbrMois = Math.round(nbrJours/30);
		this.setState({nbrMois: nbrMois})
	}

	breaklines(){
			  let message = this.props.message.post_title
			  return message
			}


	onEditorStateChange(editorState){
	    this.setState({
	      editorState:editorState,
	    });
 	};

 	onChange(value){
	    this.setState({
	      post_title:value,
	    });
 	};

 	NotValid(){
		Meteor.call('ArticleRefuse',
	    this.props.message._id,
		  	  (err) => {
            	if(err){
              
           		 } else {
              	{
			        //this.setState({ redirect: true})
	              	}     
            	}
          	})
	}

 	Submit(event) {
        event.preventDefault();

	  	const titre = ReactDOM.findDOMNode(this.refs.titre).value.trim();
     	const message = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
     	const id = this.props.message._id;

     		Meteor.call('ValiderArticle',
		  	  id,
		  	  titre,
		  	  message,
		  	 
		  	  (err) => {
            	if(err){
              
           		 } else {
              	{
	                

				    this.setState({
				      poster: true,
				    });
			    
				  	// Clear form
			        //ReactDOM.findDOMNode(this.refs.titre).value = '';
	              	}     
            	}
          	})
		}

  	render() {
    
		const colorSexe = this.state.sexe;
		const { editorState } = this.state;
		/*const rawContent = this.props.content;  
           const contentState = convertFromRaw(JSON.parse(rawContent));
           const editorState = EditorState.createWithContent(contentState);*/

   
		return (
			<div className="ListeMessages">
	  			<Form onSubmit={this.Submit.bind(this)}>	
    					<Form.Field>
					      <h3>Titre de l'article</h3>
					      <TextArea  rows="1" ref="titre">
							 {this.state.post_title}
						  </TextArea>
					      
					    </Form.Field>

	  			<Segment color={this.props.message.gender=="fille" ?
	        				  "pink" : "blue" }>
		  					  			
		  			<div className={"ContentQuestion" + " " + "display-linebreak"}>
		  				 {/*{renderHTML(this.props.content)}*/}

		  				<Editor
                    	editorState={editorState}
                    	wrapperClassName="wrapper-class"
                 		editorClassName="editor-class"
                   	 	toolbarClassName="toolbar-class"
                    	onEditorStateChange={this.onEditorStateChange.bind(this)}
                    	toolbar={{
                  		inline: { inDropdown: true },
                  		list: { inDropdown: true },
                  		textAlign: { inDropdown: true },
                 	 	link: { inDropdown: true },
                  		history: { inDropdown: true },
                		}}
                		/>



		  			</div>
		  			
		  			<Divider />
		  	
		  			<Comment>
	      				<Comment.Content>
	         				<div className="dateMessage">
		         			{	this.state.nbrSeconde<60 ? "Il y a " + this.state.nbrSeconde +" secondes": 
		         				this.state.nbrMinutes<2 ? "Il y a " + this.state.nbrMinutes +" minute": 
		         				this.state.nbrMinutes<60 ? "Il y a " + this.state.nbrMinutes +" minutes":
		         				this.state.nbrHeures<2 ? "Il y a " + this.state.nbrHeures  +" heure": 
								this.state.nbrHeures<24 ? "Il y a " + this.state.nbrHeures  +" heures": 
								this.state.nbrJours<2 ? "Il y a " + this.state.nbrJours  +" jour":
								this.state.nbrJours<30 ? "Il y a " + this.state.nbrJours  +" jours":  
								"Il y a " + this.state.nbrMois +" mois" 
	         				}
	         				
	         				</div>
	         				<div className="supprimerFavoris">
	         				 <Button type='submit' color="green">Valider</Button>
							</div>
							<div className="repondreMessage" >
								<Button
								  size="tiny"
								  color='red'
								  onClick={this.NotValid.bind(this)}>
									Supprimer
								</Button>
							</div>
	      				</Comment.Content>
	    			</Comment>
	  			</Segment>
	  			</Form>
			</div>
		);
  	}
}

export default ListeArticlesModeration =  withTracker(() => {
  return {
  };
})(ListeArticlesModeration);