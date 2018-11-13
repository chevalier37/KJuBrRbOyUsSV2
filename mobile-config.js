App.info({
  id: 'com.idb9qf011pqj13l1a3vqwl', // replace with your bundle ID
  name: 'Kurbys' ,
  /*version: "1.10.18",
  buildNumber: '28'*/              
});

App.configurePlugin('phonegap-plugin-push', {
  // Dummy value
  // If using Google GCM you should use your app id instead
  SENDER_ID: '1081222722675'
});


App.icons({
  'android_mdpi': 'public/icons/android_mdpi.png',
  'android_hdpi': 'public/icons/android_hdpi.png',
  'android_xhdpi': 'public/icons/android_xhdpi.png',
  'android_xxhdpi': 'public/icons/android_xxhdpi.png',
  'android_xxxhdpi': 'public/icons/android_xxxhdpi.png',
});

App.launchScreens({
  'android_hdpi_portrait': 'public/icons/android_hdpi_portrait.png',
  'android_mdpi_portrait': 'public/icons/android_mdpi_portrait.png',
  'android_xhdpi_portrait': 'public/icons/android_xhdpi_portrait.png',
  'android_xxhdpi_portrait': 'public/icons/android_xxxhdpi_portrait.png',
  'android_xxxhdpi_portrait': 'public/icons/android_xxxhdpi_portrait.png',
});