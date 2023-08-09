const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'adminuser',
    database : 'mystargram'
});
module.exports = ()=>{ 
    passport.serializeUser( (user, done)=>{   
        done(null, user.id); 
    });
    passport.deserializeUser((id, done)=>{
        let sql = "select * from members where id=?";
        connection.query( sql, [id],  async (err, rows)=>{
            if(err){ done(err); }
            else{ done(null, rows[0]);  }
        });
    });
    local();
    kakao();
};

