const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client08/build")))

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
});

app.get("/main", (req, res) => {
    res.sendFile(path.join(__dirname, "../client08/build/index.html"));
});

app.get('/api/text', (req, res, next) => {
    console.log(req.body.data);
    res.status(200).json({ success: true, text: '안녕하세요' });
});

app.listen(port, () => { console.log(`${port} 포트에서 서버 대기 중`) });