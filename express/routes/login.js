var express = require('express');
var router = express.Router();
//数据库
var DATABASE = require('../conf/database')


router.get('/login', function (req, res)
{
    let username = req.query.username
    let password = req.query.password

    //链接数据库
    let link = DATABASE.connect_database()

    const login = 'SELECT password FROM user WHERE username = ?'
    const Administrator = 'SELECT Administrator_account FROM Administrator WHERE Administrator_account = ?'

    link.query(login, username, (err, result) =>
    {
        //查询失败
        if (err)
        {
            return console.log(err.message)
        }
        //查询成功
        else
        {
            let ret = {}

            if (result.length === 1)
            {
                console.log('查询结果:', result[0].password)
                console.log('密码:    ', password)

                console.log('查询成功')

                if (result[0].password === password)
                {
                    //查询是否是管理员
                    link.query(Administrator, username, (error, result) =>
                    {
                        console.log('判断是否是管理员...')
                        if (error)
                        {
                            return console.log(error.message)
                        } else
                        {
                            if (result.length === 1)
                            {
                                console.log('管理员: ', username, '   登录成功')

                                ret.result = '2'
                                ret.token = 'ok'

                                res.send(ret)
                            } else
                            {
                                console.log('普通用户: ', username, '   登录成功')
                                ret.result = '1'
                                ret.token = 'ok'

                                res.send(ret)
                            }
                        }
                    })
                } else
                {
                    console.log('登录失败')
                    res.send('0')
                }
            } else
            {
                console.log('该账户不存在')
                res.send('-1')
            }
        }
    })
})

module.exports = router;