import React, { useState, useEffect } from 'react'
import '../Style/login.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Join() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordChk, setPasswordchk] = useState('');
    const [nick, setNick] = useState('');
    const [phone, setPhone] = useState('');

    const onSubmit = async () => {
        if (!email) { return alert('이메일을 입력하세요'); }
        if (!password) { return alert('비밀번호를 입력하세요'); }
        if (password !== passwordChk) { return alert('비밀번호 확인이 일치하지 않습니다.'); }
        if (!nick) { return alert('닉네임을 입력하세요'); }
        if (!phone) { return alert('전화번호를 입력하세요'); }


        const result = await axios.post('/api/member/join', { email, password, nick, phone });
        if (result.data.success == 'ok') {
            alert((await result).data.message);
            navigate('/home');
        } else {
            alert(result.data.message);
        }
    }


    return (
        <div id='wrap'>
            <div id="logo">MyStarGram</div>
            <div className='title'>일반회원가입</div><br />
            <div className='lable'><label>E-mail</label></div><br />
            <div><input type='text' onChange={
                (e) => { setEmail(e.currentTarget.value) }
            } /></div>
            <div className='lable'><label>Password</label></div><br />
            <div><input type='password' onChange={
                (e) => { setPassword(e.currentTarget.value) }
            } /></div>
            <div className='lable'><label>PasswordChk</label></div><br />
            <div><input type='password' onChange={
                (e) => { setPasswordchk(e.currentTarget.value) }
            } /></div>
            <div className='lable'><label>Nickname</label></div><br />
            <div><input type='text' onChange={
                (e) => { setNick(e.currentTarget.value) }
            } /></div>
            <div className='lable'><label>Phone</label></div><br />
            <div><input type='text' onChange={
                (e) => { setPhone(e.currentTarget.value) }
            } /></div>
            <button id="join-btn1" className="btn" onClick={
                () => {
                    onSubmit();
                }
            }>회원가입</button>
            <button id="join-btn2" className="btn" onClick={
                () => {
                    navigate('/');
                }
            }>돌아가기</button>

        </div >
    )
}

export default Join
