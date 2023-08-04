const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminuser',
    database: 'node_gram'
});

module.exports = () => {
    passport.serializeUser((user, done) => { // 정상 로그인이 되었을 때 호출
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        let sql = "select * from users where email=?";
        connection.query(sql, [email], async (err, rows) => {
            if (err) { done(err); }
            else { done(null, rows[0]); }
        })
    });
    local();
};