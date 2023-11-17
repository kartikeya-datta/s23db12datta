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
var chooseRouter = require('./routes/choose');
var boardRouter = require('./routes/board');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// passport config
// Use the existing connection
// The Account model
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
passport.use(new LocalStrategy(
  function(username, password, done) {
  Account.findOne({ username: username })
  .then(function (user){
  if (err) { return done(err); }
  if (!user) {
  return done(null, false, { message: 'Incorrect username.' });
  }
  if (!user.validPassword(password)) {
  return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
  })
  .catch(function(err){
  return done(err)
  })
  })
  )

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
app.use('/novel', novel);
app.use('/choose',chooseRouter);
app.use('/board',boardRouter);

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

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

let instance2 = new novel({novel_name:"Harry Potter", novel_author:"jk rowing", novel_pages:633});
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