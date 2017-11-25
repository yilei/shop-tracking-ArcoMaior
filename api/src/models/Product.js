var db = require("./DB")
var dal = require("./DAL")

// add query functions
exports.getAll = function(req, res, next) {
   return dal.getAll(req, res, next,"products")
}

exports.getSingle = function(req, res, next) {
   return dal.getSingle(req, res, next,"products")
}

exports.create = function(req, res, next) {
   return dal.create(req, res, next,"products")
}

exports.update = function(req, res, next) {
   return dal.update(req, res, next,"products")
}

exports.delete = function(req, res, next) {
   return dal.deletes(req, res, next,"products")
}
