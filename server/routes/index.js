var express = require('express');
var router = express.Router();
var routerInfoCtrl=require('../controller/routerInfo.controller')

/* GET home page. */
router.get('/getTotalSiteAccessGraph', routerInfoCtrl.getTotalSiteAccessGraph);
router.get('/getTotalVolumnGraph', routerInfoCtrl.getTotalVolumnGraph);
router.get('/getTotalOutInGraph', routerInfoCtrl.getTotalOutInGraph);

module.exports = router;
