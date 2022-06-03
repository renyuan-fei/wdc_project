var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', function (req, res, next)
{
    res.render('index', {title: 'Express'});
});


// Register
router.post('/register', async function (req, res, next)
{
    try
    {
        const body = req.body
        console.log(body)
        req.pool.getConnection(function (err, connection)
        {
            if (err)
            {
                res.sendStatus(500)
                return
            }
            const query_line = 'select * from user where username = ? or email = ?'
            connection.query(query_line, [body.username, body.email], function (err, rows, fields)
            {
                connection.release()
                console.log(1)
                if (err)
                {
                    res.sendStatus(500)
                    return
                }
                if (rows.length === 0)
                {
                    let username = req.body.username
                    let firstname = req.body.first_name
                    let lastname = req.body.last_name
                    let email = req.body.email
                    let password = req.body.password
                    let gender = req.body.gender

                    const query_line = 'insert into user(first_name,last_name,username,password,email,gender ) value (?,?,?,?,?,?)'
                    connection.query(query_line, [firstname, lastname, username, password, email, gender], function (err, rows, fields)
                    {
                        if (rows.affectedRows !== 1)
                        {
                            return res.send({
                                status: 0,
                                message: "Register failed!",
                            })
                        }
                        return res.send({
                            status: 1,
                            message: "Register successful!",
                        })
                    })
                } else
                {
                    res.send({
                        status: 1,
                        message: "username or email is existed!",
                    })
                }
            })
        })
    } catch (error)
    {
        res.send({
            message: error,
        })
    }
})

// login with username
router.get('/login', async function (req, res, next)
{
    try
    {
        const query = req.query
        req.pool.getConnection(function (err, connection)
        {
            if (err)
            {
                res.sendStatus(500)
                return
            }

            const check = 'select * from user where username = ?'
            const insert = 'insert user_'

            connection.query(check, query.username, function (err, result)
            {
                connection.release()
                console.log(result)

                if (result.length === 0)
                {
                    return res.send({
                        status: 0,
                        message: "username does not exist!",
                    })
                } else
                {
                    if (query.username === result[0].username && query.password === result[0].password)
                    {
                        const token = jwt.sign({
                            username: result[0].username
                        }, 'secret', {expiresIn: 1000 * 60 * 60 * 24 * 7})

                        res.send({
                            permissions: result[0].permissions,
                            status: 0,
                            token,
                        })
                    }
                }
            })
        })
    } catch (error)
    {
        res.send({
            message: error,
        })
    }
})

// login with email
router.get('/login_email', async function (req, res, next)
{
    try
    {
        const query = req.query
        console.log(query)
        req.pool.getConnection(function (err, connection)
        {
            if (err)
            {
                res.sendStatus(500)
                return
            }
            const query_line = 'select * from user where email = ?'
            connection.query(query_line, query.email, function (err, result, fields)
            {
                connection.release()
                if (result.length === 0)
                {
                    return res.send({
                        status: 0,
                        message: "email does not exist!",
                    })
                } else
                {
                    if (query.email === result[0].email && query.password === result[0].password)
                    {
                        const token = jwt.sign({
                            email: result[0].email
                        }, 'secret', {expiresIn: 1000 * 60 * 60 * 24 * 7})
                        res.send({
                            username: result[0].username,
                            permissions: result[0].permissions,
                            status: 0,
                            token,
                        })
                    }
                }
            })
        })
    } catch (error)
    {
        res.send({
            message: error,
        })
    }
})

// verify username
router.get('/verify_username', async function (req, res, next)
{
    try
    {
        const query = req.query
        req.pool.getConnection(function (err, connection)
        {
            if (err)
            {
                res.sendStatus(500)
                return
            }
            const query_line = 'select * from user where username = ?'
            connection.query(query_line, query.username, function (err, rows, fields)
            {
                connection.release()
                if (rows.length === 0)
                {
                    res.send({
                        status: 0,
                        message: "user does not exist!",
                    })
                } else
                {
                    res.send({
                        status: 1,
                        message: "user exists!",
                    })
                }
            })
        })
    } catch (error)
    {
        res.send({
            message: error,
        })
    }
})

// verify username
router.get('/verify_email', async function (req, res, next)
{
    try
    {
        const query = req.query
        console.log(query)
        req.pool.getConnection(function (err, connection)
        {
            if (err)
            {
                res.sendStatus(500)
                return
            }
            const query_line = 'select * from user where email = ?'
            connection.query(query_line, query.email, function (err, rows, fields)
            {
                connection.release()
                if (rows.length === 0)
                {
                    res.send({
                        status: 0,
                        message: "email does not exist!",
                    })
                } else
                {
                    res.send({
                        status: 1,
                        message: "email exists!",
                    })
                }
            })
        })
    } catch (error)
    {
        res.send({
            message: error,
        })
    }
})

// get information
router.get('/get_infor', async function (req, res, next)
{
    try
    {
        const query = req.query
        console.log(query)

        req.pool.getConnection(function (err, connection)
        {
            if (err)
            {
                res.sendStatus(500)
                return
            }
            const query_line_user = "select * from user where username = ?"
            connection.query(query_line_user, query.username, function (err, rows, fields)
            {
                connection.release()
                console.log(rows)
                if (rows.length === 0)
                {
                    res.send({
                        status: 0,
                        message: "user does not exist!",
                    })
                } else
                {
                    res.send({
                        permissions: rows[0].permissions,
                        gender: rows[0].gender,
                        email: rows[0].email,
                        first_name: rows[0].first_name,
                        last_name: rows[0].last_name,
                    })
                }
            })
        })

    } catch (error)
    {
        res.send({
            message: error,
        })
    }
})

// get event
router.get('/get_event', function (req, res, next)
{
    try
    {
        const body = req.query
        console.log(body)
        req.pool.getConnection(function (err, connection)
        {
            if (err)
            {
                res.sendStatus(500)
                return
            }

            //根据权限判断返回的值
            let query_line = "select DATE_FORMAT(begin_time,'%Y-%m-%d %H:%i:%s'),DATE_FORMAT(end_time,'%Y-%m-%d %H:%i:%s'),title,type,address,note,state,notice,event_id from event where username = ?"
            if (body.permissions === '1')
            {
                query_line = "select DATE_FORMAT(begin_time,'%Y-%m-%d %H:%i:%s'),DATE_FORMAT(end_time,'%Y-%m-%d %H:%i:%s'),title,type,address,note,state,notice,event_id from public_event"
            }

            connection.query(query_line, body.username, function (err, rows, fields)
            {
                connection.release()
                if (err)
                {
                    res.sendStatus(500)
                    return
                }
                if (rows.length === 0)
                {
                    res.send({
                        status: 0,
                        message: "no events",
                    })
                } else
                {
                    console.log(rows)
                    // res.send(rows)
                    //转换
                    let result = []

                    for (let i in rows)
                    {
                        let temp = {};
                        temp.event_id = rows[i].event_id
                        temp.begin_time = rows[i]["DATE_FORMAT(begin_time,'%Y-%m-%d %H:%i:%s')"]
                        temp.end_time = rows[i]["DATE_FORMAT(end_time,'%Y-%m-%d %H:%i:%s')"]
                        temp.address = rows[i].address
                        temp.state = rows[i].state
                        temp.note = rows[i].note
                        temp.notice = rows[i].notice
                        temp.title = rows[i].title
                        temp.type = rows[i].type

                        result.push(temp)
                    }

                    console.log(result)


                    res.send(result)
                }
            })
        })
    } catch (error)
    {
        res.send({
            message: error,
        })
    }
})

// get public_event
router.get('/get_public_event', function (req, res, next)
{
    try
    {
        const body = req.query
        console.log(body)
        req.pool.getConnection(function (err, connection)
        {
            if (err)
            {
                res.sendStatus(500)
                return
            }

            //根据权限判断返回的值

            const query_line = "select DATE_FORMAT(begin_time,'%Y-%m-%d %H:%i:%s'),DATE_FORMAT(end_time,'%Y-%m-%d %H:%i:%s'),title,type,address,note,state,notice,event_id from public_event"

            connection.query(query_line, body.username, function (err, rows, fields)
            {
                connection.release()
                if (err)
                {
                    res.sendStatus(500)
                    return
                }
                if (rows.length === 0)
                {
                    res.send({
                        status: 0,
                        message: "user does not exist!",
                    })
                } else
                {
                    console.log(rows)
                    // res.send(rows)
                    //转换
                    let result = []

                    for (let i in rows)
                    {
                        let temp = {};
                        temp.event_id = rows[i].event_id
                        temp.begin_time = rows[i]["DATE_FORMAT(begin_time,'%Y-%m-%d %H:%i:%s')"]
                        temp.end_time = rows[i]["DATE_FORMAT(end_time,'%Y-%m-%d %H:%i:%s')"]
                        temp.address = rows[i].address
                        temp.state = rows[i].state
                        temp.note = rows[i].note
                        temp.notice = rows[i].notice
                        temp.title = rows[i].title
                        temp.type = rows[i].type

                        result.push(temp)
                    }

                    console.log(result)


                    res.send(result)
                }
            })
        })
    } catch (error)
    {
        res.send({
            message: error,
        })
    }
})

// drop event
router.post('/drop_event', function (req, res, next)
{
    try
    {
        const body = req.body
        console.log(body)
        req.pool.getConnection(function (err, connection)
        {
            if (err)
            {
                res.sendStatus(500)
                return
            }
            const query_line = "select * from event where event_id = ?"
            connection.query(query_line, body.event_id, function (err, rows, fields)
            {
                connection.release()
                if (err)
                {
                    res.sendStatus(500)
                    return
                }
                if (rows.length === 0)
                {
                    res.send({
                        status: 0,
                        message: "event does not exist!",
                    })
                } else
                {
                    let query_line1 = "delete from event where event_id = ? and username = ?"
                    let query_line2 = "select DATE_FORMAT(begin_time,'%Y-%m-%d %H:%i:%s'),DATE_FORMAT(end_time,'%Y-%m-%d %H:%i:%s'),title,type,address,note,state,notice,event_id from event where username = ?"
                    if (body.permissions === '1')
                    {
                        query_line1 = "delete from public_event where event_id = ?"
                        query_line2 = "select DATE_FORMAT(begin_time,'%Y-%m-%d %H:%i:%s'),DATE_FORMAT(end_time,'%Y-%m-%d %H:%i:%s'),title,type,address,note,state,notice,event_id from public_event"

                    }

                    connection.query(query_line1, [body.event_id, body.username], function (err, rows, fields)
                    {
                        if (err)
                        {
                            res.sendStatus(500)
                            return console.log(err.message)
                        }

                        connection.query(query_line2, [body.username], function (err, rows, fields)
                        {
                            if (err)
                            {
                                res.sendStatus(500)
                                return console.log(err.message)
                            } else
                            {
                                let result = []

                                for (let i in rows)
                                {
                                    let temp = {};
                                    temp.event_id = rows[i].event_id
                                    temp.begin_time = rows[i]["DATE_FORMAT(begin_time,'%Y-%m-%d %H:%i:%s')"]
                                    temp.end_time = rows[i]["DATE_FORMAT(end_time,'%Y-%m-%d %H:%i:%s')"]
                                    temp.address = rows[i].address
                                    temp.state = rows[i].state
                                    temp.note = rows[i].note
                                    temp.notice = rows[i].notice
                                    temp.title = rows[i].title
                                    temp.type = rows[i].type

                                    result.push(temp)
                                }

                                console.log(result)


                                res.send(result)
                            }
                        })
                    })
                }
            })
        })

    } catch (error)
    {
        res.send({
            message: error,
        })
    }
})

// add event
router.post('/add_event', function (req, res, next)
{
    try
    {
        const body = req.body
        console.log(body.permissions)
        req.pool.getConnection(function (err, connection)
        {
            if (err)
            {
                res.sendStatus(500)
                return
            }
            let username = body.username
            let title = body.title
            let address = body.address
            let begin_time = body.begin_time
            let end_time = body.end_time
            let type = 0
            let note = body.note
            let notice = body.notice

            let state = body.state

            let query_line = "insert into event (event_id,username,title,address,begin_time,end_time,state,note,notice,type)value(UUID(),?,?,?,?,?,?,?,?,?)"
            if (body.permissions === '1')
            {
                query_line = "insert into public_event (event_id,username,title,address,begin_time,end_time,state,note,notice,type)value(UUID(),?,?,?,?,?,?,?,?,?)"
                username = 'public'
                type = 1
            }

            connection.query(query_line, [username, title, address, begin_time, end_time, state, note, notice, type], function (err, rows, fields)
            {
                connection.release()
                if (err)
                {
                    res.sendStatus(500)
                    return
                }
                if (rows.affectedRows !== 1)
                {
                    console.log('failed')
                    return res.send({
                        status: 0,
                        message: "Adding failed!",
                    })
                }
                console.log('success')
                res.send({
                    status: 1,
                    message: "Successfully Added!",
                })
            })
        })

    } catch (error)
    {
        res.send({
            message: error,
        })
    }
})

// Add public event
router.post('/add_public_event', function (req, res, next)
{
    try
    {
        const body = req.body
        req.pool.getConnection(function (err, connection)
        {
            if (err)
            {
                res.sendStatus(500)
                return
            }
            const query_line = "select * from public_event where event_id = ?"
            connection.query(query_line, body.event_id, function (err, rows, fields)
            {
                connection.release()
                if (err)
                {
                    res.sendStatus(500)
                    return
                }
                if (rows.length === 0)
                {
                    return res.send({
                        status: 0,
                        message: "event does not exist!",
                    })
                }
                rows[0].username = body.username

                const query_line = "insert into event value ?"
                connection.query(query_line, rows, function (err, rows, fields)
                {
                    if (err)
                    {
                        return console.log(err.message)
                    }

                    res.send({
                        status: 1,
                        message: "success!",
                    })
                })
            })
        })

    } catch (error)
    {
        res.send({
            message: error,
        })
    }
})

// get all user
router.get('/get_user_list', function (req, res, next)
{
    try
    {
        const body = req.query
        console.log(body)
        req.pool.getConnection(function (err, connection)
        {
            if (err)
            {
                res.sendStatus(500)
                return
            }
            if (body.permissions === '1')
            {
                const query_line = "select * from user"
                connection.query(query_line, function (err, rows, fields)
                {
                    connection.release()
                    if (err)
                    {
                        res.sendStatus(500)
                        return
                    }
                    if (rows.length === 0)
                    {
                        return res.send({
                            status: 0,
                            message: "no user!",
                        })
                    }
                    res.json(rows)
                })
            } else
            {
                res.send({
                    status: 1,
                    message: "This user is not an administrator!",
                })
            }
        })

    } catch (error)
    {
        res.send({
            message: error,
        })
    }
})

// check availble
router.get('/check_time', function (req, res, next)
{
    res.send(1)
})


// modify permission
router.put('/modify_permission', function (req, res, next)
{
    try
    {
        const body = req.body
        req.pool.getConnection(function (err, connection)
        {
            if (err)
            {
                res.sendStatus(500)
                return
            }
            const query_line = "select * from user where username = ?"
            connection.query(query_line, body.username, function (err, rows, fields)
            {
                connection.release()
                if (err)
                {
                    res.sendStatus(500)
                    return
                }
                if (rows[0].permission === 0)
                {
                    const query_line = "update user set permissions = 1 where username = ?"
                    connection.query(query_line, body.username, function (err, rows, fields)
                    {
                        if (rows.affectedRows !== 1)
                        {
                            return res.send({
                                status: 0,
                                message: "permission change denied!",
                            })
                        }
                        res.send({
                            status: 1,
                            message: "permission changed!",
                        })
                    })
                } else if (rows[0].permission === 1)
                {
                    const query_line = "update user set permissions = 0 where username = ?"
                    connection.query(query_line, body.username, function (err, rows, fields)
                    {
                        if (rows.affectedRows !== 1)
                        {
                            return res.send({
                                status: 0,
                                message: "permission change denied!",
                            })
                        }
                        res.send({
                            status: 1,
                            message: "permission changed!",
                        })
                    })
                }
            })
        })

    } catch (error)
    {
        res.send({
            message: error,
        })
    }
})

// reset password
router.put('/reset_password', function (req, res, next)
{
    try
    {
        const body = req.body
        req.pool.getConnection(function (err, connection)
        {
            if (err)
            {
                res.sendStatus(500)
                return
            }
            const query_line = "update user set password = ? where username = ?"
            connection.query(query_line, [body.password, body.username], function (err, rows, fields)
            {
                connection.release()
                if (err)
                {
                    res.sendStatus(500)
                    return
                }
                if (rows.affectedRows !== 1)
                {
                    return res.send({
                        status: 0,
                        message: "Reset failed!",
                    })
                }
                res.send({
                    status: 1,
                    message: "Reset successed!",
                })
            })
        })

    } catch (error)
    {
        res.send({
            message: error,
        })
    }
})

// reset email
router.put('/reset_email', function (req, res, next)
{
    try
    {
        const body = req.body
        req.pool.getConnection(function (err, connection)
        {
            connection.release()
            if (err)
            {
                res.sendStatus(500)
                return
            }
            const query_line = "update user set email = ? where username = ?"
            connection.query(query_line, [body.email, body.username], function (err, rows, fields)
            {
                connection.release()
                if (err)
                {
                    res.sendStatus(500)
                    return
                }
                if (rows.affectedRows !== 1)
                {
                    return res.send({
                        status: 0,
                        message: "Reset failed!",
                    })
                }
                res.send({
                    status: 1,
                    message: "Reset successed!",
                })
            })
        })

    } catch (error)
    {
        res.send({
            message: error,
        })
    }
})

module.exports = router;
