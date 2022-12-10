var express = require('express');
var router = express.Router();
let controlerIndex = require('../controllers/index');


//router.get('/', controlerIndex.fetchData);

router.get('/', controlerIndex.fetchData);



module.exports = router;
