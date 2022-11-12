var express = require('express');
var router = express.Router();
let controlerIndex = require('../controllers/index');


//router.get('/', controlerIndex.fetchData);

router.get('/', controlerIndex.fetchData, function(req, res, next) {
    res.render('index', {page:'index', menuId:'index'});
  });

module.exports = router;
