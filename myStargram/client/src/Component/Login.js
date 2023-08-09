import React from 'react'
import '../Style/login.css'
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    return (
        <div id="wrap">
            <div id="logo">MyStarGram</div>

            <div className='lable'><label>E-mail</label></div><br />
            <div><input type="text" /></div>
            <div className='lable'><label>password</label></div><br />
            <div><input type="text" /></div><br />
            <div><button id='login'>로그인</button></div>
            <div><button id='join' onClick={() => { navigate('/join') }}>회원가입</button></div>
            <div><button id='kakao'></button></div>
            <div><button id='naver'></button></div>
            <div><button id='google'></button></div>
            <div><button id='facebook'></button></div>
        </div>
    )
}



export default Login
