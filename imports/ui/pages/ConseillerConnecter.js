import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Form, Select, Input, Message, Loader, Menu} from 'semantic-ui-react'
import Img from 'react-image'
import { Route, Redirect } from 'react-router';


//Component
import ListeConseillerConnecte from '../component/ListeConseillerConnecte.js';
import HeaderPage from '../component/HeaderPage.js';
import FooterMobile from '../component/FooterMobile.js';
import MainContent from '../component/MainContent.js';
import ContentMenuMobile from '../component/ContentMenuMobile.js';
//import { Conseilleres } from '../../api/Conseilleres.js';

const Jours = [
  { key: '1', text: 'Premier amour', value: 'premierAmour' },
  { key: '2', text: 'Trahison', value: 'trahison' },
  { key: '3', text: 'Friendzone', value: 'Friendzone' },
  { key: '4', text: 'Amour à distance', value: 'amourdistance' },
  { key: '5', text: 'Séparation', value: 'separation' },
  { key: '6', text: 'Timidité', value: 'timidite' },
  { key: '7', text: 'Dépression', value: 'depression' },
  { key: '8', text: 'Suicide', value: 'suicide' },
  { key: '9', text: 'Décès', value: 'deces' },
  { key: '10', text: 'Mutilation', value: 'mutilation' },
  { key: '11', text: 'Premiere fois', value: 'premierfois' },
  { key: '12', text: 'Contraception', value: 'contraception' },
  { key: '13', text: 'Maladie, MST', value: 'mst' },
  { key: '14', text: 'Viol', value: 'viol' },
  { key: '15', text: 'Avortement', value: 'avortement' },
  { key: '16', text: 'Orientation sexuelle', value: 'orientationSex' },
  { key: '17', text: 'Anorexie', value: 'Anorexie' },
  { key: '18', text: 'Obésite', value: 'obesite' },
  { key: '19', text: 'Drogue', value: 'drogue' },
  { key: '20', text: 'Alcool', value: 'alcool' },
  { key: '21', text: 'Complexe', value: 'complexe' },
  { key: '22', text: 'Hospitalisation', value: 'hopital' },
  { key: '23', text: 'Handicap', value: 'handicap' },
  { key: '24', text: 'Accident', value: 'accident' },
  { key: '25', text: 'Echec scolaire', value: 'echecEcole' },
  { key: '26', text: 'Harcèlement', value: 'Harcelement' },
  { key: '27', text: 'Discrimination', value: 'discrimination' },
  { key: '28', text: 'Violence', value: 'Violence' },
]

class ConseillerConnecter extends Component {

    constructor(props) {
        super(props);
        this.state = {
          visible: false,
          username:'',
          gender:'',
          jours: '',
          theme:"",
          Conseiller:"",
          loading:true,
          AllMessages:"",
        }
    }

    componentDidMount() {
        this.scrollToTop();
    }

    componentDidUpdate() {
        //this.scrollToTop();
    }

    scrollToTop() {
        this.el.scrollIntoView();
    }

    handleButtonClick = () => this.setState({ visible: !this.state.visible })

    handleSidebarHide = () => this.setState({ visible: false })

    componentWillMount(){
       Meteor.apply('AllConseillers', [{
            }], {
            onResultReceived: (error, response) => {
              if (error) console.warn(error.reason);
              if(response){
                this.setState({loading: false})
              }

               let more = this.state.moreSante;
             return response.slice(0, 30).map((message) => {
          this.setState({AllMessages: response})
          });
              },
      });
      
    }


    jours(value) {
    this.setState({
      theme: value,
    });
    }

    renderAllreponses() {
        if(this.state.AllMessages){ 
          let Allreponses = this.state.AllMessages;
          return Allreponses.map((message) => {
           let gender = message.profile.gender;
           let naissance = message.profile.naissance;

            return (
              <ListeConseillerConnecte
                key={message._id}
                id={message._id}
                message={message}
                date={naissance}
                gender={gender}        
              />
            );
          });
        }
      }

    render() {
    const { visible } = this.state
    let jours=this.state.jours; 
    const redirection = this.state.redirection;
   
    if (redirection) {
      return <Redirect to={'/RechercherConseillerConnecte/' + jours } />;
    } 

    if (!Meteor.loggingIn() && !Meteor.userId()){
      return <Redirect to="/" />;
    }
    
    return (
      <div className="container">
      <div ref={el => { this.el = el; }} ></div>
        <header> 
          {/* Header site*/}
          <div className="containerHeader ecran">
            <div className="headerPage">
              <HeaderPage />
            </div>
          </div>

          {/* Header mobile*/}
          <div className="HeaderMobile mobile">
            <div className="headerTitre">
              <div className="">
                <div className="ButtonHeaderMobile">
                     <Img className="iconHeader" src="/menu.svg" onClick={this.handleButtonClick} />
                </div>
                <div className="ButtonPseudoHeader">
                  Pseudo
                </div>
                <div className="ButtonHeaderRight">
                  <Link to="/PosterMessage" >
                     <Img className="iconHeader" src="/edit.svg"/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
       
        <Sidebar.Pushable >
              <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              inverted
              onHide={this.handleSidebarHide}
              vertical
              visible={visible}
              width='thin'
              >
                <ContentMenuMobile />
              </Sidebar>
              
              <Sidebar.Pusher>
        
                <div className="containerSite" onClick={this.toggleHidden}>
                    <div className="containerIMG">
                      <div className="MainContent">
                         <Segment>
                         <Header>
                            <div className="titreRecomandation">
                             Tous les conseillers en ligne
    
                            </div>
                          </Header>
                        </Segment>
                        {/*loader au chargement de la page*/}
                         <div className={this.state.loading ? "visibleLoader" : "none"}>
                                <Loader active>Chargement des conseillers</Loader>
                          </div>
                        <div className={this.state.theme=="" ? "visibleConseiller" : "none"}>
                        {/*loader au chargement de la page*/}
                            <div className={this.props.loading ? "visibleLoader" : "none"}>
                                  <Loader active>Recherche des conseillers en ligne</Loader>
                            </div>
                         {this.renderAllreponses()}
                         </div>
 
                      </div>  
                    </div> 
                </div>
              </Sidebar.Pusher>
        </Sidebar.Pushable>
      
      </div>
    );
  }
}

export default ConseillerConnecter =  withTracker(() => {
  


  return {


    


  };
})(ConseillerConnecter);
