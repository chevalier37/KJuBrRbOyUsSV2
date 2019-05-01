import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { publishComposite } from 'meteor/reywood:publish-composite';

export const Conseilleres = new Mongo.Collection('conseilleres');
import { Comments } from './Reponses.js';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { Notifications } from './Notifications.js';

if (Meteor.isServer) {
const requestLimit = 5;
const requestTimeout = 5000;
DDPRateLimiter.setErrorMessage("Error DDPRateLimiter")



export const IsConseiller = new ValidatedMethod({
  //on verifie si l'utilisateur est conseiller
  name: 'IsConseiller',
  validate: new SimpleSchema({
  id: { type: String },
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({id}) {
    const IsConseiller = Conseilleres.find({'user_id':id}).count();
    {IsConseiller>0 ? Istrue = true : Istrue = false}

    const search = Meteor.users.findOne({'_id':this.userId});
    const voteUP = search.voteUP;
    let voteDOWN = search.voteDOWN;
    {!voteDOWN ? voteDOWN = 0 : ""}
    const ratio = (voteUP / (voteUP+voteDOWN))*100;
    const NBRaide = Comments.find({'userId':this.userId}).count();
      if(IsConseiller<=0){
       if(!Istrue && ratio >= 85 && NBRaide >= 25){// l'utilisateur peut devenir conseiller
        const notif = Notifications.find({"to_id":this.userId,"type":'conseiller' }).count()// on regarde si l'utilisateur n'a pas déjà reçu une notification
          if (notif == 0){
            Notifications.insert({
                        date: new Date(),
                        to_id:this.userId,
                        read:false,
                        type:'conseiller',
                      });
          }
        }
      }
    return Istrue;
  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "IsConseiller",
}, requestLimit, requestTimeout);*/



export const MyConseiller = new ValidatedMethod({
  //on verifie si l'utilisateur est conseiller
  name: 'MyConseiller',
  validate: new SimpleSchema({
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({}) {
    const IsConseiller = Conseilleres.find({'user_id':this.userId}).count();
    {IsConseiller>0 ? Istrue = true : Istrue = false}

    return Istrue;
  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "MyConseiller",
}, requestLimit, requestTimeout);*/



export const supprimerConseiller = new ValidatedMethod({
  //l'utilisateur ne veut plus être conseiller
  name: 'supprimerConseiller',
  validate: new SimpleSchema({
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({}) {
    Conseilleres.remove({_id:this.userId});
    Meteor.users.update({_id:this.userId}, {
                    $set: {"conseiller": false},
                    })
  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "supprimerConseiller",
}, requestLimit, requestTimeout);*/



export const loginConseiller = new ValidatedMethod({
  //on met à jour la table conseiller si l'utilisateur se connecte
  name: 'loginConseiller',
  validate: new SimpleSchema({
  id: { type: String }
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({id}) {
    const IsConseiller = Conseilleres.find({'user_id':id}).count();
    {IsConseiller>0 ? Istrue = true : Istrue = false}
    if (Istrue) {
      if(IsConseiller){
        Conseilleres.update({user_id:id}, {
        $set: { online: true},
        })
      }
  }
  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "loginConseiller",
}, requestLimit, requestTimeout);*/



export const logoutConseiller = new ValidatedMethod({
  //on met à jour la table conseiller si l'utilisateur se déconnecte
  name: 'logoutConseiller',
  validate: new SimpleSchema({
  id: { type: String }
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({id}) {
    const IsConseiller = Conseilleres.find({'user_id':id}).count();
    {IsConseiller>0 ? Istrue = true : Istrue = false}
    if (Istrue) {
      if(IsConseiller){
        Conseilleres.update({user_id:id}, {
        $set: { online: false},
        })
      }/*else{
       Conseilleres.insert({online:true});
    }*/
  }
  }
});
/*DDPRateLimiter.addRule({
    type: "method",
    name: "logoutConseiller",
}, requestLimit, requestTimeout);*/


export const verifConseiller = new ValidatedMethod({
  //on verifie si l'utilisateur peut devenir conseiller
  name: 'verifConseiller',
  validate: new SimpleSchema({
  }).validator(),

  applyOptions: {
    noRetry: true,
  },

  run({}) {
    const search = Meteor.users.findOne({'_id':this.userId});
    const voteUP = search.voteUP;
    let voteDOWN = search.voteDOWN;

    if( !voteDOWN){
      let voteDOWN=0
      const ratio = (voteUP / (voteUP+voteDOWN))*100;
      const NBRaide = Comments.find({'userId':this.userId}).count();
        if(ratio >= 85 && NBRaide >= 25){
          return true;
        }else{
          return false
        }
    }else{
      const ratio = (voteUP / (voteUP+voteDOWN))*100;
      const NBRaide = Comments.find({'userId':this.userId}).count();
        if(ratio >= 85 && NBRaide >= 25){
          return true;
        }else{
          return false
        }
    }
    

    
  }
});
DDPRateLimiter.addRule({
    type: "method",
    name: "verifConseiller",
}, requestLimit, requestTimeout);



Meteor.methods({

      premierAmour: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { premierAmour: theme, premierAmourText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  premierAmourText:text,
                  premierAmour:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      SupprimerpremierAmour: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { premierAmour: false, premierAmourText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      trahison: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { trahison: theme, trahisonText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  trahisonText:text,
                  trahison:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      Supprimertrahison: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { trahison: false, trahisonText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      Friendzone: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { Friendzone: theme, FriendzoneText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  FriendzoneText:text,
                  Friendzone:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      Supprimerfriendzone: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { Friendzone: false, FriendzoneText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      amourdistance: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { amourdistance: theme, amourdistanceText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  amourdistanceText:text,
                  amourdistance:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      SupprimerDistance: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { amourdistance: false, amourdistanceText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      separation: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { separation: theme, separationText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  separationText:text,
                  separation:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      Supprimerseparation: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { separation: false, separationText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      timidite: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { timidite: theme, timiditeText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  timiditeText:text,
                  timidite:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      Supprimertimidite: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { timidite: false, timiditeText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      depression: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { depression: theme, depressionText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  depressionText:text,
                  depression:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      Supprimerdepression: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { depression: false, depressionText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      mutilation: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { mutilation: theme, mutilationText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  mutilationText:text,
                  mutilation:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      Supprimermutilation: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { mutilation: false, mutilationText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      suicide: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { suicide: theme, suicideText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  suicideText:text,
                  suicide:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      Supprimersuicide: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { suicide: false, suicideText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      deces: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { deces: theme, decesText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  decesText:text,
                  deces:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      Supprimerdeces: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { deces: false, decesText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },


      premierfois: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { premierfois: theme, premierfoisText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  premierfoisText:text,
                  premierfois:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      SupprimerpremiereFois: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { premierfois: false, premierfoisText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      contraception: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { contraception: theme, contraceptionText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  contraceptionText:text,
                  contraception:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      Supprimercontraception: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { contraception: false, contraceptionText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      mst: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { mst: theme, mstText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  mstText:text,
                  mst:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      Supprimermst: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { mst: false, mstText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      viol: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { viol: theme, violText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  violText:text,
                  viol:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      Supprimerviol: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { viol: false, violText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      avortement: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { avortement: theme, avortementText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  avortementText:text,
                  avortement:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

       Supprimeravortement: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { avortement: false, avortementText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      orientationSex: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { orientationSex: theme, orientationSexText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  orientationSexText:text,
                  orientationSex:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      SupprimerorientationSex: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { orientationSex: false, orientationSexText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      Anorexie: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { Anorexie: theme, AnorexieText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  AnorexieText:text,
                  Anorexie:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      Supprimeranorexie: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { Anorexie: false, AnorexieText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      obesite: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { obesite: theme, obesiteText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  obesiteText:text,
                  obesite:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      Supprimerobesite: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { obesite: false, obesiteText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      drogue: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { drogue: theme, drogueText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  drogueText:text,
                  drogue:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      Supprimerdrogue: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { drogue: false, drogueText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      alcool: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { alcool: theme, alcoolText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  alcoolText:text,
                  alcool:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      Supprimeralcool: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { alcool: false, alcoolText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      complexe: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { complexe: theme, complexeText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  complexeText:text,
                  complexe:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      Supprimercomplexe: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { complexe: false, complexeText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      hopital: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { hopital: theme, hopitalText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  hopitalText:text,
                  hopital:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      Supprimerhopital: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { hopital: false, hopitalText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      accident: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { accident: theme, accidentText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  accidentText:text,
                  accident:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      Supprimeraccident: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { accident: false, accidentText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      handicap: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { handicap: theme, handicapText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  handicapText:text,
                  handicap:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      Supprimerhandicap: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { handicap: false, handicapText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      echecEcole: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { echecEcole: theme, echecEcoleText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  echecEcoleText:text,
                  echecEcole:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

      SupprimerechecEcole: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { echecEcole: false, echecEcoleText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      Harcelement: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { Harcelement: theme, HarcelementText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  HarcelementText:text,
                  Harcelement:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

       SupprimerHarcelement: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { Harcelement: false, HarcelementText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      discrimination: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { discrimination: theme, discriminationText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  discriminationText:text,
                  discrimination:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },

       Supprimerdiscrimination: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { discrimination: false, discriminationText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      Violence: function(theme, text) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { Violence: theme, ViolenceText:text, },
              }) && console.log(IsConseiller)
             :
             Conseilleres.insert({
                  ViolenceText:text,
                  Violence:theme,
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                });
            } 
      },


      Supprimerviolence: function() {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            {
              IsConseiller
             ?
             Conseilleres.update({user_id:this.userId}, {
              $set: { Violence: false, ViolenceText:" ", },
              }) && console.log(IsConseiller)
             :
             ""
            } 
      },

      DevenirConseiller: function(presentation) {
            const user = Meteor.user()
            const IsConseiller = Conseilleres.findOne({user_id:this.userId});
            
            if(IsConseiller){
             Conseilleres.update({user_id:this.userId}, {
              $set: { presentation: presentation},
              }) 
           }else{
             Conseilleres.insert({
                  user_id: this.userId,
                  username: user.username,
                  gender :user.profile.gender,
                  date: new Date(),
                  naissance:user.profile.naissance,
                  presentation: presentation,
                  Online:true,
                });

             Meteor.users.update({_id:this.userId}, {
                    $set: { "conseiller": true},
                    })
                }
      },
});




publishComposite('AllConseillers', {
    find() {
        let allConseiller = Conseilleres.find(
          {'online':true},{limit:30} 
          );      
  return allConseiller;
    }/*,
    children: [
        {   collectionName: "relatedArticles1",
            find(post) {
                return Conseilleres.find(
                    { 'user_id': post._id },
                    { fields: { gender: 1, separation:1 } });
            }
        }
        
    ]*/
});



Meteor.publish('IsConseiller', function (id) {
  new SimpleSchema({
      id: {type: String},
    }).validate({id});
  return Conseilleres.find({'user_id':id});
});


Meteor.publish('lastConseillers', function () {
  return Conseilleres.find({}, { sort: {date: -1 }, limit:5 });
});

}
