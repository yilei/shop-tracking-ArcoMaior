var db = require("./DB")
var dal = require("./DAL")

// add query functions
exports.getAll = function(req, res, next) {
   return dal.getAll(req, res, next,"shops")
}

exports.getSingle = function(req, res, next) {
   return dal.getSingle(req, res, next,"shops")
}

exports.create = function(req, res, next) {
   return dal.create(req, res, next,"shops")
}

exports.update = function(req, res, next) {
   return dal.update(req, res, next,"shops")
}

exports.delete = function(req, res, next) {
   return dal.deletes(req, res, next,"shops")
}
