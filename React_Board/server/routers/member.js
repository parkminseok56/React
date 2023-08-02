const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminuser',
    database: 'scott'
})

router.post('/login', (req, res, next) => {
    // console.log(req.body.userid, req.body.pwd);
    // res.send('ok');
    const { userid, pwd } = req.body;
    const sql = "select * from members where userid=?";
    connection.query(sql, [userid], (error, rows) => {
        if (error) {
            console.error(error);
            next(error);
        } else {
            console.log('검색결과 : ', rows);
            if (rows.length >= 1) console.log('아이디가 존재합니다.');
            else {
                console.log('아이디가 없습니다');
            }
            res.send('ok');
        }
    });
});

module.exports = router;