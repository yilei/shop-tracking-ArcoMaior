var db = require("./DB")
var dal = require("./DAL")
var products = require("./Product")

// add query functions
exports.getAll = function(req, res, next) {
   return dal.getAllMeals(req, res, next,"meals")
}

exports.getSingle = function(req, res, next) {
   return dal.getSingle(req, res, next,"meals")
}

exports.create = function(req, res, next) {
   return dal.create(req, res, next,"meals")
}

exports.update = function(req, res, next) {
   return dal.update(req, res, next,"meals")
}

exports.delete = function(req, res, next) {
   return dal.deletes(req, res, next,"meals")
}
