import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Conseilleres } from './Conseilleres.js';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

export let Recommandations = new Mongo.Collection('recommandations');

if (Meteor.isServer) {
const requestLimit = 5;
const requestTimeout = 5000;
DDPRateLimiter.setErrorMessage("Error DDPRateLimiter")



export const Recommander = new ValidatedMethod({
  //on ajoute une recommandation
  name: 'Recommander',
  validate: new SimpleSchema({
    id: { type: String },
    presentation: { type: String },
    note: { type: Number }
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({ id, presentation, note  }) {
          let search = Meteor.users.findOne({'_id':id});
          let name = search.username;
          let user = Meteor.user();

          Recommandations.insert({
                  from_id:this.userId,
                  to_id:id,
                  from_name: user.username,
                  to_name: search.username,
                  gender :user.profile.gender,
                  to_gender: search.profile.gender,
                  date: new Date(),
                  note: note,
                  commentaire: presentation,
                  read:false,
                });

          // on met à jours la note dans la table user
          let noteActuelle = search.profile.note;
          if(noteActuelle == 0){
            noteFuture = note;
          }else{
            noteFuture = (noteActuelle + note )*0.5
          }
                   
           Meteor.users.update(id, {
                    $set: { 'profile.note': noteFuture },
            }) 

         // on met à jours la note dans la table conseiller
          let IsConseiller = Conseilleres.findOne({user_id:id});
          if(IsConseiller){
            let noteActuelleConseil = IsConseiller.note;
            {Number.isInteger(noteActuelleConseil) ?
              noteFutureConseil = (noteActuelleConseil + note )*0.5 :
              noteFutureConseil = note 
            }

              {
                IsConseiller
               ?
               Conseilleres.update({user_id:id}, {
                $set: { note: noteFutureConseil },
                }) 
               : ''
              } 
          }
  }
});
DDPRateLimiter.addRule({
    type: "method",
    name: "Recommander",
}, requestLimit, requestTimeout);



export const ModifierRecommandation = new ValidatedMethod({
  //on modifie la recommandation
  name: 'ModifierRecommandation',
  validate: new SimpleSchema({
    idMessage: { type: String },
    text: { type: String },
    note: { type: Number }
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({ idMessage, text, note  }) {
          Recommandations.update({_id:idMessage}, {
              $set: { commentaire: text},
              })


          // on met à jours la note dans la table user
          let search = Recommandations.findOne({"_id":idMessage})
          let userId = search.to_id;


          let searchUser = Meteor.users.findOne({'_id':userId});
          let noteActuelle = searchUser.profile.note;
                    console.log(noteActuelle)
          if(noteActuelle == 0){
            noteFuture = note;
          }else{
            noteFuture = (noteActuelle + note )*0.5
          }
                   
          Meteor.users.update(userId, {
                    $set: { 'profile.note': noteFuture },
            }) 

          Recommandations.update({_id:idMessage}, {
              $set: { note: note},
              })

         // on met à jours la note dans la table conseiller
          let IsConseiller = Conseilleres.findOne({user_id:userId});
          if(IsConseiller){
            let noteActuelleConseil = IsConseiller.note;
            {Number.isInteger(noteActuelleConseil) ?
              noteFutureConseil = (noteActuelleConseil + note )*0.5 :
              noteFutureConseil = note 
            }

              {
                IsConseiller
               ?
               Conseilleres.update({user_id:userId}, {
                $set: { note: noteFutureConseil },
                }) 
               : ''
              } 
          }

  }
});
DDPRateLimiter.addRule({
    type: "method",
    name: "ModifierRecommandation",
}, requestLimit, requestTimeout);



 



Meteor.methods({

       RecommandationNotif: function(message_id){
        check(message_id, String);
        Recommandations.update(message_id, {$set: {read:true} })
      },

       supprimerRecommandation: function(idMessage) {
         check(idMessage, String);
          Recommandations.remove({_id:idMessage});
       },

       
});


Meteor.publish('allRecommandations', function () {
  return Recommandations.find()
});

Meteor.publish('ModifierRecommandations', function (post_id) {
  new SimpleSchema({
      post_id: {type: String},
    }).validate({post_id});

  return Recommandations.find({'_id':post_id})
});

Meteor.publish('Recommandations', function (id) {
  new SimpleSchema({
      id: {type: String},
    }).validate({id});

  return Recommandations.find({'to_id':id})
});

Meteor.publish('RecommandationsDonnées', function (id) {
  new SimpleSchema({
      id: {type: String},
    }).validate({id});

  return Recommandations.find({'from_id':id})
});
}
