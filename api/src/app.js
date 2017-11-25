'use strict';

// Constants
const PORT = 3000;

var express = require('express')
var app = express()

var routes = require('./routes/routes')
var bodyParser = require('body-parser')
var cors = require('cors')


// Cross-origin resource sharing
app.use(cors())
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use('/', routes)
/*
app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!')
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
*/
app.get('/', function (req, res) {
  res.send('hello world')
})


app.listen(PORT, function(){
    console.log('Example application listening on port 3000!')
})
