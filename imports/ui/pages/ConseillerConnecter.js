import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Form, Select, Input, Message, Loader, Menu} from 'semantic-ui-react'
import Img from 'react-image'
import { Route, Redirect } from 'react-router';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-108632466-1');
ReactGA.pageview(window.location.pathname + window.location.search);

//Component
import ListeConseillerConnecte from '../component/ListeConseillerConnecte.js';
import HeaderPage from '../component/HeaderPage.js';
import HeaderMobile from '../component/HeaderMobile.js';
import FooterMobile from '../component/FooterMobile.js';
import MainContent from '../component/MainContent.js';
import ContentMenuMobile from '../component/ContentMenuMobile.js';
import { Conseilleres } from '../../api/Conseilleres.js';

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
          allMessages: 'visibleMessage',
          MessageAmour :'cacher',
          MessageSexo:'cacher',
          MessageEcole:'cacher',
          MessageSante:'cacher',
          MessageConfiance:'cacher',
          more:5,
          moreAmour:5,
          moreConfiance:5,
          moreSexo:5,
          moreSante:5,
          moreEcole:5,
        }
    }

    componentDidMount() {
        this.scrollToTop();
    }

    scrollToTop() {
        this.el.scrollIntoView();
    }

    handleButtonClick = () => this.setState({ visible: !this.state.visible })
    handleSidebarHide = () => this.setState({ visible: false })

    renderAllMessages() {
      let AllMessages = this.props.allMessages;
      let more = this.state.more;
      return AllMessages.slice(0, more).map((message) => {
       let gender = message.gender;
       let naissance = message.naissance;
         
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

  renderAmour() {
      let MessageAmour = this.props.postsAmour;
      let more = this.state.moreAmour;
      return MessageAmour.slice(0, more).map((message) => {
       let gender = message.gender;
       let naissance = message.naissance;
         
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

  renderSexo() {
      let MessageSexo = this.props.postsSexo;
      let more = this.state.moreSexo;
      return MessageSexo.slice(0, more).map((message) => {
       let gender = message.gender;
       let naissance = message.naissance;
         
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

  renderConfiance() {
      let MessageConfiance = this.props.postsConfiance;
      let more = this.state.moreConfiance;
      return MessageConfiance.slice(0, more).map((message) => {
       let gender = message.gender;
       let naissance = message.naissance;
         
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

  renderSante() {
      let MessageSante = this.props.postsSante;
      let more = this.state.moreSante;
      return MessageSante.slice(0, more).map((message) => {
       let gender = message.gender;
       let naissance = message.naissance;
         
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

  renderEcole() {
      let MessageEcole = this.props.postsEcole;
      let more = this.state.moreEcole;
      return MessageEcole.slice(0, more).map((message) => {
       let gender = message.gender;
       let naissance = message.naissance;
         
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

  showAll() {
        this.setState({allMessages: 'visibleMessage'});
        this.setState({MessageEcole: 'cacher'});
        this.setState({MessageSante: 'cacher'});
        this.setState({MessageConfiance: 'cacher'});
        this.setState({MessageSexo: 'cacher'});
        this.setState({MessageAmour: 'cacher'});
   }

   shawAmour() {
        this.setState({allMessages: 'cacher'});
        this.setState({MessageEcole: 'cacher'});
        this.setState({MessageSante: 'cacher'});
        this.setState({MessageConfiance: 'cacher'});
        this.setState({MessageSexo: 'cacher'});
        this.setState({MessageAmour: 'visibleMessage'});
   }

   showConfiance() {
        this.setState({allMessages: 'cacher'});
        this.setState({MessageEcole: 'cacher'});
        this.setState({MessageSante: 'cacher'});
        this.setState({MessageConfiance: 'visibleMessage'});
        this.setState({MessageSexo: 'cacher'});
        this.setState({MessageAmour: 'cacher'});
   }

   showSexo() {
        this.setState({allMessages: 'cacher'});
        this.setState({MessageEcole: 'cacher'});
        this.setState({MessageSante: 'cacher'});
        this.setState({MessageConfiance: 'cacher'});
        this.setState({MessageSexo: 'visibleMessage'});
        this.setState({MessageAmour: 'cacher'});
   }

   showEcole() {
        this.setState({allMessages: 'cacher'});
        this.setState({MessageEcole: 'visibleMessage'});
        this.setState({MessageSante: 'cacher'});
        this.setState({MessageConfiance: 'cacher'});
        this.setState({MessageSexo: 'cacher'});
        this.setState({MessageAmour: 'cacher'});
   }

   showSante() {
        this.setState({allMessages: 'cacher'});
        this.setState({MessageEcole: 'cacher'});
        this.setState({MessageSante: 'visibleMessage'});
        this.setState({MessageConfiance: 'cacher'});
        this.setState({MessageSexo: 'cacher'});
        this.setState({MessageAmour: 'cacher'});
   }

   VoirPlus() {
    let plus = this.state.more + 5
        this.setState({more: plus});
   }

    VoirPlusConfiance() {
    let plus = this.state.moreConfiance + 5
        this.setState({moreConfiance: plus});
   }

    VoirPlusAmour() {
    let plus = this.state.moreAmour + 5
        this.setState({moreAmour: plus});
   }

    VoirPlusSexo() {
    let plus = this.state.moreSexo + 5
        this.setState({moreSexo: plus});
   }

    VoirPlusSante() {
    let plus = this.state.moreSante + 5
        this.setState({moreSante: plus});
   }

    VoirPlusEcole() {
    let plus = this.state.moreEcole + 5
        this.setState({moreEcole: plus});
   }

    /*componentWillMount(){
       Meteor.apply('AllConseillers', [{
            }], {
            onResultReceived: (error, response) => {
              if (error) console.warn(error.reason);
              if(response){
                this.setState({loading: false})
              }

               let more = this.state.moreSante;
             return response.slice(0, 80).map((message) => {
          this.setState({AllMessages: response})
          });
              },
      });
      
    }*/


    /*renderAllreponses() {
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
      }*/

    render() {
    const { visible } = this.state

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
            <div className="ButtonHeaderMobile">
                <Img className="iconHeader" src="/menu.png" onClick={this.handleButtonClick} />
            </div>
                <HeaderMobile />
            </div>
          </div>
        </header>
       
        <Sidebar.Pushable >
              <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              onHide={this.handleSidebarHide}
              vertical
              visible={visible}
              width='thin'
              >
                <ContentMenuMobile />
              </Sidebar>
              
              <Sidebar.Pusher>
        
                <div className="containerSite" onClick={this.toggleHidden}>
                      <div className="MainContent">
                         <Segment>
                         <Header>
                            <div className="titreRecomandation">
                             Tous les conseillers en ligne
    
                            </div>
                          </Header>
                        </Segment>

                        <div className="categories">
                          <Segment>
                                 <Button
                                  size="mini"
                                  basic
                                  color="red"
                                  onClick={this.showAll.bind(this)}>
                                  Tous
                                 </Button>

                                <Button
                                  size="mini"
                                  basic
                                  color="red"
                                  onClick={this.shawAmour.bind(this)}>
                                   Amour
                                 </Button>

                                <Button
                                  size="mini"
                                  basic
                                  color="red"
                                  onClick={this.showConfiance.bind(this)}>
                                  Confiance en soi
                                 </Button>

                                <Button
                                  size="mini"
                                  basic
                                  color="red"
                                  onClick={this.showSexo.bind(this)}>
                                  Sexo
                                 </Button>

                                <Button
                                  size="mini"
                                  basic
                                  color="red"
                                  onClick={this.showSante.bind(this)}>
                                  Santé
                                 </Button>

                                <Button
                                  size="mini"
                                  basic
                                  color="red"
                                  onClick={this.showEcole.bind(this)}>
                                  Scolaire
                                 </Button>
                              </Segment>
                          </div>
                          <div className="espace"></div>
                        {/*loader au chargement de la page*/}
                         <div className={this.props.loading ? "visibleLoader" : "none"}>
                                <Loader active>Chargement des conseillers</Loader>
                          </div>              
                          <div className={this.state.allMessages}>
                            {this.renderAllMessages()}
                            <div className={this.state.more > this.props.countAllMessages ? "none" : "voirPlus" }>
                            <Button
                              fluid
                                  color="green"
                                  onClick={this.VoirPlus.bind(this)}>
                                  Voir plus
                            </Button>
                          </div>
                          </div>

                        <div className={this.state.MessageAmour}>
                          {this.renderAmour()}
                          <div className={this.state.moreAmour > this.props.countPostsAmour ? "none" : "voirPlus" }>
                            <Button
                              fluid
                                  color="green"
                                  onClick={this.VoirPlusAmour.bind(this)}>
                                  Voir plus
                            </Button>
                          </div>
                        </div>

                        <div className={this.state.MessageSexo}>
                          {this.renderSexo()}
                          <div className={this.state.moreSexo > this.props.countpostsSexo ? "none" : "voirPlus" }>
                            <Button
                              fluid
                                  color="green"
                                  onClick={this.VoirPlusSexo.bind(this)}>
                                  Voir plus
                            </Button>
                          </div>
                        </div>

                        <div className={this.state.MessageConfiance}>
                          {this.renderConfiance()}
                          <div className={this.state.moreConfiance > this.props.countPostsConfiance ? "none" : "voirPlus" }>
                            <Button
                              fluid
                                  color="green"
                                  onClick={this.VoirPlusConfiance.bind(this)}>
                                  Voir plus
                            </Button>
                          </div>
                        </div>

                        <div className={this.state.MessageSante}>
                          {this.renderSante()}
                          <div className={this.state.moreSante > this.props.countpostsSante ? "none" : "voirPlus" }>
                            <Button
                              fluid
                                  color="green"
                                  onClick={this.VoirPlusSante.bind(this)}>
                                  Voir plus
                            </Button>
                          </div>
                        </div>

                        <div className={this.state.MessageEcole}>
                          {this.renderEcole()}
                          <div className={this.state.moreEcole > this.props.countpostsEcole ? "none" : "voirPlus" }>
                            <Button
                              fluid
                                  color="green"
                                  onClick={this.VoirPlusEcole.bind(this)}>
                                  Voir plus
                            </Button>
                          </div>
                        </div>
                    </div> 
                </div>
              </Sidebar.Pusher>
        </Sidebar.Pushable>
        <div className="FooterMobile mobile">
              <FooterMobile />
        </div>
      
      </div>
    );
  }
}

export default ConseillerConnecter =  withTracker(() => {
  const Handle = Meteor.subscribe('AllConseillers');
  const loading = !Handle.ready();

  const allposts = Conseilleres.find({'online':true}, { sort: { note: -1 }, limit:30});

  const amour = Conseilleres.find({$or:
    [{premierAmour:true},
    {trahison:true},
    {Friendzone:true},
    {amourdistance:true},
    {separation:true}]},
    { sort: { note: -1 }, limit:30});

  const confiance = Conseilleres.find({$or:
    [{timidite:true},
    {depression:true},
    {suicide:true},
    {deces:true},
    {mutilation:true}]},
    { sort: { note: -1 }, limit:30});

  const sexo = Conseilleres.find({$or:
    [{premierfois:true},
    {Contraception:true},
    {mst:true},
    {viol:true},
    {avortement:true},
    {orientationSex:true}]},
    { sort: { note: -1 }, limit:30});

  const sante = Conseilleres.find({$or:
    [{Anorexie:true},
    {obesite:true},
    {drogue:true},
    {alcool:true},
    {complexe:true},
    {hopital:true},
    {handicap:true},
    {Accident:true}]},
    { sort: { note: -1 }, limit:30});

  const ecole = Conseilleres.find({$or:
    [{echecEcole:true},
    {Harcelement:true},
    {Discrimination:true},
    {Violence:true}]},
    { sort: { note: -1 }, limit:30});

   const postExists = !loading && !!allposts;
   const postAmourExists = !loading && !!amour;
   const postConfianceExists = !loading && !!confiance;
   const postSexoExists = !loading && !!sexo;
   const postSanteExists = !loading && !!sante;
   const postEcoleExists = !loading && !!ecole;


  return {

    allMessages: postExists ? allposts.fetch() : [],
    countAllMessages: postExists ? allposts.count() : '',
   
    postsAmour: postExists ? amour.fetch() : [],
    countPostsAmour: postExists ? amour.count() : "",
    
    postsConfiance: postExists ? confiance.fetch() : [],
    countPostsConfiance: postExists ? confiance.count() : "",

    postsSexo: postExists ? sexo.fetch() : [],
    countpostsSexo: postExists ? sexo.count() : "",
   
    postsSante: postExists ? sante.fetch() : [],
    countpostsSante: postExists ? sante.count() : "",
    
    postsEcole: postExists ? ecole.fetch() : [],
    countpostsEcole: postExists ? ecole.count() : "",

    loading:loading,


  };
})(ConseillerConnecter);
