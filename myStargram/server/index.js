// 분리된 라우터 파일에서 사용할 multer, sql2 등을 제외한 나머지 모듈을 require 합니다
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const passport = require('passport');

const app = express(); // 서버 운영을 위한 객체 로딩
app.set('port', process.env.PORT || 5000); // 서버 포트에 사용할 값을 변수에 저장
dotenv.config();
app.use(express.static(path.join(__dirname, 'public'))); // 일반 static 폴더 설정
app.use('/img', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));  // 쿠키사용
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

const MemberRouter = require('./routers/Member');
app.use('/api/Member', MemberRouter);


//------------------------------------------------------------
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    console.log(err);
    res.send('콘솔창의 에러를 확인하세요');
});
app.listen(app.get('port'), () => {
    console.log(app.get('port'), ' 포트에서 대기중...');
});


