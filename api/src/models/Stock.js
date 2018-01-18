var db = require("./DB")
var dal = require("./DAL")

// add query functions
exports.getAll = function(req, res, next) {
   return dal.getAllStocks("stocks")
    .then(list =>{
       list.map(x => {
         x.price = x.price.toFixed(2) + " €";
       });
       return list;
   })
}

exports.getSingle = function(req, res, next) {
   return dal.getSingle( parseInt(req.params.id),"stocks")
}

exports.create = function(req, res, next) {
   return dal.create(req.body,"stocks")
}

exports.update = function(req, res, next) {
   return dal.update(parseInt(req.params.id), req.body,"stocks")
}

exports.delete = function(req, res, next) {
   return dal.deletes(parseInt(req.params.id),"stocks")
}

exports.decreaseStocksAmount = function(product_list){
  return dal.updateStocksAmount('-')(product_list);
}

exports.increaseStocksAmount = function(product_list){
  return dal.updateStocksAmount('+')(product_list);
}
