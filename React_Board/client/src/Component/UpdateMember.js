import React, { useState, useEffect } from 'react';
import '../Style/board.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function UpdateMember(props) {
    const [userid, setUserid] = useState("");
    const [pwd, setPwd] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        // loginUser의 정보를 화면에 뿌려주고 시작
        axios.get('/api/members/getLoginUser')
            .then((result) => {
                setUserid(result.data.loginUser.userid);
                setName(result.data.loginUser.name);
                setPhone(result.data.loginUser.phone);
                setEmail(result.data.loginUser.email);
            })
            .catch((err) => { });
    }, []);

    const onsubmit = (e) => {
        e.preventDefault();
        // 회원정보를 수정하고 세션정보도 수정한 후, main 페이지로 이동
        if (pwd === '') {
            return alert('비밀번호는 필수 입력사항입니다.');
        } else if (name === '') {
            return alert('이름은 필수 입력사항입니다.');
        } else {
            // 입력한 내용으로 회원 정보를 수정하고 로그인 페이지로 돌아가도록 제작
            axios.post('/api/members/updateMember', { userid, pwd, name, phone, email })
                .then((result) => {
                    navigate('/main');
                })
                .catch((error) => {
                    alert('수정이 실패하였습니다. 다시 시도해주세요.');
                });
        }
    };

    return (
        <div id='wrap'>
            <form id="join-form">
                <fieldset>
                    <legend>회원 정보 수정</legend>
                    <div><input type='text' placeholder='userid' value={userid} disabled /></div>
                    <div><input type='password' placeholder='password' value={pwd} onChange={(e) => setPwd(e.target.value)} /></div>
                    <div><input type='text' placeholder='name' value={name} onChange={(e) => setName(e.target.value)} /></div>
                    <div><input type='text' placeholder='phone' value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
                    <div><input type='text' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                    <button onClick={(e) => { onsubmit(e); }}>회원 수정</button>
                </fieldset>
            </form>
        </div>
    );
}


export default UpdateMember;