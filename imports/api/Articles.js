import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Articles = new Mongo.Collection('articles');

if (Meteor.isServer) {


Meteor.methods({

      addArticle: function(
        titre,
        message,
        premierAmour,
        trahison,
        Friendzone,
        amourdistance,
        separation,
        timidite,
        depression,
        suicide,
        deces,
        mutilation,
        premierfois,
        Contraception,
        mst,
        viol,
        avortement,
        orientationSex,
        Anorexie,
        obesite,
        drogue,
        alcool,
        complexe,
        hopital,
        handicap,
        Accident,
        echecEcole,
        Harcelement,
        Discrimination,
        Violence,
        autre,
        ) {

        new SimpleSchema({
            titre: {type: String},
            //message: {type: String},
            premierAmour: {type: Boolean},
            trahison: {type: Boolean},
            Friendzone: {type: Boolean},
            amourdistance: {type: Boolean},
            separation: {type: Boolean},
            timidite: {type: Boolean},
            depression: {type: Boolean},
            suicide: {type: Boolean},
            deces: {type: Boolean},
            mutilation: {type: Boolean},
            premierfois: {type: Boolean},
            Contraception: {type: Boolean},
            mst: {type: Boolean},
            viol: {type: Boolean},
            avortement: {type: Boolean},
            orientationSex: {type: Boolean},
            Anorexie: {type: Boolean},
            obesite: {type: Boolean},
            drogue: {type: Boolean},
            alcool: {type: Boolean},
            complexe: {type: Boolean},
            hopital: {type: Boolean},
            handicap: {type: Boolean},
            Accident: {type: Boolean},
            echecEcole: {type: Boolean},
            Harcelement: {type: Boolean},
            Discrimination: {type: Boolean},
            Violence: {type: Boolean},
            autre: {type: Boolean},
          }).validate({
            titre,
            //message,
            premierAmour,
            trahison,
            Friendzone,
            amourdistance,
            separation,
            timidite,
            depression,
            suicide,
            deces,
            mutilation,
            premierfois,
            Contraception,
            mst,
            viol,
            avortement,
            orientationSex,
            Anorexie,
            obesite,
            drogue,
            alcool,
            complexe,
            hopital,
            handicap,
            Accident,
            echecEcole,
            Harcelement,
            Discrimination,
            Violence,
            autre,
          });

        const user = Meteor.user();
        const username = user.username;
        const naissance = user.profile.naissance;
        const gender = user.profile.gender;

              Articles.insert({
                  naissance:naissance,
                  post_title: titre,
                  post_content: message,
                  premierAmour: premierAmour,
                  trahison:trahison,
                  Friendzone:Friendzone,
                  amourdistance:amourdistance,
                  separation:separation,
                  timidite:timidite,
                  depression:depression,
                  suicide:suicide,
                  deces:deces,
                  mutilation:mutilation,
                  premierfois:premierfois,
                  Contraception:Contraception,
                  mst:mst,
                  viol:viol,
                  avortement:avortement,
                  orientationSex:orientationSex,
                  Anorexie:Anorexie,
                  obesite:obesite,
                  drogue:drogue,
                  alcool:alcool,
                  complexe:complexe,
                  hopital:hopital,
                  handicap:handicap,
                  Accident:Accident,
                  echecEcole:echecEcole,
                  Harcelement:Harcelement,
                  Discrimination:Discrimination,
                  Violence:Violence,
                  autre:autre,
                  post_date:new Date(),
                  post_author:username,
                  gender:gender,
                  upvoters: [],
                  post_author_id : this.userId,
                  nbrReponse:0,
                  vues:0,
                  valider:false,
                  refuse:false,
                  votes:0,
                });
             },

            supprimerArticle: function(idMessage) {
              new SimpleSchema({
                  idMessage: {type: String},
                }).validate({
                  idMessage,
                });

              Articles.remove({_id:idMessage});
            },

            ArticleRefuse: function(id) {
              check(id, String);
              Articles.update({_id:id}, {
              $set: { refuse:true},
              })

            },

            ValiderArticle: function(id, titre, message) {
              check(id, String);
              Articles.update({_id:id}, {
              $set: { post_content: message, post_title:titre, post_date:new Date(), valider:true},
              })
       },

       'voteArticle'(Id) {
          check(Id, String);
          const search = Articles.findOne(Id);
          const nbrvote = search.votes;
          const updatevote = nbrvote + 1;

          Articles.update(Id, {
          $set: { votes: updatevote },
          });

          if (!search)
            throw new Meteor.Error('invalid', 'Post not found');
          if (_.include(search.upvoters, this.userId))
            throw new Meteor.Error('invalid', 'Already upvoted this post');
          Articles.update(Id, {
            $addToSet: {upvoters: this.userId},
          });         
      },

      
       addVisite: function(id) {
          check(id, String);
          const search = Articles.findOne(id);
          const nbrVues = search.vues;
          const updateVues = nbrVues + 1;
          Articles.update({_id:id}, {
          $set: { vues: updateVues},
          })
       },

       ArticleModeration: function() {
       //article en attente de modération   
        const searchArticles = Articles.find({valider:false, refuse:false}).count();
        console.log(searchArticles)
        return searchArticles 
        }
  


});





Meteor.publish('AllArticles', function ( ) {
  return Articles.find();
});


Meteor.publish('SingleArticle', function (id) {
new SimpleSchema({
      id: {type: String},
    }).validate({id});

  return Articles.find({'_id':id});
});


Meteor.publish('MesArticles', function () {
 let myId = this.userId;

  return Articles.find({'post_author_id':myId});
});

/*
Meteor.publish('Message', function (id) {
new SimpleSchema({
      id: {type: String},
    }).validate({id});

  return Posts.find({'_id':id});
});
*/

}