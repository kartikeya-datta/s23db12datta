var express = require('express');
const novel_controlers= require('../controllers/novel');
var router = express.Router();
/* GET novels */
router.get('/', novel_controlers.novel_view_all_Page );

// GET request for one novel.
router.get('/novel/:id', novel_controlers.novel_detail);

/* GET detail novel page */
router.get('/detail', novel_controlers.novel_view_one_Page);

/* GET create novel page */
router.get('/create', novel_controlers.novel_create_Page);

/* GET create novel page */
router.get('/create', novel_controlers.novel_create_Page);

/* GET create update page */
router.get('/update', novel_controlers.novel_update_Page);

/* GET delete novel page */
router.get('/delete', novel_controlers.novel_delete_Page);

module.exports = router;