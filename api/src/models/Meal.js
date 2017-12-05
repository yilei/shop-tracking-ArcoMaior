var db = require("./DB")
var dal = require("./DAL")
var products = require("./Product")
var stocks = require("./Stock")

// add query functions
exports.getAll = function(req, res, next) {
   return dal.getAllMeals(req, res, next)
}

exports.getSingle = function(req, res, next) {
   return dal.getSingleMeal(req, res, next)
}

exports.create = function(req, res, next) {
   var product_list = req.body["products"]
   product_list.id = req.body.id;
   delete req.body["products"]
   return dal.create(req, res, next,"meals").then(
     function(data){
       console.log("Meal created executed");
       products.addMealProducts(req, res, next, data[0].id, product_list).then(
          stocks.updateStocksFromMeal(req, res, next, data[0].id, product_list)
       );
       console.log("All created executed")
       return data[0].id
     }
   )
}

exports.update = function(req, res, next) {
   return dal.update(req, res, next,"meals")
}

exports.delete = function(req, res, next) {
   return dal.deletes(req, res, next,"meals")
}
