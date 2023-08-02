import React, { useEffect, useState } from 'react'
import '../Style/board.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Login() {
    const navigate = useNavigate();
    const [userid, setUserid] = useState("");
    const [pwd, setPwd] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get('/api/members/loginok')
            .then((result) => {
                if (result.data.login == 'ok') {
                    navigate('/main');
                }
            })
            .catch((err) => { });

    }, []);

    const onsubmit = (e) => {
        e.preventDefault();
        axios.post('/api/members/login', { userid, pwd })
            .then((result) => {
                // console.log(result.data.message);
                if (result.data.login == 'ok') {
                    navigate('/main');
                } else {
                    setMessage(result.data.message);
                }
            })
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
                        (e) => {
                            onsubmit(e);
                        }
                    }>Login</button>
                    <button>Member Join</button>
                    <div>{message}</div>
                </fieldset>
            </form>
        </div>
    )
}

export default Login
