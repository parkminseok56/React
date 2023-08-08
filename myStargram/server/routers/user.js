const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'adminuser',
    database : 'node_gram'
});

router.get('/getFollowers/:id', (req,res,next)=>{
    // follow 테이블에서  req.params.id 를 follow하는 사람들의 id 를 갖고  id, nick, email 를 추출
    // follow 테이블과 users 테이블을 조인해서  실행
    const sql = 'select a.followerId, b.nick, b.email '
            + 'from  follow a, users b  '
            + 'where a.followingId=? and b.id=a.followerId';
    connection.query(sql, [req.params.id], (err, rows)=>{
        if(err){  console.error(err);   next(err); }
        res.send(rows);
    });

});

router.get('/getFollowings/:id', (req,res,next)=>{
    const sql = 'select a.followingid, b.nick, b.email '
            + 'from  follow a, users b  '
            + 'where a.followerId=? and b.id=a.followingId';
    connection.query(sql, [req.params.id], (err, rows)=>{
        if(err){  console.error(err);   next(err); }
        res.send(rows);
    });
});


router.post('/follownow', (req, res, next)=>{
    const { FollowingId, FollowerId  } =req.body;
    const sql = 'insert into follow(FollowingId, FollowerId) values(?,?)';
    connection.query( sql, [FollowingId,FollowerId ],  (err, result, fields )=>{
        if(err){ console.error(err);    next(err);   }
        res.send('ok');
    });
});

module.exports = router;