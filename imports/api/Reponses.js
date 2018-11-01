import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Posts } from './Messages.js';

export const Comments = new Mongo.Collection('comments');


if (Meteor.isServer) {
const requestLimit = 5;
const requestTimeout = 5000;
DDPRateLimiter.setErrorMessage("Error DDPRateLimiter")



export const addReponse = new ValidatedMethod({
  //on ajoute une réponse
  name: 'addReponse',
  validate: new SimpleSchema({
    message: { type: String },
    id: { type: String }
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({message, id}) {
        const user = Meteor.user();
        const author = user.username;
        const gender = user.profile.gender;
        const naissance = user.profile.naissance;
        const userId = this.userId;
        const postId = id;

        const search = Posts.findOne(id);
        const post_author_id = search.post_author_id;
        const post_author_name= search.post_author;
        const post_title= search.post_title;
        const post_gender= search.gender;
        const nbrReponse = search.nbrReponse;
        const updateNbrReponse = nbrReponse + 1;

        Posts.update(id, {
          $set: { nbrReponse: updateNbrReponse },
          });

        Comments.insert({
            comments: message,
            submitted: new Date(),
            post_author:author,
            gender:gender,
            upvoters: [],
            signalerTab: [],
            signaler: 0,
            votes: 0,
            voteDOWN:0,
            post_author_name: post_author_name,
            post_author_id:post_author_id,
            userId:userId,
            postId:postId,
            post_title:post_title,
            read:false,
            naissance:naissance,
            Post_gender:post_gender,
          });         
  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "addReponse",
}, requestLimit, requestTimeout);*/



export const voteUP = new ValidatedMethod({
  //vote positif
  name: 'voteUP',
  validate: new SimpleSchema({
    Id: { type: String },
    UserId: { type: String }
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({ Id, UserId }) {
      const search = Comments.findOne(Id);
      const nbrvote = search.votes;
      const updatevote = nbrvote + 1;
      Comments.update(Id, {
      $set: { votes: updatevote },
      });

      // on ajoute le vote a l'utilisateur
      const searchUser = Meteor.users.findOne({'_id':UserId});
      const voteUP = searchUser.voteUP;
      if(voteUP){
        const updatevoteUp = voteUP + 1;
        Meteor.users.update(UserId, {
        $set: { voteUP: updatevoteUp },
        });
      }else{
        const updatevoteUp = 1;
        Meteor.users.update(UserId, {
        $set: { voteUP: updatevoteUp },
        });
      }

      if (!search)
        throw new Meteor.Error('invalid', 'Post not found');
      if (_.include(search.upvoters, this.userId))
        throw new Meteor.Error('invalid', 'Already upvoted this post');
      Comments.update(Id, {
        $addToSet: {upvoters: this.userId},
      });         
  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "voteUP",
}, requestLimit, requestTimeout);*/



export const voteDOWN = new ValidatedMethod({
  //vote négatif
  name: 'voteDOWN',
  validate: new SimpleSchema({
    Id: { type: String },
    UserId: { type: String }
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({Id, UserId}) {
      const search = Comments.findOne(Id);
      const nbrvote = search.voteDOWN;
      const updatevote = nbrvote + 1;
      Comments.update(Id, {
      $set: { voteDOWN: updatevote },
      });

      // on ajoute le vote a l'utilisateur
      const searchUser = Meteor.users.findOne({'_id':UserId});
      const voteDOWN= searchUser.voteDOWN;
      if(voteDOWN){
        const updatevoteDOWN = voteDOWN + 1;
        Meteor.users.update(UserId, {
        $set: { voteDOWN: updatevoteDOWN },
        });
      }else{
        const updatevoteDOWN = 1;
        Meteor.users.update(UserId, {
        $set: { voteDOWN: updatevoteDOWN },
        });
      }
console.log(searchUser)
      if (!search)
        throw new Meteor.Error('invalid', 'Post not found');
      if (_.include(search.upvoters, this.userId))
        throw new Meteor.Error('invalid', 'Already upvoted this post');
      Comments.update(Id, {
        $addToSet: {upvoters: this.userId},
      });         
  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "voteDOWN",
}, requestLimit, requestTimeout);*/



export const signalerReponse = new ValidatedMethod({
  //vote négatif
  name: 'signalerReponse',
  validate: new SimpleSchema({
    Id: { type: String }
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({ Id }) {
      const search = Comments.findOne(Id);
      const nbrSignaler = search.signaler;
      const updateSignaler = nbrSignaler + 1;

      Comments.update(Id, {
      $set: { signaler: updateSignaler },
      });

      if (!search)
        throw new Meteor.Error('invalid', 'Post not found');
      if (_.include(search.signalerTab, this.userId))
        throw new Meteor.Error('invalid', 'Already upvoted this post');
      Comments.update(Id, {
        $addToSet: {signalerTab: this.userId},
      });

      {nbrSignaler == 2 ?
        Comments.remove(Id) : ''
      }
  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "signalerReponse",
}, requestLimit, requestTimeout);*/



Meteor.methods({
      ReponseChat: function(message_id){
        check(message_id, String);
        Comments.update(message_id, {$set: {read:true} })
      },

      supprimerReponse: function(idMessage) {
         check(idMessage, String);
          Comments.remove({_id:idMessage});
       }, 

});

Meteor.publish('Allreponses', function ( ) {

  return Comments.find();
});

Meteor.publish('reponsesNotif', function (MyId) {
new SimpleSchema({
      MyId: {type: String},
    }).validate({MyId});

  return Comments.find({'post_author_id':MyId});
});

Meteor.publish('MyReponses', function (myId) {
new SimpleSchema({
      myId: {type: String},
    }).validate({myId});

  return Comments.find({'userId':myId});
});

Meteor.publish('reponsesSingleMessage', function (reponse) {
new SimpleSchema({
      reponse: {type: String},
    }).validate({reponse});

  return Comments.find({'postId':reponse});
});
}
