/**
 * Created by Colin on 8/9/16.
 */
var config = require('./config'),
  request = require('request');

/**
* Set Up Firebase
*/

module.exports.setupFirebase = function () {
  firebase.initializeApp({
    databaseURL: 'https://' + config.Firebase.Name + '.firebaseio.com',
    serviceAccount: {
      projectId: config.Firebase.ProjectID,
      clientEmail: config.Firebase.Client_Email,
      privateKey: config.Firebase.Private_Key
    }
  });
  config.Firebase.RootDB = firebase.database().ref();
};

/**
 * Send Notification
 */

module.exports.sendPushNotification = function (token, notification, callback) {
  var push_req = {
    method: 'POST',
    url: 'https://fcm.googleapis.com/fcm/send',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'key=' + config.Firebase.Server_Key
    },
    json: {
      'to': token,
      'content_available': true,
      'priority': 'high',
      'notification': notification
    }
  };
  // Make the PUSH API call
  request(push_req, function(err, resp, body) {
    callback(err, resp, body);
  });
};