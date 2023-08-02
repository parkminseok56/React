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
            // console.log('검색결과 : ', rows);
            if (rows.length >= 1) {
                // console.log('아이디가 존재합니다.');
                if (rows[0].pwd == pwd) {
                    req.session.loginUser = rows[0];
                    return res.json({ loginUser: req.session.loginUser, login: 'ok' });
                } else {
                    return res.json({ login: 'fail', message: '비밀번호가 맞지 않습니다.' });
                }
            } else {
                // console.log('아이디가 없습니다');
                return res.json({ login: 'fail', message: '아이디가 없습니다.' });
            }
        }
    });
});

router.get('/loginok', (req, res, next) => {
    if (req.session.loginUser) {
        return res.json({ login: 'ok' });
    } else {
        return res.json({ login: 'fail' });
    }
})


router.get('/getLoginUser', (req, res, next) => {
    const loginUser = req.session.loginUser;
    res.json({ loginUser });
});


module.exports = router;