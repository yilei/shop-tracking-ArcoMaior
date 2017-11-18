'use strict';

// Constants
const PORT = 3000;

var express = require('express')
var app = express()

var index = require('./routes/index')

app.use('/', index)

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!')
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(PORT, function(){
    console.log('Example application listening on port 3001!')
})
