import React, {useState} from 'react'
import '../Style/head.css';
import '../Style/join.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Join() {
    const navigate = useNavigate();

    const [ email, setEmail] = useState('');
    const [ nick, setNick] = useState('');
    const [ password, setPassword] = useState('');

    const onSubmit = ()=>{
        axios.post('/api/auth/join', { email, nick, password })
        .then((result)=>{
            if( result.data.message ){ // 회원가입에 실패했다면
                alert(result.data.message);  
            }else if( result.data.success ){  // 회원 가입 성공
                alert(result.data.success);
                navigate('/');
            }
        });
    }

    return (
        <div className="timeline">
            <div id="join-form">
                <div className="input-group">
                    <label for="join-email">이메일</label>
                    <input id="join-email" type="email" onChange={
                        (e)=>{ setEmail( e.currentTarget.value ); }
                    }/>
                </div>
                <div className="input-group">
                    <label for="join-nick">닉네임</label>
                    <input id="join-nick" type="nick" onChange={
                        (e)=>{ setNick( e.currentTarget.value ); }
                    }/>
                </div>
                <div className="input-group">
                    <label for="join-password">비밀번호</label>
                    <input id="join-password" type="password" onChange={
                        (e)=>{ setPassword( e.currentTarget.value ); }
                    }/>
                </div>
                <button id="join-btn1" className="btn" onClick={
                    ()=>{
                        onSubmit();
                    }
                }>회원가입</button>
                <button id="join-btn2" className="btn" onClick={
                    ()=>{
                        navigate('/');
                    }
                }>돌아가기</button>
            </div>
        </div>
    )
}

export default Join
