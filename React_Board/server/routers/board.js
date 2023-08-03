const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const multer = require('multer');   // npm i 설치 
const path = require('path');
const fs = require('fs');


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

router.post('/fileUpload', uploadObj.single('image'), (req, res, next) => {
    console.log(req.file.filename);
    res.json(
        {
            filename: `/uploads/${req.file.filename}`,
            realfilename: `/uploads/${req.file.originalname}`
        }
    );
});

module.exports = router;