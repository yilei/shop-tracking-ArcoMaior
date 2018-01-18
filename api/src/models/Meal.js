var db = require("./DB")
var dal = require("./DAL")
var products = require("./Product")
var stocks = require("./Stock")

// add query functions
exports.getAll = function(req, res, next) {
   return dal.getAllMeals()
     .then(list =>{
         list.map(x => {
           x.day = new Date(x.day).toLocaleString('pt-PT',{year: 'numeric', month: 'numeric', day: 'numeric' });
           x.price_per_person = (x.price/x.people).toFixed(2) + " €";
         });
         return list;
     })
}

exports.getSingle = function(req, res, next) {
   return dal.getSingleMeal(parseInt(req.params.id), "meal")
}

exports.create = function(req, res, next) {
   var product_list = req.body["products"]
   meal = req.body
   delete meal["products"]
   var createMeal = dal.create(meal,"meals");

   var getProductsListPrice = getProductsPrice(product_list);

   var decreaseStock = stocks.decreaseStocksAmount(product_list);

   return Promise.all([createMeal, getProductsListPrice]).then(function([meal_id, product_list_with_prices]){
     var addProducts = products.addMealProducts(meal_id.id, product_list_with_prices);
     var setMealPrice = updateMealPrice(meal_id.id, product_list_with_prices);

     return Promise.all([addProducts, setMealPrice]).then(function([resultA, resultB]) {
        return meal_id;
    });
  });
}

getProductsPrice = function(product_list){
    return dal.getProductListPrice(product_list).then(result =>{
              result.map(x =>{ x.id = x.product_id; delete x["product_id"]})
              product_list.map(x =>{ x.id = parseInt(x.id)})
              var hash = new Map();
              product_list.concat(result).forEach(function(obj){
                  hash.set(obj.id, Object.assign(hash.get(obj.id) || {}, obj))
              });
       return Array.from(hash.values());
   });
}


updateMealPrice = function(id, product_list){
    var real_price = 0
    product_list.forEach(x => {
      real_price += parseInt(x.amount) * parseInt(x.price);
    })
    dal.update(id,{price: real_price}, "meals")
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
