import React, { useState, useEffect } from 'react'
import '../Style/board.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Memberjoin(props) {
    const [userid, setUserid] = useState("a");
    const [pwd, setPwd] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const onsubmit = (e) => {
        e.preventDefault();
        if (userid === '') {
            return alert('아이디는 필수 입력사항입니다.');
        } else if (pwd === '') {
            return alert('비밀번호는 필수 입력사항입니다.');
        } else if (name === '') {
            return alert('이름은 필수 입력사항입니다.');
        } else {
            // 입력한 내용으로 회원 가입을 하고 로그인 페이지로 돌아가도록 제작하시오
            axios.post('/api/members/join', { userid, pwd, name, phone, email })
                .then((result) => {
                    props.setMessage('회원가입이 완료되었습니다. 로그인하세요')
                    navigate('/');
                })
                .catch((error) => {
                    alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
                });
        }
    };

    return (
        <div id="wrap">
            <form id="join-form">
                <fieldset>
                    <legend>회원가입 - 사용자 등록</legend>
                    <div><input type='text' placeholder='userid' value={userid} onChange={
                        (e) => {
                            setUserid(e.currentTarget.value);
                        }
                    } /></div>
                    <div><input type='password' placeholder='password' value={pwd} onChange={
                        (e) => {
                            setPwd(e.currentTarget.value);
                        }
                    } /></div>
                    <div><input type='text' placeholder='name' value={name} onChange={
                        (e) => {
                            setName(e.currentTarget.value);
                        }
                    } /></div>
                    <div><input type='text' placeholder='phone' value={phone} onChange={
                        (e) => {
                            setPhone(e.currentTarget.value);
                        }
                    } /></div>
                    <div><input type='text' placeholder='email' value={email} onChange={
                        (e) => {
                            setEmail(e.currentTarget.value);
                        }
                    } /></div>
                    <button onClick={
                        (e) => {
                            onsubmit(e);
                        }
                    }>회원 가입</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Memberjoin
