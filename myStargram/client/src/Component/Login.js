import React, {useState, useEffect} from 'react'
import '../Style/login.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onLoginLocal= async ()=>{
        const result = await axios.post('api/member/login', {email, password});
        if( result.data.login === 'fail'){
            return alert(result.data.msg);
        }else{
            // navigate('/home');
            props.setLogin(true);
            window.location.href='http://localhost:3000/home';
        }  
    }

    const onLoginKakao=()=>{
        window.location.href='http://localhost:5000/api/member/kakao';
    }

    return (
        <div id="wrap">
            <div id="logo">MyStarGram</div>

            <div className='lable'><label>E-mail</label></div><br />
            <div><input type="text" onChange={
                (e)=>{ setEmail( e.currentTarget.value )}
            }/></div>
            <div className='lable'><label>password</label></div><br />
            <div><input type="password" onChange={
                (e)=>{ setPassword( e.currentTarget.value )}
            }/></div><br />
            <div><button id='login' onClick={
                ()=>{onLoginLocal();}
            }>로그인</button></div>
            <div><button id='join' onClick={()=>{navigate('/join')}}>회원가입</button></div><br />
            <div><button id='kakao' onClick={
                ()=>{ onLoginKakao();}
            }></button></div>
            <div><button id='naver'></button></div>
            <div><button id='google'></button></div>
            <div><button id='facebook'></button></div>
        </div>
    )
}

export default Login
