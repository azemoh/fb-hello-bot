// Module dependencies
var express = require('express');
var bodyParser = require('body-parser');

// Express Server
var app = express();


// App Variables
app.set('port', (process.env.PORT || 5000));
app.set('fb_verify_token', process.env.FB_VERIFY_TOKEN);


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
    }
  }
  res.sendStatus(200);
});


// Start Server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
