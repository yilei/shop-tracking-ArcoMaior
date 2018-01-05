var db = require("./DB")
var dal = require("./DAL")
var products = require("./Product")
var stocks = require("./Stock")

// add query functions
exports.getAll = function(req, res, next) {
   return dal.getAllMeals()
     .then(list =>{
         list.map(x => {
           x.day = new Date(x.day).toLocaleString('pt-PT',{year: 'numeric', month: 'numeric', day: 'numeric' })
         });
         return list;
     })
}

exports.getSingle = function(req, res, next) {
   return dal.getSingleMeal(parseInt(req.params.id), "meal")
}

exports.create = function(req, res, next) {
   var product_list = req.body["products"]
   product_list.id = req.body.id;
   delete req.body["products"]
   meal = req.body
   console.log(product_list);
   return dal.create(meal,"meals")
     .then(data => {
         products.addMealProducts(data[0].id, product_list)
     .then(_ =>{
        console.log(product_list);
        stocks.decreaseStocksAmount(product_list)
     }
     ).then(
         console.log(product_list)
     );
       return data[0].id
     }
   )
}

exports.update = function(req, res, next) {
   return dal.update(parseInt(req.params.id), req.body,"meals")
}

exports.delete = function(req, res, next) {
   return dal.getMealProducts(parseInt(req.params.id))
    .then(products => {
      stocks.increaseStocksAmount(products)
    })
    .then(function(){
      dal.deletes(parseInt(req.params.id),"meals")
    }).catch(function (err) {
      return next(err);
    });

}
