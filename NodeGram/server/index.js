// 분리된 라우터 파일에서 사용할 multer, sql2 등을 제외한 나머지 모듈을 require함.
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const exp = require('constants');

const app = express(); // 서버 운영을 위한 객체 로딩
app.set('port', process.env.PORT || 5000);   // 서버 포트에 사용할 값을 변수에 저장
dotenv.config();
app.use(express.static(path.join(__dirname, 'public'))); // 일반 static 폴더 설정
app.use('/img', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
//=========================================설정============================================================================

const indexRouter = require('./routers');
const postRouter = require('./routers/post');
const authRouter = require('./routers/auth');
const userRouter = require('./routers/user');
app.use('/api/', indexRouter);
app.use('/api/post', postRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

const passportConfig = require('./passport');
passportConfig();
app.use(passport.initialize());
app.use(passport.session());


//===============================에러 처리 라우터=============================================================================
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    console.log(err);
    res.send('콘솔창에 에러를 확인하세요');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '포트에서 대기중..');
});