import React from 'react';
import { Email } from 'meteor/email';
import { Meteor } from 'meteor/meteor';
import { GetContactEmail } from '../../server/email-template.js'; 
import { EmailReponse } from '../../server/email-reponse.js'; 
import { EmailRecommandation } from '../../server/email-recommandation.js';
import { EmailObtenirRecommandation } from '../../server/email-laisserRecommandation.js';
import { EmailSignaler } from '../../server/email-signaler.js';
import { EmailPasswordProvisoire } from '../../server/email-passworProvisoire.js';
import { Notifications } from './Notifications.js';

Meteor.startup(() => {
   process.env.MAIL_URL = "smtp://SMTP_Injection:8a7c33dbc3fcb19d1d3610321e91d649f28b1441@smtp.sparkpostmail.com:587";
});

if (Meteor.isServer) {
//Les templates se trouve dans le répertoire Server


Meteor.methods({
  
  NouveauMessage: function(to, from, subject, name, message, id){
        const search = Notifications.findOne({'IdChoix':id});
        if(search){
              const MessagePrive = search.MessagePrive;
               if(MessagePrive){
                      Email.send({
                      to: to,
                      from: from,
                      subject: subject + name,
                      html: GetContactEmail(message, name),
                      });
               }
        }else{
              Email.send({
              to: to,
              from: from,
              subject: subject + name,
              html: GetContactEmail(message, name),
              });
          }
      },

  NouvelleReponse: function(to, from, subject, name, message, titre, id){
    const search = Notifications.findOne({'IdChoix':id});
        if(search){
              const RecoitConseil = search.RecoitConseil;
              if(RecoitConseil){
               Email.send({
                  to: to,
                  from: from,
                  subject: subject + titre,
                  html: EmailReponse(message, name, titre),
                });
              }
        }else{
                  Email.send({
                  to: to,
                  from: from,
                  subject: subject + titre,
                  html: EmailReponse(message, name, titre),
                });
              }
    },

  NouvelleRecommandation: function(to, from, subject, name, message, id){
    const search = Notifications.findOne({'IdChoix':id});
        if(search){
              const recommandation = search.recommandation;
              console.log(recommandation)
              if(recommandation){
               Email.send({
                  to: to,
                  from: from,
                  subject: subject + name,
                  html: EmailRecommandation(message, name),
                });
               }
        }else{
          Email.send({
                  to: to,
                  from: from,
                  subject: subject + name,
                  html: EmailRecommandation(message, name),
                })
         }
  },

  obtenirRecommandationMail: function(to, from, subject, name){
   Email.send({
      to: to,
      from: from,
      subject: subject + name,
      html: EmailObtenirRecommandation( name),
    });
  },

  SignalerMail: function(from, subject, to_id, message){
    let search = Meteor.users.findOne({'_id':to_id});
    let mail = search.profile.mail;  
   Email.send({
      to: mail,
      from: from,
      subject: subject,
      html: EmailSignaler(message),
    });
  },


  PasswordProvisoire: function(to, from, subject, token){
   Email.send({
      to: to,
      from: from,
      subject: subject,
      html: EmailPasswordProvisoire(token),
    });
  },


});

}