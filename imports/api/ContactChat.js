import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const ContactChat = new Mongo.Collection('contact_Chat');



if (Meteor.isServer) {

export const LastIdContact = new ValidatedMethod({
  //on met a jour le dernier contact id
  name: 'LastIdContact',
  validate: new SimpleSchema({
  to_id: { type: String },
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({to_id}) {

    Meteor.users.update({_id:this.userId}, {
        $set: { "LastIdContact": to_id},
        })
  }

});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "MyConseiller",
}, requestLimit, requestTimeout);*/


export const LastContact = new ValidatedMethod({
  //on met a jour le dernier contact id
  name: 'LastContact',
  validate: new SimpleSchema({
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({}) {
      const MyId = this.userId;
      const search = Meteor.users.findOne({'_id':this.userId}, {
            fields: {
              'LastIdContact':1,
            }
          })
     
      const LastId = search.LastIdContact;
      if(LastId){
        return LastId
      }else{
        return MyId
      }
  }

});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "MyConseiller",
}, requestLimit, requestTimeout);*/

Meteor.methods({

      addContactChat: function(to_id) {
        new SimpleSchema({
            to_id: {type: String},
          }).validate({
            to_id,
          });

            const user = Meteor.user()
            const userId = Meteor.userId();
            const name = Meteor.users.findOne(to_id);
            const username = name.username;
            const request = ContactChat.findOne({$or : [{from_id: userId, to_id:to_id}, {from_id: to_id, to_id:userId}]});
            {
              to_id!==userId && !request ?
              ContactChat.insert({
                  date: new Date(),
                  last_message : ' ',
                  from_id: Meteor.userId(),
                  from_name: user.username,
                  to_id: to_id,
                  to_name: username,
                  read : false,
                })
              : ''
            }
       },

       deleteContact: function(id) {
        new SimpleSchema({
            id: {type: String},
          }).validate({
            id,
          });
              ContactChat.remove(id)
       },
});


Meteor.publish('AllContactChat', function () {
  return ContactChat.find();
});

Meteor.publish('ContactChat', function () {
  const id = this.userId;
  return ContactChat.find({$or : [{from_id: id}, {to_id:id}]});
});
}
