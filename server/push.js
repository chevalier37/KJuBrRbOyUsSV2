Push.debug = true;

Push.allow({
  send: (userId, notification) => {
    // allow all users to send notifications
    return true;
  }
});

Push.Configure({
  apn: {
    certData: Assets.getText('meteorApp-cert-prod.pem'), 
    keyData: Assets.getText('meteorApp-key-prod.pem'),
    passphrase: 'Rocky159*',
    production: true,
    gateway: 'gateway.push.apple.com',
  },
  gcm: {
    apiKey: 'AIzaSyAb9K6TLBjjMLV35CNZUJWySZnpEK3pOv0',
    projectNumber: 1081222722675
  }
  // production: true,
  // 'sound' true,
  // 'badge' true,
  // 'alert' true,
  // 'vibrate' true,
  // 'sendInterval': 15000, Configurable interval between sending
  // 'sendBatchSize': 1, Configurable number of notifications to send per batch
  // 'keepNotifications': false,
//
});


//Method dépacer dans api/Notifications
/*Meteor.methods({
  'serverNotification'(title, text, id) {
    Push.send({
      title,
      text,
      from: 'Kurbys',
      badge: 1,
      query: {
        userId: id,
      }
    });
  }
});*/