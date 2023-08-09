const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'adminuser',
    database : 'mystargram'
});


module.exports=()=>{
    passport.use(
        new LocalStrategy(
            { usernameField:'email',  passwordField:'password',} , 
            async (email, password, done)=>{
                try{
                    let sql = "select * from members where email=?";
                    connection.query( sql, [email],  async (err, rows)=>{
                        if( rows.length>=1 ){
                            const result = await bcrypt.compare(password, rows[0].password);
                            if( result ){  
                                done(null, rows[0]);  
                            }else{  
                                done(null, false , { message: 'password가 일치하지 않습니다'} );
                            }
                        }else{
                            done(null, false , { message: '없는 이메일입니다.'} );
                        }
                    });
                }catch(err){
                    console.error(err);
                    done(err);  
                }
            }
        )
    );
};