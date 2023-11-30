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
    // {"novel_name":"goat", "author":12, "pages":"large"}
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


// for a specific novel.
exports.novel_detail = async function(req, res) {
console.log("detail" + req.params.id)
try {
result = await novel.findById( req.params.id)
res.send(result)
} catch (error) {
res.status(500)
res.send(`{"error": document for id ${req.params.id} not found`);
}
};



// Handle novel create on POST.
// exports.novel_create_post = function(req, res) {
//  res.send('NOT IMPLEMENTED: novel create POST');
// };
// Handle novel delete form on DELETE.
// exports.novel_delete = function(req, res) {
//  res.send('NOT IMPLEMENTED: novel delete DELETE ' + req.params.id);
// };
// Handle novel update form on PUT.

// Handle novel update form on PUT.
exports.novel_update_put = async function(req, res) {
console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
try {
let toUpdate = await novel.findById( req.params.id)
// Do updates of properties
if(req.body.novel_name) toUpdate.novel_name = req.body.novel_name;
if(req.body.novel_author) toUpdate.novel_author = req.body.novel_author;
if(req.body.novel_pages) toUpdate.novel_pages = req.body.novel_pages;

// if(req.body.checkboxsale) toUpdate.sale = true;
// else toUpdate.same = false;


let result = await toUpdate.save();
console.log("Sucess " + result)
res.send(result)
} catch (err) {
res.status(500)
res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
}
};

// Handle novel delete on DELETE.
exports.novel_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await novel.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
    };


    // Handle a show one view with id specified by query
exports.novel_view_one_Page = async function(req, res) {
console.log("single view for id " + req.query.id)
try{
result = await novel.findById( req.query.id)
res.render('detail',
{ title: 'novel Detail', toShow: result });
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

// Handle building the view for creating a novel.
// No body, no in path parameter, no query.
// Does not need to be async
exports.novel_create_Page = function(req, res) {
console.log("create view")
try{
res.render('novelcreate', { title: 'novel Create'});
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

// Handle building the view for updating a novel.
// query provides the id
exports.novel_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await novel.findById(req.query.id)
    res.render('novelupdate', { title: 'novel Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

   // Handle a delete one view with id from query
exports.novel_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await novel.findById(req.query.id)
    res.render('noveldelete', { title: 'novel Delete', toShow:
   result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };