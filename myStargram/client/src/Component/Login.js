import React, { useState, useEffect } from 'react'
import '../Style/login.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLoginLocal = async () => {
        const result = axios.post('api/member/login', { email, password })
    }

    return (
        <div id="wrap">
            <div id="logo">MyStarGram</div>

            <div className='lable'><label>E-mail</label></div><br />
            <div><input type="text" onChange={
                (e) => { setEmail(e.currentTarget.value) }
            } /></div>
            <div className='lable'><label>password</label></div><br />
            <div><input type="password" onChange={
                (e) => { setPassword(e.currentTarget.value) }
            } /></div><br />
            <div><button id="login" onClick={
                () => {
                    onLoginLocal();
                }
            }>로그인</button></div>
            <div><button id='join' onClick={() => { navigate('/join') }}>회원가입</button></div><br />
            <div><button id='kakao'></button></div>
            <div><button id='naver'></button></div>
            <div><button id='google'></button></div>
            <div><button id='facebook'></button></div>


        </div>
    )
}



export default Login
