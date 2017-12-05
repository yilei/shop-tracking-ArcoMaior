var db = require("./DB")
var dal = require("./DAL")

// add query functions
exports.getAll = function(req, res, next) {
   return dal.getAll(req, res, next,"stocks")
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

exports.updateStocksFromMeal = function(req, res, next, meal_id, product_list){
  console.log("Meal:"+meal_id+"  Decreasing the following product stocks");
  console.log(product_list);
  return dal.updateStocksFromMeal(req, res, next, product_list);
}
