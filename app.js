var express = require('express');
var app = express();

app.get('/hello/', function () {
  res.send("Hi user :)");
});

app.post('/webhook/', function (req, res) {
  res.send("Hello world");
});
