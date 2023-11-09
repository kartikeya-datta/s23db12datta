var novel = require('../models/novel');

// List of all novels
exports.novel_list = async function(req, res) {
    try{
    thenovels = await novel.find();
    res.send(thenovels);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };


// VIEWS
// Handle a show all view
exports.novel_view_all_Page = async function(req, res) {
    try{
    thenovels = await novel.find();
    res.render('novel', { title: 'novel Search Results', results: thenovels });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };

// Handle novel create on POST.
exports.novel_create_post = async function(req, res) {
    console.log(req.body)
    let document = new novel();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"novel_type":"goat", "cost":12, "size":"large"}
    document.novel_name = req.body.novel_name;
    document.novel_author = req.body.novel_author;
    document.novel_pages = req.body.novel_pages;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };

// List of all novels
// exports.novel_list = function(req, res) {
//  res.send('NOT IMPLEMENTED: novel list');
// };
// for a specific novel.
exports.novel_detail = function(req, res) {
 res.send('NOT IMPLEMENTED: novel detail: ' + req.params.id);
};
// Handle novel create on POST.
// exports.novel_create_post = function(req, res) {
//  res.send('NOT IMPLEMENTED: novel create POST');
// };
// Handle novel delete form on DELETE.
exports.novel_delete = function(req, res) {
 res.send('NOT IMPLEMENTED: novel delete DELETE ' + req.params.id);
};
// Handle novel update form on PUT.
exports.novel_update_put = function(req, res) {
 res.send('NOT IMPLEMENTED: novel update PUT' + req.params.id);
};