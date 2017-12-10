var db = require("./DB")
var dal = require("./DAL")
var products = require("./Product")
var stocks = require("./Stock")

// add query functions
exports.getAll = function(req, res, next) {
   return dal.getAllMeals(req, res, next)
     .then(list =>{
         list.map(x => {
           x.day = new Date(x.day).toLocaleString('pt-PT',{year: 'numeric', month: 'numeric', day: 'numeric' })
         });
         return list;
     })
}

exports.getSingle = function(req, res, next) {
   return dal.getSingleMeal(req, res, next)
}

exports.create = function(req, res, next) {
   var product_list = req.body["products"]
   product_list.id = req.body.id;
   delete req.body["products"]
   return dal.create(req, res, next,"meals")
     .then(function(data){
        products.addMealProducts(req, res, next, data[0].id, product_list)
       .then(
        stocks.decreaseStocksAmount(req, res, next, product_list)
     );
       return data[0].id
     }
   )
}

exports.update = function(req, res, next) {
   return dal.update(req, res, next,"meals")
}

exports.delete = function(req, res, next) {
   return dal.getMealProducts(req, res, next)
    .then(products => {
      stocks.increaseStocksAmount(req, res, next, products)
    })
    .then(function(){
      dal.deletes(req, res, next,"meals")
    }).catch(function (err) {
      return next(err);
    });

}
