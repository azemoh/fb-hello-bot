// Modules
var express = require('express');

// Express Server
var app = express();

// App Variables
app.set('port', (process.env.PORT || 5000));
app.set('fb_verify_token', process.env.FB_VERIFY_TOKEN)


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
  messaging_events = req.body.entry[0].messaging;
  for (var i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;

      console.log(text);
    }
  }
  res.sendStatus(200);
});


// Start Server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
