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

function getAllMeals(req, res, next) {
  // Get all meals with their products name, having or not products
    var query_sting = "SELECT meals.*, string_agg(products.name, ', ') as products \
                          FROM meals \
                          LEFT OUTER JOIN meal_products ON meals.id=meal_products.meal_id \
                          LEFT OUTER JOIN products ON products.id=meal_products.product_id \
                          GROUP BY meals.id;"
    return db.query(query_sting)
}

function getSingleMeal(req, res, next) {
  // Get all meals with their products name, having or not products
  var id = parseInt(req.params.id)
  var query_sting = "SELECT meals.*, string_agg(products.name, ', ') as products \
                          FROM meals \
                          LEFT OUTER JOIN meal_products ON meals.id=meal_products.meal_id \
                          LEFT OUTER JOIN products ON products.id=meal_products.product_id \
                          WHERE meals.id = $1 \
                          GROUP BY meals.id;"
    return db.one(query_sting, id)
}

function getAllProductsInStock(req, res, next) {
  // Get all meals with their products name, having or not products
    var query_string = "SELECT stocks.id as id, name, description,amount \
                          FROM products \
                          JOIN stocks ON products.id=stocks.product_id \
                          WHERE amount!=0;"
    return db.query(query_string)
}

function batchInsertMealProducts(req, res, next, id ,products){
  products.map(x => {x.product_id=x.id; delete x.id});
  products.map(x => x.meal_id=id );
  products.map(x => x.price=0 );
  const query = db.$config.pgp.helpers.insert(products,['meal_id' , 'product_id', 'amount', 'price'], 'meal_products');
  return db.query(query)
}

function updateStocksFromMeal(req, res, next, product_list){
   db.tx(t => {
      const queries = product_list.map(p => {
          return t.none('UPDATE stocks SET amount = amount - $1 WHERE product_id=$2; ', [p.amount, p.product_id]);
      });
      return t.batch(queries);
  }).then(data => {
        return data;
  }).catch(error => {
      throw error;
  });
}

module.exports = {
  getAll: getAll,
  getSingle: getSingle,
  create: create,
  update: update,
  deletes: deletes,
  getAllMeals: getAllMeals,
  getSingleMeal: getSingleMeal,
  getAllProductsInStock:getAllProductsInStock,
  batchInsertMealProducts:batchInsertMealProducts,
  updateStocksFromMeal:updateStocksFromMeal
};
