var router = require('express').Router();
var model = require('../models/Shop');

router.get('/',  function(req, res, next){
  model.getAll()
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL shops'
        });
    }).catch(function (err) {
      return next(err);
    });
});

module.exports = router;
