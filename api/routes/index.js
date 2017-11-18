var express = require('express');
var router = express.Router();

router.use('/meals', require('./meals'));
router.use('/products', require('./products'));
router.use('/shops', require('./shops'));
router.use('/stocks', require('./stocks'));


module.exports = router;
