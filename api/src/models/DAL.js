var db = require("./DB")

// add query functions
function getAll(req, res, next, type) {
    return db.any('select * from $1:name',type)
}

function getSingle(req, res, next , type) {
  var id = parseInt(req.params.id)
  return db.one('select * from $1:name where id = $2',[type, id])
}


function create(req, res, next , type) {
  //console.log(req.query)
  var query_string = db.$config.pgp.helpers.insert(req.body, null, type)+"RETURNING id";
  console.log(query_string);
  return db.query(query_string)
}

function update(req, res, next , type) {
  //console.log(req.query)
  var query_string = db.$config.pgp.helpers.update(req.body, null, type) + ' WHERE id = ' + parseInt(req.params.id);
  console.log(query_string);
  return db.none(query_string)
}

// delete name was returning the following error SyntaxError: Unexpected token delete
function deletes(req, res, next , type) {
  //console.log(req.query)
  var id = parseInt(req.params.id)
  return db.result('delete  from $1:name where id = $2',[type, id])
}

function getAllMeals(req, res, next, type) {
  // Get all meals with their products name, having or not products
    var query_sting = "SELECT meals.*, string_agg(products.name, ', ') as products \
                          FROM meals \
                          LEFT OUTER JOIN meal_products ON meals.id=meal_products.meal_id \
                          LEFT OUTER JOIN products ON products.id=meal_products.product_id \
                          GROUP BY meals.id;"
    return db.query(query_sting)
}
module.exports = {
  getAll: getAll,
  getSingle: getSingle,
  create: create,
  update: update,
  deletes: deletes,
  getAllMeals: getAllMeals
};
