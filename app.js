var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var novel = require("./models/novel");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var novelRouter = require('./routes/novel');
var resourceRouter = require('./routes/resource');

require('dotenv').config();
const connectionString =process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/novel', novelRouter);
app.use('/resource',resourceRouter);
app.use();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")})
//We can seed the collection if needed on
async function recreateDB(){
  
await novel.deleteMany();
let instance1 = new novel({novel_name:"angerLove", novel_author:"vivekanandha", novel_pages:233});
instance1.save().then(doc=>{
console.log("First object saved")}
).catch(err=>{
console.error(err)
});

let instance2 = new novel({novel_name:"angerLove", novel_author:"vivekanandha", novel_pages:233});
instance2.save().then(doc=>{
console.log("Second object saved")}
).catch(err=>{
console.error(err)
});

let instance3 = new novel({novel_name:"wings of freedom", novel_author:"abdul kalam", novel_pages:103});
instance3.save().then(doc=>{
console.log("Third object saved")}
).catch(err=>{
console.error(err)
});
}
let reseed = true;
if (reseed) {recreateDB();
}
// List of all Costumes
exports.novel_list = async function(req, res) {
try{
  console.log(`Triggered`);
thenovel = await novel.find();
res.send(thenovel);
}
catch(err){
res.status(500);
res.send(`{"error": ${err}}`);
}
};


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;