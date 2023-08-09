const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminuser',
    database: 'node_gram'
});


module.exports = () => {
    passport.use(
        new KakaoStrategy(
            { clientID: process.env.KAKAO_ID, callbackURL: '/api/auth/kakao/callback', },
            async (accessToken, refreshToken, profile, done) => {
                // 현재 아이디로 회원 가입이 되어 있는지 검사
                let sql = "select * from users where snsid=? and provider=? ";
                connection.query(sql, [profile.id, 'kakao'], async (err, rows) => {
                    if (err) { console.error(err); done(err); }
                    if (rows.length >= 1) { // 회원 가입 내용이 있으면 바로 로그인
                        done(null, rows[0]);
                    } else { // 회원 가입 내용이 없으면 회원추가
                        sql = "insert into users(email, nick, snsid, provider) values(?,?,?,?)";
                        connection.query(sql, [profile._json.kakao_account.email,
                        profile.displayName, profile.id, 'kakao'],
                            (err, results, fields) => {  // 추가후에 조회 & 로그인 처리
                                if (err) { console.error(err); done(err); }
                                sql = "select * from users where snsid=? and provider=? ";
                                connection.query(sql, [profile.id, 'kakao'], async (err, rows) => {
                                    if (err) { console.error(err); done(err); }
                                    if (rows.length >= 1) {
                                        done(null, rows[0]);
                                    }
                                });
                            }
                        );
                    }
                });
            }
        )
    );
};