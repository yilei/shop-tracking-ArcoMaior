'use strict';

// Constants
const PORT = 3000;

var express = require('express')
var app = express()

var routes = require('./routes/routes')

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