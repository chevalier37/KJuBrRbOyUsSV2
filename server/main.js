import { Meteor } from 'meteor/meteor';

import '../imports/api/Users.js';
import '../imports/api/Messages.js';
import '../imports/api/Reponses.js';
import '../imports/api/Conseilleres.js';
import '../imports/api/Chat.js';
import '../imports/api/ContactChat.js';
import '../imports/api/mail.js';
import '../imports/api/Notifications.js';
import '../imports/api/BloquerChat.js';
import '../imports/api/Writing.js';
import '../imports/api/Videos.js';
import '../imports/api/Articles.js';
import '../imports/api/CommentArticle.js';
import '../imports/api/Live.js';

Meteor.startup(() => {
  /*process.env.ROOT_URL = 'https://www.kurbys.com';
  process.env.MONGO_OPLOG_URL = 'mongodb://jbr:Rocky159*@ds145919-a0.mlab.com:45919,ds145919-a1.mlab.com:45919/local?replicaSet=rs-ds145919&authSource=admin';
  process.env.MONGO_URL = 'mongodb://jbr:Rocky159*@ds145919-a0.mlab.com:45919,ds145919-a1.mlab.com:45919/kurbys?replicaSet=rs-ds145919';*/
});
