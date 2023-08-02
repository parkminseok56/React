import React, { useState } from 'react'
import '../Style/board.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Login() {
    const Navigate = useNavigate();
    const [userid, setUserid] = useState("");
    const [pwd, setPwd] = useState("");
    const onsubmit = () => {
        axios.post('/api/members/login', { userid, pwd })
            .then((result) => { })
            .catch((err) => { });
    }

    return (
        <div>
            <form id="login-form">
                <fieldset>
                    <legend>LogIn</legend>
                    <div><input type="text" placeholder="userid" value={userid} onChange={
                        (e) => {
                            setUserid(e.currentTarget.value);
                        }
                    } /></div>
                    <div><input type="password" placeholder="password" value={pwd} onChange={
                        (e) => {
                            setPwd(e.currentTarget.value);
                        }
                    } /></div>
                    <button onClick={
                        () => {
                            onsubmit();
                        }
                    }>Login</button>
                    <button>Member Join</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Login
