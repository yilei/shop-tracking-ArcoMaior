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

module.exports = router;
