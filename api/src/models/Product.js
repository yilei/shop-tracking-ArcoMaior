var db = require("./DB")
var dal = require("./DAL")

// add query functions
exports.getAll = function(req, res, next) {
   return dal.getAll("products")
}

exports.getSingle = function(req, res, next) {
   return dal.getSingle(parseInt(req.params.id),"products")
}

exports.getAllInStock = function(req, res, next) {
   return dal.getAllProductsInStock()
}

exports.create = function(req, res, next) {
   return dal.create(req.body, "products")
}

exports.update = function(req, res, next) {
   return dal.update(parseInt(req.params.id), req.body,"products")
}

exports.delete = function(req, res, next) {
   return dal.deletes(parseInt(req.params.id),"products")
}

exports.addMealProducts = function(id ,products){
  return dal.batchInsertMealProducts( id ,products);
}
