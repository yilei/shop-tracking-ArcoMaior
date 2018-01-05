var db = require("./DB")

// add query functions
function getAll(type) {
    return db.any('select * from $1:name',type)
}

function getSingle(id , type) {
  return db.one('select * from $1:name where id = $2',[type, id])
}


function create(obj, type) {
  var query_string = db.$config.pgp.helpers.insert(obj, null, type)+"RETURNING id";
  return db.query(query_string)
}

function update(id, body , type) {
  var query_string = db.$config.pgp.helpers.update(body, null, type) + ' WHERE id = ' + id;
  return db.none(query_string)
}

// delete name was returning the following error SyntaxError: Unexpected token delete
function deletes(id , type) {
  return db.result('delete  from $1:name where id = $2',[type, id])
}

function getAllMeals() {
  // Get all meals with their products name, having or not products
  var query_string = "SELECT meals.*, string_agg(products.name, ', ') as products \
                          FROM meals \
                          LEFT OUTER JOIN meal_products ON meals.id=meal_products.meal_id \
                          LEFT OUTER JOIN products ON products.id=meal_products.product_id \
                          GROUP BY meals.id;"
  return db.query(query_string)
}

function getAllShops() {
    var query_string = "SELECT shops.*, products.name as product_name, products.description as product_desc \
                          FROM shops \
                          JOIN products ON products.id=shops.product_id;"
    return db.query(query_string)
}

function getAllStocks() {
    var query_string = "SELECT stocks.*, products.name || ' (' || products.description || ')' as name \
                          FROM stocks \
                          JOIN products ON products.id=product_id;"
    return db.query(query_string)
}

function getSingleMeal(id) {
  var query_string = "SELECT meals.*, string_agg(products.name, ', ') as products \
                          FROM meals \
                          LEFT OUTER JOIN meal_products ON meals.id=meal_products.meal_id \
                          LEFT OUTER JOIN products ON products.id=meal_products.product_id \
                          WHERE meals.id = $1 \
                          GROUP BY meals.id;"
    return db.one(query_string, id)
}

function getStockByProdId(id) {
    var query_string = "SELECT * FROM stocks WHERE product_id = $1;"
    return db.any(query_string, id)
}

function getAllProductsInStock() {
    var query_string = "SELECT stocks.id as id, name, description,amount \
                          FROM products \
                          JOIN stocks ON products.id=stocks.product_id \
                          WHERE amount!=0;"
    return db.query(query_string)
}

function getMealProducts(id){
   var query_string = "SELECT product_id, amount FROM meal_products WHERE meal_id=$1"
   return db.any(query_string, id)
}

function batchInsertMealProducts(id ,products){
  products.map(x => {x.product_id=x.id; delete x.id});
  products.map(x => x.meal_id=id );
  products.map(x => x.price=0 );
  const query = db.$config.pgp.helpers.insert(products,['meal_id' , 'product_id', 'amount', 'price'], 'meal_products');
  return db.query(query)
}

function updateStocksAmount(op){
  var op = op;
  return function(product_list){
     db.tx(t => {
        const queries = product_list.map(p => {
            return t.none('UPDATE stocks SET amount = amount '+op+' $1 WHERE product_id=$2; ', [p.amount , p.product_id]);
        });
        return t.batch(queries);
    }).then(data => {
          return data;
    }).catch(err => {
         return error(err);
    });
  }
}

module.exports = {
  getAll: getAll,
  getSingle: getSingle,
  create: create,
  update: update,
  deletes: deletes,
  getAllMeals: getAllMeals,
  getAllStocks:  getAllStocks,
  getAllShops: getAllShops,
  getSingleMeal: getSingleMeal,
  getAllProductsInStock:getAllProductsInStock,
  batchInsertMealProducts:batchInsertMealProducts,
  updateStocksAmount:updateStocksAmount,
  getMealProducts: getMealProducts,
  getStockByProdId: getStockByProdId
};
