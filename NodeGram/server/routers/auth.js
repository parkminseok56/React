const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminuser',
    database: 'node_gram'
});

router.post('/join', (req, res, next) => {
    const { email, nick, password } = req.body;
    let sql = "select * from users where email=?";
    connection.query(
        sql,
        [email],
        (err, rows) => {
            if (rows) {
                return res.json({ message: '이메일이 중복입니다.' });
            }
        }
    );
    sql = "insert into(email, nick, password) values(?,?,?)";
    connection.query(
        sql,
        [email, nick, password],
        (err, results, fields) => {
            return res.json({ success: 'ok' });
        }
    );
});


module.exports = router;