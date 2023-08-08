const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const bcrypt = require('bcrypt');
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
            {
                clientID: process.env.KAKAO_ID, callbackURL: '/auth/kakao/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log('kakao profile', profile);
                try {
                    let sql = "select * from users where email=?";
                    connection.query(
                        sql,
                        [profile.id, 'kakao'],
                        async (err, rows) => {
                            if (rows.length >= 1) {
                                done(null, rows[0]);
                            } else {
                                sql = "insert into users(email, nick, snsid, provider) values(?,?,?,?)";
                                connection.query(
                                    sql,
                                    [profile._json && profile.e_json.kakao_accont.email, profile.displayName, profile.id, 'kakao'],
                                    (err, result, fields) => {

                                    }
                                );

                            }
                        }
                    });
} catch (err) {
    console.error(err);
    return done(err);
}





            });