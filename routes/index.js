var express = require('express');
var router = express.Router();
let controlerIndex = require('../controllers/index');


router.get('/', controlerIndex.home);


module.exports = router;
