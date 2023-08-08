const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'adminuser',
    database : 'node_gram'
});

const multer = require('multer');  // npm i 로 설치
const path = require('path');
const fs = require('fs');
try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
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

router.get('/getPostList', (req, res, next)=>{
    // posts 테이블과 users 테이블을 조인하여   포스트 리트스 조회 -> 작성자 nick 을 함께 얻을수 있습니다.
    const sql = "select * from  users , posts  where  users.id=posts.userid  order by posts.id desc";
    connection.query( 
        sql, 
        (err, rows)=>{
            res.send(rows);
        }
    );
});

router.post('/fileUpload', uploadObj.single('image'), (req, res, next)=>{
    console.log(req.file.filename);
    res.send(
        {
            filename:`/img/${req.file.filename}`,    // 파일이름 + 12345678 + .jpg
            //realfilename: `${req.file.originalname}`
        }
    );
});

// const uploadObj2 = multer();
router.post('/writepost',  (req, res, next)=>{
    const { userid, content, img } = req.body;
    let postid;
    let hashtagid;

    //1. 게시글을 posts 테이블에 insert 합니다.
    let sql = 'insert into posts(userid, content, img) values(?,?,?)';
    connection.query(sql, [  userid, content, img ] , 
        (err, results, fields)=>{
            if(err){ console.error(err); next(err); }
            //2. 방금 insert 한 레코드의 id 를 추출합니다(posthashtag 테이블에 insert 할 postid)
            postid = results.insertId;
        }
    );
    //3. content 에서 해시테그들을 추출합니다
    const hashtags = content.match(/#[^\s#]*/g);
    console.log(hashtags);

    //4. 해시테그 하나씩 
    hashtags.map((tag,idx)=>{
        let tagone = tag.slice(1).toLowerCase();
        console.log('tag1 : ', tagone );
        //   - hashtags 테이블에 있는 단어인지 검색합니다.
        sql = 'select * from hashtags where title=?';
        connection.query(sql, [tagone], (err, rows)=>{
            if(err){ console.error(err);  next(err);  }

            //   - 단어가 있으면 그 레코드의 id를 추출하고
            if(rows.length>=1){  
                hashtagid = rows[0].id;  // id값 추출
                console.log('hashtag가 있을때', hashtagid);
                
                //   - posthashtag 테이블에 postid 와 hashtagid로 레코드를 추가합니다.
                sql = "insert into Posthashtag(postid, hashtagid) values( ? , ? )";
                connection.query( sql,  [ postid, hashtagid ],  (err, results, fields)=>{
                    if(err){ console.error(err);   next(err);  }
                })   
            }else{  //  - 단어가 없으면 hashtags 테이블에 추가하고,
                sql = 'insert into hashtags( title ) values(?)';
                connection.query(sql, [tagone], (err, results, fields)=>{
                    if(err){ console.error(err);  next(err);  }
                    // -   추가된 레코드의 id 를 추출합니다.(posthashtag 테이블에 insert 할 hashtagid)
                    hashtagid = results.insertId;
                    console.log('hashtag가 없을때', hashtagid);

                    //   - posthashtag 테이블에 postid 와 hashtagid로 레코드를 추가합니다.
                    sql = "insert into Posthashtag(postid, hashtagid) values( ? , ? )";
                    connection.query( sql,  [ postid, hashtagid ],  (err, results, fields)=>{
                        if(err){ console.error(err);   next(err);  }
                    })    
                });
            }
        });
        return tagone;
    }); 
    res.send('ok');
});

router.post('/searchPostList', (req, res)=>{
    const searchtag = req.body.searchtag ;
    // hashtags 테이블에서 전송된 검색어(title)의  id 를 추출
    let hashtagid;
    let sql = 'select * from hashtags where title=?';
    connection.query(sql, [searchtag], (err, rows)=>{
        if(err){console.error(err); next(err);}
        if(rows.length>=1){
            hashtagid = rows[0].id;
            console.log('hashtagid', hashtagid);
            // 추출한 아이디로 posthashtag 테이블에서  hashtagid 를 검색하고 그에 대한 postid를 추출
            //sql = 'select postid from posthashtag where hashtagid=?'
            // 추출한 postid로  posts 테이블을 검색해서  postList를 클라이언트로 보내줍니다.
            //sql = 'select * from posts where id in (  posthashtag에서 추출한 postid들 )';

            // 위 두개의 sql 문을 서브쿼리 형식으로 하나로 합쳐서 실행합니다.
            sql = 'select * from posts where id in(select postid from posthashtag where hashtagid=?)';
            connection.query(sql, [hashtagid], (err, rows)=>{
                if(err){console.error(err); next(err);}
                if(rows.length>=1){
                    res.send({ postList:rows, searchtag:req.body.searchtag });
                }else{
                    res.send({ postList:[], searchtag:req.body.searchtag });
                }
            });
        }else{
            // 전달된 해시태그가 사용된 게시물이 없는 경우
            res.send({ postList:[], searchtag:req.body.searchtag });
        }
    });



});




module.exports = router;