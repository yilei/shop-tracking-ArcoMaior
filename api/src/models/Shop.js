var db = require("./DB")
var dal = require("./DAL")
var stocks = require("./Stock")

// add query functions
exports.getAll = function(req, res, next) {
   return dal.getAllShops().then(list =>{
       list.map(x => {
         x.day = new Date(x.day).toLocaleString('pt-PT',{year: 'numeric', month: 'numeric', day: 'numeric' })
       });
       return list;
   })
}

exports.getSingle = function(req, res, next) {
   return dal.getSingle( parseInt(req.params.id),"shops")
}

exports.create = function(req, res, next) {
   return dal.create(req.body, "shops")
   .then( id =>{
      return dal.getStockByProdId(req.body["product_id"])
   }).then( row =>{
     oldAmount = 0;
     oldPrice = 0;
     update = 0;
     if(row){
       update = 1;
       if(row[0]["amount"] != 0){
        oldAmount = row[0]["amount"];
        oldPrice = row[0]["price"];
      }
     }
     newAmount=parseFloat(req.body["amount"])
     newPrice=parseFloat(req.body["price"])
     stock ={}
     stock["product_id"] = req.body["product_id"]
     stock["amount"] = oldAmount + newAmount
     stock["price"] = ((oldAmount * oldPrice) + (newAmount * newPrice)) / stock["amount"]

     if(update){
       return dal.update(row[0]["id"],stock , "stocks");
     }else{
       return dal.create(stock,"stocks");
     }
   })
}

exports.update = function(req, res, next) {
   return dal.update(parseInt(req.params.id), req.body,"shops")
}

exports.delete = function(req, res, next) {
   return dal.deletes(parseInt(req.params.id),"shops")
}
