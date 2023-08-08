const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'adminuser',
    database : 'node_gram'
});
module.exports = ()=>{ 
    passport.serializeUser( (user, done)=>{    // 정상 로그인이 되었을때 호출
        done(null, user.id); 
    });
    passport.deserializeUser((id, done)=>{
        let sql = "select * from users where id=?";
        connection.query( sql, [id],  async (err, rows)=>{
            if(err){ done(err); }
            else{ done(null, rows[0]);  }
        });
    });
    local();
    kakao();
};

