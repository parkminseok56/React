const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const multer = require('multer');   // npm i 설치 
const path = require('path');
const fs = require('fs');
const { error } = require('console');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminuser',
    database: 'scott'
});

try {
    fs.readdirSync('public/uploads');
} catch (error) {
    console.error('uploads 폴더가 없어서 폴더를 생성합니다.');
    fs.mkdirSync('public/uploads');
}

const uploadObj = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'public/uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
})

let paging = {
    page: 1,
    totalPage: 0,
    beginPage: 0,
    endPage: 0,
    displayRow: 5,
    displayPage: 5,
    prev: false,
    next: false,
    startNum: 0,
    endNum: 0,
    calculate: function () {
        this.endPage = Math.ceil(this.page / this.displayPage) * this.displayPage;
        this.beginPage = this.endPage - (this.displayPage - 1);
        let totalPage = Math.ceil(this.totalCount / this.displayRow);
        if (totalPage < this.endPage) {
            this.endPage = totalPage;
            this.next = false;
        } else {
            this.next = true;
        }
        this.prev = (this.beginPage == 1) ? false : true;
        this.startNum = (this.page - 1) * this.displayRow + 1;
        this.endNum = this.page * this.displayRow;
        console.log(this.beginPage + "" + this.endPage + "" + this.startNum + "" + this.endNum + "" + this.totalCount);
    }
}


router.get('/getBoardList/:page', (req, res) => {
    if (req.params.page != undefined) {
        paging.page = req.params.page;
        req.session.page = req.params.page;
    } else if (req.session.page != undefined) {
        paging.page = req.session.page;
    } else {
        req.session.page = '';
    }

    // 게시물의 개수를 세고, 그 숫자를 totalCount 에 넣고, calculate 함수를 호출
    let sql = 'select * from boards';
    connection.query(sql, (error, rows) => {
        if (error) {
            console.error(error);
            next(error);
        }
        paging.totalCount = rows.length;
        paging.calculate();

        sql = "select * from boards order by id desc limit ? offset ? ";
        connection.query(sql, [paging.displayRow, paging.startNum], (error, rows) => {
            if (error) {
                console.error(error);
                next(error);
            } else {
                return res.json({ rows, paging });
            }

        });
    });
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

router.post('/fileUpload', uploadObj.single('image'), (req, res, next) => {
    console.log(req.file.filename);
    res.json(
        {
            filename: `/uploads/${req.file.filename}`,
            realfilename: `/uploads/${req.file.originalname}`
        }
    );
});

const uploadObj2 = multer();
router.post('/Writeboard', (req, res, next) => {
    const { userid, subject, content, filename, realfilename } = req.body;
    const sql = "insert into boards(writer,subject,content,filename,realfilename)values(?,?,?,?,?)";
    connection.query(
        sql, [userid, subject, content, filename, realfilename],
        (error, results, fields) => {
            if (error) {
                console.error(error);
                next(error);
            } else {
                return res.send('ok');
            }
        }
    )

});

router.post('/updateBoard', uploadObj2.none(), (req, res, next) => {
    const { id, subject, content, filename, realfilename } = req.body;
    const sql = "update boards set subject=?,content=?,filename=?,realfilename=? where id=?";
    connection.query(
        sql, [subject, content, filename, realfilename, id],
        (error, results, fields) => {
            if (error) {
                console.error(error);
                next(error);
            } else {
                return res.send('ok');
            }
        }
    )

});

router.delete('/deleteBoard/:id', (req, res) => {
    const sql = "delete from boards where id=?";
    db.query(
        sql,
        [req.params.id],
        (err, result) => {
            res.send('ok');
        }
    )
});

router.get('/getReplyList/:id', (req, res, next) => {
    console.log('param:', req.params.id);
    const sql = 'select * from reply where boardnum=?';
    connection.query(
        sql,
        [req.params.id],
        (error, rows) => {
            if (error) {
                console.error(error);
                next(error);
            } else {
                return res.send(rows);
            }
        }
    );
});



module.exports = router;