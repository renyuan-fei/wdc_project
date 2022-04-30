var express = require('express');
var router = express.Router();
//数据库
var DATABASE = require('../conf/database')
let link = DATABASE.connect_database()

//查询账户是否存在
//用户名唯一
router.get('/verify',(req,res) =>
{
    let username = req.query.username

    const check = 'SELECT username FROM user WHERE username = ?'

    link.query(check,username, (err,results) =>
    {
        if (err)
        {
            return console.log(err.message)
        }
        else
        {
            if (results.length === 0)
            {
                console.log('该用户不存可，可以注册')
                res.send('1')
            }
            else
            {
                console.log('该用户已存在，不可注册')
                res.send('0')
            }
        }
    })
})

//注册
router.get('/register',(req,res) =>
{
    let username = req.query.username
    let firstname = req.query.first_name
    let lastname = req.query.last_name
    let email = req.query.email
    let password = req.query.password
    let gender = req.query.gender

    const add = 'insert into user(first_name,last_name,username,password,email,gender) value (?,?,?,?,?,?)'

    link.query(add,[firstname,lastname,username,password,email,gender], (err,results) =>
    {
        if (err)
        {
            return console.log(err.message)
        }
        else
        {
            console.log('注册成功 ',username,' ',password)
            res.send('1')
        }
    })
})

module.exports = router;