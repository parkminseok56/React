import React, { useEffect, useState } from 'react'
import '../Style/board.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Login(props) {
    const navigate = useNavigate();
    const [userid, setUserid] = useState("");
    const [pwd, setPwd] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        console.log('')
        axios.get('/api/members/loginok')
            .then((result) => {
                console.log()
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
                    props.setMessage(result.data.message);
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
                    <button onClick={
                        () => {
                            navigate('/memberjoin');
                        }
                    }>Member Join</button>
                    <div>{props.message}</div>
                </fieldset>
            </form>
        </div>
    )
}

export default Login
