const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'adminuser',
    database : 'mystargram'
});


module.exports = () => {
    passport.use( 
        new KakaoStrategy(
            {   clientID: process.env.KAKAO_ID,   callbackURL: '/api/member/kakao/callback',   }, 
            async (accessToken, refreshToken, profile, done)=>{
                let sql = "select * from members where snsid=? and provider=? ";
                connection.query( sql, [profile.id, 'kakao'],  async (err, rows)=>{
                    if(err){ console.error(err); done(err); }
                    if( rows.length>=1 ){ 
                        done(null, rows[0]);
                    }else { 
                        sql = "insert into members(email, nick, snsid, provider) values(?,?,?,?)";
                        connection.query( sql, [ profile._json.kakao_account.email , 
                            profile.displayName, profile.id , 'kakao' ],  
                            (err, results, fields)=>{  
                                if(err){ console.error(err); done(err); }
                                sql = "select * from members where snsid=? and provider=? ";
                                connection.query( sql, [profile.id, 'kakao'],  async (err, rows)=>{
                                    if(err){ console.error(err); done(err); }
                                    if( rows.length>=1 ){
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