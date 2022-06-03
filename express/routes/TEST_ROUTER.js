var express = require('express');
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

module.exports = router;