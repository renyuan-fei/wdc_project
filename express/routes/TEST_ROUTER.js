var express = require('express');
const nodemailer = require("nodemailer");
var router = express.Router();

/* GET users listing. */
router.get('/test', function (req, res, next)
{
    req.pool.getConnection(function (err, connection)
    {
        if (err)
        {
            res.sendStatus(500)
            return console.log(err.message)
        }

        connection.query('select * from user', (error, result) =>
        {
            if (err)
            {
                res.sendStatus(500)
                return console.log(err.message)
            } else
            {
                res.status(200)
                res.send(result)
            }
        })
    })
});

router.get('/email_test', function (req, res, next)
{
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
    let mailOption = {
        from: '943493611@qq.com',
        to: '1140222138@qq.com',
        subject: 'hello!',
        text: 'hello world',
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
})

module.exports = router;