const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminuser',
    database: 'scott'
});

router.get('/getBoardList', (req, res, next) => {
    const sql = "select * from boards order by id desc";
    connection.query(sql, (error, rows) => {
        if (error) {
            console.error(error);
            next(error);
        } else {
            return res.send(rows);
            // console.log(rows);
        }
    })
});

router.post('/getBoard/:id', (req, res) => {
    console.log(req.params.id);
    const sql = "select * from boards where id=?";
    connection.query(sql, [req.params.id], (error, rows) => {
        if (error) {
            console.error(error);
            next(error);
        } else {
            return res.json({ board: rows[0] });
            // console.log(rows[0]);
        }
    });
});

module.exports = router;