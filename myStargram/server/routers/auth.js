const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminuser',
    database: 'node_gram'
});

router.post('/join', (req, res, next) => {
    const { email, nick, password } = req.body;
    // 전송된 이메일의 회원이 이미 있는지 검사
    let sql = "select * from users where email=?";
    connection.query(sql, [email], async (err, rows) => {
        if (err) { console.error(err); next(err); }
        if (rows.length >= 1) {  // 이미 전송된 이메일의 회원이 있다면
            return res.send({ message: '이메일 중복입니다' });
        } else {
            // 전송된 이메일의 회원이 없으므로 새로 회원으로 가입 시킵니다
            sql = "insert into users(email, nick, password, provider) values(?,?,?,?)";
            const hash = await bcrypt.hash(password, 12);
            connection.query(sql, [email, nick, hash, 'local'],
                (err, results, fields) => {
                    if (err) { console.error(err); next(err); }
                    return res.send({ success: '회원가입되었습니다. 로그인하세요' });
                }
            );
        }
    }
    );
});


// (authError, user, info)=>{} : localStrategy 에 전달되서  로그인 성공,실패에 따른 처리를 해줄 익명함수
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        // 서버에러 났을때
        if (authError) {
            console.error(authError);
            return next(authError);
        }

        // 로그인에 실패했을때
        if (!user) {
            return res.send({ login: 'fail', msg: info.message });
        }

        // 정상 로그인
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            // console.log('login ok');
            console.log('로그인할때 : ', req.user);
            // 로그인 성공이 되면 login 값으로ok   loginUser 값으로 세션에 저장된 로그인회원 정보를 리턴
            return res.send({ login: 'ok', loginUser: req.user });
        })
    })(req, res, next);
});


router.get('/getLoginUser', (req, res, next) => {
    console.log('서버의 loginUser : ', req.user);
    res.send({ loginUser: req.user });
})

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.send('logout');
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback',
    passport.authenticate('kakao',
        { failureRedirect: 'http://localhost:3000/' }),
    (req, res) => {
        //res.send( { login:'ok', loginUser : req.user } );
        // axios로 요청받지 못한 라우터는  응답보낼곳이 5000 포트밖에 없으므로 res.send 는 http://localhost:5000 으로 가려고 합니다. 따라서 아래와 같이 3000으로 가려면 redirect 를 사용합니다.
        res.redirect('http://localhost:3000/');
    }
);


module.exports = router;