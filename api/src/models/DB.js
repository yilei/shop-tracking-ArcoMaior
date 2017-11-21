var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://app:app123.@postgres';
var db = pgp(connectionString);

module.exports = db;
