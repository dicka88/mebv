var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('express-session')

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

require('ejs');
require('./config/database')

var app = express();

// view engine setup
// app.engine('html', mustacheEngine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let sesscredential = {
    key: 'iamverysecretkeybruh',
    secret: 'Iamverysecretkeybruh',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 600000 // 1days
    }
}

app.use(session(sesscredential))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { title: "404 not found | MEVB" });
});

module.exports = app;