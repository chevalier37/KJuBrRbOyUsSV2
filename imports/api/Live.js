import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Live = new Mongo.Collection('live');

if (Meteor.isServer) {

//on ajoute une vidéo live
export const addLive = new ValidatedMethod({
  name: 'addLive',
  validate: new SimpleSchema({
            idVideo: {type: String},
          }).validator(),
            
  applyOptions: {
    noRetry: true,
  },

  run({ 
        idVideo,
   }) {
          Live.insert({
                  idVideo:idVideo,
                  video: true,
                  post_date:new Date(),
                  author_live_id : this.userId,
                });
  }

});

//on cherche si la vidéo du live
export const searchLive = new ValidatedMethod({
  name: 'searchLive',
  validate: new SimpleSchema({
          }).validator(),
            
  applyOptions: {
    noRetry: true,
  },

  run({ 
       
   }) {
    
        let result = Live.findOne({},{'video':true});
        if(result.video){
        const idVideo = result.idVideo;
        return idVideo
        }
  }

});

//on supprime le live
export const supprimerLive = new ValidatedMethod({
  name: 'supprimerLive',
  validate: new SimpleSchema({
          }).validator(),
            
  applyOptions: {
    noRetry: true,
  },

  run({ 
       
   }) {
    
        Live.remove({});
        return true
  }

});

export const addMessageLive = new ValidatedMethod({
  //on ajoute une réponse
  name: 'addMessageLive',
  validate: new SimpleSchema({
    message: { type: String },
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({message}) {
        const user = Meteor.user();
        const author = user.username;
        const gender = user.profile.gender;
        const naissance = user.profile.naissance;
        const userId = this.userId;

        Live.insert({
            message:true,
            comments: message,
            post_date: new Date(),
            post_author:author,
            gender:gender,
            userId:userId,
            naissance:naissance,
          });         
  }
});

Meteor.publish('AllMessagesLive', function () {
  return Live.find({'message':true}, { sort: { post_date: -1 }, limit:50});
});

}