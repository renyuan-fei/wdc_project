const mysql = require('mysql');

exports.connect_database = function ()
{
    //数据库地址
    var connection = mysql.createConnection({

        host: '127.0.0.1',
        user: 'root',
        password: '159753',
        database: 'project',
        port: '3306',

    })

    //开始链接
    connection.connect()

    return connection
}