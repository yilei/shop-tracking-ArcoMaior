var router = require('express').Router();
var model = require('../models/Meal');

router.get('/',  function(req, res, next){
  console.log("Got here");
  model.getAll()
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

module.exports = router;
