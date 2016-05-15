// Module dependencies
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

// Express Server
var app = express();


// App Variables
app.set('port', (process.env.PORT || 5000));
app.set('fb_verify_token', process.env.FB_VERIFY_TOKEN);
app.set('fb_page_access_token', process.env.FB_PAGE_ACCESS_TOKEN);

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Test URL
app.get('/hello/', function (req, res) {
  res.send("Hi user :)");
});


// Verify Facebook token
app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === app.get('fb_verify_token')) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});


// Listen to post requests
app.post('/webhook/', function (req, res) {
  var messaging_events = req.body.entry[0].messaging;

  for (var i = 0; i < messaging_events.length; i++) {
    var event = messaging_events[i];
    var sender = event.sender.id;
    if (event.message && event.message.text) {
      var text = event.message.text;

      console.log(text);
      sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
    }
  }
  res.sendStatus(200);
});


var token = app.get('fb_page_access_token');

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

// Start Server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
