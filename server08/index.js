const express = require("express");
const path = require("path");
const app = express();
const port = 5000;
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminuser',
    dateabase: 'scott'
});
connection.connect();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client08/build")))

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
});

app.get("/main", (req, res) => {
    res.sendFile(path.join(__dirname, "../client08/build/index.html"));
});

app.post('/api/text', (req, res, next) => {
    console.log(req.body.data);
    res.status(200).json({ success: true, text: '안녕하세요' });
});

app.post('/api/join', (req, res, next) => {
    const { id, pwd, name, email, phone } = req.body;
    //console.log(id, pwd, name, email, phone);

    const sql = 'insert member(userid,pwd,name,phone,email) values(?,?,?,?,?)';
    connection.query(
        sql,
        [id, pwd, name, email, phone],
        (error, result, fields) => {
            if (error) {
                console.error(err);
                next(err);
            }

            let member_no = result.userid;
            console.log('The new member_no:', member_no);

            connection.end();
            return res.json({ success: 'ok' });
        });
});

app.get('/api/members', (req, res, next) => {
    const sql = 'select * from Members';
    connection.query(sql, (error, rows) => {
        if (error) {
            console.error(error);
            next(error);
        } else {
            console.log(rows);
        }
    });
})




app.listen(port, () => { console.log(`${port} 포트에서 서버 대기 중`) });