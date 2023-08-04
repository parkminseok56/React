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
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
            },
            async (email, password, done) => {
                try {
                    let sql = "select * from users where email=?";
                    connection.query(
                        sql,
                        [email],
                        async (err, rows) => {
                            if (rows.length >= 1) {
                                const result = await bcrypt.compare(password, rows[0].password);
                                if (result) {
                                    done(null, exUser);
                                } else {
                                    done(null, false, { message: 'password가 일치하지 않습니다' });
                                }
                            } else {
                                return done(null, false, { message: '없는 이메일입니다.' });
                            }
                        });
                } catch (err) {
                    console.error(err);
                    return done(err);
                }
            }
        )
    );
};