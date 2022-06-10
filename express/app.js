var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var logger = require('morgan');
var schedule = require('node-schedule');

var indexRouter = require('./routes/index');

var test = require('./routes/TEST_ROUTER')
const mysql = require("mysql");
const nodemailer = require("nodemailer");


var app = express();


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

//
// app.all('*', function (req, res, next)
// {
//     res.header("Access-Control-Allow-Origin", "http://localhost:8080");
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     res.header('Access-Control-Allow-Credentials', 'true');//cookie
//     next();
// });

// app.all('*',function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Credentials', 'true');//cookie
//
//     next();
//
// });

//session
app.use(session({
    name: "Tree",
    secret: "fdafieadfbabihlvtgta",
    cookie:
        {
            maxAge: 5000 * 60,
            secure: false,
            httpOnly: false,
        },
    resave: false,
    saveUninitialized: false,
}))

//session
// noinspection JSCheckFunctionSignatures
app.use(function (req, res, next)
{
    if (req.url.includes("login") || req.url.includes("verify") || req.url.includes("register") || req.url.includes("home") || req.url.includes("index.html")
        || req.url.includes("js") || req.url.includes("tree") || req.url.includes("css"))
    {
        console.log(req.session.user)

        console.log('whitelist')
        next();
    } else
    {
        console.log('verify')
        console.log(req.url)
        console.log(req.session.user)
        if (req.session.user)
        {
            console.log('verify successfully')
            next();
        } else
        {
            console.log('verify failed')
            res.status(401);
            res.redirect("home")
        }
    }
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


app.use(indexRouter);
// app.use('/users', usersRouter);
app.use(test);
// app.use(login);
// app.use(register)

// // vue-router historyconnect-history-api-fallback
// const history = require('connect-history-api-fallback')
//
// // express.static
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

app.listen(8080, () =>
{
    console.log('app listening on port 8080.')

    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        secureConnection: true,
        port: 465,
        secure: true,
        auth: {
            user: '943493611@qq.com',
            pass: 'vjyxlpxktetgbchj',
        }
    })

    //
    //event
    dbConnectionPool.getConnection(function (err, connection)
    {
        let get_all_event = "select DATE_FORMAT(begin_time,'%s %i %H %d %m %Y'), \n" +
            "       DATE_FORMAT(end_time,'%s %i %H %d %m %Y'),\n" +
            "       title,\n" +
            "       type,\n" +
            "       address,\n" +
            "       note,\n" +
            "       state,\n" +
            "       notice,\n" +
            "       event_id \n" +
            "from event \n" +
            "where end_time > now() \n" +
            "order by begin_time"
        connection.query(get_all_event, function (err, rows, fields)
        {
            if (err)
            {
                return console.log(err.message)
            }

            let event = rows

            // console.log(rows)

            for (let i in rows)
            {
                let user_list = []

                let get_user = "select * from user where username IN (select username from event_list where event_id = ?)"
                connection.query(get_user, rows[i].event_id, function (err, rows, fields)
                {
                    if (err)
                    {
                        return console.log(err.message)
                    }

                    user_list = rows
                    // console.log(event[i].title, user_list)

                    let clock = schedule.scheduleJob(event[i]["DATE_FORMAT(end_time,'%s %i %H %d %m %Y')"], function ()
                    {
                        console.log(event[i].title, ' event end')
                        for (let user in user_list)
                        {
                            console.log(user_list[user].email, rows[i].title, rows[i].event_id,
                                rows[i]["DATE_FORMAT(begin_time,'%s %i %H %d %m %Y')"].split("").reverse().join(""),
                                rows[i]["DATE_FORMAT(end_time,'%s %i %H %d %m %Y')"].split("").reverse().join(""))
                            let mailOption = {
                                from: '943493611@qq.com',
                                to: `${user_list[user].email}`,
                                subject: 'Public event added successfully',
                                text: `You have successfully added the event
                               
                               Event information:
                               
                               Title: ${rows[i].title}
                               ID   : ${rows[i].event_id}
                               Start: ${rows[i]["DATE_FORMAT(begin_time,'%s %i %H %d %m %Y')"].split("").reverse().join("")}
                               End  : ${rows[i]["DATE_FORMAT(end_time,'%s %i %H %d %m %Y')"].split("").reverse().join("")}`,
                            }
                            transporter.sendMail(mailOption, function (err, info)
                            {
                                if (err)
                                {
                                    console.log(err)
                                } else
                                {
                                    console.log(info.response)
                                }
                            })
                        }
                    });
                })
            }
        })
    })
})

module.exports = app;