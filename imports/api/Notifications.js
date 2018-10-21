import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Notifications = new Mongo.Collection('notifications');
import { Posts } from './Messages.js';
import { ContactChat } from './ContactChat.js';

if (Meteor.isServer) {
const requestLimit = 5;
const requestTimeout = 5000;
DDPRateLimiter.setErrorMessage("Error DDPRateLimiter")


export const notifNonLu = new ValidatedMethod({
  //on compte le nombre total de notification non lu
  name: 'notifNonLu',
  validate: new SimpleSchema({
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run() {
    let totalNotif = Notifications.find({'to_id':this.userId, 'read':false}).count();
    return totalNotif
  }
});
DDPRateLimiter.addRule({
    type: "method",
    name: "notifNonLu",
}, requestLimit, requestTimeout);



export const allRead = new ValidatedMethod({
  //on met à jour toute les notifications en lu
  name: 'allRead',
  validate: new SimpleSchema({
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run() {
    Notifications.update({'to_id':this.userId}, {$set: {'read': true}}, {multi:true})
  }
});
DDPRateLimiter.addRule({
    type: "method",
    name: "allRead",
}, requestLimit, requestTimeout);



export const SignalerNotif = new ValidatedMethod({
  //l'auteur est averti que son message est signalé
  name: 'SignalerNotif',
  validate: new SimpleSchema({
    message: {type: String},
    to_id: {type: String},
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({to_id, message }) {
    Notifications.insert({
                  date: new Date(),
                  to_id:to_id,
                  message:message,
                  read:false,
                  type:'signaler',
                });
  }
});
DDPRateLimiter.addRule({
    type: "method",
    name: "SignalerNotif",
}, requestLimit, requestTimeout);



export const obtenirRecommandation = new ValidatedMethod({
  //quand un conseiller clos une discussion, l'utilisateur reçoit une notification afin de laisser une recommandation
  name: 'obtenirRecommandation',
  validate: new SimpleSchema({
    to_id: {type: String},
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({to_id }) {
    let search = Meteor.users.findOne({'_id':this.userId});
    let username = search.username;  
    Notifications.insert({
                  date: new Date(),
                  to_id:to_id,
                  nameConseiller:username,
                  read:false,
                  conseillerID: this.userId,
                  type:'obtenirRecommandation',
                });
      //on supprime l'utilisateur du contact chat
      const request = ContactChat.findOne({$or : [{from_id: this.userId, to_id:to_id}, {from_id: to_id, to_id:this.userId}]});
      const IdContact = request._id;
      ContactChat.remove(IdContact)


  }
});
DDPRateLimiter.addRule({
    type: "method",
    name: "obtenirRecommandation",
}, requestLimit, requestTimeout);




export const voteUPnotif = new ValidatedMethod({
  //l'auteur est averti que sa réponse à reçu un vote positif
  name: 'voteUPnotif',
  validate: new SimpleSchema({
    message: {type: String},
    to_id: {type: String},
    postId: {type: String},
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({to_id, message, postId }) {
    // on verifie que la notification n'existe pas, l'utilisateur est averti qu'une seule fois par message arrpouvé
    const search = Notifications.findOne({to_id:to_id, message:message, type:'voteUp'})
    if(!search){
      Notifications.insert({
                  date: new Date(),
                  to_id:to_id,
                  message:message,
                  postId:postId,
                  read:false,
                  type:'voteUp',
                });
    }
  }
});
DDPRateLimiter.addRule({
    type: "method",
    name: "voteUPnotif",
}, requestLimit, requestTimeout);


Meteor.methods({

      ChatNotif: function(message,to_id) {
          new SimpleSchema({
            message: {type: String},
            to_id: {type: String},
          }).validate({
            to_id,
            message,
          });

            const user = Meteor.user();
            const search = Meteor.users.findOne({'_id':to_id});
            const gender = user.profile.gender;

            const to_name = search.username;
            const from_name = user.username;
            
            {to_id != this.userId ? 
             Notifications.insert({
                  message:message,
                  from_id:this.userId,
                  from_name: from_name,
                  to_id:to_id,
                  to_name: to_name,
                  date: new Date(),
                  read:false,
                  type:'chat',
                  gender:gender,
                })
             : ''}

      },

      supprimerNotification: function(idMessage) {
          check(idMessage, String);
          Notifications.remove({_id:idMessage});
       },

       ReponseNotif: function(
        message,
        id
        ) {
         new SimpleSchema({
            message: {type: String},
            id: {type: String},
          }).validate({
            id,
            message,
          });

        const user = Meteor.user();
        const author = user.username;
        const gender = user.profile.gender;
        const userId = this.userId;
        const postId = id;

        const search = Posts.findOne(id);
        const post_author_id = search.post_author_id;
        const post_author_name= search.post_author;
        const post_title= search.post_title;

              Notifications.insert({
                  message: message,
                  date: new Date(),
                  post_author:author,
                  gender:gender,
                  post_author_name: post_author_name,
                  to_id:post_author_id,
                  userId:userId,
                  postId:postId,
                  post_title:post_title,
                  read:false,
                  type:'reponse'
                });

      },

      NotifRecommandation: function(id,text,note) {
        new SimpleSchema({
            text: {type: String},
            id: {type: String},
            note: {type: Number},
          }).validate({
            id,
            text,
            note,
          });

          let search = Meteor.users.findOne({'_id':id});
          let name = search.username;
          let user = Meteor.user();

          Notifications.insert({
                  from_id:this.userId,
                  to_id:id,
                  from_name: user.username,
                  to_name: search.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  note: note,
                  message: text,
                  read:false,
                  type:'recommandaton'
                });       
       },

       NotifDons: function(message, to_id, to_name, montant,) {
        new SimpleSchema({
            message: {type: String},
            to_id: {type: String},
            to_name: {type: String},
            montant: {type: Number},
          }).validate({
            to_id,
            message,
            to_name,
            montant
          });

         const user = Meteor.user();
         const from_id = this.userId;
         const from_name = user.username;
         const gender = user.profile.gender;
         Notifications.insert({
                  from_id:this.userId,
                  from_name:user.username,
                  to_id: to_id,
                  to_name:to_name,
                  gender :user.profile.gender,
                  date: new Date(),
                  montant: montant,
                  message:message,
                  read:false,
                  type:'don'
                });

     },

});

Meteor.publish('AllNotifications', function () {

  return Notifications.find();
});

Meteor.publish('Notifications', function (id) {
  new SimpleSchema({
      id: {type: String},
    }).validate({id});

  return Notifications.find({'to_id':id})
});
}
