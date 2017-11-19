var db = require("./DB")

// add query functions
function getAll(req, res, next, type) {
   return db.any('select * from $1:name',type)
}

function getSingle(req, res, next) {
  return db.any('select * from meals')
}

module.exports = {
  getAll: getAll,
  getSingle: getSingle,
//  create: create,
//  update: update,
//  delete: delete
};
