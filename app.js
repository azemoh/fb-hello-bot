var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('fb_verify_token', process.env.FB_VERIFY_TOKEN)

app.get('/hello/', function (req, res) {
  res.send("Hi user :)");
});

app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === app.get('fb_verify_token')) {
    res.send(req.query['hub.challenge']);
  }

  res.send('Error, wrong validation token');
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
