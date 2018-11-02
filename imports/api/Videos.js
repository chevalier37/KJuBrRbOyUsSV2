import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Videos = new Mongo.Collection('videos');





if (Meteor.isServer) {

Meteor.methods({

      addVideo: function(
        titre,
        commentaire,
        ID,
        categorie
        
        ) {

        new SimpleSchema({
            titre: {type: String},
            commentaire: {type: String},
            ID: {type: String},
            categorie: {type: String},
            
          }).validate({
            titre,
            commentaire,
            ID,
            categorie
           
          });

          Videos.insert({
              titre:titre,
              commentaire: commentaire,
              IDvideo: ID,
              categorie:categorie,
              date:new Date(),
            });
         },

        

      /*supprimerMessage: function(idMessage) {
         check(idMessage, String);
          Posts.remove({_id:idMessage});
       },*/


});





Meteor.publish('AllVideos', function ( ) {
  return Videos.find();
});


Meteor.publish('SingleVideo', function (id) {
new SimpleSchema({
      id: {type: String},
    }).validate({id});

  return Videos.find({'_id':id});
});

/*
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
});*/


}