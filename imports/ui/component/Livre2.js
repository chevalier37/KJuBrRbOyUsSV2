import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Header, Divider } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router';
import Img from 'react-image'
 
//Component
import HeaderPage from '../component/HeaderPage.js';


class Livre extends Component {

    render() {
    let nuit = this.props.nuit;

    if (!Meteor.loggingIn() && !Meteor.userId()){
      return <Redirect to="/" />;
    }  

    return (
      <div className="container">
        <div className="MainContentProfil">
          <div className={ nuit ? "headerNuit" : "headerJour"}>
            <div className="center">
              Le Secret de Cendrillon 2
            </div>
          </div>
          <Divider />
          <div className="ListeMesMessages">
          <div className={ nuit ? "CGUNuit" : "ListeMessages"}>
            <div className="register blanc">
                <div className="numero">
                  <div className="blocLivre">
                    <Img className="imgLivre" src="/1C.jpg"/>
                  </div>
                      <div className="PubLivre">
                          Disponible dans <u>toutes les librairies</u> et sur :<br />
                          <a href="https://livre.fnac.com/a13477541/Jean-Benoit-Roussat-Le-secret-de-Cendrillon?omnsearchpos=1" target="_blank"><Img src="/Fnac.gif" className="fnac"/></a>
                          <a href="https://www.amazon.fr/Secret-Cendrillon-2-Jb-Roussat/dp/B07QN288TV/ref=sr_1_1?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&keywords=le+secret+de+cendrillon+2&qid=1556693009&s=gateway&sr=8-1" target="_blank"><Img src="/amazon.png" className="amazon"/></a>
                          <br />
                      </div>
                      <div  className="textCendrillon">
                          <br /><br />
                          <div className="center titre">
                            Nous avons écrit ce livre afin de vous aider à prendre confiance en vous <br />et à trouver votre identité.
                          </div><br />

                          <div className="right">
                            À tous les garçons qui traversent les profondeurs de la vie et qui sont attirés vers la lumière.
                          </div><br /><br /><br />
                          <div>
                          <p className="center titre">  Introduction </p>
                        <p className="right">«  Réjouis-toi, jeune homme, dans ta jeunesse, que ton cœur soit heureux aux 
                                                jours de ton adolescence, marche selon
                                                les voies de ton cœur et selon la vision
                                                de tes yeux. » Qohéleth.</p><br /><br /><br />

                          Rares sont les garçons qui sont prêts à confesser leurs faiblesses et leur désarroi. Pourtant, ils ont tout autant besoin
                          d’attentions et d’affection que les filles. Les garçons aussi se
                          posent plein de questions et peu de personnes sont là pour vraiment les écouter. Ils sont livrés à eux-mêmes et, par le jeu de
                          la sélection naturelle, seuls les meilleurs survivront. Beaucoup
                          sont frustrés, se sentent seuls et finissent par sombrer dans la violence, avec ce que cela peut engendrer (agression, radicalisation,
                          viol…).<br /><br />
                          Ce livre s’adresse principalement à tous ceux qui n’ont jamais
                          reçu de soutien ou d’encouragement de la part de leur entourage.
                          Ceux qui se pensent incapables de réaliser quelque chose de
                          grand dans leur vie, qui se sentent seuls et qui rêvent malgré
                          tout de vivre leurs rêves. Ceux qui souffrent de la solitude, qui
                          sombrent dans le désespoir, qui sont victimes de la haine et se
                          croient indésirables. Ceux qui ont connu le rejet, le désintérêt,
                          l’abandon ou la trahison. Ceux qui ont le sentiment que leur
                          vie n’a aucun sens, de ne pas exister aux yeux des autres. Bien
                          sûr, cet ouvrage n’a pas la prétention de résoudre tous vos problèmes, disons que c’est un point de départ pour commencer
                          à se prendre en main. La patience et la persévérance feront le
                          reste.<br /><br />
                          Mais surtout, ne vous arrêtez pas à ce livre, continuez d’en
                          lire beaucoup d’autres, car la lecture est la source du savoir.
                          Sortez de chez vous et allez explorer le monde. Le plus important est d’agir, d’avancer tous les jours. Avancez à votre rythme,
                          mais avancez. Changer sa vie prend du temps, alors commencez
                          maintenant.<br /><br />
                          Que veulent les garçons ? La réponse est simple: changer la
                          vie d’une fille et être son héros. Enfant, beaucoup d’entre nous
                          rêvent de devenir le prince charmant, de sauver la belle princesse
                          et de la garder pour toujours. En grandissant, nos rêves n’ont
                          probablement pas changé, mais nous devons redescendre sur
                          terre. Nous n’avons pas de super-pouvoir, pas d’épée magique
                          pour sauver le monde.<br /><br />
                          Pourtant il y a toujours ce désir profond d’héroïsme. Certains
                          vont se mettre à accumuler beaucoup d’argent afin d’obtenir de
                          la reconnaissance. D’autres vont se lancer dans la médecine ou
                          être pompiers pour sauver des vies. Les plus ambitieux deviendront astronautes afin de vraiment sortir du commun des mortels.
                          Mais l’ultime défi est de trouver la femme de ses rêves. Celle
                          qui est réellement exceptionnelle à nos yeux. Un peu comme la
                          princesse qui nous faisait tant rêver étant petits.
                          On verra ensemble ce que recherchent les filles, plutôt que ce
                          que la société cherche à leur faire dire sur ce qu’elles désirent.<br /><br />

                          <div className="center titre">
                            « La véritable pauvreté, c’est de n’exister pour personne. » Mère Teresa.
                          </div><br /><br />

                        <div className="center titre">    1 <br />
                        Arrêtez de les écouter</div><br />

                        <p className="right">« La folie, c’est de faire toujours la même chose et de s’attendre à un résultat différent. » Albert Einstein.
                        </p><br /><br />

                        Imaginons que l’univers des filles vous est totalement inconnu,
                        qu’il vous semble bien mystérieux. Il vous intrigue, parfois
                        vous choque, vous avez vraiment du mal à y comprendre quelque chose. Qu’avez-vous fait pour essayer de remédier à ce
                        problème ? Vous avez passé des heures à les écouter attentivement afin de mieux saisir ce qu’elles veulent. En menant
                        votre enquête, vous avez ouvert grand vos oreilles et vous avez
                        entendu un discours assez classique, sans réelle surprise: elles
                        veulent un garçon sensible, romantique, gentil, respectueux…
                        blablabla… le baratin habituel.<br /><br />
                        Vous êtes persuadé d’avoir obtenu de précieux conseils, et
                        comme vous êtes consciencieux, vous allez appliquer à la lettre
                        ce qu’elles vous ont dit. Vous allez toujours être très poli et courtois avec les filles. Vous les aiderez dès que possible. Parfois,
                        même, vous modifierez votre emploi du temps afin de toujours
                        vous rendre disponible. Bien évidemment, vous leur offrez des
                        fleurs ou des chocolats à la moindre occasion. Vous n’osez
                        pas les contredire et vous essayez d’être d’accord avec elles le
                        plus souvent possible. Après tout, c’est normal, car elles disent
                        qu’elles veulent un garçon gentil. Lors d’un premier rendez-vous,
                        vous l’emmenez toujours au restaurant ou au cinéma. Parfois les
                        deux. C’est vous qui payez, car c’est toujours vous qui invitez.
                        Vous prenez régulièrement de leurs nouvelles, car elles sont
                        une priorité dans votre vie. Vous aimez savoir que tout se passe
                        bien pour elles. Vous êtes aux petits soins. Vous avez tellement
                        écouté les filles que vous êtes devenu le « garçon parfait ». Mais
                        il y a un seul souci. Malgré tous les efforts que vous faites pour
                        elles, cela se termine toujours de la même façon: « Je préfère
                        qu’on reste amis. » Vous voilà bien avancé ! Vous avez des amies,
                        mais pas de petite amie. Vous avez alors deux options: ne rien
                        changer, et continuer d’être frustré, ou bien vous remettre en
                        question et prendre conscience que le problème, c’est vous et
                        non les filles.<br /><br />
                        Maintenant que vous les avez bien écoutées, il est temps de
                        les observer. Bouchez vos deux oreilles et ouvrez grand vos yeux.
                        Qu’observez-vous ? Elles fréquentent des garçons qui n’hésitent
                        pas à les contredire, qui ne leur offrent que rarement des fleurs,
                        et qui partagent l’addition quand ils vont au restaurant. Elles s’attachent souvent à un garçon qui les a fait pleurer et il n’est pas
                        rare de les voir en couple avec des garçons machos. Vous avez
                        donc fait ce constat: soit elles vous mentent, soit vous avez mal
                        interprété leurs paroles. Mais il y a visiblement un décalage
                        entre ce qu’elles disent et ce qu’elles font.<br /><br />


                        <p className="titre center">La vérité est souvent vue, rarement entendue.</p><br />

                        Si vous voulez vraiment que les filles s’intéressent à vous, si
                        vous en avez marre d’être toujours le meilleur ami, alors n’oubliez jamais cette règle fondamentale: arrêtez de demander des
                        conseils aux filles. Pour faire simple: si vous souhaitez savoir
                        comment il faut se comporter avec elles, ne demandez pas à une
                        autre fille, vous n’obtiendrez rien. Même votre propre mère
                        vous mènera sur une fausse piste. À ce propos, que vous a-telle appris ? Qu’il faut être gentil avec les filles. Et qu’avez-vous
                        remarqué à l’école ? Les garçons qui leur manquent de respect
                        finissent par sortir avec !<br /><br />
                        Observez plutôt ceux qui ont du succès avec elles. Vous y
                        trouverez de précieuses informations. Vous connaissez forcément dans votre entourage un garçon qui n’a jamais eu de problème pour être en couple, et ce quel que soit son physique
                        ou sa personnalité. Regardez bien comment il se comporte en
                        leur présence, comment il leur parle, quel vocabulaire et quelle
                        gestuelle il utilise. Restez un simple spectateur et soyez lucide
                        sur ce que vous voyez. Il y aura inévitablement des attitudes ou
                        des réactions qui vont vous étonner. Cela montre l’ignorance
                        dans laquelle vous êtes. Il y a une nette différence entre votre
                        façon de penser et la sienne. En général, ceux qui ont du succès
                        avec les filles ne leur ont jamais demandé de conseils. Ils se sont
                        fait leur propre philosophie de la vie et tant pis si cela dérange.
                        Voici leur façon de penser: soit vous adhérez à leur mode de
                        vie, soit vous dégagez !<br /><br />
                        Ils se moquent de ce que les autres pensent et n’ont pas peur
                        de décevoir. Ils vivent en parfait accord avec leur conscience
                        tout en respectant les règles de vie en société. C’est cette indépendance intellectuelle qui attire les filles. Peu importe leur
                        mode de vie, cela ne change rien pour elles, car ils sortent du
                        lot par leur façon d’être et leur façon de penser.
                        Voici un autre exemple qui vous montre que vous ne devez
                        jamais demander de conseils à une fille: elles vous diront de les
                        faire rire. Mais ce qu’elles recherchent, ce n’est pas un clown:
                        elles veulent un garçon qui leur fera vivre des émotions. Cela
                        peut être de la joie comme de la tristesse. Peu importe, elles ont
                        envie de vivre des émotions fortes, qu’elles soient positives ou
                        négatives. Elles aiment se sentir vivantes et uniques en votre
                        présence. Inutile donc de perdre votre temps à vouloir les faire
                        rire à tout prix. Autre chose qu’elles ne vous diront jamais:
                        elles aiment se sentir désirées, qu’on leur fasse comprendre
                        qu’elles sont plus attirantes que les autres filles.<br /><br />

                        <p className="titre center">Cherchez à comprendre avant de vouloir être compris.</p><br />

                         Maintenant que vous avez bien en tête cette première règle,
                        parcourons ensemble les différentes caractéristiques de leur
                        univers: elles passent beaucoup de temps à se faire belles,
                        car elles accordent une grande importance à leur apparence.
                        Elles aiment bien attirer l’attention pour ne pas se sentir invisibles. Elles portent des talons pour se mettre en valeur, même
                        si c’est très inconfortable. Elles pleurent quand elles sont tristes,
                        elles pleurent quand elles sont heureuses. En résumé: elles
                        pleurent pour montrer leurs émotions. Elles sont très tactiles,
                        elles adorent les câlins et cherchent souvent du soutien et du
                        réconfort dans leur entourage.<br /><br />

                        <p className="titre center">Il ne faut pas attendre d’avoir confiance pour passer à l’action, <br />mais passer à l’action pour prendre confiance.</p><br /><br />

                        <p className="center">Fin de l’extrait<br />
                      
                        </p>
                        <br /><br /><br /><br /><br /><br />
                      </div><br />
                      </div>
               </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
  };
})(Livre);
