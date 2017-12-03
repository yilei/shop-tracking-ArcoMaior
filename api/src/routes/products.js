var router = require('express').Router();
var model = require('../models/Product');

router.get('/',  function(req, res, next){
  model.getAll()
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL products'
        });
    }).catch(function (err) {
      return next(err);
    });
});

router.get('/inStock',  function(req, res, next){
  model.getAllInStock()
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL products'
        });
    }).catch(function (err) {
      return next(err);
    });
});
module.exports = router;
