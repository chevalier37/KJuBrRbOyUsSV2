import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export let BloquerChat = new Mongo.Collection('BloquerChat');



if (Meteor.isServer) {

Meteor.methods({

      bloquerChat: function(to_id) {
          new SimpleSchema({
            to_id: {type: String},
          }).validate({
            to_id
          });

          let user = Meteor.user();
          BloquerChat.insert({
                  from_id:this.userId,
                  to_id:to_id,
                  from_name: user.username,
                  from_gender :user.profile.gender,
                  date: new Date(),
                });      
       },

       isContactBloquer: function(id) {
                const Isbloquer = BloquerChat.find({from_id:this.userId, to_id:id.from_id}).count();
                {Isbloquer >=1 ? Istrue = true : Istrue = false}
                return Istrue;
             }, 

        MyIdBloquerChat: function(from_id) {
                const Isbloquer = BloquerChat.find({to_id:this.userId, from_id:from_id.from_id}).count();
                {Isbloquer >=1 ? Istrue = true : Istrue = false}
                return Istrue;
             },

       supprimerBloquer: function(to_id) {
        new SimpleSchema({
            to_id: {type: String},
          }).validate({
            to_id,
          });

          BloquerChat.remove({from_id:this.userId, to_id:to_id});
       },
});


/*Meteor.publish('allFavoris', function () {
  return Favoris.find()
});*/

/*
Meteor.publish('isContactBloquer', function (from_id) {
  new SimpleSchema({
      from_id: {type: String},
    }).validate({from_id});

  return BloquerChat.find({'from_id':from_id, 'to_id':to_id })
});*/
/*
Meteor.publish('isFavoris', function (idMessage, from_id) {
  new SimpleSchema({
      idMessage: {type: String},
      from_id: {type: String},
    }).validate({idMessage,from_id});

  return Favoris.find({'from_id':from_id, 'idMessage':idMessage})
});*/
}
