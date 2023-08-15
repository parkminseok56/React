const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const passport = require('passport');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'adminuser',
    database : 'mystargram'
});


const multer = require('multer');  // npm i 로 설치
const path = require('path');
const fs = require('fs');
try {
    fs.readdirSync('public/');
} catch (error) {
    console.error('public 폴더가 없어 public 폴더를 생성합니다.');
    fs.mkdirSync('public/');
}
const uploadObj = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {   done(null, 'public/');  },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/join', (req, res, next)=>{
    // console.log('연결이 잘 되었습니다.');
    const { email, password, nick, phone } = req.body;
    let sql = 'select * from members where email=?';
    connection.query(sql, [email], async (err, rows)=>{
        if(err){console.error(err); next(err);}
        if(rows.length>=1){
            res.send( {success:'fail', message:'이미 등록된 이메일입니다'} );
        }else{
            const hash = await bcrypt.hash(password, 12);
            sql = 'insert into members(email, password, nick, phone, provider) values(?,?,?,?,?)';
            connection.query(sql, [email, hash, nick, phone, 'local'], 
                (err,results,fields)=>{
                    if(err){console.error(err); next(err);}
                    res.send( {success:'ok', message:'회원가입되었습니다. 로그인하세요'} );
                }
            );

        }
    });
});


router.post('/login', (req, res, next)=>{
    passport.authenticate(
        'local',  (authError, user, info)=>{
            if(authError) {   
                console.error(authError);
                return next(authError);
            }
            if(!user) {  return res.send({login:'fail', msg:info.message } );    }
            return req.login( user, (loginError)=>{
                if (loginError) {    
                    console.error(loginError);
                    return next(loginError);
                } 
                return res.send( { login:'ok', loginUser : req.user } );
            })
        }
    )(req, res, next);
});


router.get('/kakao',  passport.authenticate('kakao' )  );

router.get( '/kakao/callback', 
    passport.authenticate( 'kakao', 
    { failureRedirect: 'http://localhost:3000/home' }  ) ,  
    (req, res) => {
        res.redirect('http://localhost:3000/home');
    }
);



router.get('/getLoginUser', (req, res, next)=>{
    console.log('서버의 loginUser : ' , req.user);
    res.send({loginUser:req.user});
})

router.post('/logout',   (req, res) => {
    req.session.destroy();
    res.send('logout');
});



router.post('/imgup', uploadObj.single('image'), (req, res, next)=>{
    console.log(req.file.filename);
    res.send({  filename:req.file.filename,     });
});



router.post('/updateMember', async (req, res, next)=>{
    const {password, nick, phone, imgsrc , profilemsg , email, provider } = req.body;
    console.log(password, nick, phone, imgsrc , email, provider);
    const hash = await bcrypt.hash(password, 12);
    const sql = 'update members set password=?, nick=?, phone=?, profileimg=? , profilemsg=? where email=? and provider=?';
    connection.query(sql, [hash, nick, phone, imgsrc , profilemsg, email, provider],
        (err, results, fields)=>{
            if(err){console.error(err); next(err);}
            res.send('ok');
    });
});



router.get('/getFollower', async (req,res,next)=>{
    const sql = "select b.id, b.nick, b.email from follow a, members b where a.FollowingId=? and b.id=a.FollowerId";
    connection.query( sql, [req.user.id],   (err, rows)=>{
            if(err){  console.error(err);  next(err);   }
            res.send(rows);
    });
});

router.get('/getFollowing', async (req,res,next)=>{
    const sql = "select b.id, b.nick, b.email from follow a, members b where a.FollowerId=? and b.id=a.FollowingId";
    connection.query( sql, [req.user.id],   (err, rows)=>{
            if(err){  console.error(err);  next(err);   }
            res.send(rows);
    });
});


router.post( '/follow', (req, res, next)=>{
    const {FollowingId, FollowerId} = req.body;
    const sql ='insert into follow(FollowingId, FollowerId) values(?,?)';
    connection.query(sql, [FollowingId, FollowerId], (err, results, fields)=>{
        if(err){  console.error(err);   next(err);   }
            res.send('ok');
    });
});

module.exports = router;