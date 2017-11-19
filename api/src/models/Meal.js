var db = require("./DB")

// add query functions
exports.getAll = function(req, res, next) {
  return db.any('select * from meals')
}
