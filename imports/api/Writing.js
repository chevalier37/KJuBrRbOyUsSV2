import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export let Writing = new Mongo.Collection('writing');



if (Meteor.isServer) {

/*Meteor.startup(function () {  
  Favoris._ensureIndex({ "from_id": 1});
});*/

Meteor.methods({

      writing: function(to_id) {
          new SimpleSchema({
            to_id: {type: String},
          }).validate({
            to_id
          });

          const isExiste = Writing.find({from_id:this.userId, to_id:to_id}).count();
          if(!isExiste){
            Writing.insert({
                  from_id:this.userId,
                  to_id:to_id,
                  writing:true,
                });      
          }

          if(isExiste){
            Writing.update({from_id:this.userId, to_id:to_id}, {$set: {writing:true}})
          }
   
       },

       NOTwriting: function(to_id) {
          new SimpleSchema({
            to_id: {type: String},
          }).validate({
            to_id
          });

          const isExiste = Writing.find({from_id:this.userId, to_id:to_id}).count();
          if(isExiste){
            Writing.update({from_id:this.userId, to_id:to_id}, {$set: {writing:false}})
          }
       },
       
});

Meteor.publish('isWriting', function (to_id) {
  new SimpleSchema({
      to_id: {type: String},
    }).validate({to_id});

  return Writing.find({to_id:this.userId, from_id:to_id})
});

}
