var router = require('express').Router();
var model = require('../models/Meal');

router.get('/',  function(req, res, next){
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
  model.create(req, res, next)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Inserted one meal'
        });
    }).catch(function (err) {
      return next(err);
    });
});

router.put('/:id',  function(req, res, next){
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
  model.delete(req, res, next)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed meal`
        });
    }).catch(function (err) {
      return next(err);
    });
});

module.exports = router;
