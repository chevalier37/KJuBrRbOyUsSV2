import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'

import { Posts } from './Messages.js';
import { Conseilleres } from './Conseilleres.js';
import { ContactChat } from './ContactChat.js';
import { Chat } from './Chat.js';
import { Recommandations } from './Recommandations.js';
import { Comments } from './Reponses.js';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

Meteor.startup(function () {  
  Meteor.users._ensureIndex({ username: "text"});
});

if (Meteor.isServer) {
const requestLimit = 10;
const requestTimeout = 5000;
DDPRateLimiter.setErrorMessage("Error DDPRateLimiter")

export const FormSubscribePseudo = new ValidatedMethod({
  //on verifie si le pseudo existe déjà
  name: 'FormSubscribePseudo',
  validate: new SimpleSchema({
    pseudo: { type: String }
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({ pseudo }) {
    let search = Meteor.users.find({'username':pseudo}).count();
    let IsPseudo = false;
    {search >0 ? IsPseudo = true : IsPseudo = false}
    return IsPseudo
  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "FormSubscribePseudo",
}, requestLimit, requestTimeout);*/



export const FormSubscribeMail = new ValidatedMethod({
  //on verifie si le mail existe déjà
  name: 'FormSubscribeMail',
  validate: new SimpleSchema({
    email: { type: String }
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({ email }) {
    let search = Meteor.users.find({'profile.mail':email}).count();
    let IsMail = false;
    {search >0 ? IsMail = true : IsMail = false}
    return IsMail;
  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "FormSubscribeMail",
}, requestLimit, requestTimeout);*/



export const UserExiste = new ValidatedMethod({
  //on verifie que l'utilisateur à un compte pour se connecter
  name: 'UserExiste',
  validate: new SimpleSchema({
    email: { type: String },
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({ email }) {
    let search = Meteor.users.find({'profile.mail':email}).count();
    let Istrue = false;
    {search >0 ? Istrue = true : Istrue = false}
    console.log(Istrue)
    return Istrue;
  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "UserExiste",
}, requestLimit, requestTimeout);*/



export const ResetPassword = new ValidatedMethod({
  //on change le mot de passe
  name: 'ResetPassword',
  validate: new SimpleSchema({
    email: { type: String },
    token: { type: String },
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({ email, token }) {
    let search = Meteor.users.findOne({'profile.mail':email});
    const id = search._id;
    Accounts.setPassword(id, token, {logout:false});
  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "ResetPassword",
}, requestLimit, requestTimeout);*/



export const signalerUser = new ValidatedMethod({
  //on signale un utilisateur
  name: 'signalerUser',
  validate: new SimpleSchema({
    id: { type: String }
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({ id }) {
          let search = Meteor.users.findOne(id)
          let nbrSignaler = search.signaler;
          if(nbrSignaler=="NaN"){nbrSignaler=0}
          let updateSignaler = nbrSignaler + 1;

          Meteor.users.update({'_id':id}, {
                    $set: { signaler: updateSignaler},
                    })

          if (!search)
            throw new Meteor.Error('invalid', 'Post not found');
          if (_.include(search.upvoters, this.userId))
            throw new Meteor.Error('invalid', 'Already upvoted this post');
          Meteor.users.update(id, {
            $addToSet: {upvoters: this.userId},
          });

  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "signalerUser",
}, requestLimit, requestTimeout);*/



export const NBRsignalerUser = new ValidatedMethod({
  //on compte le nombre de fois où l'utilisateur est signaler
  name: 'NBRsignalerUser',
  validate: new SimpleSchema({
    
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run() {
          let search = Meteor.users.findOne({'_id':this.userId}, {
            fields: {
              'signaler':1,
            }
          })
          let nbrSignaler = search.signaler;
          if(nbrSignaler=="NaN"){nbrSignaler==0}
          return nbrSignaler  
         
  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "NBRsignalerUser",
}, requestLimit, requestTimeout);*/



export const IsUserSignaler = new ValidatedMethod({
  //on regarde si l'on a déja signaler cette utilisateur
  name: 'IsUserSignaler',
  validate: new SimpleSchema({
    id: { type: String }
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({ id }) {
          let search = Meteor.users.findOne(id)
          if(_.include(search.upvoters, this.userId)){
           return true
         }
  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "IsUserSignaler",
}, requestLimit, requestTimeout);*/




export const Username = new ValidatedMethod({
  //on cherche le username
  name: 'Username',
  validate: new SimpleSchema({
    id: { type: String },
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({ id }) {
    let search = Meteor.users.findOne({'_id':id},{
    fields: {
      'username':1,
    }
  });
    let username = search.username;  
    return username;
  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "Username",
}, requestLimit, requestTimeout);*/



export const SuperModerateur = new ValidatedMethod({
  //on regarde si l'utilisateur est le superModerateur
  name: 'SuperModerateur',
  validate: new SimpleSchema({
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run() {

    if(this.userId == "qWnQQWAHxQNmZx6sT" ||
       this.userId == "oANNC3P9SpQ5Fw8Qg"
       ){
      return true
    }
    
  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "SuperModerateur",
}, requestLimit, requestTimeout);*/



export const CheckPassword = new ValidatedMethod({
  //on verifie le mot depasse de l'utilisateur pour supprimer son compte
  name: 'CheckPassword',
  validate: new SimpleSchema({
  digest: { type: String },
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({digest}) {
      const user = Meteor.user();
      const password = {digest: digest, algorithm: 'sha-256'};
      const result = Accounts._checkPassword(user, password);
      if(result.error == null){
        return true;
      }else {
      return false;
    }   
  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "SuperModerateur",
}, requestLimit, requestTimeout);*/


export const addModerateur = new ValidatedMethod({
  //on ajoute un moderateur
  name: 'addModerateur',
  validate: new SimpleSchema({
  id: { type: String },
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({id}) {
    if(this.userId == "qWnQQWAHxQNmZx6sT" ||
       this.userId == "oANNC3P9SpQ5Fw8Qg"
       ){
        Meteor.users.update({_id:id}, {
        $set: { "moderateur": true,},
        })
      }
  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "addModerateur",
}, requestLimit, requestTimeout);*/



export const IsModerateur = new ValidatedMethod({
  //on virifie si l'utilisateur est un moderateur
  name: 'IsModerateur',
  validate: new SimpleSchema({
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run() {
      
        let search = Meteor.users.findOne({'_id':this.userId},{
    fields: {
      'moderateur':1,
    }
  });
        let Ismoderateur = search.moderateur;
        return Ismoderateur;        
  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "IsModerateur",
}, requestLimit, requestTimeout);*/



export const UserOnline= new ValidatedMethod({
  //on regarde si l'utilisateur est connecté
  name: 'UserOnline',
  validate: new SimpleSchema({
    id: { type: String },
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({ id}) {
    let search = Meteor.users.findOne(id);
    let online = search.status.online;
    if(!online){
    const IsConseiller = Conseilleres.find({'user_id':id}).count();
    {IsConseiller>0 ? Istrue = true : Istrue = false}
    if (Istrue) {
      if(IsConseiller){
        Conseilleres.update({user_id:id}, {
        $set: { online: false},
        })
      }
  }
}

  }
});


export const sexContact= new ValidatedMethod({
  //on cherche le sexe de l'utilisateur pour la liste des contacts
  name: 'sexContact',
  validate: new SimpleSchema({
    to_id: { type: String },
    from_id: { type: String },
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({ to_id, from_id}) {
    if(to_id === this.userId){
        const id = from_id;
        let search = Meteor.users.findOne({'_id':id},{
          fields: {
            'profile.gender':1,
          }
        });
        let gender = search.profile.gender;
        return gender
    } else{
        const id = to_id;
        let search = Meteor.users.findOne({'_id':id},{
          fields: {
            'profile.gender':1,
          }
        });
        let gender = search.profile.gender;
        return gender
    }
  }
});



export const nuit = new ValidatedMethod({
  //on met à jour le champs nuit si l'utilisateur le souhaite
  name: 'nuit',
  validate: new SimpleSchema({
  nuit: { type: Boolean },
  }).validator(),

    applyOptions: {
    noRetry: true,
  },

  run({nuit}) {
    Meteor.users.update({_id:this.userId}, {
                    $set: { "nuit": nuit},
                    })
    
  }
});


export const ModeNuit = new ValidatedMethod({
  //on vérifie si l'utilisateur est en mode nuit
  name: 'ModeNuit',
  validate: new SimpleSchema({
  }).validator(),

    applyOptions: {
    noRetry: true,
  },

  run() {
    const search = Meteor.users.findOne({_id:this.userId}, {
    fields: {
      'nuit':1
    }});
    const nuit = search.nuit;
    return nuit
  }
});

Meteor.methods({

      /*FormLogin: function(username,password) {
                   new SimpleSchema({
                    username: {type: String},
                    password: {type: String},
                  }).validate({
                    username,
                    password
                  });
                /*let search = Meteor.users.find({'profile.mail':email.email}).count();
                let IsMail = false;
                {search >0 ? IsMail = true : IsMail = false}
                //console.log(IsMail)
                //console.log(search)
                return username;
             },*/


      MiseAjourNaissance: function(date) {
                    Meteor.users.update({_id:this.userId}, {
                    $set: { "profile.naissance": date},
                    })
                    Conseilleres.update({user_id:this.userId}, {
                    $set: { "naissance": date},
                    })
             },

      usernameRecommander: function(id) {
                      check(id, Object);

                      let search = Meteor.users.findOne({'_id':id.id},{
                          fields: {
                            'username':1,
                            'profile.gender':1,
                            'profile.naissance':1,
                          }
                        });
                      let IsPseudo = false;
                      {search >0 ? IsPseudo = true : IsPseudo = false}
                      /*console.log(typeof id.id)
                      console.log(IsPseudo)
                      console.log(search)*/
                      return search;
                   },

      supprimerCompte: function() {
          const myId = this.userId;

          Meteor.users.remove({_id:myId});
          
          if(Posts.find({post_author_id:myId}).count() >0){
            Posts.remove({post_author_id:myId})
            //console.log("posts")
          }

          if(Conseilleres.find({user_id:myId}).count() >0){
          Conseilleres.remove({user_id:myId}) 
          //console.log("Conseilleres")
          }

          if(ContactChat.find({from_id:myId}).count() >0 || ContactChat.find({to_id:myId}).count() >0){
          ContactChat.remove({from_id:myId})
          ContactChat.remove({to_id:myId}) 
          //console.log("ContactChat") 
          }

          if(Chat.find({from_id:myId}).count() >0 || Chat.find({to_id:myId}).count() >0){
          Chat.remove({from_id:myId})
          Chat.remove({to_id:myId}) 
          //console.log("Chat") 
          }

          if(Recommandations.find({from_id:myId}).count() >0 || Recommandations.find({to_id:myId}).count() >0){
          Recommandations.remove({from_id:myId})
          Recommandations.remove({to_id:myId}) 
          //console.log("Recommandations") 
          }

          if(Comments.find({userId:myId}).count() >0){
          Comments.remove({userId:myId})
          //console.log("Comments") 
          }

       },

        UpdateConseiller: function() {
              const isConseiller = Conseilleres.find({user_id:this.userId}).count()

              if(isConseiller>=1){
                    Meteor.users.update({_id:this.userId}, {
                    $set: { "conseiller": true,},
                    })
                }
             }, 

});

Accounts.onCreateUser(function(options, user) {
   // Use provided profile in options, or create an empty object
   user.profile = options.profile || {};
   // Assigns first and last names to the newly created user object
   user.profile.mail = options.mail;
   user.profile.naissance  = options.naissance;
   user.profile.gender = options.sexe;
   user.profile.createdAt = options.createdAt;
   user.profile.note = 0;
   // Returns the user object
   return user;
});



Meteor.publish('fetchUser', function ( ) {
  const options = {
    fields: { username: 1 }
  };
  return Meteor.users.find(options);
});

Meteor.publish('allConseiller', function () {
   return Meteor.users.find({}, {
    fields: {'username':1, 'profile':1, 'conseiller':1, "status.online":1,}
  });
});

Meteor.publish('all', function () {
   return Meteor.users.find({}, {
    fields: {'username':1, 'profile.gender':1}
  });
});


/*Meteor.publish('userDon', function (id) {
  new SimpleSchema({
      id: {type: String},
    }).validate({id});
  return Meteor.users.find({'_id':id}, {
    fields: {'status.online':1, 'profile.mail':1}
  });
});*/

Meteor.publish('SearchUsers', function (user) {
  /*var pattern = new RegExp("^" + user );*/
  return Meteor.users.find({"username": {$regex:  "^[" + user +"]" , $options:"i"}}, { sort: { username: 1 }, limit:5, fields: {
      'username':1,
      'profile.gender':1,
      '_id':1,
    }} );

  /*return Meteor.users.find({$text: {$search:  user }}, { sort: { username: -1 }, limit:5, fields: {
      'username':1,
      'profile.gender':1,
      '_id':1,
    }} );*/




});


Meteor.publish('username', function (id) {
  //ProfilContentVisite.js
  new SimpleSchema({
      id: {type: String},
    }).validate({id});
  return Meteor.users.find({'_id':id}, {
    fields: {
      'username':1,
      'status.lastLogin.date':1,
      'profile.gender':1,
      'profile.naissance':1,
      'status.online':1,
      'profile.naissance':1,
    }
  });
});

}
