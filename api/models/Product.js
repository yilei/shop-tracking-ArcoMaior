var db = require("./DB")


// add query functions
function getAll(req, res, next) {
  return db.any('select * from products')
}
