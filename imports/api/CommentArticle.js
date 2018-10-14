import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Articles } from './Articles.js';

export const CommentArticle = new Mongo.Collection('CommentArticle');


if (Meteor.isServer) {

Meteor.startup(function () {  
 
});

Meteor.methods({

      addComment: function(
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
        const naissance = user.profile.naissance;
        const userId = this.userId;
        const postId = id;

        const search = Articles.findOne(id);
        const post_author_id = search.post_author_id;
        const post_author_name= search.post_author;
        const post_title= search.post_title;
        const post_gender= search.gender;
        const nbrReponse = search.nbrReponse;
        const updateNbrReponse = nbrReponse + 1;

              Articles.update(id, {
                $set: { nbrReponse: updateNbrReponse },
                });

              CommentArticle.insert({
                  comments: message,
                  submitted: new Date(),
                  post_author:author,
                  gender:gender,
                  upvoters: [],
                  signalerTab: [],
                  signaler: 0,
                  votes: 0,
                  post_author_name: post_author_name,
                  post_author_id:post_author_id,
                  userId:userId,
                  postId:postId,
                  post_title:post_title,
                  read:false,
                  naissance:naissance,
                  Post_gender:post_gender,
                });

              /*console.log(
                  "comments" +" "+message +" "+
                  "post_author"+" "+author+" "+
                  "post_author_name"+" "+ post_author_name+" "+
                  "post_author_id"+" "+post_author_id+" "+
                  "userId"+" "+userId+" "+
                  "postId"+" "+postId+" "+ "post_title"+" "+post_title+" "+
                  "read"+" "+false)*/
              },

       /* 'signalerReponse'(Id) {
          check(Id, String);
          const search = Comments.findOne(Id);
          const nbrSignaler = search.signaler;
          const updateSignaler = nbrSignaler + 1;

          Comments.update(Id, {
          $set: { signaler: updateSignaler },
          });

          if (!search)
            throw new Meteor.Error('invalid', 'Post not found');
          if (_.include(search.upvoters, this.userId))
            throw new Meteor.Error('invalid', 'Already upvoted this post');
          Comments.update(Id, {
            $addToSet: {signalerTab: this.userId},
          });

          {nbrSignaler == 2 ?
            Comments.remove(Id) : ''
          }
      },

       'vote'(Id) {
          check(Id, String);
          const search = Comments.findOne(Id);
          const nbrvote = search.votes;
          const updatevote = nbrvote + 1;

          Comments.update(Id, {
          $set: { votes: updatevote },
          });

          if (!search)
            throw new Meteor.Error('invalid', 'Post not found');
          if (_.include(search.upvoters, this.userId))
            throw new Meteor.Error('invalid', 'Already upvoted this post');
          Comments.update(Id, {
            $addToSet: {upvoters: this.userId},
          });         
      },

      ReponseChat: function(message_id){
        check(message_id, String);
        Comments.update(message_id, {$set: {read:true} })
      },

      supprimerReponse: function(idMessage) {
         check(idMessage, String);
          Comments.remove({_id:idMessage});
       }, */

});
/*
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
*/
Meteor.publish('reponsesSingleArticle', function (reponse) {
new SimpleSchema({
      reponse: {type: String},
    }).validate({reponse});

  return CommentArticle.find({'postId':reponse});
});
}
