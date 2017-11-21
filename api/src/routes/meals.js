var router = require('express').Router();
var model = require('../models/Meal');

router.get('/',  function(req, res, next){
  console.log("Meals get");
  model.getAll(req, res, next)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL meals'
        });
    }).catch(function (err) {
      return next(err);
    });
});

router.get('/:id',  function(req, res, next){
  console.log("Meals get single");
  model.getSingle(req, res, next)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL meals'
        });
    }).catch(function (err) {
      return next(err);
    });
});


router.post('/',  function(req, res, next){
  console.log("Meals post");
  model.create(req, res, next)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one meal'
        });
    }).catch(function (err) {
      return next(err);
    });
});

router.put('/:id',  function(req, res, next){
  console.log("Meals update");
  model.update(req, res, next)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          message: 'updated one meal'
        });
    }).catch(function (err) {
      return next(err);
    });
});

router.delete('/:id',  function(req, res, next){
  console.log("Meals delete");
  model.delete(req, res, next)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} player`
        });
    }).catch(function (err) {
      return next(err);
    });
});

module.exports = router;
