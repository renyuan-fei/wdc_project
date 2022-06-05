var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var logger = require('morgan');
var nodemailer = require('nodemailer')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login = require('./routes/login');
var register = require('./routes/register');

var test = require('./routes/TEST_ROUTER')
const mysql = require("mysql");


var app = express();

// var transporter = nodemailer.createTransport({
//     host:'localhost',
//     port:587,
//     secure:false,
//     auth:
//         {
//             user:'',
//             pass:''
//         }
// });

var dbConnectionPool = mysql.createPool({
    host: 'localhost',
    database: 'project',
    user: 'root',
    password: '159753',
    port: '3306',
});

app.use(function (req, res, next)
{
    req.pool = dbConnectionPool;
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//跨域配置
app.all('*', function (req, res, next)
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use(test);
// app.use(login);
// app.use(register)

// // vue-router history模式引入connect-history-api-fallback中间件
// const history = require('connect-history-api-fallback')
//
// // 这句代码需要放在express.static上面
// app.use(history())

app.use(express.static(path.join(__dirname, 'dist')));

// catch 404 and forward to error handler
app.use(function (req, res, next)
{
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next)
{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, () =>
{
    console.log('app listening on port 3000.')
})

module.exports = app;
