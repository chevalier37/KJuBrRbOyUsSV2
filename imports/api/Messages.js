import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {

export const addMessage = new ValidatedMethod({
  name: 'addMessage',
  validate: new SimpleSchema({
            titre: {type: String},
            message: {type: String},
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
          }).validator(),
            
  applyOptions: {
    noRetry: true,
  },

  run({ 
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
   }) {
        const user = Meteor.user();
        const username = user.username;
        const naissance = user.profile.naissance;
        const gender = user.profile.gender;

              Posts.insert({
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
                  signaler:0,
                  upvoters: [],
                  post_author_id : this.userId,
                  nbrReponse:0,
                });
  }

});


//on ajoute une vidéo au message
export const addVidéo = new ValidatedMethod({
  name: 'addVidéo',
  validate: new SimpleSchema({
            idVideo: {type: String},
            idMessage: {type: String},
          }).validator(),
            
  applyOptions: {
    noRetry: true,
  },

  run({ 
        idVideo,idMessage,
   }) {
          Posts.update(idMessage, {
          $set: { video: true, idVideo: idVideo },
          });
  }

});

//on cherche si le message a une vidéo
export const searchVidéo = new ValidatedMethod({
  name: 'searchVidéo',
  validate: new SimpleSchema({
            idMessage: {type: String},
          }).validator(),
            
  applyOptions: {
    noRetry: true,
  },

  run({ 
        idMessage,
   }) {
          
          let result = Posts.findOne(idMessage);
          if(result.video){
            const idVideo = result.idVideo;
            return idVideo
          }
  }

});


Meteor.methods({

        signaler: function(Id) {
          check(Id, String);
          const search = Posts.findOne(Id);
          const nbrSignaler = search.signaler;
          const updateSignaler = nbrSignaler + 1;

          Posts.update(Id, {
          $set: { signaler: updateSignaler },
          });

          if (!search)
            throw new Meteor.Error('invalid', 'Post not found');
          if (_.include(search.upvoters, this.userId))
            throw new Meteor.Error('invalid', 'Already upvoted this post');
          Posts.update(Id, {
            $addToSet: {upvoters: this.userId},
          });

          {nbrSignaler == 2 ?
            Posts.remove(Id) : ''
          }
      },

      supprimerMessage: function(idMessage) {
         check(idMessage, String);
          Posts.remove({_id:idMessage});
       },

       ModifierMessage: function(idMessage, text) {
         check(idMessage, String);
          Posts.update({_id:idMessage}, {
              $set: { post_content: text},
             })
       },

      Ecole: function() {
          let ecole = Posts.find({$or:
          [{echecEcole:true},
          {Harcelement:true},
          {Discrimination:true},
          {Violence:true}]},
          { sort: { post_date: -1 }, limit:30 }).fetch();
          return ecole;
      },

      Confiance: function() {
          let confiance = Posts.find({$or:
          [{timidite:true},
          {depression:true},
          {suicide:true},
          {deces:true},
          {mutilation:true}]},
          { sort: { post_date: -1 }, limit:30 }).fetch()
          return confiance;
      },

      Sante: function() {
          let sante = Posts.find({$or:
          [{Anorexie:true},
          {obesite:true},
          {drogue:true},
          {alcool:true},
          {complexe:true},
          {hopital:true},
          {handicap:true},
          {Accident:true}]},
          { sort: { post_date: -1 }, limit:30 }).fetch();
          return sante;
      },

      Sexo: function() {
          let sexo = Posts.find({$or:
          [{premierfois:true},
          {Contraception:true},
          {mst:true},
          {viol:true},
          {avortement:true},
          {orientationSex:true}]},
          { sort: { post_date: -1 }, limit:30 }).fetch();
          return sexo;
      },

      Amour: function() {
          let amour = Posts.find({$or:
          [{premierAmour:true},
          {trahison:true},
          {Friendzone:true},
          {amourdistance:true},
          {separation:true}]},
          { sort: { post_date: -1 }, limit:30 }).fetch();
          return amour;
      },

      Autre: function() {
          let autre = Posts.find({autre:true},
          { sort: { post_date: -1 }, limit:30 }).fetch();
          return autre;
      },

      NonLu: function() {
          let nonLu = Posts.find({nbrReponse:0},
          { sort: { post_date: -1 }, limit:30 }).fetch();
          return nonLu;
      },

      AllMessages: function() {
          let allposts = Posts.find({}, { sort: { post_date: -1 }, limit:30}).fetch();
          return allposts;
      },


});


Meteor.publish('AllMessages', function (test) {
  return Posts.find({}, { sort: { post_date: -1 }});
});


Meteor.publish('SingleMessages', function (reponse) {
new SimpleSchema({
      reponse: {type: String},
    }).validate({reponse});

  return Posts.find({'_id':reponse}, {
    fields: {'post_author_id':1, 'post_title':1}
  });
});

Meteor.publish('MyMessages', function (myId) {
new SimpleSchema({
      myId: {type: String},
    }).validate({myId});

  return Posts.find({'post_author_id':myId});
});

Meteor.publish('Message', function (id) {
new SimpleSchema({
      id: {type: String},
    }).validate({id});

  return Posts.find({'_id':id});
});


}