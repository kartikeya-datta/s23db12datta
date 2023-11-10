var express = require('express');
const novel_controlers= require('../controllers/novel');
var router = express.Router();
/* GET novels */
router.get('/', novel_controlers.novel_view_all_Page );

// GET request for one novel.
router.get('/novel/:id', novel_controlers.novel_detail);

module.exports = router;