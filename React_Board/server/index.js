const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = 5000; n
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session({ resave: false, saveUninitialized: false, secret: "rkdgmlwns", }));
app.use(express.json());  // json 데이터 사용 설정
app.use(express.urlencoded({ extended: false })); // req.body 에 관한 사용 설정
//-------------------------------------------------------------------------------
const membersRouter = require('./routers/member');
const boardsRouter = require('./routers/board');

app.use('/api/members', membersRouter);
app.use('/api/boards', boardsRouter);

//----------------------------------------------------------------------------------
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    console.error(err);
    res.send('<h3>console의 에러내용을 확인하세요</h3>');
});
//----------------------------------------------------------------------------------
app.listen(port, () => { console.log(`${port} 포트에서 대기중...`); });