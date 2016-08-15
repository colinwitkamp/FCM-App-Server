var express = require('express');
var router = express.Router();
var fcm = require('../fcm');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/push', function (req, res) {
  var notification = req.body.notification; //Notification object
  var token = req.body.token; //FCM token
  fcm.sendPushNotification(token, notification, function (err, resp, body) {
    res.send({
      err:err,
      resp: resp,
      body: body
    });
  });
});
module.exports = router;
