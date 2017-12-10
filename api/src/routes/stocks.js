var router = require('express').Router();
var model = require('../models/Stock');

router.get('/',  function(req, res, next){
  model.getAll()
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL stock'
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
module.exports = router;
