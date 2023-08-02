import React from 'react'
import '../Style/board.css';

function Login() {
    return (
        <div>
            <form id="login-form">
                <fieldset>
                    <legend>LogIn</legend>
                    <div><input type="text" placeholder="userid" /></div>
                    <div><input type="password" placeholder="password" /></div>
                    <button>Login</button>
                    <button>Member Join</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Login
