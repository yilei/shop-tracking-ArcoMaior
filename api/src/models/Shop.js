var db = require("./DB")
var dal = require("./DAL")

// add query functions
exports.getAll = function(req, res, next) {
   return dal.getAllShops(req, res, next).then(list =>{
       list.map(x => {
         x.day = new Date(x.day).toLocaleString('pt-PT',{year: 'numeric', month: 'numeric', day: 'numeric' })
       });
       return list;
   })
}

exports.getSingle = function(req, res, next) {
   return dal.getSingle(req, res, next,"shops")
}

exports.create = function(req, res, next) {
   return dal.create(req, res, next,"shops")
}

exports.update = function(req, res, next) {
   return dal.update(req, res, next,"shops")
}

exports.delete = function(req, res, next) {
  console.log("deletes")
   return dal.deletes(req, res, next,"shops")
}
