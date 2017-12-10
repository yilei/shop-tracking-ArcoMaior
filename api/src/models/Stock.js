var db = require("./DB")
var dal = require("./DAL")

// add query functions
exports.getAll = function(req, res, next) {
   return dal.getAllStocks(req, res, next,"stocks")
}

exports.getSingle = function(req, res, next) {
   return dal.getSingle(req, res, next,"stocks")
}

exports.create = function(req, res, next) {
   return dal.create(req, res, next,"stocks")
}

exports.update = function(req, res, next) {
   return dal.update(req, res, next,"stocks")
}

exports.delete = function(req, res, next) {
   return dal.deletes(req, res, next,"stocks")
}

exports.decreaseStocksAmount = function(req, res, next, product_list){
  return dal.updateStocksAmount('-')(req, res, next, product_list);
}

exports.increaseStocksAmount = function(req, res, next, product_list){
  return dal.updateStocksAmount('+')(req, res, next, product_list);
}
