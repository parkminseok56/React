const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
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
    fs.readdirSync('uploads/');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads/');
}
const uploadObj = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {   done(null, 'uploads/');  },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});


router.post('/imgup', uploadObj.single('image'), (req, res, next)=>{
    console.log(req.file.filename);
    res.send( {  filename:req.file.filename,     } );
});

router.post('/write', (req, res, next)=>{
    const { title, content, writer } = req.body;
    let sql = 'insert into feeds(title, content, writer) values(?,?,?)';
    let feedid;
    let hashtagid;
    connection.query(sql, [title, content, writer], (err, results, fields)=>{
        if(err){ console.error(err); next(err); }
        feedid = results.insertId;

        const hashtags = content.match(/#[^\s#]*/g);
        hashtags.map((tag,idx)=>{
            let tagone = tag.slice(1).toLowerCase();
            sql = 'select * from hashtags where title=?';
            connection.query(sql, [tagone], (err, rows)=>{
                if(err){ console.error(err);  next(err);  }
                if(rows.length>=1){  
                    hashtagid = rows[0].id;  // id값 추출
                    sql = "insert into feedhashtag(feedid, hashtagid) values( ? , ? )";
                    connection.query( sql,  [ feedid, hashtagid ],  (err, results, fields)=>{
                        if(err){ console.error(err);   next(err);  }
                    })   
                }else{  
                    sql = 'insert into hashtags( title ) values(?)';
                    connection.query(sql, [tagone], (err, results, fields)=>{
                        if(err){ console.error(err);  next(err);  }
                        hashtagid = results.insertId;
                        sql = "insert into feedhashtag(feedid, hashtagid) values( ? , ? )";
                        connection.query( sql,  [ feedid, hashtagid ],  (err, results, fields)=>{
                            if(err){ console.error(err);   next(err);  }
                        })    
                    });
                }
            });
            return tagone;
        }); 
        res.send({feednum:feedid});
    });
    
});


router.post( '/writeimages', (req, res, next)=>{
    const { feednum, img } = req.body;
    let sql = 'insert into images( feednum, filename) values(?,?)';
    connection.query(sql, [feednum, img ], 
        (err,results, fields)=>{
            if(err){console.error(err); next(err);}
            console.log(img, 'ok');
            res.send( 'ok' );       
        }
    );
});


router.get('/getFeedList', (req, res, next)=>{
    const sql = 'select feeds.id as feedid, feeds.title, feeds.content, feeds.writer, members.nick as nick, members.profileimg from mystargram.feeds , mystargram.members where feeds.writer=members.id order by feeds.id desc';
    connection.query(sql, (err, rows)=>{
        if(err){console.log(err); next(err);}
        res.send(rows);
    });
})

router.get('/getFeedListmy', (req, res, next)=>{
    const sql = 'select * from feeds where writer=? order by feeds.id desc';
    connection.query(sql, [req.user.id], (err, rows)=>{
        if(err){console.log(err); next(err);}
        res.send(rows);
    });
})

router.post('/imgList', (req, res, next)=>{
    const feednum = req.body.feednum;
    const sql = 'select filename from images where feednum =?';
    connection.query(sql, [feednum], (err, rows)=>{
        res.send(rows);
    });
});



router.post('/savefeedid', (req, res, next)=>{
    req.session.feedid = req.body.feedid;
    res.send('ok');
});

router.get('/feedView', (req, res, next)=>{
    const feedid = req.session.feedid;
    let feed={};
    let sql = 'select feeds.id as feedid, feeds.title, feeds.content, feeds.writer, members.nick as nick, members.profileimg from feeds , members where feeds.writer=members.id and feeds.id=?'
    connection.query(sql, [feedid], (err, rows)=>{
        if(err){console.error(err); next(err);}
        console.log(rows);
        feed = rows[0];
        let sql = 'select * from images where feednum=?';
        connection.query(sql, [feedid], (err, rows)=>{
            if(err){console.error(err); next(err);}
            res.send({feed, images:rows});
        })
    });
});

router.post('/like', (req, res, next)=>{
    const feedid = req.body.feedid;
    const sql = 'insert into likes(feednum, likeid) values(?,?)';
    connection.query(sql, [feedid, req.user.id], (err, results, fields)=>{
        if(err){console.error(err); next(err);}
        res.send('ok');
    });
});


router.post('/likeList', (req, res, next)=>{
    const feedid = req.body.feednum;
    const sql = 'select a.likeid, b.nick  from likes a, members b where a.likeid=b.id and a.feednum=?';
    connection.query(sql, [feedid], (err, rows)=>{
        res.send({likeList:rows});
    });
});

router.post('/delike', (req, res, next)=>{
    const feedid = req.body.feedid;
    const sql = 'delete from likes where feednum=? and likeid=?';
    connection.query(sql, [feedid, req.user.id], (err, results, fields)=>{
        if(err){console.error(err); next(err);}
        res.send('ok');
    });
});

module.exports = router;